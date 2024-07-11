module.exports = async function (waw) {
	const Schema = new waw.mongoose.Schema({
		name: {
			type: String,
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		}
	});

	return (waw.ProductSize = waw.mongoose.model("ProductSize", Schema));
};
