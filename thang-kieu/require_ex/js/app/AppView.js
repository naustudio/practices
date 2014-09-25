// using define() to define a module
/**
 * define AppView class
 * 	function: show FAQ List
 * @return {[type]} [description]
 */
define(
	['app/FAQItem',
	'app/DataJSON'],
	function (FAQItem, data) {

		/**
		 * [description]
		 *
		 * @class AppView
		 * @namespace app
		 */
		var AppView = function() {
			// this.init();
		};

		AppView.prototype.init = function() {
			// body...
			this.renderNav();
		};

		AppView.prototype.renderNav = function() {
			var list = [];

			data.forEach(function(item) {
				var faqItem = new FAQItem(item);
				list.push(faqItem.navRender());
			});

			// insert
			var nav = document.createElement('nav');
			list.forEach(function(item) {
				nav.appendChild(item);
			});

			var navEl = document.getElementsByClassName('left-navigation')[0];
			navEl.appendChild(nav);
		};

		//exports
		return AppView;
});