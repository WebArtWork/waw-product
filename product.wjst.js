import Crud from '/api/wjst/crud';

class Product extends Crud {
	getName = 'public';
	constructor() {
		super('/api/product');
	}
}

export default new Product();
