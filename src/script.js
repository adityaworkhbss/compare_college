document.addEventListener('DOMContentLoaded', function () {
    const collegeNames = [
        "NMIMS University",
        "Amity University",
        "Delhi University",
        "Manipal University",
        "Pune University",
        "Christ University",
        "Symbiosis University",
        "Dy Patil University",
        "IIM-Lucknow",
    ];

    const collegeData = {
        "NMIMS University": {
            "Colleges": {
                "text": "NMIMS University",
                "img": "https://edukyu.com//public/compare-page/nmims.png"
            },
            "Abbreviation": "NMIMS",
            "Institute Type": "Private",
            "Establishment": "1981",
            "About": "NMIMS is a leading private university in India, offering a wide range of programs.",
            "Accrediation": "NAAC A++, UGC, AICTE",
            "Duration": "2 Years",
            "Learning Methodolgy": "Online & Blended Learning",
            "Fees": "₹2,00,000–₹3,00,000",
            "Programs": "MBA, BBA, MCA",
            "Specialisation": "Marketing, Finance, HR",
            "Eligibility": "Graduation with 50% marks",
            "Review": "Excellent faculty and infrastructure",
            "Our recommendation": "Highly recommended for management programs",
            "Website": "https://online.nmims.edu/"
        },
        "Amity University": {
            "Colleges": {
                "text": "Amity University",
                "img": "https://edukyu.com//public/compare-page/amity.png"
            },
            "Abbreviation": "Amity",
            "Institute Type": "Private",
            "Establishment": "2005",
            "About": "Amity University is known for its global presence and diverse programs.",
            "Accrediation": "UGC, AICTE, NAAC A+",
            "Duration": "2 Years",
            "Learning Methodolgy": "Online & Blended Learning",
            "Fees": "₹1,50,000–₹2,50,000",
            "Programs": "MBA, BBA, MCA",
            "Specialisation": "Marketing, Finance, HR",
            "Eligibility": "Graduation with 50% marks",
            "Review": "Good placement records",
            "Our recommendation": "Recommended for affordable online programs",
            "Website": "https://amityonline.com/"
        },
        // Add more colleges as needed
    };

    let college1_name, college2_name;
    let college1_img, college2_img;
    let college1_abbreviation, college2_abbreviation;
    let college1_instituteType, college2_instituteType;
    let college1_establishment, college2_establishment;
    let college1_about, college2_about;
    let college1_accrediation, college2_accrediation;
    let college1_Duration, college2_Duration;
    let college1_learningMethodolgy, college2_learningMethodolgy;
    let college1_Fees, college2_Fees;
    let college1_programs, college2_programs;
    let college1_specialisation, college2_specialisation;
    let college1_eligibility, college2_eligibility;
    let college1_review, college2_review;
    let college1_ourRecommendation, college2_ourRecommendation;
    let college1_website, college2_website;

    const addButton = document.querySelector('.add-third-seachbar');
    const searchBarContainer = document.querySelector('.compare-search-buttons');
    let searchBarCount = 2;
    let isFirstClick = true;

    if (addButton && searchBarContainer) {
        addButton.addEventListener('click', function () {
            if (searchBarCount >= 3) {
                alert("You can only add up to 3 search bars.");
                return;
            }

            const newSearchBar = document.createElement('div');
            newSearchBar.classList.add('col-md-6', 'col-sm-12');
            newSearchBar.innerHTML =
                `<div class="compare-search-btn" style="position: relative;">
                    <div class="college-icon">
                        <img src="https://edukyu.com//assets/cxp-assets/imgs/compare-colleges/college-icon.png" alt="college icon">
                    </div>
                    <span><i class="fas fa-search"></i></span>
                    <div>
                        <input type="search" id="collegeSearch${searchBarCount + 1}" placeholder="Search University">
                        <select id="dropdown${searchBarCount + 1}" class="w-full" size="5" style="display: none; position: absolute; top: 100%; left: 0; width: 100%; z-index: 1000;"></select>
                    </div>
                    <button class="remove-third-row">X</button>
                </div>`;

            searchBarContainer.insertBefore(newSearchBar, addButton.parentElement);
            searchBarCount++;

            const newSearchInput = newSearchBar.querySelector(`#collegeSearch${searchBarCount}`);
            const newDropdown = newSearchBar.querySelector(`#dropdown${searchBarCount}`);

            newSearchInput.addEventListener("input", (e) => {
                filterSuggestions(e.target, newDropdown.id);
            });

            const removeButton = newSearchBar.querySelector('.remove-third-row');
            removeButton.addEventListener('click', function () {
                searchBarContainer.removeChild(newSearchBar);
                searchBarCount--;
            });
        });
    }

    function filterSuggestions(input, dropdownId) {
        const dropdown = document.getElementById(dropdownId);
        const query = input.value.toLowerCase();

        dropdown.innerHTML = "";

        if (query) {
            const filteredColleges = collegeNames.filter((college) =>
                college.toLowerCase().includes(query)
            );

            filteredColleges.forEach((college) => {
                const option = document.createElement("option");
                option.value = college;
                option.textContent = college;

                option.addEventListener("click", () => {
                    input.value = option.value;
                    dropdown.style.display = "none";
                });

                dropdown.appendChild(option);
            });

            dropdown.style.display = "block";
        } else {
            dropdown.style.display = "none";
        }
    }

    document.getElementById("collegeSearch1").addEventListener("input", (e) => {
        filterSuggestions(e.target, "dropdown1");
    });

    document.getElementById("collegeSearch2").addEventListener("input", (e) => {
        filterSuggestions(e.target, "dropdown2");
    });

    document.getElementById("search_buttons").addEventListener("click", (e) => {
        const college1 = document.getElementById("collegeSearch1").value;
        const college2 = document.getElementById("collegeSearch2").value;

        if (!college1 || !college2) {
            alert("Please select colleges in both search bars.");
            return;
        }

        if (collegeData[college1] && collegeData[college2]) {
            setCollegeDetails(collegeData[college1], collegeData[college2]);
            populateTable();
            showAllColumns();
        } else {
            alert("Selected colleges are not in the dataset.");
        }
    });

    const checkboxes = document.querySelectorAll('.check-box-list input[type="checkbox"]');
    const selectAllCheckbox = document.querySelector('input[name="selectAll"]');

    function hideAllColumns() {
        document.querySelectorAll('.college-body').forEach(column => {
            column.style.display = "none";
            column.classList.add("hidden");
        });
    }

    function showAllColumns() {
        document.querySelectorAll('.college-body').forEach(column => {
            column.style.display = "";
            column.classList.remove("hidden");
        });

        checkboxes.forEach(checkbox => {
            checkbox.checked = true;
        });
        if (selectAllCheckbox) selectAllCheckbox.checked = true;
    }

    setCollegeDetails(collegeData["NMIMS University"], collegeData["Amity University"]);
    populateTable();
    showAllColumns();

    function handleCheckboxClick(checkbox) {
        const columnClass = checkbox.name;
        const label = checkbox.closest("label");

        if (isFirstClick) {
            hideAllColumns();
            isFirstClick = false;
        }

        if (checkbox.checked) {
            toggleColumnVisibility(columnClass, true);
            label.style.backgroundColor = "#d4edda";
            label.style.border = "1px solid #28a745";
            label.style.color = "#155724";
        } else {
            toggleColumnVisibility(columnClass, false);
            label.style.backgroundColor = "";
            label.style.border = "";
            label.style.color = "";
        }
    }

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            if (this.name !== "selectAll") {
                handleCheckboxClick(this);
            }
        });
    });

    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', function (e) {
            const isChecked = e.target.checked;

            if (isChecked) showAllColumns();
            else hideAllColumns();

            checkboxes.forEach(checkbox => {
                checkbox.checked = isChecked;
            });
        });
    }

    function setCollegeDetails(college1, college2) {
        college1_name = college1.Colleges.text;
        college1_img = college1.Colleges.img;
        college1_abbreviation = college1.Abbreviation;
        college1_instituteType = college1["Institute Type"];
        college1_establishment = college1.Establishment;
        college1_about = college1.About;
        college1_accrediation = college1.Accrediation;
        college1_Duration = college1.Duration;
        college1_learningMethodolgy = college1["Learning Methodolgy"];
        college1_Fees = college1.Fees;
        college1_programs = college1.Programs;
        college1_specialisation = college1.Specialisation;
        college1_eligibility = college1.Eligibility;
        college1_review = college1.Review;
        college1_ourRecommendation = college1["Our recommendation"];
        college1_website = college1.Website;

        college2_name = college2.Colleges.text;
        college2_img = college2.Colleges.img;
        college2_abbreviation = college2.Abbreviation;
        college2_instituteType = college2["Institute Type"];
        college2_establishment = college2.Establishment;
        college2_about = college2.About;
        college2_accrediation = college2.Accrediation;
        college2_Duration = college2.Duration;
        college2_learningMethodolgy = college2["Learning Methodolgy"];
        college2_Fees = college2.Fees;
        college2_programs = college2.Programs;
        college2_specialisation = college2.Specialisation;
        college2_eligibility = college2.Eligibility;
        college2_review = college2.Review;
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

            document.getElementById("college1Website").innerHTML = `<a href="${college1_website}" target="_blank">Visit Website</a>`;
            document.getElementById("college2Website").innerHTML = `<a href="${college2_website}" target="_blank">Visit Website</a>`;
        } else {
            console.error("One or more elements not found in the DOM.");
        }
    }

    function toggleColumnVisibility(columnClass, isVisible) {
        const columns = document.querySelectorAll(".college-body");

        columns.forEach(column => {
            if (columnClass.trim() === "institute-type" && (column.id === "collegeInstituteType" || column.id == "college1InstituteType" || column.id == "college2InstituteType")) changeDisplay(column, isVisible);
            else if (columnClass.trim() == "establishment" && (column.id == "collegeEstablishment" || column.id == "college1Establishment" || column.id == "college2Establishment")) changeDisplay(column, isVisible);
            else if (columnClass.trim() == "abbreviation" && (column.id == "collegeAbbreviation" || column.id == "college1Abbreviation" || column.id == "college2Abbreviation")) changeDisplay(column, isVisible);
            else if (columnClass.trim() == "about" && (column.id == "collegeAbout" || column.id == "college1About" || column.id == "college2About")) changeDisplay(column, isVisible);
            else if (columnClass.trim() == "accreditation" && (column.id == "collegeAccreditation" || column.id == "college1Accreditation" || column.id == "college2Accreditation")) changeDisplay(column, isVisible);
            else if (columnClass.trim() == "programs" && (column.id == "collegePrograms" || column.id == "college1Programs" || column.id == "college2Programs")) changeDisplay(column, isVisible);
            else if (columnClass.trim() == "specialisation" && (column.id == "collegeSpecialisation" || column.id == "college1Specialisation" || column.id == "college2Specialisation")) changeDisplay(column, isVisible);
            else if (columnClass.trim() == "duration" && (column.id == "collegeDuration" || column.id == "college1Duration" || column.id == "college2Duration")) changeDisplay(column, isVisible);
            else if (columnClass.trim() == "learning-methodology" && (column.id == "collegeLearningMethodoly" || column.id == "college1LearningMethodoly" || column.id == "college2LearningMethodoly")) changeDisplay(column, isVisible);
            else if (columnClass.trim() == "fees" && (column.id == "collegeFees" || column.id == "college1Fees" || column.id == "college2Fees")) changeDisplay(column, isVisible);
            else if (columnClass.trim() == "review" && (column.id == "collegeReview" || column.id == "college1Review" || column.id == "college2Review")) changeDisplay(column, isVisible);
            else if (columnClass.trim() == "eligibility" && (column.id == "collegeEligibility" || column.id == "college1Eligibility" || column.id == "college2Eligibility")) changeDisplay(column, isVisible);
            else if (columnClass.trim() == "our-recommendation" && (column.id == "collegeOurRecommendation" || column.id == "college1OurRecommendation" || column.id == "college2OurRecommendation")) changeDisplay(column, isVisible);
            else if (columnClass.trim() == "website" && (column.id == "collegeWebsite" || column.id == "college1Website" || column.id == "college2Website")) changeDisplay(column, isVisible);
            else if (columnClass.trim() == "selectAll") changeDisplay(column, isVisible);
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
});