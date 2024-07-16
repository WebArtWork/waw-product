module.exports = async function (waw) {
	const Schema = new waw.mongoose.Schema({
		name: {
			type: String,
			required: true
		}
	});

	Schema.methods.create = function (obj) {
		this.name = obj.name;
	};

	return (waw.Productsize = waw.mongoose.model("Productsize", Schema));
};
