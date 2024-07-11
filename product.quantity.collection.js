module.exports = async function (waw) {
	const Schema = new waw.mongoose.Schema({
		sizes: {
			type: waw.mongoose.Schema.Types.ObjectId,
			ref: "ProductSize",
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		}
	});
	
	Schema.methods.create = function (obj, user) {
		this.sizes = obj.sizes;
		this.quantity = obj.quantity;

	};

	return (waw.ProductQuantity = waw.mongoose.model("ProductQuantity", Schema));
};
