import Crud from '/api/wjst/crud';

class Product extends Crud {
	getName = 'public';
	constructor() {
		super('/api/product');
	}

	async populated() {
		try {
			const product = await this.fetch({ name: "populated" });
			return product;
		} catch (error) {
			throw new Error(`Failed to populate: ${error.message}`);
		}
	}
}

export default new Product();
