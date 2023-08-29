const path = require("path");
const template = path.join(process.cwd(), "template");

module.exports = async (waw) => {
	waw.crud("product", {
		get: {
			ensure: waw.next,
		},
		fetch: {
			ensure: waw.next,
			query: (req) => {
				return {
					_id: req.body._id,
				};
			},
		},
	});

	waw.products = async (query = {}, limit, count = false) => {
		let exe = count ? waw.Product.countDocuments(query) : waw.Product.find(query);

		if (limit) {
			exe = exe.limit(limit);
		}

		return await exe;
	};

	waw.product = async (query) => {
		return await Product.findOne(query);
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
						title: "Products | Wawify",
						description: waw.config.productDescription
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
			const product = await waw.product({
				_id: req.params._id,
			});

			const products = await waw.products({}, 6);

			res.send(
				waw.render(path.join(template, "dist", "product.html"), {
					...waw.config,
					product,
					products,
					title: product.title + " | Wawify",
					categories: await waw.tag_groups('product')
				})
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
};
