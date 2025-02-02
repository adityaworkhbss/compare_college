// function showModal() {
//     $('#modal-subscribe-compare').modal('show');
// }
// setTimeout(showModal, 10000);
//
// document.addEventListener('DOMContentLoaded', () => {
//     //  data for colleges
//     let collegeDetails = {};
//
//     fetch('colleges.json')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             collegeDetails = data;
//             console.log('College Details:', collegeDetails);
//         })
//         .catch(error => {
//             console.error('Error fetching the JSON file:', error);
//         });
//
//
//     // Initialize search bar
//     function setupSearchBar(inputId, suggestionsId, defaultCollege) {
//         const searchInput = document.getElementById(inputId);
//         const suggestionsList = document.getElementById(suggestionsId);
//
//         // Helper function to display suggestions
//         function displaySuggestions(filteredColleges) {
//             suggestionsList.innerHTML = '';
//             if (filteredColleges.length > 0) {
//                 suggestionsList.style.display = 'block';
//                 filteredColleges.forEach(college => {
//                     const listItem = document.createElement('li');
//                     listItem.textContent = college;
//                     listItem.addEventListener('click', () => {
//                         searchInput.value = college;
//                         suggestionsList.innerHTML = '';
//                         suggestionsList.style.display = 'none';
//                     });
//                     suggestionsList.appendChild(listItem);
//                 });
//             } else {
//                 suggestionsList.style.display = 'none';
//             }
//         }
//
//         // Set the default college as active
//         if (defaultCollege) {
//             searchInput.value = defaultCollege;
//         }
//
//         // Handle input event
//         searchInput.addEventListener('input', () => {
//             const query = searchInput.value.toLowerCase();
//
//             // Filter colleges based on input
//             const filteredColleges = Object.keys(collegeDetails)
//                 .filter(college => college.toLowerCase().includes(query))
//                 .sort(); // Sort alphabetically
//
//             displaySuggestions(filteredColleges);
//         });
//
//         // Handle focus event to show all universities
//         searchInput.addEventListener('focus', () => {
//             if (!searchInput.value.trim()) {
//                 const allColleges = Object.keys(collegeDetails).sort(); // Get all universities sorted alphabetically
//                 displaySuggestions(allColleges);
//             }
//         });
//
//         // Close suggestions when clicking outside
//         document.addEventListener('click', (e) => {
//             if (!searchInput.contains(e.target) && !suggestionsList.contains(e.target)) {
//                 suggestionsList.style.display = 'none';
//             }
//         });
//     }
//
//
//
//     // Setup search bars with default colleges
//     setupSearchBar('collegeSearch1', 'suggestions1', 'NMIMS University');
//     setupSearchBar('collegeSearch2', 'suggestions2', '');
//     setupSearchBar('collegeSearch3', 'suggestions3', '');
//
//
//
//     const compareButton = document.querySelector('.compare-btn button');
//     compareButton.addEventListener('click', () => {
//         const college1 = document.getElementById('collegeSearch1').value.trim();
//         const college2 = document.getElementById('collegeSearch2').value.trim();
//         const college3 = document.getElementById('collegeSearch3').value.trim();
//
//         // Example data structure for college details
//
//
//         // Store valid colleges and their details dynamically
//         const selectedColleges = [
//             { name: college1, details: collegeDetails[college1] },
//             { name: college2, details: collegeDetails[college2] },
//             { name: college3, details: collegeDetails[college3] }
//         ];
//
//         if (!selectedColleges.some(college => college.details)) {
//             alert('Please select at least one valid college from the list.');
//             return;
//         }
//
//         // Populate comparison details dynamically
//         document.querySelectorAll('.cxp-comparison-topic').forEach((topic) => {
//             const topicName = topic.querySelector('h4').textContent.trim();
//
//             // Select columns with either class
//             const columns = topic.nextElementSibling.querySelectorAll(
//                 ':is(.col-lg-4.col-xs-6.py-3, .col-lg-3.col-xs-4.py-3)'
//             );
//
//             selectedColleges.forEach((college, index) => {
//                 if (college.details) {
//                     if (topicName === "Colleges") {
//                         // Handle both text and image for Categories
//                         const img = columns[index]?.querySelector('img');
//                         const text = columns[index]?.querySelector('p');
//                         if (img) img.src = college.details[topicName]?.img || img.src; // Keep existing image if no update
//                         if (text) text.textContent = college.details[topicName]?.text || text.textContent; // Keep existing text if no update
//                     } else if (topicName === "Website") {
//                         // Handle the Website field (link update)
//                         const link = columns[index]?.querySelector('a');
//                         if (link) {
//                             const website = college.details[topicName] || null;
//                             link.href = website || '#';
//                             link.textContent = website || "N/A"; // Default text if no data
//                         }
//                     } else {
//                         // Handle other fields (text only)
//                         const text = columns[index]?.querySelector('p');
//                         if (text) text.textContent = college.details[topicName] || text.textContent; // Keep existing text if no update
//                     }
//                 }
//             });
//         });
//     });
//
//
//
//
// });
//
//
// // Function to compare and update containers dynamically
// function setupCompareButton() {
//     const compareButton = document.querySelector('.compare-btn button');
//
//     compareButton.addEventListener('click', () => {
//         toggleLearningMethodologyDisplay();
//         toggleWebsiteDisplay();
//         // toggleCategoryDisplay();
//         toggleAbbreviationDisplay();
//         toggleInstituteTypeDisplay();
//         toggleEstablishmentDisplay();
//         toggleAboutDisplay();
//         toggleFeesDisplay();
//         toggleDegreeDisplay();
//         toggleSpecialisationDisplay();
//         toggleReviewDisplay();
//         toggleDurationDisplay();
//         toggleRecommendationDisplay();
//         toggleAccreditationDisplay();
//         toggleEligibilityDisplay();
//
//
//
//         const college1 = document.getElementById('collegeSearch1').value.trim();
//         const college2 = document.getElementById('collegeSearch2').value.trim();
//         const college3 = document.getElementById('collegeSearch3').value.trim();
//
//         // Prepare selected colleges data
//         const selectedColleges = [
//             { name: college1, details: collegeDetails[college1] || null },
//             { name: college2, details: collegeDetails[college2] || null },
//             { name: college3, details: collegeDetails[college3] || null }
//         ];
//
//         // Clear all existing data from comparison containers
//         document.querySelectorAll('.cxp-comparison-topic').forEach((topic) => {
//             const topicName = topic.querySelector('h4').textContent.trim();
//
//             // Use :is() pseudo-class to match both class patterns
//             const columns = topic.nextElementSibling.querySelectorAll(
//                 ':is(.col-lg-4.col-xs-6.py-3, .col-lg-3.col-xs-4.py-3)'
//             );
//
//             columns.forEach((column) => {
//                 // Reset all containers initially
//                 const img = column.querySelector('img');
//                 const text = column.querySelector('p');
//                 if (img) img.src = ''; // Reset image source
//                 if (text) text.textContent = ''; // Reset text content
//             });
//
//             // Populate only the searched colleges' data
//             selectedColleges.forEach((college, index) => {
//                 const column = columns[index]; // Get the current column based on index
//
//                 if (college.details) {
//                     if (topicName === "Colleges") {
//                         // Update for Categories (image and text)
//                         const img = column.querySelector('img');
//                         const text = column.querySelector('p');
//                         if (img) img.src = college.details[topicName]?.img || '';
//                         if (text) text.textContent = college.details[topicName]?.text || '';
//                     } else {
//                         // Update for other topics (text only)
//                         const text = column.querySelector('p');
//                         if (text) text.textContent = college.details[topicName] || '';
//                     }
//                 }
//             });
//         });
//     });
// }
//
//
// const selectAllBtn = document.querySelector('.cxp-select-all input[type="checkbox"]');
// selectAllBtn.addEventListener('change', () => {
//     const isChecked = selectAllBtn.checked;
//     const checkboxes = document.querySelectorAll('.cxp-checkbox-inline input[type="checkbox"]:not(.cxp-select-all input)');
//     checkboxes.forEach(checkbox => {
//         checkbox.checked = isChecked;
//     });
// });
//
// document.querySelectorAll('.cxp-checkbox-inline input[type="checkbox"]:not(.cxp-select-all input)').forEach(checkbox => {
//     checkbox.addEventListener('change', () => {
//         const checkboxes = document.querySelectorAll('.cxp-checkbox-inline input[type="checkbox"]:not(.cxp-select-all input)');
//         const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);
//
//         // Update the "Select All" checkbox state
//         selectAllBtn.checked = allChecked;
//     });
// });
//
//
// selectAllBtn.addEventListener('click', () => {
//     const checkboxes = document.querySelectorAll('.cxp-checkbox-inline input[type="checkbox"]');
//     const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);
//
//     checkboxes.forEach(checkbox => {
//         checkbox.checked = !allChecked; // Toggle state
//     });
// });
//
// document.querySelectorAll('.cxp-checkbox-inline input[type="checkbox"]').forEach(checkbox => {
//     checkbox.addEventListener('change', function () {
//         if (this.checked) {
//             this.parentElement.style.backgroundColor = '#025e68';
//             this.parentElement.style.color = 'white';
//         } else {
//             this.parentElement.style.backgroundColor = 'transparent';
//             this.parentElement.style.color = 'black';
//         }
//     });
// });
//
//
// function updateCheckboxStyles() {
//     // Get all checkboxes inside .cxp-checkbox-inline
//     const checkboxes = document.querySelectorAll('.cxp-checkbox-inline input[type="checkbox"]');
//
//     checkboxes.forEach((checkbox) => {
//         const parentLabel = checkbox.parentElement; // Get the parent .cxp-checkbox-inline element
//
//         if (checkbox.checked) {
//             parentLabel.style.backgroundColor = '#025e68';
//             parentLabel.style.color = "#fff"
//         } else {
//             parentLabel.style.backgroundColor = ''; // Remove background when unchecked
//             parentLabel.style.color = "";
//         }
//     });
// }
//
// // Attach the function to all checkboxes
// document.addEventListener('DOMContentLoaded', () => {
//     const checkboxes = document.querySelectorAll('.cxp-checkbox-inline input[type="checkbox"]');
//
//     checkboxes.forEach((checkbox) => {
//         // Initial check to apply styles on page load
//         updateCheckboxStyles();
//
//         // Add an event listener for changes
//         checkbox.addEventListener('change', updateCheckboxStyles);
//     });
// });
//
//
//
// const learningCheckbox = document.querySelector('input[name="learning-methodology"]');
// const learningComparisonSection = document.querySelector('.cxp-comparison-learning');
// const website = document.querySelector('input[name="website"]');
// const websiteComparisonSection = document.querySelector('.cxp-comparison-website');
// const categoryCheckbox = document.querySelector('input[name="category"]');
// const categoryComparisonSection = document.querySelector('.cxp-compare-category');
// const abbreviationCheckbox = document.querySelector('input[name="abbreviation"]');
// const abbreviationComparisonSection = document.querySelector('.cxp-compare-Abbreviation');
// const instituteTypeCheckbox = document.querySelector('input[name="institute-type"]');
// const instituteTypeComparisonSection = document.querySelector('.cxp-compare-Institute');
// const establishmentCheckbox = document.querySelector('input[name="establishment"]');
// const establishmentComparisonSection = document.querySelector('.cxp-compare-Establishment');
// const aboutCheckbox = document.querySelector('input[name="about"]');
// const aboutComparisonSection = document.querySelector('.cxp-compare-about');
// const feesCheckbox = document.querySelector('input[name="fees"]');
// const feesComparisonSection = document.querySelector('.cxp-compare-Fees');
// const degreeCheckbox = document.querySelector('input[name="degree"]');
// const degreeComparisonSection = document.querySelector('.cxp-compare-Degree');
// const specialisationCheckbox = document.querySelector('input[name="specialisation"]');
// const specialisationComparisonSection = document.querySelector('.cxp-comparison-specialization');
// const reviewCheckbox = document.querySelector('input[name="review"]');
// const reviewComparisonSection = document.querySelector('.cxp-comparison-review');
// const durationCheckbox = document.querySelector('input[name="duration"]');
// const durationComparisonSection = document.querySelector('.cxp-compare-Duration');
// const recommendationCheckbox = document.querySelector('input[name="our-recommendation"]');
// const recommendationComparisonSection = document.querySelector('.cxp-comparison-recommendation');
// const accreditationCheckbox = document.querySelector('input[name="accreditation"]');
// const accreditationComparisonSection = document.querySelector('.cxp-comparison-Accrediation');
// const eligibilityCheckbox = document.querySelector('input[name="eligibility"]');
// const eligibilityComparisonSection = document.querySelector('.cxp-comparison-eligibility');
//
//
//
// function toggleEligibilityDisplay() {
//     if (eligibilityCheckbox.checked) {
//         eligibilityComparisonSection.style.display = 'block'; // Show the section
//     } else {
//         eligibilityComparisonSection.style.display = 'none'; // Hide the section
//     }
// }
//
// function toggleAccreditationDisplay() {
//     if (accreditationCheckbox.checked) {
//         accreditationComparisonSection.style.display = 'block'; // Show section if checked
//     } else {
//         accreditationComparisonSection.style.display = 'none'; // Hide section if unchecked
//     }
// }
// function toggleRecommendationDisplay() {
//     if (recommendationCheckbox.checked) {
//         recommendationComparisonSection.style.display = 'block'; // Show section if checked
//     } else {
//         recommendationComparisonSection.style.display = 'none'; // Hide section if unchecked
//     }
// }
// function toggleDurationDisplay() {
//     if (durationCheckbox.checked) {
//         durationComparisonSection.style.display = 'block'; // Show section if checked
//     } else {
//         durationComparisonSection.style.display = 'none'; // Hide section if unchecked
//     }
// }
//
// function toggleReviewDisplay() {
//     if (reviewCheckbox.checked) {
//         reviewComparisonSection.style.display = 'block'; // Show section if checked
//     } else {
//         reviewComparisonSection.style.display = 'none'; // Hide section if unchecked
//     }
// }
//
// function toggleSpecialisationDisplay() {
//     if (specialisationCheckbox.checked) {
//         specialisationComparisonSection.style.display = 'block'; // Show section if checked
//     } else {
//         specialisationComparisonSection.style.display = 'none'; // Hide section if unchecked
//     }
// };
//
// function toggleFeesDisplay() {
//     if (feesCheckbox.checked) {
//         feesComparisonSection.style.display = 'block'; // Show the section when checked
//     } else {
//         feesComparisonSection.style.display = 'none'; // Hide the section when unchecked
//     }
// };
// function toggleDegreeDisplay() {
//     if (degreeCheckbox.checked) {
//         degreeComparisonSection.style.display = 'block'; // Show the section when checked
//     } else {
//         degreeComparisonSection.style.display = 'none'; // Hide the section when unchecked
//     }
// };
//
//
// function toggleCategoryDisplay() {
//     const parentLabel = categoryCheckbox.parentElement; // Get the parent label element
//
//     if (categoryCheckbox.checked) {
//         categoryComparisonSection.style.display = 'block';
//         parentLabel.style.background = '#025e68'; // Change background color
//         parentLabel.style.color = '#fff'; // Change text color
//     } else {
//         categoryComparisonSection.style.display = 'none';
//         parentLabel.style.background = 'transparent'; // Reset background color
//         parentLabel.style.color = '#025e68'; // Reset text color
//     }
// };
//
// function toggleAbbreviationDisplay() {
//     if (abbreviationCheckbox.checked) {
//         abbreviationComparisonSection.style.display = 'block'; // Show section if checked
//     } else {
//         abbreviationComparisonSection.style.display = 'none'; // Hide section if unchecked
//     }
// };
//
// function toggleInstituteTypeDisplay() {
//     if (instituteTypeCheckbox.checked) {
//         instituteTypeComparisonSection.style.display = 'block'; // Show section if checked
//     } else {
//         instituteTypeComparisonSection.style.display = 'none'; // Hide section if unchecked
//     }
// };
// function toggleEstablishmentDisplay() {
//     if (establishmentCheckbox.checked) {
//         establishmentComparisonSection.style.display = 'block'; // Show section if checked
//     } else {
//         establishmentComparisonSection.style.display = 'none'; // Hide section if unchecked
//     }
// };
// function toggleAboutDisplay() {
//     if (aboutCheckbox.checked) {
//         aboutComparisonSection.style.display = 'block'; // Show section if checked
//     } else {
//         aboutComparisonSection.style.display = 'none'; // Hide section if unchecked
//     }
// };
//
//
//
//
// // Function to toggle the display of the "Learning Methodology" section
// function toggleLearningMethodologyDisplay() {
//     const parentLabel = learningCheckbox.parentElement; // Get the parent label element
//
//     if (learningCheckbox.checked) {
//         learningComparisonSection.style.display = 'block';
//
//     } else {
//         learningComparisonSection.style.display = 'none';
//
//     }
// }
//
//
// // Function to toggle the display of the "Website" section
// function toggleWebsiteDisplay() {
//     if (website.checked) {
//         websiteComparisonSection.style.display = 'block';
//     } else {
//         websiteComparisonSection.style.display = 'none';
//     }
// }
//
//
//
//
//
//
// function clearContainerData() {
//     // Sabhi containers ke andar ke data ko clear karenge
//     document.querySelectorAll('.cxp-comparison-topic').forEach((topic) => {
//         // Use :is() pseudo-class to select both class types
//         const columns = topic.nextElementSibling.querySelectorAll(
//             ':is(.col-lg-4.col-xs-6.py-3, .col-lg-3.col-xs-4.py-3)'
//         );
//
//         columns.forEach((column) => {
//             const img = column.querySelector('img');
//             const text = column.querySelector('p');
//             const link = column.querySelector('a');
//
//             // Image, text, aur link data ko clear karenge
//             if (img) img.src = ''; // Clear image source
//             if (text) text.textContent = ''; // Clear text content
//             if (link) {
//                 link.href = '#'; // Reset link to a placeholder
//                 link.textContent = ''; // Clear link text content
//             }
//         });
//     });
// }
//
//
// // Compare button ka click event
// document.querySelector('.compare-btn button').addEventListener('click', () => {
//     clearContainerData(); // Default data ko clear karega
// });
//
//
// function setupSearchBarforedit(inputId, suggestionsId) {
//     const searchInput = document.getElementById(inputId);
//     const suggestionsList = document.getElementById(suggestionsId);
//
//     // Event listener for input in the search bar
//     searchInput.addEventListener('input', () => {
//         const query = searchInput.value.trim().toLowerCase();
//         suggestionsList.innerHTML = '';  // Clear previous suggestions
//
//         if (query) {
//             // Filter college names based on the query (case-insensitive)
//             const filteredColleges = Object.keys(collegeDetails).filter(college =>
//                 college.toLowerCase().includes(query)
//             );
//
//             if (filteredColleges.length > 0) {
//                 suggestionsList.style.display = 'block'; // Show suggestions list
//                 filteredColleges.forEach(college => {
//                     const listItem = document.createElement('li');
//                     listItem.textContent = college;
//                     listItem.addEventListener('click', () => {
//                         searchInput.value = college;  // Set input value to selected college
//                         suggestionsList.innerHTML = '';  // Clear suggestions
//                         suggestionsList.style.display = 'none';  // Hide suggestions
//                     });
//                     suggestionsList.appendChild(listItem);  // Append the item to the suggestions list
//                 });
//             } else {
//                 suggestionsList.style.display = 'none';  // Hide suggestions if no match
//             }
//         } else {
//             suggestionsList.style.display = 'none';  // Hide suggestions if the query is empty
//         }
//     });
//
//     // Event listener to close the suggestions if the user clicks outside the input or suggestions list
//     document.addEventListener('click', (e) => {
//         if (!searchInput.contains(e.target) && !suggestionsList.contains(e.target)) {
//             suggestionsList.style.display = 'none';  // Hide suggestions if clicked outside
//         }
//     });
// }
//
// // Function to handle editable <p> and update containers
// const universityData = [
//     "Dy Patil University", "Amity University", "Manipal University", "NMIMS University",
//     "LPU Univerisity", "Shoolini Univerisity", "Uttaranchal Univerisity", "Sikkim Manipal University",
//     "Vivekanand Global University", "Jain Online University",
//     "Suresh Gyan Vihar", "Alagappa University -DDE", "IIM-Lucknow", "IIM calcutta",
//     "IGNOU", "Symbiosis-CDL", "IMT-CDL", "MIT-SDE", "ICFAI", "Annamalai University",
//     "XLRI", "SRM University"
// ];
//
// // Reusable dropdown element
// let dropdown = null;
//
// // Function to create dropdown dynamically
// function createDropdown() {
//     if (!dropdown) {
//         dropdown = document.createElement('ul');
//         dropdown.classList.add('dropdown-suggestions');
//         dropdown.style.position = 'absolute';
//         dropdown.style.background = '#fff';
//         dropdown.style.border = '1px solid #ccc';
//         dropdown.style.width = `200px`;
//         dropdown.style.padding = '5px 0';
//         dropdown.style.margin = '0';
//         dropdown.style.listStyle = 'none';
//         dropdown.style.zIndex = '1000';
//         dropdown.style.display = 'none';
//         dropdown.style.scroll = "auto",
//             dropdown.style.overflowY = "scroll";
//         dropdown.style.maxHeight = "200px";
//
//         document.body.appendChild(dropdown);
//     }
//     return dropdown;
// }
//
// // Main function
// function makeEditableAndUpdate() {
//     const updateIcons = document.querySelectorAll('.update-university-title');
//
//     updateIcons.forEach((icon, index) => {
//         icon.addEventListener('click', () => {
//             const parentBox = icon.closest('.compare-box-category');
//             const universityNameElement = parentBox.querySelector('p');
//             const oldValue = universityNameElement.textContent.trim();
//
//             const dropdown = createDropdown();
//             positionDropdown(universityNameElement, dropdown);
//             dropdown.innerHTML = ''; // Clear dropdown content
//
//             // Make the <p> tag editable
//             universityNameElement.contentEditable = "true";
//             universityNameElement.focus();
//
//             // Move cursor to the end of the text
//             moveCursorToEnd(universityNameElement);
//
//             // Show suggestions immediately, regardless of content
//             showSuggestions('', dropdown, (selectedValue) => {
//                 universityNameElement.textContent = selectedValue;
//                 finalizeUpdate(index, selectedValue, dropdown, universityNameElement);
//             });
//
//             // Event: Show suggestions as user types
//             universityNameElement.addEventListener('input', () => {
//                 const query = universityNameElement.textContent.trim();
//                 showSuggestions(query, dropdown, (selectedValue) => {
//                     universityNameElement.textContent = selectedValue;
//                     finalizeUpdate(index, selectedValue, dropdown, universityNameElement);
//                 });
//             });
//
//             // Event: Hide dropdown on blur
//             universityNameElement.addEventListener('blur', () => {
//                 setTimeout(() => {
//                     dropdown.style.display = 'none';
//                     universityNameElement.contentEditable = "false";
//                 }, 200);
//             });
//         });
//     });
// }
//
// // Function to show suggestions in dropdown
// function showSuggestions(query, dropdown, onSelect) {
//     dropdown.innerHTML = '';
//     const filteredData = universityData.filter(name =>
//         name.toLowerCase().includes(query.toLowerCase())
//     );
//
//     if (filteredData.length > 0) {
//         dropdown.style.display = 'block';
//         filteredData.forEach(name => {
//             const listItem = document.createElement('li');
//             listItem.textContent = name;
//             listItem.style.padding = '5px 10px';
//             listItem.style.cursor = 'pointer';
//
//             listItem.addEventListener('click', () => {
//                 onSelect(name);
//             });
//
//             dropdown.appendChild(listItem);
//         });
//     } else {
//         dropdown.style.display = 'none';
//     }
// }
// // Function to position the dropdown
// function positionDropdown(targetElement, dropdown) {
//     const rect = targetElement.getBoundingClientRect();
//     dropdown.style.top = `${rect.bottom + window.scrollY}px`;
//     dropdown.style.left = `${rect.left + window.scrollX}px`;
// }
//
// // Function to finalize the update after selecting from the dropdown
// function finalizeUpdate(index, value, dropdown, universityNameElement) {
//     universityNameElement.contentEditable = "false";
//     dropdown.style.display = 'none';
//
//     const searchInput = document.getElementById(`collegeSearch${index + 1}`);
//     if (searchInput) {
//         searchInput.value = value;
//     }
//     document.querySelector('.compare-btn button').click();
// }
//
// // Function to move cursor to the end of the editable text
// function moveCursorToEnd(element) {
//     const range = document.createRange();
//     const selection = window.getSelection();
//     range.selectNodeContents(element);
//     range.collapse(false); // Collapse to end
//     selection.removeAllRanges();
//     selection.addRange(range);
// }
//
// // Initialize
// makeEditableAndUpdate();
// // Example usage
// // makeEditableAndUpdate();
// setupCompareButton();
// // makeEditableAndUpdate();
//
// function adjustBoxHeights(section) {
//     // Select all .compare-details-box elements within the provided section
//     const boxes = section.querySelectorAll('.compare-details-box');
//
//     // Select the related `.cxp-comparison-topic` for this section
//     const topic = section.previousElementSibling;
//
//     // Reset heights to auto to calculate tallest box height dynamically
//     boxes.forEach(box => box.style.height = 'auto');
//     if (topic) topic.style.height = 'auto';
//
//     // Find the tallest box height
//     let maxHeight = 81; // Minimum height
//     boxes.forEach(box => {
//         const boxHeight = box.scrollHeight; // Get the full height of the content
//         if (boxHeight > maxHeight) {
//             maxHeight = boxHeight; // Update maxHeight if a taller box is found
//         }
//     });
//
//     // Apply the tallest height to all boxes within the section
//     boxes.forEach(box => {
//         box.style.height = maxHeight + 'px';
//     });
//
//     // Apply the same height to the .cxp-comparison-topic
//     if (topic) {
//         topic.style.height = maxHeight + 'px';
//     }
// }
//
// function initAdjustHeights() {
//     // Select all .compare-details containers
//     const sections = document.querySelectorAll('.compare-details');
//
//     // Adjust heights for each section independently
//     sections.forEach(section => adjustBoxHeights(section));
// }
// // Call the function initially to set equal heights for all sections
// initAdjustHeights();
//
// // Observe each .compare-details container for dynamic content changes
// const observer = new MutationObserver(() => {
//     initAdjustHeights();
// });
// document.querySelectorAll('.compare-details').forEach(section => {
//     observer.observe(section, { childList: true, subtree: true, characterData: true });
// });
//
//
// // show third searchbar
//
//
// let addThirdSearchbar = document.querySelector('.add');
// // let addThirdSearchbar = document.querySelector('.add');
// addThirdSearchbar.addEventListener('click', function () {
//     // Get the third search bar container
//     const searchBar3 = document.querySelector('#collegeSearch3').parentElement.parentElement;
//     addThirdSearchbar.style.display = "none";
//
//     // Show the third search bar
//     searchBar3.style.display = 'block';
//
//     // Get the first and second search bar containers
//     const searchBar1 = document.querySelector('#collegeSearch1').parentElement.parentElement;
//     const searchBar2 = document.querySelector('#collegeSearch2').parentElement.parentElement;
//
//     // Update classes for the first and second search bars
//     searchBar1.classList.remove('col-md-6');
//     searchBar1.classList.add('col-md-4');
//
//     searchBar2.classList.remove('col-md-6');
//     searchBar2.classList.add('col-md-4');
//
//     // Handle the third-searchbar-row logic
//     const hiddenRows = document.querySelectorAll('.third-searchbar-row');
//     hiddenRows.forEach(row => {
//         row.style.display = 'block'; // Make it visible
//     });
//
//     // Update classes for rows with col-lg-4 col-xs-6
//     const columns = document.querySelectorAll('.col-lg-4.col-xs-6');
//     columns.forEach(column => {
//         column.classList.remove('col-lg-4', 'col-xs-6');
//         column.classList.add('col-lg-3', 'col-xs-4');
//     });
//
//     // Update classes for rows with col-lg-4 col-12
//     const col12Elements = document.querySelectorAll('.col-lg-4.col-12');
//     col12Elements.forEach(element => {
//         element.classList.remove('col-lg-4');
//         element.classList.add('col-lg-3');
//     });
//
//
//     const compareUniLogos = document.querySelectorAll('.cxp-compare-uni-logo');
//     compareUniLogos.forEach(logo => {
//         // Check if the screen width is less than or equal to 768px
//         if (window.innerWidth <= 440) {
//             logo.style.left = '0px';
//         }
//         else {
//             logo.style.left = '70px';
//         }
//     });
//
// });
//
//
// let removeThirdSearchbar = document.querySelector('.remove-third-row');
// removeThirdSearchbar.addEventListener('click', function () {
//     // Get the third search bar container
//     const searchBar3 = document.querySelector('#collegeSearch3').parentElement.parentElement;
//     searchBar3.style.display = 'none'; // Hide the third search bar
//
//     // Reset add button visibility
//     addThirdSearchbar.style.display = "inline-block";
//
//     // Get the first and second search bar containers
//     const searchBar1 = document.querySelector('#collegeSearch1').parentElement.parentElement;
//     const searchBar2 = document.querySelector('#collegeSearch2').parentElement.parentElement;
//
//     // Reset classes for the first and second search bars
//     searchBar1.classList.remove('col-md-4');
//     searchBar1.classList.add('col-md-6');
//
//     searchBar2.classList.remove('col-md-4');
//     searchBar2.classList.add('col-md-6');
//
//     // Handle the third-searchbar-row logic
//     const hiddenRows = document.querySelectorAll('.third-searchbar-row');
//     hiddenRows.forEach(row => {
//         row.style.display = 'none'; // Hide the row
//     });
//
//     // Reset classes for rows with col-lg-3 col-xs-4
//     const columns = document.querySelectorAll('.col-lg-3.col-xs-4');
//     columns.forEach(column => {
//         column.classList.remove('col-lg-3', 'col-xs-4');
//         column.classList.add('col-lg-4', 'col-xs-6');
//     });
//
//     // Reset classes for rows with col-lg-3 col-12
//     const col12Elements = document.querySelectorAll('.col-lg-3.col-12');
//     col12Elements.forEach(element => {
//         element.classList.remove('col-lg-3');
//         element.classList.add('col-lg-4');
//     });
//
//     const compareUniLogos = document.querySelectorAll('.cxp-compare-uni-logo');
//     compareUniLogos.forEach(logo => {
//         // Check if the screen width is less than or equal to 768px
//         if (window.innerWidth <= 440) {
//             logo.style.left = '33px';
//         } else {
//             logo.style.left = '124px';
//         }
//     });
// });
