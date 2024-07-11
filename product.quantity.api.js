module.exports = async (waw) => {
	const ensure = (req, res, next) => {
		if (!req.user) {
			req.body.sessionID = req.sessionID;
		}
		next();
	};

	waw.crud("productquantity", {
		create: {
			ensure: async (req, res, next) => {
				if (!req.user) {
					req.body.sessionID = req.sessionID;
				}
				const productSize = await waw.ProductSize.findById(req.body.size);
				if (productSize) {
					productSize.quantity = req.body.quantity;
					await productSize.save();
					res.send(true);
				} else {
					res.status(404).send("Product size not found");
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
				const productSize = await waw.ProductSize.findById(req.body.size);
				if (productSize) {
					productSize.quantity = 0;
					await productSize.save();
					return true;
				} else {
					res.status(404).send("Product size not found");
				}
			},
		},
	});
};
