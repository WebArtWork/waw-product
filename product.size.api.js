module.exports = async (waw) => {
	waw.crud("productsize", {
		create: {
			ensure: waw.role("owner")
		},
		get: {
			ensure: waw.role("owner"),
			query: () => {
				return {};
			}
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
