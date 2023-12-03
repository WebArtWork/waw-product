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
			}
		}
	}
	)
	waw.products = async (query = {}, limit, count = false) => {
		let exe = count ? waw.Product.countDocuments(query) : waw.Product.find(query);

		if (limit) {
			exe = exe.limit(limit);
		}

		return await exe;
	};

	waw.product = async (query) => {
		return await waw.Product.findOne(query);
	};

	const products = async (req, res) => {
		const products = await waw.products(
			req.params.tag_id
				? { tag: req.params.tag_id }
				: req.originalUrl === "/sales"
					? {
						sale: {
							$gt: 0,
							$ne: null
						}
					}
					: {},
			20
		);

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
			"/products": products,
			"/sales": products,
			"/products/:tag_id": products,
			"/product/:_id": async (req, res) => {
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
		}
	});

	waw.storeProducts = async (store, fillJson) => {
		fillJson.products = await waw.products({
			author: store.author
		});

		fillJson.footer.products = fillJson.products;
	}

		waw.storeProduct = async (store, fillJson, req) => {
		fillJson.product = await waw.product({
			 author: store.author,
			_id: req.params._id  
		});

		fillJson.footer.product = fillJson.product;
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
