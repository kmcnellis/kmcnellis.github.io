$(function() {
	var body = $('body');

	var current = 1;
	var num = current;
	var total = 36;

	function createURL(){
		num = Math.floor(Math.random() * total);

		if (num === current){
			num = (current+1)%total;
		}

		current = num;
		return 'url(/img/backgrounds/img'+num+'.jpg)';
	};

	function nextBackground() {
		body.css(
			'background-image',
			createURL()
		);
		setTimeout(nextBackground, 15000);
	};

	setTimeout(nextBackground, 2000);
});
