
function Animal(name,sex){
	this.name=name;
	this.sex=sex;

}

Animal.prototype.eat= function(){
	var eatSomething="something";
	console.log();
	return eatSomething;
}

function Dog(name){
	this.name=name;
}

Dog.prototype = new Animal();
var myPet= new Dog();




