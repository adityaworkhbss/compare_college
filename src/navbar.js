function toggleDropdown(option) {
    let collegesBtn = document.getElementById("collegesBtn");
    let programsBtn = document.getElementById("programsBtn");
    let dropdown = document.getElementById("collegeDropdown");
    let collegedropdown = document.getElementById("college-list-dropdown");
    let onlineprogramdropdown = document.getElementById("online-program-list-dropdown");
    let toggle_dropdown = document.getElementById("navbarDropdown-toggle");

    let rect = toggle_dropdown.getBoundingClientRect();

    dropdown.style.position = "absolute";
    dropdown.style.left = rect.left + "px";
    dropdown.style.top = (rect.bottom + window.scrollY) + "px";
    dropdown.style.width = "460px";
    dropdown.style.zIndex = "1000";

    let onlineCourseDropdown = document.getElementById("online-course-dropdown");
    onlineCourseDropdown.style.display = "none";

    if (option === 'colleges') {
        collegesBtn.classList.add("active");
        programsBtn.classList.remove("active");

        onlineprogramdropdown.style.display = "none";
        dropdown.style.display = "block";
        collegedropdown.style.display = "block";

    } else {console.log(programsBtn);
        programsBtn.classList.add("active");
        collegesBtn.classList.remove("active");

        collegedropdown.style.display = "block";
        dropdown.style.display = "block";
        onlineprogramdropdown.style.display = "block";


    }
}


function showOnlineCourses(collegeName) {

    if(document.getElementById("programsBtn").classList.contains("active")){
        let dropdown = document.getElementById("collegeDropdown");
        let onlineCourseDropdown = document.getElementById("online-course-dropdown");
        let rect = dropdown.getBoundingClientRect();

        let courseData = {
            "Amity University": ["MBA", "BBA", "MCA", "BCA"],
            "Delhi University": ["Data Science", "Machine Learning", "Cybersecurity"],
            "IIT Bombay": ["AI & ML", "Cloud Computing", "Software Engineering"],
            "Mumbai University": ["Marketing", "Finance", "Project Management"],
            "Bangalore University": ["Business Analytics", "Big Data", "Blockchain"]
        };

        onlineCourseDropdown.style.position = "absolute";
        onlineCourseDropdown.style.left = (rect.right + 10) + "px";
        onlineCourseDropdown.style.top = rect.top + "px";
        onlineCourseDropdown.style.width = "220px";
        onlineCourseDropdown.style.zIndex = "1000";

        let courseList = document.getElementById("course-list");
        courseList.innerHTML = "";

        if (courseData[collegeName]) {
            courseData[collegeName].forEach(course => {
                let listItem = document.createElement("li");
                listItem.className = "course-item";
                listItem.textContent = course;
                courseList.appendChild(listItem);
            });
            onlineCourseDropdown.style.display = "block";
        }
    }


}

document.addEventListener("click", function (event) {
    let collegeDropdown = document.getElementById("collegeDropdown");
    let onlineCourseDropdown = document.getElementById("online-course-dropdown");
    let buttons = document.querySelectorAll(".toggle-btn");

    if (![...buttons].some(btn => btn.contains(event.target)) &&
        !collegeDropdown.contains(event.target) &&
        !onlineCourseDropdown.contains(event.target)) {
        collegeDropdown.style.display = "none";
        onlineCourseDropdown.style.display = "none";
    }
});

function toggleMenu() {
    let mobileMenu = document.querySelector(".mobile-menu");
    mobileMenu.classList.toggle("show");
}
