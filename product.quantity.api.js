module.exports = async (waw) => {
	waw.crud("productquantity", {
		create: {
			ensure: waw.role("owner") 
		},
		get: {
			ensure: waw.role("owner"),
			query: () => {
				return {};
			},
			populate: () => 'product size'
		},
		update: {
			ensure: waw.role("owner"),
			query: req => {
				return {
					_id: req.body._id
				}
			}
		},
		fetch: {
			ensure: waw.role("owner"),
		},
		delete: {
			ensure: waw.role("owner"),
			query: (req) => {
				return { _id: req.body._id };
			},
		},
	});
};
