/**
 * FAQ Item class
 */
define(
	['app/DataJSON'/*,
	'ejs'*/],
	function(data/*, EJS*/) {

		var FAQItem = function(item) {

			this.el = document.createElement('li');
			this.item = item;
			this.isExpand = false;
		};

		/**
		 * render an FAQ Item
		 * 	info:  questioner: name, question, date, isClose
		 * 			answers: [name, answer, date]
		 */
		FAQItem.prototype.render = function() {
			var el = this.el;
			var id = el.getAttribute('data-id');
			var template = '';
			// convert to number
			id = parseInt(id);

			// active this item
			this.active();

			// get data
			var item = getItem(data, id);

			// title
			template = '<h4 class="title">' + item.title + '</h4>';

			// question
			var questionBox = document.createElement('div');
			var questionHTML = '';
			questionBox.className = 'questions-box';
			questionHTML = '<div class="faq-question faq-box char-icon" data-icon="Q">\
				<h4 class="author">' + item.author + '</h4>\
				<p class="date">' + item.date + '</p>\
				<p class="content">' + item.content + '</p>\
				<i class="expand-icon"></>\
			</div>';

			questionBox.innerHTML = questionHTML;
			questionBox.addEventListener('click', this.toggleAnswers.bind(this));

			// answer
			var transformBox = document.createElement('div');
			transformBox.className = 'transform';

			var answersBox = document.createElement('div');
			var answersHTML = '';
			answersBox.className = 'answers-box';

			item.answers.forEach(function(ansItem) {
				answersHTML += '<div class="faq-answer faq-box char-icon" data-icon="A">\
					<h4 class="author">' + ansItem.author + '</h4>\
					<p class="date">' + ansItem.date + '</p>\
					<p class="content">' + ansItem.content + '</p>\
				</div>';
			});

			answersBox.innerHTML = answersHTML;
			transformBox.appendChild(answersBox);

			var faqDetail = document.getElementsByClassName('faq-detail')[0];

			faqDetail.innerHTML = template;
			faqDetail.appendChild(questionBox);
			faqDetail.appendChild(transformBox);

			this.hideAnswers();
		};

		/**
		 * Render item in navigation
		 * @param  {[type]} item [description]
		 * @return {[type]}      [description]
		 */
		FAQItem.prototype.navRender = function() {

			var item = this.item;

			var html = '<p>' + item.title + '</p>\
				<strong>by </strong><span>' + item.author + '</span>';

			this.el.setAttribute('data-id', item.id);
			this.el.innerHTML = html;

			this.el.addEventListener('click', this.render.bind(this));

			return this.el;
		};

		/**
		 * Active
		 */
		FAQItem.prototype.active = function() {
			// remove others active class
			var li = this.el.parentElement.querySelectorAll('li');

			for (var i = 0; i < li.length; i++) {
				li.item(i).classList.remove('active');
			}

			this.el.classList.add('active');

			document.getElementsByClassName('faq-detail')[0].classList.add('show');
		};

		/**
		 * hide answers box
		 * @return {[type]} [description]
		 */
		FAQItem.prototype.hideAnswers = function() {
			var el = document.querySelector('.answers-box');
			var height = el.offsetHeight + 40;

			el.style.transform = 'translate(0, ' + -height + 'px)';
		};

		/**
		 * hide answers box
		 * @return {[type]} [description]
		 */
		FAQItem.prototype.showAnswers = function() {
			var el = document.querySelector('.answers-box');

			el.classList.add('show');
			el.style.transform = 'translate(0, 0)';
		};

		/**
		 * show/hide answers block
		 * @return {[type]} [description]
		 */
		FAQItem.prototype.toggleAnswers = function() {
			var expandIcon = document.querySelector('.faq-question .expand-icon');

			if (this.isExpand) {
				this.isExpand = false;
				this.hideAnswers();
				expandIcon.classList.remove('collapse');
			} else {
				this.isExpand = true;
				this.showAnswers();
				expandIcon.classList.add('collapse');
			}
		};

		/**
		 *
		 */
		function getItem(arr, id) {
			for (var i = 0; i < arr.length; i++) {
				if (arr[i].id === id) {
					return arr[i];
				}
			}

			return null;
		}

	return FAQItem;

});