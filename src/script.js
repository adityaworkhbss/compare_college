document.addEventListener('DOMContentLoaded', function () {
    let collegeData = {};
    const collegeNames = [];

    const accreditationImages = new Map([
        ["NAAC", "https://upload.wikimedia.org/wikipedia/en/1/1d/NAAC_LOGO.png"],
        ["NIRF", "https://upload.wikimedia.org/wikipedia/en/5/52/National_Institutional_Ranking_Framework_logo.png"],
        ["UGC", "https://upload.wikimedia.org/wikipedia/en/4/4e/UGC_India_Logo.png"],
        ["CAREERS-360", "https://img-cdn.thepublive.com/fit-in/1280x960/filters:format(webp)/afaqs/media/post_attachments/34728a6971dffd8dc77e4b6c925faecdc8774743d099343ed19b6387ba4aaa16.jpg"],
        ["NBA", "https://upload.wikimedia.org/wikipedia/en/thumb/8/8d/National_Board_of_Accreditation.svg/330px-National_Board_of_Accreditation.svg.png"],
        ["WES", "https://www.wes.org/wp-content/themes/storyware/assets/images/logo.svg"],
        ["ACU", "https://www.acu.ac.uk/dist/images/logo.svg"],
        ["QSWUR", "https://upload.wikimedia.org/wikipedia/commons/c/c0/QS_University_Rankings_Logo.jpg?20190826092038"],
        ["AICTE", "https://upload.wikimedia.org/wikipedia/en/e/eb/All_India_Council_for_Technical_Education_logo.png"],
        ["AIU", "https://upload.wikimedia.org/wikipedia/en/5/53/Association_of_Indian_Universities_Logo.svg"],
        ["KSURF", "https://i0.wp.com/allaboutbelgaum.com/content/uploads/2019/09/rateing.jpg?resize=600%2C256&ssl=1"],
        ["AUAP", "https://auap.org/web/image/website/1/logo/AUAP?unique=5c9188c"],
        ["WUR", "https://static.cdnlogo.com/logos/q/27/qs-world-university-rankings.svg"],
        ["QS I-GAUGE", "https://bit-bangalore.edu.in/assets/images/accreditation/approval_8.png"],
        ["WUA", "https://www.qahe.org/wp-content/uploads/2023/05/World-University-Ecumenical-520-x-330.jpg"],
        ["INDIA TODAY", "https://bestcolleges.indiatoday.in/public/asset/images/new-images/it-logo.png"],
        ["IMPACT RANKING", "https://www.prd.timeshighereducation.com/sites/def…ews_image_style/public/impact_4.jpg?itok=OYr_aI8d"],
        ["ISO", "https://banner2.cleanpng.com/20180901/xwz/kisspng-iso-9-1-logo-iso-9-quality-management-systems-certificazioni-ultimate-italia-1713945295220.webp"],
        ["DEC", "https://www.deac.org/wp-content/uploads/2023/10/DEAC-Logo-Mark.svg"],
        ["DTE", "https://www.deac.org/wp-content/uploads/2023/10/DEAC-Logo-Mark.svg"]
    ]);

    fetch("college_db.json")
        .then(response => response.json())
        .then(data => {
            collegeData = data;
            for (const universityName in data) {
                collegeNames.push(universityName);
            }

            setCollegeDetails(collegeData["NMIMS University"], collegeData["Amity University"]);
            populateTable();
            truncateText();
            showAllColumns();
        })
        .catch(error => showError("Error loading JSON"));

    let college1_name, college2_name, college3_name;
    let college1_img, college2_img, college3_img;
    let college1_abbreviation, college2_abbreviation, college3_abbreviation;
    let college1_instituteType, college2_instituteType, college3_instituteType;
    let college1_establishment, college2_establishment, college3_establishment;
    let college1_about, college2_about, college3_about;
    let college1_accrediation, college2_accrediation, college3_accrediation;
    let college1_Duration, college2_Duration, college3_Duration;
    let college1_learningMethodolgy, college2_learningMethodolgy, college3_learningMethodolgy;
    let college1_Degree, college2_Degree, college3_Degree;
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
    let isThirdRowActive = false;

    if (addButton && searchBarContainer) {
        addButton.addEventListener('click', function () {
            if (searchBarCount >= 3) {
                showError("You can only add up to 3 search bars.");
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
                        <select id="dropdown${searchBarCount + 1}" class="dropdown" size="4""></select>
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
                const thirdCollegeImage = document.querySelector(".hidden-college-logo-3");

                hiddenRows.forEach(row => {
                    row.style.display = "none";
                    row.classList.add("hidden-row");
                });
                thirdCollegeImage.style.display = "none";
                thirdCollegeImage.classList.add("hidden-row");

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
            showError("Please select colleges in both search bars.");
            return;
        }

        if (college3) {
            const hiddenRows = document.querySelectorAll(".hidden-row");
            hiddenRows.forEach(row => {
                row.style.display = "";
                row.classList.remove("hidden-row");
            });
        }

        if (collegeData[college1] && collegeData[college2]) {
            setCollegeDetails(collegeData[college1], collegeData[college2], college3 ? collegeData[college3] : null);
            populateTable();
            truncateText();
            showAllColumns();
            convertTableToDiv();

        } else {
            showError("Selected colleges are not in the dataset.");
        }
    });

    const checkboxes = document.querySelectorAll('.check-box-list input[type="checkbox"]');
    let checkboxesChecked = [];
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxesChecked[i] = false;
    }

    const selectAllCheckbox = document.querySelector('input[name="selectAll"]');

    function hideAllColumns() {
        checkboxesChecked.fill(false);
        if(window.innerWidth <= 768){
            document.querySelectorAll('.college-data-wrapper').forEach(column => {
                column.style.display = "none";
                column.classList.add("hidden");
            })
        }
        document.querySelectorAll('.college-body').forEach(column => {
            column.style.display = "none";
            column.classList.add("hidden");
        });
    }

    function showAllColumns() {
        checkboxesChecked.fill(true);
        if(window.innerWidth <= 768){
            document.querySelectorAll('.college-data-wrapper').forEach(column => {
                column.style.display = "";
                column.classList.remove("hidden");
            })
        }
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
            label.style.color = "#0e6d78";
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
                if (checkboxesChecked[index]) {
                    checkboxesChecked[index] = false;
                } else {
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
        college1_accrediation = convertTextToImage(college1.Accrediation);
        college1_Duration = convertTextToLine(college1.Duration);
        college1_learningMethodolgy = college1["Learning Methodolgy"];
        // college1_Degree = college1["Degree"];
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
        college2_accrediation = convertTextToImage(college2.Accrediation);
        college2_Duration = convertTextToLine(college2.Duration);
        college2_learningMethodolgy = college2["Learning Methodolgy"];
        // college2_Degree = college2["Degree"];
        college2_Fees = college2.Fees;
        college2_programs = convertTextToLine(college2.Programs);
        college2_specialisation = convertTextToLine(college2.Specialisation);
        college2_eligibility = convertTextToLine(college2.Eligibility);
        college2_review = college2.Review;
        college2_ourRecommendation = college2["Our recommendation"];
        college2_website = college2.Website;

        if (college3) {

            isThirdRowActive = true;

            college3_name = college3.Colleges.text;
            college3_img = college3.Colleges.img;
            college3_abbreviation = college3.Abbreviation;
            college3_instituteType = college3["Institute Type"];
            college3_establishment = college3.Establishment;
            college3_about = college3.About;
            college3_accrediation = convertTextToImage(college3.Accrediation);
            college3_Duration = convertTextToLine(college3.Duration);
            college3_learningMethodolgy = college3["Learning Methodolgy"];
            // college3_Degree = college3["Degree"];
            college3_Fees = college3.Fees;
            college3_programs = convertTextToLine(college3.Programs);
            college3_specialisation = convertTextToLine(college3.Specialisation);
            college3_eligibility = convertTextToLine(college3.Eligibility);
            college3_review = college3.Review;
            college3_ourRecommendation = college3["Our recommendation"];
            college3_website = college3.Website;
        }else{
            isThirdRowActive = false;
        }

        // document.documentElement.style.setProperty('--college1-name', `"${college1_name}"`);
        // document.documentElement.style.setProperty('--college1-logo', `url(${college1_img})`);
        // document.documentElement.style.setProperty('--college2-name', `"${college2_name}"`);
        // document.documentElement.style.setProperty('--college2-logo', `url(${college2_img})`);
        //
        // if (college3) {
        //     document.documentElement.style.setProperty('--college3-name', `"${college3_name}"`);
        //     document.documentElement.style.setProperty('--college3-logo', `url(${college3_img})`);
        // }
        //
        // applyCollegeStyles();
    }

    function applyCollegeStyles() {
        const college1Elements = document.querySelectorAll('.college1');
        const college2Elements = document.querySelectorAll('.college2');
        const college3Elements = document.querySelectorAll('.college3');

        college1Elements.forEach(element => {
            element.style.setProperty('--college-name', 'var(--college1-name)');
            element.style.setProperty('--college-logo', 'var(--college1-logo)');
        });

        college2Elements.forEach(element => {
            element.style.setProperty('--college-name', 'var(--college2-name)');
            element.style.setProperty('--college-logo', 'var(--college2-logo)');
        });

        if (college3Elements.length > 0) {
            college3Elements.forEach(element => {
                element.style.setProperty('--college-name', 'var(--college3-name)');
                element.style.setProperty('--college-logo', 'var(--college3-logo)');
            });
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

            // document.getElementById("college1Degree").innerHTML = college1_Degree;
            // document.getElementById("college2Degree").innerHTML = college2_Degree;

            //document.getElementById("college1Fees").textContent = college1_Fees;

            const nmimsFeesOptions = [
                { program: "MBA", fees: "55,000 - 1,00,000" },
                { program: "B.Tech", fees: "1,00,000 - 3,00,000" },
                { program: "Design", fees: "3,00,000 - 4,00,000" }
            ];

            if (college1_name === "NMIMS CDOE") {
                const feesCell = document.getElementById("college1Fees");

                // Create the fees container
                const feesContainer = document.createElement("div");
                feesContainer.classList.add("fees-container");

                // Add the fees summary
                const feesSummary = document.createElement("div");
                feesSummary.classList.add("fees-summary");
                feesSummary.textContent = college1_Fees;
                feesContainer.appendChild(feesSummary);

                // Create dropdown (initially hidden)
                const feesDropdown = document.createElement("select");
                feesDropdown.classList.add("fees-dropdown", "hidden");

                // Add options to dropdown
                const defaultOption = document.createElement("option");
                defaultOption.textContent = "Check Programs Fees";
                defaultOption.disabled = true;
                defaultOption.selected = true;
                feesDropdown.appendChild(defaultOption);

                nmimsFeesOptions.forEach(option => {
                    const opt = document.createElement("option");
                    opt.textContent = `${option.program}: ${option.fees}`;
                    feesDropdown.appendChild(opt);
                });

                feesContainer.appendChild(feesDropdown);

                // Add the "Show Details" button
                const showDetailsBtn = document.createElement("button");
                showDetailsBtn.classList.add("show-details-btn");
                showDetailsBtn.textContent = "Show Details";
                feesContainer.appendChild(showDetailsBtn);

                // Append the fees container to the fees cell
                feesCell.appendChild(feesContainer);

                // Add event listener to the "Show Details" button
                showDetailsBtn.addEventListener("click", function () {
                    if (feesDropdown.classList.contains("hidden")) {
                        feesSummary.classList.add("hidden");
                        feesDropdown.classList.remove("hidden");
                        showDetailsBtn.textContent = "Show Less";
                    } else {
                        feesSummary.classList.remove("hidden");
                        feesDropdown.classList.add("hidden");
                        showDetailsBtn.textContent = "Show Details";
                    }
                });
            }

            else {
                document.getElementById("college1Fees").textContent = college1_Fees;
            }

            document.getElementById("college2Fees").textContent = college2_Fees;



            document.getElementById("college2Fees").textContent = college2_Fees;

            document.getElementById("college1Programs").innerHTML = college1_programs;
            document.getElementById("college2Programs").innerHTML = college2_programs;

            document.getElementById("college1Specialisation").innerHTML = college1_specialisation;
            document.getElementById("college2Specialisation").innerHTML = college2_specialisation;

            document.getElementById("college1Eligibility").innerHTML = college1_eligibility;
            document.getElementById("college2Eligibility").innerHTML = college2_eligibility;

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
                //document.getElementById("college3Degree").textContent = college3_Degree;
                document.getElementById("college3Fees").textContent = college3_Fees;
                document.getElementById("college3Programs").innerHTML = college3_programs;
                document.getElementById("college3Specialisation").innerHTML = college3_specialisation;
                document.getElementById("college3Eligibility").innerHTML = college3_eligibility;
                document.getElementById("college3Review").innerHTML = college3_review;
                document.getElementById("college3OurRecommendation").textContent = college3_ourRecommendation;
                document.getElementById("college3Website").innerHTML = `<a href="${college3_website}" target="_blank">Visit Website</a>`;
            }
        } else {
            showError("One or more elements not found in the DOM.");
        }
    }

    function toggleColumnVisibility(columnClass, isVisible) {

        if(window.innerWidth <= 768){
            const columns = document.querySelectorAll(".college-data-wrapper");

            columns.forEach(column => {
                if (columnClass.trim() === "institute-type" && (column.classList.contains("institute-type"))) changeDisplay(column, isVisible, 1);
                else if (columnClass.trim() == "establishment" && (column.classList.contains("establishment"))) changeDisplay(column, isVisible, 2);
                else if (columnClass.trim() == "abbreviation" &&(column.classList.contains("abbreviation"))) changeDisplay(column, isVisible, 0);
                else if (columnClass.trim() == "about" && (column.classList.contains("about")) ) changeDisplay(column, isVisible, 3);
                else if (columnClass.trim() == "accreditation" &&(column.classList.contains("accreditation"))) changeDisplay(column, isVisible, 4);
                else if (columnClass.trim() == "programs" && (column.classList.contains("programs")) ) changeDisplay(column, isVisible, 8);
                else if (columnClass.trim() == "specialisation" && (column.classList.contains("specialisation"))) changeDisplay(column, isVisible, 9);
                else if (columnClass.trim() == "duration" && (column.classList.contains("duration")) ) changeDisplay(column, isVisible, 5);
                else if (columnClass.trim() == "learning-methodology" && (column.classList.contains("learning-methodology")) ) changeDisplay(column, isVisible, 6);
                // else if (columnClass.trim() == "degree" && (column.id == "collegeDegree" || column.id == "college1Degree" || column.id == "college2Degree" || column.id == "college3Degree")) changeDisplay(column, isVisible, 6);
                else if (columnClass.trim() == "fees" && (column.classList.contains("fees"))) changeDisplay(column, isVisible, 7);
                else if (columnClass.trim() == "review" && (column.classList.contains("review"))) changeDisplay(column, isVisible, 10);
                else if (columnClass.trim() == "eligibility" && (column.classList.contains("eligibility"))) changeDisplay(column, isVisible, 12);
                else if (columnClass.trim() == "our-recommendation" && (column.classList.contains("our-recommendation"))) changeDisplay(column, isVisible, 11);
                else if (columnClass.trim() == "website" && (column.classList.contains("website"))) changeDisplay(column, isVisible, 13);
                else if (columnClass.trim() == "selectAll") changeDisplay(column, isVisible);
            });
        }

        const columns = document.querySelectorAll(".college-body");

        columns.forEach(column => {
            if (columnClass.trim() === "institute-type" && (column.id === "collegeInstituteType" || column.id == "college1InstituteType" || column.id == "college2InstituteType" || column.id == "college3InstituteType")) changeDisplay(column, isVisible, 1);
            else if (columnClass.trim() == "establishment" && (column.id == "collegeEstablishment" || column.id == "college1Establishment" || column.id == "college2Establishment" || column.id == "college3Establishment")) changeDisplay(column, isVisible, 2);
            else if (columnClass.trim() == "abbreviation" && (column.id == "collegeAbbreviation" || column.id == "college1Abbreviation" || column.id == "college2Abbreviation" || column.id == "college3Abbreviation")) changeDisplay(column, isVisible, 0);
            else if (columnClass.trim() == "about" && (column.id == "collegeAbout" || column.id == "college1About" || column.id == "college2About" || column.id == "college3About")) changeDisplay(column, isVisible, 3);
            else if (columnClass.trim() == "accreditation" && (column.id == "collegeAccreditation" || column.id == "college1Accreditation" || column.id == "college2Accreditation" || column.id == "college3Accreditation")) changeDisplay(column, isVisible, 4);
            else if (columnClass.trim() == "programs" && (column.id == "collegePrograms" || column.id == "college1Programs" || column.id == "college2Programs" || column.id == "college3Programs")) changeDisplay(column, isVisible, 8);
            else if (columnClass.trim() == "specialisation" && (column.id == "collegeSpecialisation" || column.id == "college1Specialisation" || column.id == "college3Specialisation")) changeDisplay(column, isVisible, 9);
            else if (columnClass.trim() == "duration" && (column.id == "collegeDuration" || column.id == "college1Duration" || column.id == "college2Duration" || column.id == "college3Duration")) changeDisplay(column, isVisible, 5);
            else if (columnClass.trim() == "learning-methodology" && (column.id == "collegeLearningMethodoly" || column.id == "college1LearningMethodoly" || column.id == "college2LearningMethodoly" || column.id == "college3LearningMethodoly")) changeDisplay(column, isVisible, 6);
           // else if (columnClass.trim() == "degree" && (column.id == "collegeDegree" || column.id == "college1Degree" || column.id == "college2Degree" || column.id == "college3Degree")) changeDisplay(column, isVisible, 6);
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

    function convertTextToLine(value) {
        return value.replace(/,/g, '<br>');
    }

    function convertTextToImage(value) {
        const accreditations = value.split(',');

        const accreditationImagesHTML = accreditations.map(acc => {
            const trimmedAcc = acc.trim();
            const imageUrl = accreditationImages.get(trimmedAcc);
            if (imageUrl) {
                return `<img src="${imageUrl}" alt="${trimmedAcc}" title="${trimmedAcc}" style="width: 50px; height: auto; margin-right: 5px;">`;
            }
            return "";
        }).join('  ');

        return accreditationImagesHTML;
    }

    function showError(message) {
        const snackbar = document.createElement('div');
        snackbar.classList.add('snackbar');
        snackbar.textContent = message;
        document.body.appendChild(snackbar);

        setTimeout(() => {
            snackbar.style.opacity = '1';
            setTimeout(() => {
                snackbar.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(snackbar);
                }, 500);
            }, 3000);
        }, 100);
    }

    const modalOverlay = document.querySelector('.modal-overlay');
    const closeButton = document.querySelector('.close-button');

    closeButton.addEventListener('click', () => {
        modalOverlay.style.display = 'none';
    });

    const talkToCounsellorBtn = document.getElementById('talkToCounsellorBtn');
    talkToCounsellorBtn.addEventListener('click', function (e) {
        e.preventDefault();
        modalOverlay.style.display = 'block';
    });

    modalOverlay.addEventListener('click', function (e) {
        if (e.target === modalOverlay) {
            modalOverlay.style.display = 'none';
        }
    });

    const clickHereBtn = document.getElementById('clickHereBtn');
    const modal = document.getElementById('modal-subscribe-compare');

    clickHereBtn.addEventListener('click', function () {
        modal.style.display = 'block';
        modal.classList.add('show');
    });

    const closeButton2 = modal.querySelector('.close');
    closeButton2.addEventListener('click', function () {
        modal.style.display = 'none';
        modal.classList.remove('show');
    });

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            modal.classList.remove('show');
        }
    });

    document.getElementById("toggleCheckboxList").addEventListener("click", function () {
        const checkboxList = document.querySelector(".check-box-list-container");

        if (checkboxList.style.display === "none" || checkboxList.style.display === "") checkboxList.style.display = "flex";
        else checkboxList.style.display = "none";
    });

    document.querySelector('.info-box-cancel-button').addEventListener("click", function () {
        const hideDetailBox = document.querySelector('.info-box');
        hideDetailBox.style.display = "none";
    })

    const headers = document.querySelectorAll(".college-body-header");


    const collegeHeaderLogo = document.querySelectorAll('.circle');
    const table = document.querySelector('.compare-table');
    const mobileTable = document.getElementById('mobileViewContainer');

    window.addEventListener('scroll', function () {

        const scrollPosition = window.scrollY;
        if(window.innerWidth <= 768){
            const mobileTableStart = mobileTable.offsetTop;
            const mobileTableEnd = mobileTableStart + mobileTable.offsetHeight;

            if (scrollPosition >= mobileTableStart && scrollPosition <= mobileTableEnd) {
                collegeHeaderLogo.forEach(logo => logo.classList.add('fixed'));
            } else {
                collegeHeaderLogo.forEach(logo => logo.classList.remove('fixed'));
            }

        }else{
            const tableStart = table.offsetTop;
            const tableEnd = tableStart + table.offsetHeight;

            if (scrollPosition >= tableStart && scrollPosition <= tableEnd) {
                collegeHeaderLogo.forEach(logo => logo.classList.add('fixed'));
            } else {
                collegeHeaderLogo.forEach(logo => logo.classList.remove('fixed'));
            }
        }

    });

    function convertTableToDiv() {
        const table = document.querySelector(".compare-table");
        const mobileContainer = document.getElementById("mobileViewContainer");

        if (window.innerWidth <= 768) {
            mobileContainer.innerHTML = "";

            const rows = table.querySelectorAll("tr");
            rows.forEach((row) => {
                const header = row.querySelector(".college-body-header");
                const dataCells = row.querySelectorAll(".college-td-hider");

                if (header) {
                    const headerDiv = document.createElement("div");
                    headerDiv.className = "college-header";
                    headerDiv.textContent = header.textContent;

                    const dataWrapper = document.createElement("div");
                    dataWrapper.className = "college-data-wrapper";
                    dataWrapper.style.display = "none"; // Explicitly set to none initially

                    const headerClass = header.textContent.trim().replace(/[^\w-]/g, "-").toLowerCase();
                    dataWrapper.classList.add(headerClass);

                    dataCells.forEach((cell) => {
                        const dataDiv = document.createElement("div");
                        dataDiv.classList.add("college-data-cell");

                        setTimeout(() => {
                            if (!isThirdRowActive && cell.classList.contains("hidden-row-element")) {
                                dataDiv.style.display = "none";
                            } else {
                                dataDiv.textContent = cell.textContent.trim();
                            }
                        }, 1000);

                        dataWrapper.appendChild(dataDiv);
                    });
                    headerDiv.addEventListener("click", () => {
                        if (dataWrapper.style.display === "none" || dataWrapper.style.display === "") {
                            dataWrapper.style.display = "flex";
                        } else {
                            dataWrapper.style.display = "none";
                        }
                    });

                    mobileContainer.appendChild(headerDiv);
                    mobileContainer.appendChild(dataWrapper);
                }
            });

            table.style.display = "none"; // Hide original table
        } else {
            table.style.display = "table"; // Restore table on larger screens
            mobileContainer.innerHTML = ""; // Clear the mobile container
        }
    }


    window.addEventListener("DOMContentLoaded", convertTableToDiv);
    window.addEventListener("resize", convertTableToDiv);

    function truncateText() {
        const columns = document.querySelectorAll(".college-td-hider");
        columns.forEach(col => {
            const text = col.textContent.trim();
            if (text.length > 250) {
                const shortText = text.substring(0, 250);

                col.innerHTML = `
                <span class="short-text">${shortText}...</span>
                <span class="full-text hidden">${text}</span>
                <button class="show-more-btn">Show More</button>
            `;
            }
        });
    }

    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("show-more-btn")) {
            const button = event.target;
            const parentCol = button.parentElement;
            const shortTextEl = parentCol.querySelector(".short-text");
            const fullTextEl = parentCol.querySelector(".full-text");

            shortTextEl.classList.toggle("hidden");
            fullTextEl.classList.toggle("hidden");

            button.innerText = button.innerText === "Show More" ? "Show Less" : "Show More";
        }
    });

});

document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("compareFormModal");
    const btn = document.getElementById("search_form_button");
    const closeBtn = document.querySelector(".close");

    btn.addEventListener("click", function() {
        modal.style.display = "flex";
    });

    closeBtn.addEventListener("click", function() {
        modal.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});

