module.exports = async function (waw) {
	const Schema = waw.mongoose.Schema({
		product: {
			type: waw.mongoose.Schema.Types.ObjectId,
			ref: "Product"
		},
		user: {
			type: waw.mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		sessionID: String
	});

	Schema.methods.create = function (obj, user) {
		this.product = obj.product;

		this.user = user ? user._id : null;

		this.sessionID = obj.sessionID;
	};
	return (waw.Productfavorite = waw.mongoose.model("Productfavorite", Schema));
};
