const path = require("path");

module.exports = async (waw) => {
	const ensure = waw.role("admin owner", async (req, res, next) => {
		if (!req.user.is.admin) {
			req.storeIds = (
				await waw.Store.find({
					moderators: req.user._id,
				}).select("_id")
			).map((s) => s.id);
			req.tagsIds = (
				await waw.Tag.find({
					stores: req.storeIds,
				}).select("_id")
			).map((s) => s.id);
		}
		next();
	});
	waw.crud("product", {
		get: [
			{
				ensure,
				query: (req) => {
					return req.user.is.admin
						? {}
						: {
							tags: {
								$in: req.tagsIds,
							},
						};
				},
			},
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
			ensure,
			query: (req) => {
				return req.user.is.admin
					? {
						_id: req.body._id,
					}
					: {
						_id: req.body._id,
						tags: {
							$in: req.tagsIds,
						},
					};
			},
		},
		delete: {
			ensure,
			query: (req) => {
				return req.user.is.admin
					? {
						_id: req.body._id,
					}
					: {
						_id: req.body._id,
						tags: {
							$in: req.tagsIds,
						},
					};
			},
		},
		fetch: {
			ensure: waw.next,
			query: (req) => {
				return {
					_id: req.body._id,
				};
			},
			name: 'populated'
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
					enabled: true,
				}).lean();
				for (const product of fillJson.allProducts) {
					product.id = product._id.toString();
					product._id = product._id.toString();
					product.tags = (product.tags || []).map((t) =>
						t.toString()
					);
					product.productquantity = await waw.Productquantity.find({
						product: product._id,
					}).populate('size').lean();

					if (product.productquantity) {
						product.productquantity.forEach(productquantity => {
							productquantity._id = productquantity._id.toString();
							if(productquantity.size) {
								productquantity.size._id = productquantity.size._id.toString();
							}
						});
					}
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
			for (const storeId of tag.stores || []) {
				for (const reload of reloads[storeId] || []) {
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

	const fillTags = (tags, id, fillJson, query) => {
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

				processProductData(fillJson);

				fillJson.products = fillJson.products.filter(product => {
					let genderMatch = true;
					let seasonMatch = true;
					let priceMatch = true;
					let ageMatch = true;
					let searchMatch = true;
					if (query) {

						if (query.gender) {
							genderMatch = Object.keys(query.gender).includes(product.gender);
						}
						if (query.season) {
							let season = {};
							for (const key in query.season) {
								season[key.replace(/\+/g, ' ')] = query.season[key];
							}
							seasonMatch = Object.keys(season).includes(product.season);
						}
						if (query.price) {
							priceMatch = product.price > Number(Object.keys(query.price)[0]) && product.price < Number(Object.keys(query.price)[1])
						}

						if (query.age) {
							ageMatch = fillJson.quantities.some((el) => el.product == product._id && el.quantity > 0 && el.size.name == Object.keys(query.age)[0]);
						}
						if (paramsObject.search) {
							const searchTerm = Object.keys(paramsObject.search)[0].toLowerCase();
							searchMatch = product.name.toLowerCase().includes(searchTerm) ||
										  product.description.toLowerCase().includes(searchTerm)
							
						}
					}

					return genderMatch && seasonMatch && priceMatch && ageMatch && searchMatch;
				});
				tag.tags = fillJson.allTags.filter((t) => {
					return tag._id === t.parent;
				});
			} else if (tag.children.includes(id)) {
				tag.active = true;
				tag.tags = fillJson.allTags.filter((t) => {
					return tag._id === t.parent;
				});
				fillTags(tag.tags, id, fillJson, query);
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
	};
	const getUniqueFields = (products, field) => {
		const fields = new Set();

		products.forEach(product => {
			if (product[field]) {
				fields.add(product[field]);
			}
		});

		return Array.from(fields);
	}
	const queryObjectToParsedObject = (queryObject) => {
		let result = {};

		Object.keys(queryObject).forEach(key => {
			let value = queryObject[key];

			if (value.includes(',')) {

				let values = value.split(',');
				result[key] = {};
				values.forEach(val => {
					result[key][val] = true;
				});

			} else {
				result[key] = { [value]: true };
			}
		});

		return result;
	};


	waw.addJson(
		"storeProducts",
		async (store, fillJson, req) => {
			fillJson.quantities = await waw.Productquantity.find({}).populate('size').lean();
			let paramsObject = queryObjectToParsedObject(req.query);
			if (req.params.tag_id) {
				req.params.tag_id = req.params.tag_id.split('?')[0];
			}
			for (const tag of fillJson.allTags) {
				tag.tags = [];
				tag.active = false;
			}

			let query = {
				tags: {
					$in: fillJson.tagsIds,
				},
				enabled: true
			};

			if (req.params.tag_id) {
				fillTags(fillJson.tags, req.params.tag_id, fillJson, paramsObject);
			} else {
				fillJson.allProducts = await waw.Product.find(query).lean();
				for (const product of fillJson.allProducts) {
					product.id = product._id.toString();
					product._id = product._id.toString();
					product.tags = (product.tags || []).map((t) =>
						t.toString()
					);
				}
				fillJson.products = fillJson.allProducts.slice();
				processProductData(fillJson);
				fillJson.products = fillJson.products.filter(product => {
					let genderMatch = true;
					let seasonMatch = true;
					let priceMatch = true;
					let ageMatch = true;
					let searchMatch = true;
					if (paramsObject) {
						if (paramsObject.gender) {
							genderMatch = Object.keys(paramsObject.gender).includes(product.gender);
						}
						if (paramsObject.season) {
							let season = {};
							for (const key in paramsObject.season) {
								season[key.replace(/\+/g, ' ')] = paramsObject.season[key];
							}
							seasonMatch = Object.keys(season).includes(product.season);
						}
						if (paramsObject.price) {
							priceMatch = product.price > Number(Object.keys(paramsObject.price)[0]) && product.price < Number(Object.keys(paramsObject.price)[1])
						}

						if (paramsObject.age) {
							ageMatch = fillJson.quantities.some((el) => el.product == product._id && el.quantity > 0 && el.size.name == Object.keys(paramsObject.age)[0]);
						}
						if (paramsObject.search) {
							const searchTerm = Object.keys(paramsObject.search)[0].toLowerCase();
							searchMatch = product.name.toLowerCase().includes(searchTerm) ||
										  product.description.toLowerCase().includes(searchTerm)
							
						}
					}

					return genderMatch && seasonMatch && priceMatch && ageMatch && searchMatch;
				});
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

	const processProductData = (fillJson) => {
		fillJson.seasons = getUniqueFields(fillJson.products, 'season');

		fillJson.quantities = fillJson.quantities.filter(quantity => {
			if (quantity.quantity == 0) return false;
			return fillJson.products.some(product => product._id.toString() == quantity.product.toString());
		});

		const names = fillJson.quantities.map(product =>
			product?.size?.name || '');
		const uniqueNames = [...new Set(names)];
		fillJson.genders = getUniqueFields(fillJson.products, 'gender');
		fillJson.ages = uniqueNames.map((el) => {
			let title = el;
			if (title.includes('/')) {
				title = `${title.split('/')[0]} років (${title.split('/')[1]} см)`;
			}
			return {
				title: title,
				value: el
			};
		});

		const prices = fillJson.products.reduce((acc, product) => {
			const roundedPrice = Math.ceil(product.price / 10) * 10;

			if (roundedPrice < acc.min) acc.min = roundedPrice;
			if (roundedPrice > acc.max) acc.max = roundedPrice;

			return acc;
		}, { min: Infinity, max: -Infinity });

		fillJson.minPrice = prices.min;
		fillJson.maxPrice = prices.max;
	};

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
