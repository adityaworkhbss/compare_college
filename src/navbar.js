function toggleDropdown(option) {
    let collegesBtn = document.getElementById("collegesBtn");
    let programsBtn = document.getElementById("programsBtn");
    let dropdown = document.getElementById("collegeDropdown");
    let collegedropdown = document.getElementById("college-list-dropdown");
    let onlineprogramdropdown = document.getElementById("online-program-list-dropdown");
    let toggle_dropdown = document.getElementById("navbarDropdown-toggle");
    let onlineCourseDropdown = document.getElementById("online-course-dropdown");

    function updateDropdownPosition() {
        let rect = toggle_dropdown.getBoundingClientRect();
        let isMobile = window.innerWidth <= 768;

        if (isMobile) {
            // Mobile: Full width below the toggle button
            dropdown.style.position = "relative";
            dropdown.style.left = "25%";
            dropdown.style.top = "0";
            dropdown.style.width = "50%";
        } else {
            // Desktop: Positioned near the toggle button
            dropdown.style.position = "absolute";
            dropdown.style.left = rect.left + "px";
            dropdown.style.top = (rect.bottom + window.scrollY) + "px";
            dropdown.style.width = "380px";
        }

        dropdown.style.zIndex = "1000";
    }

    function showDropdown(option) {
        updateDropdownPosition();

        if (option === 'colleges') {
            collegesBtn.classList.add("active");
            programsBtn.classList.remove("active");

            onlineprogramdropdown.style.display = "none";
            dropdown.style.display = "block";
            collegedropdown.style.display = "block";
        } else {
            programsBtn.classList.add("active");
            collegesBtn.classList.remove("active");

            collegedropdown.style.display = "block";
            dropdown.style.display = "block";
            onlineprogramdropdown.style.display = "block";
        }
    }

    window.addEventListener("resize", updateDropdownPosition);

    // Example: Call showDropdown when a button is clicked
    collegesBtn.addEventListener("click", function () {
        showDropdown('colleges');
    });

    programsBtn.addEventListener("click", function () {
        showDropdown('programs');
    });
}


function showOnlineCourses(collegeName) {

    if(document.getElementById("programsBtn").classList.contains("active")){
        const programsBtn = document.getElementById("programsBtn");
        const dropdown = document.getElementById("collegeDropdown");
        const onlineCourseDropdown = document.getElementById("online-course-dropdown");
        const courseList = document.getElementById("course-list");

        const courseData = {
            "Dr. D.Y Patil Vidyapeeth, Pune": ["Online MBA", "Online BBA", "Online Certificate Program for Digital Marketing", "Online Certificate Programme in Hospital & Health Care Management"],
            "NMIMS University": ["Online MBA", "Online Executive MBA", "Online BBA", "Online B.Com"],
            "Vivekananda Global University": ["Online MBA", "Online BBA", "Online MCA", "Online BCA", "Online BA", "Online MA", "Online M.Sc"],
            "Amity University": ["Online MBA", "Online MBA(Dual)", "Online BBA", "Online MCA", "Online BCA", "Online MA", "Online BA", "Online M.Com", "Online B.Com"],
            "Manipal University": ["Online MBA", "Online MBA(Dual)", "Online BBA", "Online MCA", "Online BCA", "Online MA", "Online M.Com", "Online B.Com"],
            "Jain University": ["Online MBA", "Online MBA(Dual)", "Online BBA", "Online MCA", "Online BCA", "Online B.Com Honours", "Online M.Com", "Online B.Com"],
            "Lovely Professional University": ["Online MBA", "Online MBA(Dual)", "Online MCA", "Online BCA", "Online MA", "Online BA", "Online M.Com", "Online M.Sc"],
            "Shoolini University": ["Online MBA", "Online MBA(Dual)", "Online BBA", "Online BCA", "Online B.Com Honours", "Online M.A", "Online B.A",  "Online B.A Honours", "Pay After PlaceMent Program"],
            "Uttranchal University": ["Online MBA", "Online MCA", "Online MBA(Hybrid Mode)", "Online BBA", "Online MCA", "Online BCA", "Online BA"]
        };


        function showCourses(collegeName) {
            if (!courseData[collegeName]) return;

            courseList.innerHTML = ""; // Clear previous courses
            courseData[collegeName].forEach(course => {
                let listItem = document.createElement("li");
                listItem.className = "course-item";
                listItem.textContent = course;
                courseList.appendChild(listItem);
            });

            let rect = dropdown.getBoundingClientRect();
            let isMobile = window.innerWidth <= 768;

            if (isMobile) {
                onlineCourseDropdown.style.position = "absolute";
                onlineCourseDropdown.style.left = "100px";
                onlineCourseDropdown.style.top = "100px";
                onlineCourseDropdown.style.width = "50%";  // Full width on mobile
                onlineCourseDropdown.style.paddingTop = "10px";
            } else {
                onlineCourseDropdown.style.position = "absolute";
                onlineCourseDropdown.style.left = (rect.right) + "px";
                onlineCourseDropdown.style.top = rect.top + 50 + "px";
                onlineCourseDropdown.style.width = "220px";
                onlineCourseDropdown.style.paddingTop = "30px";
            }

            onlineCourseDropdown.style.zIndex = "1000";
            onlineCourseDropdown.style.display = "block";
        }

        // Listen for clicks on college list
        dropdown.addEventListener("click", function (event) {
            let selectedCollege = event.target.textContent; // Get clicked college name
            if (programsBtn.classList.contains("active")) {
                showCourses(selectedCollege);
            }
        });

        // Update dropdown position when window resizes
        window.addEventListener("resize", function () {
            if (onlineCourseDropdown.style.display === "block") {
                let selectedCollege = dropdown.textContent;
                showCourses(selectedCollege);
            }
        });
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

document.addEventListener("DOMContentLoaded", function() {
    const referSlash = document.querySelector(".refer-slash");
    const refer = document.querySelector(".refer");

    if (referSlash && refer) {
        refer.prepend(referSlash); // Move slash inside .refer as the first child
    }
});



function toggleMenu() {
    let mobileMenu = document.querySelector(".mobile-menu");
    mobileMenu.classList.toggle("show");
}
