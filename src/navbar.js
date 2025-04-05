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
            dropdown.style.position = "relative";
            dropdown.style.left = "25%";
            dropdown.style.top = "0";
            dropdown.style.width = "50%";
        } else {
            dropdown.style.position = "absolute";
            dropdown.style.left = rect.left + "px";
            dropdown.style.top = (rect.bottom + window.scrollY) + "px";
            dropdown.style.width = "300px";
        }

        dropdown.style.zIndex = "1000";
    }

    function showDropdown(option) {
        updateDropdownPosition();

        dropdown.style.display = "block";
        onlineCourseDropdown.style.display = "none";

        if (option === 'colleges') {
            collegesBtn.classList.add("active");
            programsBtn.classList.remove("active");

            onlineprogramdropdown.style.display = "none";
            collegedropdown.style.display = "block";
        } else {
            programsBtn.classList.add("active");
            collegesBtn.classList.remove("active");

            collegedropdown.style.display = "block";
            onlineprogramdropdown.style.display = "block";
        }
    }

    function hideDropdown(event) {
        if (!dropdown.contains(event.target) &&
            !onlineCourseDropdown.contains(event.target) &&
            !collegesBtn.contains(event.target) &&
            !programsBtn.contains(event.target)) {
            dropdown.style.display = "none";
            onlineCourseDropdown.style.display = "none";
            collegesBtn.classList.remove("active");
            programsBtn.classList.remove("active");
        }
    }

    collegesBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        showDropdown('colleges');
    });

    programsBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        showDropdown('programs');
    });

    document.addEventListener("click", hideDropdown);

    dropdown.addEventListener("click", function (event) {
        event.stopPropagation();
    });

    onlineCourseDropdown.addEventListener("click", function (event) {
        event.stopPropagation();
    });

    window.addEventListener("resize", updateDropdownPosition);
}

function showOnlineCourses() {
    const programsBtn = document.getElementById("programsBtn");
    const dropdown = document.getElementById("collegeDropdown");
    const onlineCourseDropdown = document.getElementById("online-course-dropdown");
    const courseList = document.getElementById("course-list");
    const onlineprogramdropdown = document.getElementById("online-program-list-dropdown");

    const courseData = {
        "Dr. D.Y Patil Vidyapeeth, Pune": ["Online MBA", "Online BBA", "Online Certificate Program for Digital Marketing", "Online Certificate Programme in Hospital & Health Care Management"],
        "NMIMS University": ["Online MBA", "Online Executive MBA", "Online BBA", "Online B.Com"],
        "Vivekananda Global University": ["Online MBA", "Online BBA", "Online MCA", "Online BCA", "Online BA", "Online MA", "Online M.Sc"],
        "Amity University": ["Online MBA", "Online MBA(Dual)", "Online BBA", "Online MCA", "Online BCA", "Online MA", "Online BA", "Online M.Com", "Online B.Com"],
        "Manipal University": ["Online MBA", "Online MBA(Dual)", "Online BBA", "Online MCA", "Online BCA", "Online MA", "Online M.Com", "Online B.Com"],
        "Jain University": ["Online MBA", "Online MBA(Dual)", "Online BBA", "Online MCA", "Online BCA", "Online B.Com Honours", "Online M.Com", "Online B.Com"],
        "Lovely Professional University": ["Online MBA", "Online MBA(Dual)", "Online MCA", "Online BCA", "Online MA", "Online BA", "Online M.Com", "Online M.Sc"],
        "Shoolini University": ["Online MBA", "Online MBA(Dual)", "Online BBA", "Online BCA", "Online B.Com Honours", "Online M.A", "Online B.A", "Online B.A Honours", "Pay After Placement Program"],
        "Uttranchal University": ["Online MBA", "Online MCA", "Online MBA(Hybrid Mode)", "Online BBA", "Online MCA", "Online BCA", "Online BA"]
    };

    dropdown.addEventListener("click", function (event) {
        let selectedCollege = event.target.textContent.trim();

        if (!courseData[selectedCollege] ||
            onlineprogramdropdown.style.display !== "block" ||
            !programsBtn.classList.contains("active")) {
            onlineCourseDropdown.style.display = "none";
            return;
        }

        courseList.innerHTML = "";
        courseData[selectedCollege].forEach(course => {
            let listItem = document.createElement("li");
            listItem.className = "course-item";
            listItem.textContent = course;
            courseList.appendChild(listItem);
        });

        // Position the course dropdown
        let rect = dropdown.getBoundingClientRect();
        let isMobile = window.innerWidth <= 768;
        let mouseY = event.clientY;

        onlineCourseDropdown.style.position = "absolute";
        onlineCourseDropdown.style.left = isMobile ? "100px" : `${rect.right}px`;
        onlineCourseDropdown.style.top = isMobile ? "100px" : `${mouseY - onlineCourseDropdown.offsetHeight/2}px`;
        onlineCourseDropdown.style.width = isMobile ? "50%" : "220px";
        onlineCourseDropdown.style.paddingTop = "10px";
        onlineCourseDropdown.style.zIndex = "1000";
        onlineCourseDropdown.style.display = "block";
    });

    window.addEventListener("resize", function () {
        if (onlineCourseDropdown.style.display === "block") {
            onlineCourseDropdown.style.display = "none";
        }
    });
}

function toggleMenu() {
    let mobileMenu = document.querySelector(".mobile-menu");
    mobileMenu.classList.toggle("show");
}

function closeMenu() {

    document.querySelector('.mobile-menu').classList.remove("show");
}

document.addEventListener("DOMContentLoaded", function() {
    const referSlash = document.querySelector(".refer-slash");
    const refer = document.querySelector(".refer");
    if (referSlash && refer) {
        refer.prepend(referSlash);
    }

    toggleDropdown();
    showOnlineCourses();
});