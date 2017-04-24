var page = new WebPage();
var address;
var output;
var fs = require('fs');

if (phantom.args.length < 2) {
	console.log('Usage: pdfize.js URL filename');
	phantom.exit();
}

address = phantom.args[0];
output = phantom.args[1];

// page.viewportSize = {width: 1280, height: 600};
page.paperSize = {
	format: 'A4',
	orientation: 'landscape',
	border: { 'top': '1cm', 'left': '1cm', 'right': '1cm', 'bottom': '0.5cm' },
	footer: {
		height: '0.5cm',
		contents: phantom.callback(function(pageNum, numPages) {
			return '<p style="color: #999; font-size: 10px; text-align: center; font-family: Lato, sans-serif;"><span style=" color: #999; font-size: 10px;">' + pageNum + ' / ' + numPages + '</span></p>';
		})
	}
};

page.onConsoleMessage = function(msg) {
	console.log(msg);
};

page.onResourceError = function(resourceError) {
	console.error(resourceError.url + ': ' + resourceError.errorString);
};

page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.3; WOW64; rv:26.0) Gecko/20100101 Firefox/26.0';

page.open(address, 'GET', function(status) {
	if (status !== 'success') {
		console.log('Unable to load the address!', status);
		phantom.exit(1);
	} else {
		// wait in case some animations need to roll out
		window.setTimeout(function() {
			var clip = page.evaluate(function() {
				// document.body.style.backgroundColor = '#FFFFFF';
				var region = document.querySelector('body');
				if(region) {
					return region.getBoundingClientRect();
				} else {
					return false;
				}
			});
			if(!clip) {
				console.log('Bad selector.');
				phantom.exit();
			}
			page.clipRect = {
				top: clip.top,
				left: clip.left,
				width: clip.width,
				height: clip.height
			};
			page.render(output);
			phantom.exit();
		}, 500);
	}
});
