$(function() {
	var body = $('body');

	var current = 1;
	var next = 2;
	var total = 36;

	function createURL(){
		current = next;
		next = Math.floor(Math.random() * total);

		if (next === current){
			next = (current+1)%total;
		}
		var imgNext = new Image();
		imgNext.src = 'img/backgrounds/img'+next+'.jpg';

		return 'url(/img/backgrounds/img'+current+'.jpg)';
	};

	function nextBackground() {
		body.css(
			'background-image',
			createURL()
		);

		setTimeout(nextBackground, 10000);
	};

	setTimeout(nextBackground, 10000);
});
