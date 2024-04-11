module.exports = async (waw) => {
	const ensure = (req, res, next) => {
		if (!req.user) {
			req.body.sessionID = req.sessionID;
		}
		next();
	};
	waw.crud("productfavorite", {
		create: {
			ensure: async (req, res, next) => {
				if (!req.user) {
					req.body.sessionID = req.sessionID;
				}
				if (await waw.Product.countDocuments(req.user ? {
					product: req.body.product,
					user: req.user._id
				} : {
					product: req.body.product,
					sessionID: req.body.sessionID
				})) {
					res.send(true);
				} else {
					next();
				}
			},
		},
		get: {
			ensure: waw.block,
		},
		update: {
			ensure: waw.block,
		},
		fetch: {
			ensure: waw.block,
		},
		delete: {
			ensure,
			query: (req) => {
				return {
					product: req.body.product,
					$or: [
						{
							sessionID: req.sessionID,
						},
						{
							user: req.user ? req.user._id : null,
						},
					],
				};
			},
		},
	});
	waw.addJson(
		"storeProductFavorited",
		async (store, fillJson, req) => {
			const productfavorites = (
				await waw.Productfavorite.find(
					req.user
						? {
								user: req.user._id,
						  }
						: {
								sessionID: req.sessionID,
						  }
				).select("product")
			).map((ef) => ef.product.toString());
			fillJson.productFavorited = (id) => {
				return productfavorites.includes(id);
			};
		},
		"Verify if product is favorited"
	);
	const update_counter = async (productfavorite) => {
		const product = await waw.Product.findById(productfavorite.product);
		if (product) {
			product.favorited = await waw.productfavorite.count({
				product: productfavorite.product,
			});
			await product.save();
		}
	};
	waw.on("productfavorite_create", update_counter);
	waw.on("productfavorite_delete", update_counter);
};
