
var bio = {
	"name": "Aboubacar Daman",
	"role": "Web Developer",
	"contactInfo": {
	"email": "adaman2000@gmail.com",
	"address": "Orlando, Florida",
	"cellphone": 5558098877,
	"github": "adaman",
	"twitter": "No Twitter",
	"location": "Port Au Prince, Haiti"
	},
	"pictureURL": "images/ninja.jpg",
	"welcomeMessage": "Welcome to my Interactive Resume",
	"skills": ["Javascript", "HTML/CSS", "PHP", "Network Design"]
};

// Create a work Object
var work = {
	"jobs": [
	{
	"employer": "ABC1 Employer",
	"title": "IT Specialist",
	"location": "Port Au Prince, Haiti",
	"dates": "2010 to Present",
	"description": "Network, project manager"
	}, {
	"employer": "ABC2 Company",
	"title": "Telecom tech",
	"location": "NYC, USA",
	"dates": "2002 to 2010",
	"description": "Telecommunications"
	}
	]
};

// Create Education Object
var education = {
	"schools": [
	{
	"name": "University of Salford",
	"years": "2013 - 2014",
	"city": "Salford, Manchester",
	"degree": ["MS"],
	"website": "http://www.abc.com",
	"major": "Project Management"
	},{
	"name": "University of Manchester",
	"years": "1997-2000",
	"city": "Manchester, United Kingdom",
	"degree": ["BEng"],
	"website": "http://www.abc.com",
	"major": "Electrical and Electronic Engineering"
	}
	],
	"onlineCourses":[
	{
	"title": "Front-End Web Development Nanodegree",
	"onlineDates": 2015,
	"onlineSchool": "udacity.com",
	"onlineURL": "http://www.udacity.com"
	},{
	"title": "Web Development PHP/MYSQL",
	"onlineDates": "2014 to 2015",
	"onlineSchool": "Lynda.com",
	"onlineURL": "http://www.lynda.com"
	}
	]
};

bio.display = function() {

// Insert Name and Position
var myname = HTMLheaderName.replace("%data%", bio.name);
var role = HTMLheaderRole.replace("%data%", bio.role);
var pictureURL = HTMLbioPic.replace("%data%", bio.pictureURL);

$("#header").prepend(pictureURL);
$("#header").prepend(role);
$("#header").prepend(myname);

// checks if there are any skills in the bio before adding to the page
if (bio.skills.length > 0) {
	
	// Declare an array to store the skills
	var skills = [];
	$("#header").append(HTMLskillsStart);

	// Create for loop to loop through the bio object and extract the skills
	for (skills in bio.skills) {

		skills = HTMLskills.replace("%data%", bio.skills[skills]);
		$("#skills").append(skills);
		
	}
}

}

topContacts.display = function() {
// Checks if there are entries for contact information in bio object
var checkContacts = $.isEmptyObject(bio.contactInfo);

if (checkContacts !== true) {
	
	var myMobile = HTMLmobile.replace("%data%", bio.contactInfo.cellphone);
	var myEmail = HTMLemail.replace("%data%", bio.contactInfo.email);
	var myTwitter = HTMLtwitter.replace("%data%",bio.contactInfo.twitter);
	var myGithub = HTMLgithub.replace("%data%", bio.contactInfo.github);
	var myLocation = HTMLlocation.replace("%data%", bio.contactInfo.location);
	var myAddress = HTMLcontactGeneric.replace("%data%", bio.contactInfo.address);

// Add the contacts info to the page
		$("#topContacts").append(myMobile);
		$("#topContacts").append(myEmail);
		$("#topContacts").append(myTwitter);
		$("#topContacts").append(myGithub);
		$("#topContacts").append(myLocation);
		$("#topContacts").prepend(myAddress);

// Add contacts to the footer
		$("#footerContactInformation").append(myMobile);
		$("#footerContactInformation").append(myEmail);
		$("#footerContactInformation").append(myTwitter);
		$("#footerContactInformation").append(myGithub);
		$("#footerContactInformation").append(myLocation);
		$("#footerContactInformation").prepend(myAddress);

}

};

education.display = function() {

	$("#education").append(HTMLschoolStart);
	$("#onlineClasses").append(HTMLonlineClasses);

	for (school in education.schools) {
		
		var schoolName = HTMLschoolName.replace("%data%", education.schools[school].name);
		var schoolDegree = HTMLschoolDegree.replace("%data%", education.schools[school].degree);
		var schoolDates = HTMLschoolDates.replace("%data%", education.schools[school].years);
		var schoolLocation = HTMLschoolLocation.replace("%data%", education.schools[school].city);
		var major = HTMLschoolMajor.replace("%data%", education.schools[school].major);

		$(".education-entry:last").append(schoolName);
		$(".education-entry:last").append(schoolDegree);
		$(".education-entry:last").append(schoolDates);
		$(".education-entry:last").append(schoolLocation);
		$(".education-entry:last").append(major);
	}
	
	for (onlineCourse in education.onlineCourses) {

		var onlineTitle = HTMLonlineTitle.
							replace("%data%", education.onlineCourses[onlineCourse].title);
		var onlineSchool = HTMLonlineSchool.
							replace("%data%", education.onlineCourses[onlineCourse].onlineSchool);
		var onlineURL = HTMLonlineURL.
							replace("%data%", education.onlineCourses[onlineCourse].onlineURL);
		var onlineDates = HTMLonlineDates.
							replace("%data%", education.onlineCourses[onlineCourse].onlineDates);
		$(".onClass:last").append(onlineTitle);
		$(".onClass:last").append(onlineSchool);
		$(".onClass:last").append(onlineURL);
		$(".onClass:last").append(onlineDates);

	}

}

work.display = function() {

	$("#workExperience").append(HTMLworkStart);

	for (job in work.jobs) {

		var employer = HTMLworkEmployer.replace("%data%", work.jobs[job].employer);
		var title = HTMLworkTitle.replace("%data%", work.jobs[job].title);
		var employerTitle = employer + title
		$(".work-entry:last").append(employerTitle);

		var datesWorked = HTMLworkDates.replace("%data%", work.jobs[job].dates);
		$(".work-entry:last").append(datesWorked);

		var description = HTMLworkDescription.replace("%data%", work.jobs[job].description);
		$(".work-entry:last").append(description);

		var workLocation = HTMLworkDescription.replace("%data%", work.jobs[job].location);
		$(".work-entry:last").append(workLocation);
	}

};

bio.display();
topContacts.display();
work.display();
education.display();
// Add a map
$("#mapDiv").append(googleMap);



