$(window).on('hashchange', function() {
	var hash = window.location.hash;
	$('section').hide();
	if (hash == '')
		$('#wraper').show();
	else{
		var map = hash.split('/');
		var elem = map[0];
		id = map[1];
		$(map[0]).show();

		$.get('http://dev.naustud.io:3000/wines/' + id, function (data){

			$('#id').val(data._id);
			$('#name').val(data.name);
			$('#grapes').val(data.grapes);
			$('#year').val(data.year);
			$('#region').val(data.region);
			$('#country').val(data.country);
			$('#note').val(data.description);
			$('#picture').val(data.picture);
			$('.imgDetail').html('<img width="100" src="http://dev.naustud.io:3000/pics/' + data.picture+ '" />');
		});
	}
});


//lấy dữ liệu
$(document).ready(function(){
	$.get('http://dev.naustud.io:3000/wines', function (jsData){

		var model = $('.linkWine');
		for (var i = 0; i < jsData.length; i++){
			var item = jsData[i];
			$(model).attr('href', '#DetailWine/' + item._id);
			$(model).children('div').children('.img').html('<img width="100" src="http://dev.naustud.io:3000/pics/' + item.picture + '" />');
			$(model).children('div').children('.name').text(item.name);
			$(model).children('div').children('.year').text(item.year);
			$(model).children('div').children('.grapes').text(item.grapes);
			$(model).children('div').children('.region').text(item.region + ', ');
			$(model).children('div').children('.country').text(item.country);

			$(model).attr('id','newId'+i);

			var newItem = $(model).clone();


			$('#wraper').append(newItem);
		}

		$(model).remove();
	});


});

$('#saveWine').click(function(){
	var itemData = {
				'name': $('#name').val(),
				'year': $('#year').val(),
				'grapes': $('#grapes').val(),
				'country': $('#country').val(),
				'region': $('#region').val(),
				'description': $('#note').val(),
				'picture': $('#picture').val()
			};
	$.ajax({
		type: 'PUT',
		url: 'http://dev.naustud.io:3000/wines/' + id,
		crossDomain: true,
		data: itemData,
		success: function(data){
			alert('updated!');
			document.location='index.html';
		},
		error:function(data){
			console.log(data);
		}
	});

});
$('#deleteWine').click(function(){
	$.ajax({
		type: 'DELETE',
		url: 'http://dev.naustud.io:3000/wines/' + id,
		crossDomain: true,
		success: function(data){
			alert('deleted!');
			document.location='index.html';
		},
		error:function(data){
			console.log(data);
		}
	});

});
