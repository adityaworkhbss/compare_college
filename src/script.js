document.addEventListener('DOMContentLoaded', function () {

    const collegeNames = [
        "NMIMS University",
        "Amity University",
        "Delhi University",
        "Manipal University",
        "Pune University",
        "Christ University",
        "Symbiosis University"
    ];

// Function to filter suggestions
    function filterSuggestions(input, dropdownId) {
        const dropdown = document.getElementById(dropdownId);
        const query = input.value.toLowerCase();

        // Clear previous suggestions
        dropdown.innerHTML = "";

        if (query) {
            // Filter matching colleges
            const filteredColleges = collegeNames.filter((college) =>
                college.toLowerCase().includes(query)
            );

            // Create suggestion options
            filteredColleges.forEach((college) => {
                const option = document.createElement("option");
                option.value = college;
                option.textContent = college;
                dropdown.appendChild(option);
            });

            console.log(dropdown);

            dropdown.style.display = "block";
        } else {
            dropdown.style.display = "none";
        }
    }

    // Attach event listeners to search bars
    document.getElementById("collegeSearch1").addEventListener("input", (e) => {
        filterSuggestions(e.target, "dropdown1");
    });

    document.getElementById("collegeSearch2").addEventListener("input", (e) => {
        filterSuggestions(e.target, "dropdown2");
    });

    document.getElementById("collegeSearch3").addEventListener("input", (e) => {
        filterSuggestions(e.target, "dropdown3");
    });



    // Add Search Bar Functionality
    const checkboxes = document.querySelectorAll('.check-box-list input[type="checkbox"]');
    const labels = document.querySelectorAll('.cxp-checkbox-inline');
    const selectAllCheckbox = document.querySelector('input[name="selectAll"]');
    const selectAllLabel = document.querySelector('.cxp-select-all');
    let isFirstClick = true;


    // Function to hide all columns
    function hideAllColumns() {
        document.querySelectorAll('.college-body').forEach(column => {
            column.style.display = "none";
            column.classList.add("hidden");
        });
    }

    // Function to show all columns
    function showAllColumns() {
        document.querySelectorAll('.college-body').forEach(column => {
            column.style.display = "";
            column.classList.remove("hidden");
        });

        // Ensure all checkboxes are checked
        checkboxes.forEach(checkbox => {
            checkbox.checked = true;
        });
        if (selectAllCheckbox) selectAllCheckbox.checked = true;
    }

    // Ensure visibility of all columns on load
    showAllColumns();


    // Function to handle checkbox clicks
    function handleCheckboxClick(checkbox) {
        const label = checkbox.closest('label');
        const columnClass = checkbox.name;

       // console.log(columnClass);

        if (isFirstClick) {
            hideAllColumns(); // Hide all columns on first click
            isFirstClick = false;
        }

        if (checkbox.checked) {
            toggleColumnVisibility(columnClass, true); // Show the selected column
            if (label) {
                label.style.backgroundColor = "#d4edda";
                label.style.border = "1px solid #28a745";
                label.style.color = "#155724";
            }
        } else {
            toggleColumnVisibility(columnClass, false); // Hide the deselected column
            if (label) {
                label.style.backgroundColor = "";
                label.style.border = "";
                label.style.color = "";
            }
        }
    }

    // Attach event listeners to checkboxes
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            if (this.name !== "selectAll") {
                handleCheckboxClick(this);
            }
        });
    });

    // Handle "Select All" checkbox
    if (selectAllCheckbox && selectAllLabel) {
        selectAllCheckbox.addEventListener('change', function (e) {
            const isChecked = e.target.checked;

            if (isChecked) {
                showAllColumns(); // Show all columns when "Select All" is checked
            } else {
                hideAllColumns(); // Hide all columns when "Select All" is unchecked
            }

            // Update the state of all checkboxes
            checkboxes.forEach(checkbox => {
                checkbox.checked = isChecked;
                const label = checkbox.closest('label');
                if (label) {
                    label.classList.toggle('checked', isChecked);
                    label.style.backgroundColor = isChecked ? "#d4edda" : "";
                    label.style.border = isChecked ? "1px solid #28a745" : "";
                    label.style.color = isChecked ? "#155724" : "";
                }
            });
            selectAllLabel.classList.toggle('checked', isChecked);
        });
    }

    // Initialize College Data and Populate Table
    if (Object.keys(collegeData).length > 0) {
        setCollegeDetails(collegeData["Dy Patil University"], collegeData["IIM-Lucknow"]);
        populateTable();
    } else {
        console.error("collegeData is empty. Please ensure it is populated.");
    }
});

