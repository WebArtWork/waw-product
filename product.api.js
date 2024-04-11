const path = require("path");

module.exports = async (waw) => {
	waw.crud("product", {
		get: [
			{
				name: "public",
				ensure: waw.next,
				query: () => {
					return {};
				},
			},
			{
				name: "crafts",
				ensure: waw.next,
				query: () => {
					return {
						isTemplate: true,
					};
				},
			},
			{
				name: "links",
				ensure: async (req, res, next) => {
					if (req.user) {
						req.crafts_ids = (
							await waw.Product.find({
								moderators: req.user._id,
								isTemplate: true,
							}).select("_id")
						).map((p) => p.id);

						next();
					} else {
						res.json([]);
					}
				},
				query: (req) => {
					return {
						template: {
							$in: req.crafts_ids,
						},
					};
				},
			},
			{
				name: "admin",
				ensure: waw.role("admin"),
				query: () => {
					return {};
				},
			},
		],
		update: {
			name: "admin",
			ensure: waw.role("admin"),
			query: (req) => {
				return { _id: req.body._id };
			},
		},
		delete: {
			name: "admin",
			ensure: waw.role("admin"),
			query: (req) => {
				return { _id: req.body._id };
			},
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
				if (!req.body.url) {
					req.body.url = null;
				} else {
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
				req.body.domain = req.get("host");
				next();
			},
		},
	});

	waw.products = async (query = {}, limit, count = false) => {
		let exe = count
			? waw.Product.countDocuments(query)
			: waw.Product.find(query).limit(10);

		if (limit) {
			exe = exe.limit(limit);
		}

		return await exe;
	};

	waw.product = async (query) => {
		return await waw.Product.findOne(query);
	};

	const reloads = {};
	waw.addJson(
		"storePrepareProductsTags",
		async (store, fillJson, req) => {
			reloads[store._id] = reloads[store._id] || [];
			const fillAllProductsTags = async () => {
				fillJson.allTags = await waw.Tag.find({
					stores: store._id,
				}).lean();
				for (const tag of fillJson.allTags) {
					tag.children = (tag.children || []).map(id => id.toString());
					tag.parent = tag.parent && tag.parent.toString() || '';
					tag._id = tag._id.toString();
					tag.id = tag._id.toString();
				}
				fillJson.tags = fillJson.allTags.filter((t) => {
					return !t.parent;
				});
				const tagsIds = fillJson.tags.reduce(
					(accumulator, currentDocument) => {
						return accumulator
							.concat(currentDocument.children)
							.concat([currentDocument._id]);
					},
					[]
				);
				fillJson.allProducts = await waw.Product.find({
					tags: {
						$in: tagsIds,
					},
				}).lean();
				for (const product of fillJson.allProducts) {
					product.id = product._id.toString();
					product._id = product._id.toString();
					product.tags = product.tags.map(t => t.toString());
				}
			};
			fillAllProductsTags();
			reloads[store._id].push(fillAllProductsTags);
		},
		"Prepare updatable content of tags and products"
	);
	const fillTags = (tags, id, fillJson) => {
		for (const tag of tags) {
			if (tag._id === id) {
				tag.active = true;
				fillJson.products = fillJson.allProducts.filter((p) => {
					for (tagId of p.tags) {
						if (tag._id === tagId) {
							return true;
						}
						if (tag.children.includes(tagId)) {
							return true;
						}
					}
					return false;
				});
				tag.tags = fillJson.allTags.filter((t) => {
					return tag._id === t.parent;
				});
			} else if (tag.children.includes(id)) {
				tag.active = true;
				tag.tags = fillJson.allTags.filter((t) => {
					return tag._id === t.parent;
				});
				fillTags(tag.tags, id, fillJson);
			}
		}
	};
	waw.addJson(
		"storeTopProducts",
		async (store, fillJson, req) => {
			for (const tag of fillJson.allTags) {
				tag.tags = [];
				tag.active = false;
			}
			fillJson.top_products = fillJson.allProducts.filter((p) => {
				return p.top;
			});
		},
		"Add top products to json"
	);
	waw.addJson(
		"storeProductsTags",
		async (store, fillJson, req) => {
			for (const tag of fillJson.allTags) {
				tag.tags = [];
				tag.active = false;
			}
			if (req.params.tag_id) {
				fillTags(fillJson.tags, req.params.tag_id, fillJson);
			} else {
				fillJson.products = fillJson.allProducts.slice();
			}
			console.log(fillJson.products);
			// add search
		},
		"Add tags and products to json"
	);
	waw.addJson(
		"storeProductTags",
		async (store, fillJson, req) => {
			if (!req.params.tag_id) {
				for (const tag of fillJson.tags) {
					tag.tags = [];
					tag.active = false;
				}
			}
			fillJson.product = waw.allProducts.filter((p) => {
				return p.id === req.params.product_id;
			});
		},
		"Add tags and product to json"
	);
	waw.addJson(
		"storeFavoritedProducts",
		async (store, fillJson, req) => {
			fillJson.products = fillJson.allProducts.filter((p) => {
				return fillJson.productFavorited(p.id);
			});
		},
		"Add favorited product to json"
	);

	const tagsUpdate = async (tag) => {
		for (const storeId of tag.stores) {
			for (const reload of reloads[storeId]) {
				reload();
			}
		}
	};
	waw.on("tag_create", tagsUpdate);
	waw.on("tag_update", tagsUpdate);
	waw.on("tag_delete", tagsUpdate);
	const productsUpdate = async (product) => {
		const tags = await waw.Tag.find({
			_id: product.tags,
		});
		for (const tag of tags) {
			tagsUpdate(tag);
		}
	};
	waw.on("product_create", productsUpdate);
	waw.on("product_update", productsUpdate);
	waw.on("product_delete", productsUpdate);

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

	// remove below

	waw.serveProducts = async (req, res) => {
		const query = {};
		if (req.params.tag_id) {
			query.tag = req.params.tag_id;
		}
		if (req.get("host") !== waw.config.land) {
			query.domain = req.get("host");
		}

		const products = await waw.Product.find(query).limit(10);

		res.send(
			waw.render(
				path.join(template, "dist", "products.html"),
				{
					...waw.config,
					title: waw.config.productTitle || waw.config.title,
					description:
						waw.config.productDescription || waw.config.description,
					image: waw.config.productImage || waw.config.image,
					products,
					categories: await waw.tag_groups("product"),
				},
				waw.translate(req)
			)
		);
	};

	waw.serveProduct = async (req, res) => {
		const product = await waw.product(
			waw.mongoose.Types.ObjectId.isValid(req.params._id)
				? { _id: req.params._id }
				: { url: req.params._id }
		);

		if (!product) {
			return res.redirect("/products");
		}

		const products = await waw.products({}, 6);

		res.send(
			waw.render(
				path.join(template, "dist", "product.html"),
				{
					...waw.config,
					product,
					products,
					title: product.title + " | Wawify",
				},
				waw.translate(req)
			)
		);
	};

	waw.operatorProducts = async (operator, fillJson) => {
		fillJson.products = await waw.products({
			domain: operator.domain,
		});

		fillJson.productsByTag = [];
		for (const product of fillJson.products) {
			if (!product.tag) continue;
			const tagObj = fillJson.productsByTag.find(
				(c) => c.id.toString() === product.tag.toString()
			);
			if (tagObj) {
				tagObj.products.push(product);
			} else {
				const tag = waw.getTag(product.tag);
				if (tag) {
					fillJson.productsByTag.push({
						id: product.tag,
						category: tag.category,
						name: tag.name,
						description: tag.description,
						products: [product],
					});
				}
			}
		}

		fillJson.productsByCategory = [];
		for (const byTag of fillJson.productsByTag) {
			const categoryObj = fillJson.productsByCategory.find(
				(c) => c.id.toString() === byTag.category.toString()
			);
			if (categoryObj) {
				categoryObj.tags.push(byTag);

				for (const product of byTag.products) {
					if (
						!categoryObj.products.find((s) => s.id === product.id)
					) {
						categoryObj.products.push(product);
					}
				}
			} else {
				const category = waw.getCategory(byTag.category);

				fillJson.productsByCategory.push({
					id: byTag.category,
					name: category.name,
					description: category.description,
					products: byTag.products.slice(),
					tags: [byTag],
				});
			}
		}
	};

	waw.operatorProduct = async (operator, fillJson, req) => {
		fillJson.product = await waw.product({
			domain: operator.domain,
			_id: req.params._id,
		});
	};

	waw.operatorTopProducts = async (operator, fillJson) => {
		fillJson.topProducts = await waw.products(
			{
				domain: operator.domain,
			},
			4
		);
	};
};
