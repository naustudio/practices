function Cat() {

	this.canClimp = function() {
		console.log('I can climp');
	};
}
// không gọi constructor của parent obj
// Cat.prototype = Object.create(Animals.prototype);
// Gọi supper (gọi constructor của parent obj)
// Parent.call(this); scope this of current object
// gọi hàm Parent() với scope của class hiện tại
// check instance: instanceof
Cat.prototype = new Animals();
// no need to use Cat.prototype.constructor = Cat();
//