// College Data (Ensure this is populated)
const collegeData = {
    "Dy Patil University": {
        "Colleges": {
            "text": "D.Y. Patil University, Pune",
            "img": "https://edukyu.com//public/compare-page/dpu.png"
        },
        "Abbreviation": "Dnyandeo Yashwantrao Patil",
        "Institute Type": "Private",
        "Establishment": "2002",
        "About": "Dr. D.Y. Patil University houses the Centre for Online Learning (DPU-COL), dedicated to providing undergraduate and postgraduate online courses.",
        "Accrediation": "NAAC A++, WES, NIRF, AICTE, AIU, NAAC, WES",
        "UGC": "Yes",
        "AICTE": "Yes",
        "DEB": "yes",
        "Duration": "Online MBA: 2 Years",
        "Learning Methodolgy": "Online & Blended Learning",
        "Fees": "₹28,000–₹1,69,200",
        "Programs": "Online MBA, Online BBA, Online Certificate Program for Digital Marketing",
        "Specialisation": "Online MBA, Online BBA, Online Certificate Program for Digital Marketing",
        "Eligibility": "For Certificate: 10+2, For MBA: Graduation, For BBA: 10+2",
        "Review": "Good student support",
        "Any Issue": "Limited niche specializations",
        "Our recommendation": "Recommended for general online courses",
        "Website": "https://www.dypatilonline.com/"
    },
    "IIM-Lucknow": {
        "Colleges": {
            "text": "IIM-Lucknow",
            "img": "https://edukyu.com//public/compare-page/iim.webp"
        },
        "Abbreviation": "Indian Institute of Management",
        "Institute Type": "Private Institute",
        "Establishment": "",
        "About": "IIM Lucknow",
        "Accrediation": "AIU(Association of Indian University)",
        "UGC": "N/A",
        "AICTE": "Yes",
        "DEB": "N/A",
        "Duration": "1/2 year",
        "Learning Methodolgy": "Online classes through their enrollment partner like Hughes Education",
        "Fees": "Rs 2.5 Lakhs to 5 Lakhs (depending upon the course)",
        "Programs": "Diploma and other executive programs",
        "Specialisation": "Business Management, Business Analytics, International Business, Global Business Management",
        "Eligibility": "",
        "Review": "Great Reviews, Programs are of very high quality",
        "Any Issue": "None",
        "Our recommendation": "Admission to IIM distance learning requires entrance test followed by interview.",
        "Website": "http://www.iiml.ac.in/"
    }
};

// College Details and Table Population
let college1_name, college2_name;
let college1_img, college2_img;
let college1_abbreviation, college2_abbreviation;
let college1_instituteType, college2_instituteType;
let college1_establishment, college2_establishment;
let college1_about, college2_about;
let college1_accrediation, college2_accrediation;
let college1_UGC, college2_UGC;
let college1_AICTE, college2_AICTE;
let college1_DEB, college2_DEB;
let college1_Duration, college2_Duration;
let college1_learningMethodolgy, college2_learningMethodolgy;
let college1_Fees, college2_Fees;
let college1_programs, college2_programs;
let college1_specialisation, college2_specialisation;
let college1_review, college2_review;
let college1_eligibility, college2_eligibility;
let college1_anyIssue, college2_anyIssue;
let college1_ourRecommendation, college2_ourRecommendation;
let college1_website, college2_website;

