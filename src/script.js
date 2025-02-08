document.addEventListener('DOMContentLoaded', function () {
    let collegeData = {};
    const collegeNames = [];

    fetch("college_db.json")
        .then(response => response.json())
        .then(data => {
            collegeData = data;
            for (const universityName in data) {
                collegeNames.push(universityName);
            }

            setCollegeDetails(collegeData["NMIMS University"], collegeData["Amity University"]);
            populateTable();
            showAllColumns();
        })
        .catch(error => console.error("Error loading JSON:", error));


    let college1_name, college2_name, college3_name;
    let college1_img, college2_img, college3_img;
    let college1_abbreviation, college2_abbreviation, college3_abbreviation;
    let college1_instituteType, college2_instituteType, college3_instituteType;
    let college1_establishment, college2_establishment, college3_establishment;
    let college1_about, college2_about, college3_about;
    let college1_accrediation, college2_accrediation, college3_accrediation;
    let college1_Duration, college2_Duration, college3_Duration;
    let college1_learningMethodolgy, college2_learningMethodolgy, college3_learningMethodolgy;
    let college1_Fees, college2_Fees, college3_Fees;
    let college1_programs, college2_programs, college3_programs;
    let college1_specialisation, college2_specialisation, college3_specialisation;
    let college1_eligibility, college2_eligibility, college3_eligibility;
    let college1_review, college2_review, college3_review;
    let college1_ourRecommendation, college2_ourRecommendation, college3_ourRecommendation;
    let college1_website, college2_website, college3_website;


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
                        <input type="search" id="collegeSearch${searchBarCount + 1}" placeholder="Search University"  class="search-input">
                        <select id="dropdown${searchBarCount + 1}" class="dropdown" size="5""></select>
                    </div>
                    <button class="remove-third-row">-</button>
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

                const hiddenRows = document.querySelectorAll(".hidden-row-element");


                hiddenRows.forEach(row => {
                    console.log(row);
                    row.style.display = "none";
                    row.classList.add("hidden-row");
                });

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

        document.addEventListener("click", (e) => {
            if (!e.target.closest(".compare-search-btn")) {
                dropdown.style.display = "none";
            }
        });
    }



    document.getElementById("collegeSearch1").addEventListener("input", (e) => {
        filterSuggestions(e.target, "dropdown1");
    });

    document.getElementById("collegeSearch2").addEventListener("input", (e) => {
        filterSuggestions(e.target, "dropdown2");
    });

    document.getElementById("search_buttons").addEventListener("click", (e) => {
        const college1 = document.getElementById("collegeSearch1").value.trim();
        const college2 = document.getElementById("collegeSearch2").value.trim();
        const college3 = document.getElementById("collegeSearch3") ? document.getElementById("collegeSearch3").value.trim() : null;


        if (!college1 || !college2) {
            alert("Please select colleges in both search bars.");
            return;
        }

        if(college3){
            const hiddenRows = document.querySelectorAll(".hidden-row");

            hiddenRows.forEach(row => {
                row.style.display = "";
                row.classList.remove("hidden-row");
            });
        }


        if (collegeData[college1] && collegeData[college2]) {
            setCollegeDetails(collegeData[college1], collegeData[college2], college3 ? collegeData[college3] : null);
            populateTable();
            showAllColumns();
        } else {
            alert("Selected colleges are not in the dataset.");
        }
    });

    const checkboxes = document.querySelectorAll('.check-box-list input[type="checkbox"]');

    let checkboxesChecked = [];
    for(let i = 0; i < checkboxes.length; i++) {
        checkboxesChecked[i] = false
    }

    const selectAllCheckbox = document.querySelector('input[name="selectAll"]');

    function hideAllColumns() {
        checkboxesChecked.fill(false);
        document.querySelectorAll('.college-body').forEach(column => {
            column.style.display = "none";
            column.classList.add("hidden");
        });
    }

    function showAllColumns() {
        checkboxesChecked.fill(true);
        document.querySelectorAll('.college-body').forEach(column => {
            column.style.display = "";
            column.classList.remove("hidden");
        });

        checkboxes.forEach(checkbox => {
            checkbox.checked = true;
        });
        if (selectAllCheckbox) selectAllCheckbox.checked = true;
    }

    function handleCheckboxClick(checkbox, index) {
        const columnClass = checkbox.name;
        const label = checkbox.closest("label");

        if (isFirstClick) {
            hideAllColumns();
            isFirstClick = false;
        }

        if (checkboxesChecked[index]) {
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
        let index = 0;
        checkbox.addEventListener('change', function () {
            if (this.name !== "selectAll") {
                if(checkboxesChecked[index]) {
                    checkboxesChecked[index] = false;
                }else {
                    checkboxesChecked[index] = true;
                }

                handleCheckboxClick(this, index);
            }
        });
        index++;
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

    function setCollegeDetails(college1, college2, college3 = null) {
        college1_name = college1.Colleges.text;
        college1_img = college1.Colleges.img;
        college1_abbreviation = college1.Abbreviation;
        college1_instituteType = college1["Institute Type"];
        college1_establishment = college1.Establishment;
        college1_about = college1.About;
        college1_accrediation = convertTextToLine(college1.Accrediation);
        college1_Duration = convertTextToLine(college1.Duration);
        college1_learningMethodolgy = college1["Learning Methodolgy"];
        college1_Fees = college1.Fees;
        college1_programs = convertTextToLine(college1.Programs);
        college1_specialisation = convertTextToLine(college1.Specialisation);
        college1_eligibility = convertTextToLine(college1.Eligibility);
        college1_review = college1.Review;
        college1_ourRecommendation = college1["Our recommendation"];
        college1_website = college1.Website;

        college2_name = college2.Colleges.text;
        college2_img = college2.Colleges.img;
        college2_abbreviation = college2.Abbreviation;
        college2_instituteType = college2["Institute Type"];
        college2_establishment = college2.Establishment;
        college2_about = college2.About;
        college2_accrediation = convertTextToLine(college2.Accrediation);
        college2_Duration = convertTextToLine(college2.Duration);
        college2_learningMethodolgy = college2["Learning Methodolgy"];
        college2_Fees = college2.Fees;
        college2_programs = convertTextToLine(college2.Programs);
        college2_specialisation = convertTextToLine(college2.Specialisation);
        college2_eligibility = convertTextToLine(college2.Eligibility);
        college2_review = college2.Review;
        college2_ourRecommendation = college2["Our recommendation"];
        college2_website = college2.Website;

        if (college3) {

            college3_name = college3.Colleges.text;
            college3_img = college3.Colleges.img;
            college3_abbreviation = college3.Abbreviation;
            college3_instituteType = college3["Institute Type"];
            college3_establishment = college3.Establishment;
            college3_about = college3.About;
            college3_accrediation = convertTextToLine(college3.Accrediation);
            college3_Duration = convertTextToLine(college3.Duration);
            college3_learningMethodolgy = college3["Learning Methodolgy"];
            college3_Fees = college3.Fees;
            college3_programs = convertTextToLine(college3.Programs);
            college3_specialisation = convertTextToLine(college3.Specialisation);
            college3_eligibility = convertTextToLine(college3.Eligibility);
            college3_review = college3.Review;
            college3_ourRecommendation = college3["Our recommendation"];
            college3_website = college3.Website;
        }
    }

    function populateTable() {
        const college1Header = document.getElementById("college1Header");
        const college2Header = document.getElementById("college2Header");
        const college3Header = document.getElementById("college3Header");

        if (college1Header && college2Header) {
            college1Header.textContent = college1_name;
            college2Header.textContent = college2_name;

            document.getElementById("college1ContainerHeader").textContent = college1_name;
            document.getElementById("college2ContainerHeader").textContent = college2_name;

            document.querySelector(".college-header-logo .college:nth-child(1) img").src = college1_img;
            document.querySelector(".college-header-logo .college:nth-child(2) img").src = college2_img;

            document.getElementById("college1InstituteType").textContent = college1_instituteType;
            document.getElementById("college2InstituteType").textContent = college2_instituteType;

            document.getElementById("college1Establishment").textContent = college1_establishment;
            document.getElementById("college2Establishment").textContent = college2_establishment;

            document.getElementById("college1Abbreviation").textContent = college1_abbreviation;
            document.getElementById("college2Abbreviation").textContent = college2_abbreviation;

            document.getElementById("college1About").textContent = college1_about;
            document.getElementById("college2About").textContent = college2_about;

            document.getElementById("college1Accrediation").innerHTML = college1_accrediation;
            document.getElementById("college2Accrediation").innerHTML = college2_accrediation;

            document.getElementById("college1Duration").innerHTML = college1_Duration;
            document.getElementById("college2Duration").innerHTML = college2_Duration;

            document.getElementById("college1LearningMethodoly").textContent = college1_learningMethodolgy;
            document.getElementById("college2LearningMethodoly").textContent = college2_learningMethodolgy;

            document.getElementById("college1Fees").textContent = college1_Fees;
            document.getElementById("college2Fees").textContent = college2_Fees;

            document.getElementById("college1Programs").innerHTML = college1_programs;
            document.getElementById("college2Programs").innerHTML = college2_programs;

            document.getElementById("college1Specialisation").innerHTML = college1_specialisation;
            document.getElementById("college2Specialisation").innerHTML = college2_specialisation;

            document.getElementById("college1Eligibility").innerHTML = college1_eligibility;
            document.getElementById("college2Eligibility").textContent = college2_eligibility;

            document.getElementById("college1Review").innerHTML = college1_review;
            document.getElementById("college2Review").textContent = college2_review;

            document.getElementById("college1OurRecommendation").textContent = college1_ourRecommendation;
            document.getElementById("college2OurRecommendation").textContent = college2_ourRecommendation;

            document.getElementById("college1Website").innerHTML = `<a href="${college1_website}" target="_blank">Visit Website</a>`;
            document.getElementById("college2Website").innerHTML = `<a href="${college2_website}" target="_blank">Visit Website</a>`;

            if (college3Header && college3_name) {

                college3Header.textContent = college3_name;

                document.getElementById("college3ContainerHeader").textContent = college3_name;
                document.querySelector(".college-header-logo .college:nth-child(3) img").src = college3_img;
                document.getElementById("college3InstituteType").textContent = college3_instituteType;
                document.getElementById("college3Establishment").textContent = college3_establishment;
                document.getElementById("college3Abbreviation").textContent = college3_abbreviation;
                document.getElementById("college3About").textContent = college3_about;
                document.getElementById("college3Accrediation").innerHTML = college3_accrediation;
                document.getElementById("college3Duration").innerHTML = college3_Duration;
                document.getElementById("college3LearningMethodoly").textContent = college3_learningMethodolgy;
                document.getElementById("college3Fees").textContent = college3_Fees;
                document.getElementById("college3Programs").innerHTML = college3_programs;
                document.getElementById("college3Specialisation").innerHTML = college3_specialisation;
                document.getElementById("college3Eligibility").innerHTML = college3_eligibility;
                document.getElementById("college3Review").innerHTML = college3_review;
                document.getElementById("college3OurRecommendation").textContent = college3_ourRecommendation;
                document.getElementById("college3Website").innerHTML = `<a href="${college3_website}" target="_blank">Visit Website</a>`;
            }
        } else {
            console.error("One or more elements not found in the DOM.");
        }
    }

    function toggleColumnVisibility(columnClass, isVisible) {
        const columns = document.querySelectorAll(".college-body");

        columns.forEach(column => {
            if (columnClass.trim() === "institute-type" && (column.id === "collegeInstituteType" || column.id == "college1InstituteType" || column.id == "college2InstituteType" || column.id == "college3InstituteType")) changeDisplay(column, isVisible, 1);
            else if (columnClass.trim() == "establishment" && (column.id == "collegeEstablishment" || column.id == "college1Establishment" || column.id == "college2Establishment" || column.id == "college3Establishment")) changeDisplay(column, isVisible, 2);
            else if (columnClass.trim() == "abbreviation" && (column.id == "collegeAbbreviation" || column.id == "college1Abbreviation" || column.id == "college2Abbreviation"|| column.id == "college3Abbreviation")) changeDisplay(column, isVisible, 0);
            else if (columnClass.trim() == "about" && (column.id == "collegeAbout" || column.id == "college1About" || column.id == "college2About"|| column.id == "college3About")) changeDisplay(column, isVisible, 3);
            else if (columnClass.trim() == "accreditation" && (column.id == "collegeAccreditation" || column.id == "college1Accreditation" || column.id == "college2Accreditation"|| column.id == "college3Accreditation")) changeDisplay(column, isVisible, 4);
            else if (columnClass.trim() == "programs" && (column.id == "collegePrograms" || column.id == "college1Programs" || column.id == "college2Programs" || column.id == "college3Programs")) changeDisplay(column, isVisible, 8);
            else if (columnClass.trim() == "specialisation" && (column.id == "collegeSpecialisation" || column.id == "college1Specialisation" || column.id == "college3Specialisation")) changeDisplay(column, isVisible, 9);
            else if (columnClass.trim() == "duration" && (column.id == "collegeDuration" || column.id == "college1Duration" || column.id == "college2Duration" || column.id == "college3Duration")) changeDisplay(column, isVisible, 5);
            else if (columnClass.trim() == "learning-methodology" && (column.id == "collegeLearningMethodoly" || column.id == "college1LearningMethodoly" || column.id == "college2LearningMethodoly" || column.id == "college3LearningMethodoly")) changeDisplay(column, isVisible, 6);
            else if (columnClass.trim() == "fees" && (column.id == "collegeFees" || column.id == "college1Fees" || column.id == "college2Fees" || column.id == "college3Fees")) changeDisplay(column, isVisible, 7);
            else if (columnClass.trim() == "review" && (column.id == "collegeReview" || column.id == "college1Review" || column.id == "college2Review" || column.id == "college3Review")) changeDisplay(column, isVisible, 10);
            else if (columnClass.trim() == "eligibility" && (column.id == "collegeEligibility" || column.id == "college1Eligibility" || column.id == "college2Eligibility" || column.id == "college3Eligibility")) changeDisplay(column, isVisible, 12);
            else if (columnClass.trim() == "our-recommendation" && (column.id == "collegeOurRecommendation" || column.id == "college1OurRecommendation" || column.id == "college3OurRecommendation" || column.id == "college2OurRecommendation")) changeDisplay(column, isVisible, 11);
            else if (columnClass.trim() == "website" && (column.id == "collegeWebsite" || column.id == "college1Website" || column.id == "college2Website" || column.id == "college3Website")) changeDisplay(column, isVisible, 13);
            else if (columnClass.trim() == "selectAll") changeDisplay(column, isVisible);
        });
    }

    function changeDisplay(column, isVisible, index) {

        if (isVisible) {
            checkboxesChecked[index] = false;
            column.style.display = "";
            column.classList.remove("hidden");
        } else {
            checkboxesChecked[index] = true;
            column.style.display = "none";
            column.classList.add("hidden");
        }

    }

    function convertTextToLine(value){
        return value.replace(/,/g, '<br>');
    }
});

/*
* 0 abbreviation
* 1 institute-type
* 2 establishment
* 3 about
* 4 accreditation
* 5 duration
* 6 learning-methodlogy
* 7 fees
* 8 degree
* 9 specialisation
* 10 review
* 11 our-recommendation
* 12 website
*
*
*
*
* */