module.exports = async (waw) => {
	const ensure = (req, res, next) => {
		if (!req.user) {
			req.body.sessionID = req.sessionID;
		}
		next();
	};

	const updateCounter = async (product) => {
		const updatedProduct = await waw.Product.findById(product._id);
		if (updatedProduct) {
			const totalQuantity = updatedProduct.sizes.reduce((sum, size) => sum + size.quantity, 0);
			updatedProduct.totalQuantity = totalQuantity;
			await updatedProduct.save();
		}
	};

	waw.crud("productsize", {
		create: {
			ensure: async (req, res, next) => {
				if (!req.user) {
					req.body.sessionID = req.sessionID;
				}
				const product = await waw.Product.findById(req.body.product);
				if (product) {
					product.sizes.push({
						name: req.body.name,
						quantity: req.body.quantity,
					});
					await product.save();
					await updateCounter(product);
					res.send(true);
				} else {
					res.status(404).send("Product not found");
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
			query: async (req) => {
				const product = await waw.Product.findById(req.body.product);
				if (product) {
					product.sizes = product.sizes.filter(size => size._id.toString() !== req.body.sizeId);
					await product.save();
					await updateCounter(product);
					return true;
				} else {
					res.status(404).send("Product not found");
				}
			},
		},
	});

	waw.addJson(
		"storeProductSize",
		async (store, fillJson, req) => {
			const products = await waw.Product.find(
				req.user
					? {
							user: req.user._id,
					  }
					: {
							sessionID: req.sessionID,
					  }
			).select("sizes");
			fillJson.productSizes = products.map((product) => product.sizes);
		},
		"Get product sizes and quantities"
	);
};
