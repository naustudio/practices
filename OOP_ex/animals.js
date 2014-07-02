function Animals() {
	this.name = '';
	this.img = 'default.png';


}

Animals.prototype.run = function() {
	console.log(this.name + ' is running');
};

// point to one object
// real extend
Animals.prototype = {
	getName: function() {
		return this.name;
	},

	setName: function(name) {
		// this.name = name;
		this.name = name;
		console.log(name);
	}
};

// should place the same function in prototype