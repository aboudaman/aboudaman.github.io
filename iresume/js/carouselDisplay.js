// Create Project Object
var projects = {
	"projectsCompleted": [
		{
			"title": "This is a first title",
			"dates": "May 2015",
			"description": "This is a description for the first project",
			"images": "images/city.jpg"
	
		}, {

			"title": "This is a second title",
			"dates": "April 2015",
			"description": "This is a description for the second project",
			"images": "images/abstract1.jpg"
		}

	]
};
var projectTitle = [];
var projectDates = [];
var projectDescription = [];
var projectImage = [];

projects.display = function() {
	
	for (project in projects.projectsCompleted) {

		// Format the Project Title
		var projectTitleValue = HTMLprojectTitle.replace("%data%", projects.projectsCompleted[project].title);
		projectTitle.push(projectTitleValue);

		// Format project Dates
		var projectDatesValue = HTMLprojectDates.replace("%data%", projects.projectsCompleted[project].dates);
		projectDates.push(projectDatesValue);
		
		// Format Project Description
		var projectDescriptionValue = HTMLprojectDescription.replace("%data%", projects.projectsCompleted[project].description);
		projectDescription.push(projectDescriptionValue);

		// Format the project image
		var projectImageValue = HTMLprojectImage.replace("%data%", projects.projectsCompleted[project].images);
		projectImage.push(projectImageValue);
	}

};

projects.display();	

function showTitle() {

	// Declare variables
	var trackEntry = $("#projectEntry");
	var trackEntry2 = $("#projectEntry2");
	var pEntry = $("#projectEntry");
	var pEntry2 = $("#projectEntry2");

	trackEntry.append(HTMLprojectStart);
	trackEntry2.append(HTMLprojectStart);

	var pTitle = $(".project-entry:first").append(projectTitle[0]);
	$(pTitle).insertAfter(pEntry);

	
	var pTitle2 = $(".project-entry:last").append(projectTitle[1]);
	$(pTitle2).insertAfter(pEntry2);

	var pDate = $(".project-entry:first").append(projectDates[0]);
	$(pDate).insertAfter(pEntry);

	var pDate2 = $(".project-entry:last").append(projectDates[1]);
	$(pDate2).insertAfter(pEntry2);

	var pDesc = $(".project-entry:first").append(projectDescription[0]);
	$(pDesc).insertAfter(pEntry);

	var pDesc2 = $(".project-entry:last").append(projectDescription[1]);
	$(pDesc2).insertAfter(pEntry2);

	var pImage = $(".project-entry:first").append(projectImage[0]);
	$(pImage).insertAfter(pEntry);

	var pImage2 = $(".project-entry:last").append(projectImage[1]);
	$(pImage2).insertAfter(pEntry2);



};

showTitle();