function setCollegeDetails(college1, college2) {
    college1_name = college1.Colleges.text;
    college1_img = college1.Colleges.img;
    college1_abbreviation = college1.Abbreviation;
    college1_instituteType = college1["Institute Type"];
    college1_establishment = college1.Establishment;
    college1_about = college1.About;
    college1_accrediation = college1.Accrediation;
    college1_UGC = college1.UGC;
    college1_AICTE = college1.AICTE;
    college1_DEB = college1.DEB;
    college1_Duration = college1.Duration;
    college1_learningMethodolgy = college1["Learning Methodolgy"];
    college1_Fees = college1.Fees;
    college1_programs = college1.Programs;
    college1_specialisation = college1.Specialisation;
    college1_eligibility = college1.Eligibility;
    college1_review = college1.Review;
    college1_anyIssue = college1["Any Issue"];
    college1_ourRecommendation = college1["Our recommendation"];
    college1_website = college1.Website;

    college2_name = college2.Colleges.text;
    college2_img = college2.Colleges.img;
    college2_abbreviation = college2.Abbreviation;
    college2_instituteType = college2["Institute Type"];
    college2_establishment = college2.Establishment;
    college2_about = college2.About;
    college2_accrediation = college2.Accrediation;
    college2_UGC = college2.UGC;
    college2_AICTE = college2.AICTE;
    college2_DEB = college2.DEB;
    college2_Duration = college2.Duration;
    college2_learningMethodolgy = college2["Learning Methodolgy"];
    college2_Fees = college2.Fees;
    college2_programs = college2.Programs;
    college2_specialisation = college2.Specialisation;
    college2_eligibility = college2.Eligibility;
    college2_review = college2.Review;
    college2_anyIssue = college2["Any Issue"];
    college2_ourRecommendation = college2["Our recommendation"];
    college2_website = college2.Website;
}

function populateTable() {
    const college1Header = document.getElementById("college1Header");
    const college2Header = document.getElementById("college2Header");

    if (college1Header && college2Header) {
        college1Header.textContent = college1_name;
        college2Header.textContent = college2_name;

        document.getElementById("college1ContainerHeader").textContent = college1_name;
        document.getElementById("college2ContainerHeader").textContent = college2_name;

        document.querySelector(".college-header .college:first-child img").src = college1_img;
        document.querySelector(".college-header .college:last-child img").src = college2_img;

        document.getElementById("college1InstituteType").textContent = college1_instituteType;
        document.getElementById("college2InstituteType").textContent = college2_instituteType;

        document.getElementById("college1Establishment").textContent = college1_establishment;
        document.getElementById("college2Establishment").textContent = college2_establishment;

        document.getElementById("college1Abbreviation").textContent = college1_abbreviation;
        document.getElementById("college2Abbreviation").textContent = college2_abbreviation;

        document.getElementById("college1About").textContent = college1_about;
        document.getElementById("college2About").textContent = college2_about;

        document.getElementById("college1Accrediation").textContent = college1_accrediation;
        document.getElementById("college2Accrediation").textContent = college2_accrediation;

        document.getElementById("college1Duration").textContent = college1_Duration;
        document.getElementById("college2Duration").textContent = college2_Duration;

        document.getElementById("college1LearningMethodoly").textContent = college1_learningMethodolgy;
        document.getElementById("college2LearningMethodoly").textContent = college2_learningMethodolgy;

        document.getElementById("college1Fees").textContent = college1_Fees;
        document.getElementById("college2Fees").textContent = college2_Fees;

        document.getElementById("college1Programs").textContent = college1_programs;
        document.getElementById("college2Programs").textContent = college2_programs;

        document.getElementById("college1Specialisation").textContent = college1_specialisation;
        document.getElementById("college2Specialisation").textContent = college2_specialisation;

        document.getElementById("college1Eligibility").textContent = college1_eligibility;
        document.getElementById("college2Eligibility").textContent = college2_eligibility;

        document.getElementById("college1Review").textContent = college1_review;
        document.getElementById("college2Review").textContent = college2_review;

        document.getElementById("college1OurRecommendation").textContent = college1_ourRecommendation;
        document.getElementById("college2OurRecommendation").textContent = college2_ourRecommendation;

        document.getElementById("college1Website").textContent = college1_website;
        document.getElementById("college2Website").textContent = college2_website;

        // Ensure columns are visible based on checkboxes
        document.querySelectorAll('.cxp-checkbox-inline input[type="checkbox"]').forEach(checkbox => {
            const columnClass = checkbox.name;
            const isVisible = checkbox.checked;
            toggleColumnVisibility(columnClass, isVisible);
        });
    } else {
        console.error("One or more elements not found in the DOM.");
    }
}

