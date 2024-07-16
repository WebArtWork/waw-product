module.exports = async function (waw) {
	const Schema = new waw.mongoose.Schema({
		size: {
			type: waw.mongoose.Schema.Types.ObjectId,
			ref: "Productsize",
			required: true,
		},
		quantity: {
			type: Number,
			required: true
		},
		product: {
			type: waw.mongoose.Schema.Types.ObjectId,
			ref: "Product",
			required: true,
		},
	});
	
	Schema.methods.create = function (obj) {
		this.size = obj.size;
		this.quantity = obj.quantity;
		this.product = obj.product;
	};

	return (waw.Productquantity = waw.mongoose.model("Productquantity", Schema));
};
