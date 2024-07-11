module.exports = async function (waw) {
	const Schema = new waw.mongoose.Schema({
		size: {
			type: waw.mongoose.Schema.Types.ObjectId,
			ref: "ProductSize",
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		}
	});

	return (waw.ProductQuantity = waw.mongoose.model("ProductQuantity", Schema));
};
