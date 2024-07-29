module.exports = function (waw) {
	const Schema = waw.mongoose.Schema({
		top: {
			type: Boolean,
			default: false,
		},
		enabled: {
			type: Boolean,
			default: false,
		},
		thumb: String,
		thumbs: [String],
		sale: Number,
		name: String,
		short: String,
		gender: String,
		season: String,
		domain: String,
		description: String,
		isTemplate: Boolean,
		template: {
			type: waw.mongoose.Schema.Types.ObjectId,
			ref: "Product",
		},
		url: { type: String, sparse: true, trim: true, unique: true },
		price: Number,
		data: {},
		tag: {
			type: waw.mongoose.Schema.Types.ObjectId,
			ref: "Tag",
		},
		tags: [
			{
				type: waw.mongoose.Schema.Types.ObjectId,
				ref: "Tag",
			},
		],
		author: {
			type: waw.mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		moderators: [
			{
				type: waw.mongoose.Schema.Types.ObjectId,
				sparse: true,
				ref: "User",
			},
		],
	});

	Schema.methods.create = function (obj, user, waw) {
		this.author = user._id;
		this.moderators = [user._id];
		this.top = obj.top;
		this.enabled = obj.enabled;
		this.tag = obj.tag;
		this.tags = obj.tags;
		this.gender = obj.gender;
		this.season = obj.season;
		this.thumb = obj.thumb;
		this.thumbs = obj.thumbs;
		if (obj.url) {
			this.url = obj.url;
		}
		this.name = obj.name;
		this.domain = obj.domain;
		this.description = obj.description;
		this.price = obj.price;
		this.short = obj.short;
		this.data = obj.data;
		this.isTemplate = obj.isTemplate;
		this.template = obj.template;
	};

	return (waw.Product = waw.mongoose.model("Product", Schema));
};
