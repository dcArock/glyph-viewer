var EditFontDetect = function() {
  this._fonts = null;  
}

EditFontDetect.prototype = {  
  
  setFonts: function(fonts) {
    this._fonts = fonts;
  },
  

  updateSelect: function(fonts) {
    var options = []; 
    for (var i = 0; i < this._fonts.length; i++) {
      var fontDesc = this._fonts[i].fontName;
      options.push('<option value="' + fontDesc + '">' + fontDesc + '</option>');
    }
    $("select#font-family").html(options.join());
  }
  
};

      
var editFontDetect = new EditFontDetect();

var fontDetect = new FontDetect("font-detect-swf", "js/font/FontList.swf", function(fd) {
	
	var fonts = fd.fonts();
	editFontDetect.setFonts(fonts);
	editFontDetect.updateSelect(fonts);
	
});





$(document).ready(function () {

	// Loading events

	$('#menu').animate({
		height: 'toggle'
	}, 0, function () {

		// remove loader
		$('#loader').animate({

			height: 0

		}, 750, function () {

			$(this).remove();


			centerSpan('left');
			centerSpan('right');

		})

	})



	var showcaseLeft, showcaseRight, fontForLeft, fontForRight, fontSize, fontLeftStyle, fontRightStyle, selectInput, menuIsOpen = false, weightTmp = '400';

	showcaseLeft = $('.showcase-left');
	showcaseRight = $('.showcase-right');

	selectInput = $("#font-family");

	fontForLeft = $('.font-for-left');
	fontForRight = $('.font-for-right');







	function switchFont(to, from) {
		
		updateWeight();
		
		to.css({
			'font-family': "'" + from.val() + "', Wingdings"
		});
		
		

	}
	
	function updateWeight() {
		
		if ($('.checkbox-bold').hasClass('active')) {

			$('.showcase-left, .showcase-right').css({
				'font-weight': 'bold'
			})

		} else {

			$('.showcase-left, .showcase-right').css({
				'font-weight': 'normal'
			})

		}
		
	}

	function updateStyle(xx) {

		var italicID = $('.italic-' + xx),
			showcase = $('.showcase-' + xx);

		if (italicID.hasClass('active')) {

			showcase.css({
				'font-style': 'italic'
			})

		} else {

			showcase.css({
				'font-style': 'normal'
			})

		}

	}
	
	function updateSize() {
		
		$('.showcase-left, .showcase-right').css({
				'font-size': ($('#input-size').val() + 'px')
		})
		
	}


	function centerSpan(xx) {

		var showcase = $('.showcase-' + xx),
			middle = $('.middle-' + xx),
			container = $('.middle-' + xx + '-container');

		if (showcase.innerHeight() > middle.innerHeight()) {

			showcase.css("font-size", parseInt(middle.innerHeight() * 0.8, 10) + 'px');

			if (showcase.innerHeight() > middle.innerHeight()) {

				showcase.css("font-size", parseInt(middle.innerHeight() * 0.6, 10) + 'px');

			}

		}

		if (showcase.innerWidth() > middle.innerWidth()) {

			showcase.css("font-size", parseInt(middle.innerWidth() * 0.8, 10) + 'px');

		}

		showcase.animate({

			'top': (((showcase.height() - showcase.css('font-size')) / 2) + 'px')

		})

		container.css({

			'margin-top': ((-(showcase.height() / 2)) + 'px'),
			'margin-left': ((-(showcase.width() / 2)) + 'px')

		})

	}
	
	

	centerSpan('left');
	centerSpan('right');
	
	function updateLeft() {
		
		updateStyle('left');

		switchFont(showcaseLeft, fontForLeft);

		centerSpan('left');
		
	}
	
	function updateRight() {
	
		updateStyle('right');

		switchFont(showcaseRight, fontForRight);

		centerSpan('right');
		
	}
	

	$('.font-for-left').on('mouseup', function () {

		updateLeft()

	});

	$('.font-for-left').on('keyup', function () {

		updateLeft()

	});

	$('.font-for-right').on('mouseup', function () {

		updateRight()

	});

	$('.font-for-right').on('keyup', function () {

		updateRight()

	});
	
	$('#input-text').on('click', function () {
	
		$(this).attr('value', '')
		
	})

	$('#input-text').on('keyup', function () {

		$('.showcase').html(

			$(this).val()

		)
		
		updateLeft();
		updateRight();

	})

	
	$('#input-size').on('click', function () {
		
		updateSize();
		centerSpan('left');
		centerSpan('right');

	});

	$('#input-size').on('keyup', function () {

		updateSize();
		centerSpan('left');
		centerSpan('right');

	});



	// Page events

	$('.menu-icon').on('click', function () {

		if (menuIsOpen) {

			$('.bar2').css({
				'transform': 'rotate(0)',
				'top': '0',
				'width': '50px'
			});

			$('.bar3').css({
				'transform': 'rotate(0)',
				'top': '0',
				'width': '50px'
			});

			$('.bar1').css({
				'width': '50px'
			});

			$('#menu').animate({
				height: 'toggle'
			})

			menuIsOpen = false;

		} else {

			$('.bar2').css({
				'transform': 'rotate(-135deg)',
				'top': '8px',
				'width': '55px'
			});

			$('.bar3').css({
				'transform': 'rotate(-45deg)',
				'top': '-9px',
				'width': '55px'
			});

			$('.bar1').css({
				'width': 0
			});

			$('#menu').animate({
				height: 'toggle'
			})

			menuIsOpen = true;

		}

	});

	$('div.checkbox').on('click', function () {

		$(this).toggleClass('active');

		if ($(this).parent().parent().hasClass('select-left')) {

			updateStyle('left');

			centerSpan('left');

		}

		if ($(this).parent().parent().hasClass('select-right')) {

			updateStyle('right');

			centerSpan('right');

		}

	})

	$('.revert-left').on('click', function () {

		if ($(this).hasClass('active')) {

			$('.middle-left').css({

				'background': 'black',
				'color': 'white'

			})

		} else {

			$('.middle-left').css({

				'background': 'white',
				'color': 'black'

			})

		}

	})

	$('.revert-right').on('click', function () {

		if ($(this).hasClass('active')) {

			$('.middle-right').css({

				'background': 'black',
				'color': 'white'

			})

		} else {

			$('.middle-right').css({

				'background': 'white',
				'color': 'black'

			})

		}

	})
	
	$('.checkbox-bold').on('click', function() {
	
		updateWeight() 
		
	})
	
	setTimeout(function() {
		$('#input-size').attr('value', ($('.showcase-left').css('font-size').replace('px', '')));
	}, 500)

})