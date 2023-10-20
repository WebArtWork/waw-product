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
				query: ()=>{
					return {};
				}
			}
		],
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
				while (await waw.Product.count({ url: req.body.url })) {
					const url = req.body.url.split("_");
					req.body.url =
						url[0] +
						"_" +
						(url.length > 1 ? Number(url[1]) + 1 : 1);
				}
				next();
			}
		}
	});

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

	waw.build(template, "products");
	waw.build(template, "product");
	waw.serve_products = {};
	waw.serve_product = {};
	const products = async (req, res) => {
		if (typeof waw.serve_products[req.get("host")] === "function") {
			waw.serve_products[req.get("host")](req, res);
		} else {
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
						title: waw.config.productTitle|| waw.config.title,
                                                description: waw.config.productDescription || waw.config.description,
                                                image: waw.config.productImage|| waw.config.image,
						products,
						categories: await waw.tag_groups('product')
					},
					waw.translate(req)
				)
			);
		}
	};
	waw.app.get("/products", products);
	waw.app.get("/sales", products);
	waw.app.get("/products/:tag_id", products);
	waw.app.get("/product/:_id", async (req, res) => {
		if (typeof waw.serve_product[req.get("host")] === "function") {
			waw.serve_product[req.get("host")](req, res);
		} else {
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
	});

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
    waw.store_landing.products = async (query)=>{
         return await waw.products(query, 4);
    }
}
};
