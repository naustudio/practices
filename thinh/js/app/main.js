define([
	'router',
	'collections/WineCollection',
],	function(Router,WineCollection)	{
	return	{
		initialize: function() {
			new WineCollection().fetch({
				success: function(data) {
					window.Winestore.wineCollection = data;
					Router.initialize();
				}
			});
		}
	};
});