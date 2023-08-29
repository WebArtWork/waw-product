module.exports = function(waw) {
	const Schema = waw.mongoose.Schema({
		thumb: String,
		thumbs: [String],
		sale: Number,
		name: String,
		short: String,
		description: String,
		price: Number,
		data: {},
		tag: {
			type: waw.mongoose.Schema.Types.ObjectId,
			ref: 'Tag'
		},
		author: {
			type: waw.mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		moderators: [
			{
				type: waw.mongoose.Schema.Types.ObjectId,
				sparse: true,
				ref: 'User'
			}
		]
	});

	Schema.methods.create = function (obj, user, waw) {
		this.author = user._id;

		this.moderators = [user._id];

		this.tag = obj.tag;

		this.thumb = obj.thumb;

		this.thumbs = obj.thumbs;

		this.name = obj.name;

		this.description = obj.description;

		this.price = obj.price;

		this.short = obj.short;

		this.data = obj.data;
	}

	return waw.Product = waw.mongoose.model('Product', Schema);
}
