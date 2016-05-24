// Sets speed of transition between slides
var speed = 500; 

// Sets auto switch option of the slider
var autoSwitch = true;

// Sets auto switch speed
var autoSwitchSpeed = 4000;

// // Show the slide that is currently Active
$(".slide").first().addClass("active");

// // Hide all the slides
$(".slide").hide();

// // Show the active class
$(".active").show();

// Create function Next Slide
function nextSlide() {

	$(".active").removeClass("active").addClass("oldActive");
	if($(".oldActive").is(":last-child")) {
		$(".slide").first().addClass("active");
	} else {
		$(".oldActive").next().addClass("active");
	}
	$(".oldActive").removeClass("oldActive");
	$(".slide").fadeOut(speed);
	$(".active").fadeIn(speed);

};

function previousSlide() {
	$(".active").removeClass("active").addClass("oldActive");

	if($(".oldActive").is(":first-child")) {
		$(".slide").last().addClass("active");
	} else {
		$(".oldActive").prev().addClass("active");
	}
	$(".oldActive").removeClass("oldActive");
	$(".slide").fadeOut(speed);
	$(".active").fadeIn(speed)
}

// Move the slides by tracking the next and previous button clicks
$("#next").click(nextSlide);

$("#prev").click(previousSlide);

// Begin conditions for auto slider to start
if (autoSwitch === true) {
	setInterval(nextSlide, autoSwitchSpeed);
}