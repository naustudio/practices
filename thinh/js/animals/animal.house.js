function Animal() {
	this.eye = 2;
	this.legs = 0;
	this.color = 'transparent';
	this.run = function() {
		//Run
		console.log("I'm running on " + this.legs + " leg(s)");
	};
	this.look = function() {
		//Look
		console.log("I'm looking at you");
	};
}
function Snake() {
	this.legs = 0;
	this.color = 'green';
}
Snake.prototype = new Animal();

Snake.prototype.constructor = Snake;

function Horse() {
	this.legs = 4;
	this.color = 'weird';
}
Horse.prototype = new Animal();

Horse.prototype.constructor = Horse;
