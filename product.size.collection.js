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

	Schema.methods.create = function (obj) {
		this.name = obj.name;
		this.quantity = obj.quantity;
	};

	return (waw.ProductSize = waw.mongoose.model("ProductSize", Schema));
};
