define(function (require) {
    var qs = require('text!app/view/questions.html');
    return {
    	showInfo: function(){
    		return qs;
    	},
    	showAnswer: function(){
    		$('.qs1').on('click', function(){
    			$('.answer-one').toggleClass('hidden');
    		})
    		$('.qs2').on('click', function(){
    			$('.answer-two').toggleClass('hidden');
    		})
    		$('.qs3').on('click', function(){
    			$('.answer-three').toggleClass('hidden');
    		})
    	}
    };
});


