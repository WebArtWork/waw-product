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
				if (req.body.url) {
					while (await waw.Product.count({ url: req.body.url })) {
						const url = req.body.url.split("_");
						req.body.url =
							url[0] +
							"_" +
							(url.length > 1 ? Number(url[1]) + 1 : 1);
					}
				} else {
					delete req.body.url;
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
		"storePrepareProducts",
		async (store, fillJson, req) => {
			reloads[store._id] = reloads[store._id] || [];
			const fillAllProducts = async () => {
				if (!fillJson.tagsIds) {
					return setTimeout(fillAllProducts, 500);
				}

				fillJson.allProducts = await waw.Product.find({
					tags: {
						$in: fillJson.tagsIds,
					},
					enabled: true
				}).lean();
				for (const product of fillJson.allProducts) {
					product.id = product._id.toString();
					product._id = product._id.toString();
					product.tags = (product.tags||[]).map(t => t.toString());
				}
				fillJson.top_products = fillJson.allProducts.filter((p) => {
					return p.top;
				});
			};
			fillAllProducts();
			reloads[store._id].push(fillAllProducts);
		},
		"Prepare updatable documents of products"
	);
	const tagsUpdate = async (tag) => {
		setTimeout(() => {
			for (const storeId of (tag.stores || [])) {
				for (const reload of (reloads[storeId] || [])) {
					reload();
				}
			}
		}, 2000);
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
	const getTag = (tags) => {
		for (const tag of tags) {
			if (tag.active) {
				return tag;
			}
			if (tag.tags) {
				const innerTag = getTag(tag.tags);
				if (innerTag) {
					return innerTag;
				}
			}
		}
		return false;
	}
	waw.addJson(
		"storeProducts",
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
			const tag = getTag(fillJson.tags);
			if (tag) {
				fillJson.title = tag.name + " | " + store.name;
			}
			// add search
		},
		"Add tags and products to json"
	);
	waw.addJson(
		"storeProduct",
		async (store, fillJson, req) => {
			if (!req.params.tag_id) {
				for (const tag of fillJson.tags) {
					tag.tags = [];
					tag.active = false;
				}
			}
			fillJson.product = fillJson.allProducts.find((p) => {
				return p._id === req.params.product_id;
			});
			if (fillJson.product) {
				fillJson.title = fillJson.product.name + " | " + store.name;
			} else {
				// handle no found product
			}
			console.log(req.params, fillJson.product);
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
};