function toggleColumnVisibility(columnClass, isVisible) {
    const columns = document.querySelectorAll(".college-body");

   // console.log(column.id);

    columns.forEach(column => {
        console.log(column.id);
       // console.log(columnClass);
        if(columnClass.trim() == "institute-type" && (column.id == "collegeInstituteType" || column.id == "college1InstituteType" || column.id == "college2InstituteType")) changeDisplay(column, isVisible);
        else if(columnClass.trim() == "establishment" && (column.id == "collegeEstablishment" || column.id == "college1Establishment" || column.id == "college2Establishment")) changeDisplay(column, isVisible);
        else if(columnClass.trim() == "abbreviation" && (column.id == "collegeAbbreviation" || column.id == "college1Abbreviation" || column.id == "college2Abbreviation")) changeDisplay(column, isVisible);
        else if(columnClass.trim() == "about" && (column.id == "collegeAbout" || column.id == "college1About" || column.id == "college2About")) changeDisplay(column, isVisible);
        else if(columnClass.trim() == "accreditation" && (column.id == "collegeAccreditation" || column.id == "college1Accreditation" || column.id == "college2Accreditation")) changeDisplay(column, isVisible);
        else if(columnClass.trim() == "programs" && (column.id == "collegePrograms" || column.id == "college1Programs" || column.id == "college2Programs")) changeDisplay(column, isVisible);
        else if(columnClass.trim() == "specialisation" && (column.id == "collegeSpecialisation" || column.id == "college1Specialisation" || column.id == "college2Specialisation")) changeDisplay(column, isVisible);
        else if(columnClass.trim() == "duration" && (column.id == "collegeDuration" || column.id == "college1Duration" || column.id == "college2Duration")) changeDisplay(column, isVisible);
        else if(columnClass.trim() == "learning-methodology" && (column.id == "collegeLearningMethodoly" || column.id == "college1LearningMethodoly" || column.id == "college2LearningMethodoly")) changeDisplay(column, isVisible);
        else if(columnClass.trim() == "fees" && (column.id == "collegeFees" || column.id == "college1Fees" || column.id == "college2Fees")) changeDisplay(column, isVisible);
        else if(columnClass.trim() == "review" && (column.id == "collegeReview" || column.id == "college1Review" || column.id == "college2Review")) changeDisplay(column, isVisible);
        else if(columnClass.trim() == "eligibility" && (column.id == "collegeEligibility" || column.id == "college1Eligibility" || column.id == "college2Eligibility")) changeDisplay(column, isVisible);
        else if(columnClass.trim() == "our-recommendation" && (column.id == "collegeOurRecommendation" || column.id == "college1OurRecommendation" || column.id == "college2OurRecommendation")) changeDisplay(column, isVisible);
        else if(columnClass.trim() == "website" && (column.id == "collegeWebsite" || column.id == "college1Website" || column.id == "college2Website")) changeDisplay(column, isVisible);
        else if(columnClass.trim() == "selectAll") changeDisplay(column, isVisible);
    });
}

function changeDisplay(column, isVisible) {
    if (isVisible) {
        column.style.display = "";
        column.classList.remove("hidden");
    } else {
        column.style.display = "none";
        column.classList.add("hidden");
    }
}
