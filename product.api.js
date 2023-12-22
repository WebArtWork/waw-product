const path = require("path");
const template = path.join(process.cwd(), "template");

module.exports = async (waw) => {
	waw.crud("product", {
		get: [
			{
				ensure: waw.next
			},
			{
				name: 'public',
				ensure: waw.next,
				query: () => {
					return {};
				}
			},
			{
				name: 'crafts',
				ensure: waw.next,
				query: () => {
					return {
						isTemplate: true
					};
				}
			},
			{
				name: 'links',
				ensure: async (req, res, next) => {
					if (req.user) {
						req.crafts_ids = (await waw.Product.find({
							moderators: req.user._id,
							isTemplate: true
						}).select('_id')).map(p => p.id);

						next();
					} else {
						res.json([]);
					}
				},
				query: (req) => {
					return {
						template: {
							$in: req.crafts_ids
						}
					};
				}
			},
			{
				name: 'admin',
				ensure: waw.role('admin'),
				query: () => {
					return {};
				}
			},
			{
				ensure: waw.next,
				query: req => {
					return { domain: req.get('host') };
				}
			}
		],
		update: {
			name: 'admin',
			ensure: waw.role('admin'),
			query: (req) => {
				return { _id: req.body._id };
			}
		},
		delete: {
			name: 'admin',
			ensure: waw.role('admin'),
			query: (req) => {
				return { _id: req.body._id };
			}
		},
		fetch: {
			ensure: waw.next,
			query: (req) => {
				return {
					_id: req.body._id,
				};
			},
		},
		create: {
			ensure: async (req, res, next) => {
				if (req.body.name) {
					req.body.url = req.body.name
						.toLowerCase()
						.replace(/[^a-z0-9]/g, "");
				}
				if (req.body.url) {
					while (await waw.Product.count({ url: req.body.url })) {
						const url = req.body.url.split("_");
						req.body.url =
							url[0] +
							"_" +
							(url.length > 1 ? Number(url[1]) + 1 : 1);
					}
				}
				next();
			},
			ensureDomain: async (req, res, next) => {
				req.body.domain = req.get('host');
				next();
			}
		}
	})
	const docs = await waw.Product.find({});
	for (const doc of docs) {
		if (!doc.domain) {
			doc.domain = waw.config.land;
			await doc.save();
		}
	}


	waw.products = async (query = {}, limit, count = false) => {
		let exe = count ? waw.Product.countDocuments(query) : waw.Product.find(query).limit(10);;

		if (limit) {
			exe = exe.limit(limit);
		}

		return await exe;
	};

	waw.product = async (query) => {
		return await waw.Product.findOne(query);
	};

	waw.serveProducts = async (req, res) => {
		const query = {};
		if (req.params.tag_id) {
			query.tag = req.params.tag_id;
		}
		if (req.get('host') !== waw.config.land) {
			query.domain = req.get('host');
		}

		const products = await waw.Product.find(query).limit(10);

		res.send(
			waw.render(
				path.join(template, "dist", "products.html"),
				{
					...waw.config,
					title: waw.config.productTitle || waw.config.title,
					description: waw.config.productDescription || waw.config.description,
					image: waw.config.productImage || waw.config.image,
					products,
					categories: await waw.tag_groups('product')
				},
				waw.translate(req)
			)
		);
	}

	waw.api({
		domain: waw.config.land,
		template: {
			path: template,
			prefix: "/template",
			pages: "product products",
		},
		page: {
			"/products": waw.serveProducts,
			"/sales": waw.serveProducts,
			"/products/:tag_id": waw.serveProducts,
			"/product/:_id": waw.serveProduct
		}
	});
	waw.serveProduct = async (req, res) => {
		const product = await waw.product(
			waw.mongoose.Types.ObjectId.isValid(req.params._id)
				? { _id: req.params._id }
				: { url: req.params._id }
		);

		if (!product) {
			return res.redirect('/products');
		}

		const products = await waw.products({}, 6);

		res.send(
			waw.render(path.join(template, "dist", "product.html"), {
				...waw.config,
				product,
				products,
				title: product.title + " | Wawify"
			},
				waw.translate(req)
			)
		);
	}

	waw.operatorProducts = async (operator, fillJson) => {
		fillJson.products = await waw.products({
			domain: operator.domain
		});

		fillJson.productsByTag = [];
		for (const product of fillJson.products) {
			if (!product.tag) continue;
			const tagObj = fillJson.productsByTag.find(c => c.id.toString() === product.tag.toString());
			if (tagObj) {
				tagObj.products.push(product);
			} else {
				const tag = waw.getTag(product.tag);
					fillJson.productsByTag.push({
						id: product.tag,
						category: tag.category,
						name: tag.name,
						description: tag.description,
						products: [product]
					})
			}
		}

		fillJson.productsByCategory = [];
		for (const byTag of fillJson.productsByTag) {
			const categoryObj = fillJson.productsByCategory.find(c => c.id.toString() === byTag.category.toString());
			if (categoryObj) {
				categoryObj.tags.push(byTag);

				for (const product of byTag.products) {
					if (!categoryObj.products.find(s => s.id === product.id)) {
						categoryObj.products.push(product)
					}
				}
			} else {
				const category = waw.getCategory(byTag.category);

				fillJson.productsByCategory.push({
					id: byTag.category,
					name: category.name,
					description: category.description,
					products: byTag.products.slice(),
					tags: [byTag]
				})
			}
		}
	}

	waw.operatorProduct = async (operator, fillJson, req) => {
		fillJson.product = await waw.product({
			domain: operator.domain,
			_id: req.params._id
		});

		fillJson.footer.product = fillJson.product;
	}

	waw.operatorTopProducts = async (operator, fillJson) => {
		fillJson.topproducts = await waw.products({
			domain: operator.domain
		}, 4);

		fillJson.footer.topProducts = fillJson.topProducts;
	}

	waw.storeProducts = async (store, fillJson) => {
		fillJson.products = await waw.products({
			author: store.author
		});

		fillJson.productsByTag = [];
		for (const product of fillJson.products) {
			if (!product.tag) continue;
			const tagObj = fillJson.productsByTag.find(c => c.id.toString() === product.tag.toString());
			if (tagObj) {
				tagObj.products.push(product);
			} else {
				const tag = waw.getTag(product.tag);

				fillJson.productsByTag.push({
					id: product.tag,
					category: tag.category,
					name: tag.name,
					description: tag.description,
					products: [product]
				})
			}
		}

		fillJson.productsByCategory = [];
		for (const byTag of fillJson.productsByTag) {
			const categoryObj = fillJson.productsByCategory.find(c => c.id.toString() === byTag.category.toString());
			if (categoryObj) {
				categoryObj.tags.push(byTag);

				for (const product of byTag.products) {
					if (!categoryObj.products.find(s => s.id === product.id)) {
						categoryObj.products.push(product)
					}
				}
			} else {
				const category = waw.getCategory(byTag.category);

				fillJson.productsByCategory.push({
					id: byTag.category,
					name: category.name,
					description: category.description,
					products: byTag.products.slice(),
					tags: [byTag]
				})
			}
		}
	}


	waw.storeProduct = async (store, fillJson, req) => {
		fillJson.product = await waw.product({
			author: store.author,
			_id: req.params._id
		});

		fillJson.footer.product = fillJson.product;
	}

	waw.storeTopProducts = async (store, fillJson) => {
		fillJson.topProducts = await waw.products({
			author: store.author,
		}, 4);

		fillJson.footer.topProducts = fillJson.topProducts;
	}

	const save_file = (doc) => {
		if (doc.thumb) {
			waw.save_file(doc.thumb);
		}

		if (doc.thumbs) {
			for (const thumb of doc.thumbs) {
				waw.save_file(thumb);
			}
		}
	};

	waw.on("product_create", save_file);
	waw.on("product_update", save_file);
	waw.on("product_delete", (doc) => {
		if (doc.thumb) {
			waw.delete_file(doc.thumb);
		}

		if (doc.thumbs) {
			for (const thumb of doc.thumbs) {
				waw.delete_file(thumb);
			}
		}
	});
	await waw.wait(2000);
	if (waw.store_landing) {
		waw.store_landing.products = async (query) => {
			return await waw.products(query, 4);
		}
	};
}
