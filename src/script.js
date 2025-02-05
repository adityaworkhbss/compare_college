document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.querySelector('.add-third-seachbar');
    const searchBarContainer = document.querySelector('.compare-search-buttons');

    let searchBarCount = 1;

    addButton.addEventListener('click', function() {
        const newSearchBar = document.createElement('div');
        newSearchBar.classList.add('col-md-6', 'col-sm-12');
        newSearchBar.innerHTML = `
            <div class="compare-search-btn">
                <div class="college-icon">
                    <img src="https://edukyu.com//assets/cxp-assets/imgs/compare-colleges/college-icon.png" alt="college icon">
                </div>
                <span><i class="fas fa-search"></i></span>
                <input type="search" id="collegeSearch${searchBarCount}" placeholder="Search University">
                <ul id="suggestions${searchBarCount}" class="suggestions-list"></ul>
                <button class="remove-third-row">X</button>
            </div>
        `;

        searchBarContainer.insertBefore(newSearchBar, addButton.parentElement);
        searchBarCount++;

        // Add event listener to the remove button
        const removeButton = newSearchBar.querySelector('.remove-third-row');
        removeButton.addEventListener('click', function() {
            searchBarContainer.removeChild(newSearchBar);
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.check-box-list input[type="checkbox"]');
    const labels = document.querySelectorAll('.cxp-checkbox-inline');
    const selectAllCheckbox = document.querySelector('input[name="selectAll"]');
    const selectAllLabel = document.querySelector('.cxp-select-all');

    labels.forEach((label) => {
        const checkbox = label.querySelector('input[type="checkbox"]');

        label.addEventListener('click', (e) => {
            if (checkbox.name !== "selectAll") {
                label.classList.toggle('checked');
            }
        });
    });

    selectAllCheckbox.addEventListener('change', (e) => {
        const isChecked = e.target.checked;
        labels.forEach((label) => {
            const checkbox = label.querySelector('input[type="checkbox"]');
            checkbox.checked = isChecked;
            label.classList.toggle('checked', isChecked);
        });

        selectAllLabel.classList.toggle('checked', isChecked);
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll('.check-box-list input[type="checkbox"]');
    const selectAllCheckbox = document.querySelector('input[name="selectAll"]');

    // Change button color when clicked
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", function () {
            const label = this.closest('label');
            if (this.checked) {
                label.style.backgroundColor = "#d4edda"; // Light green for clicked
                label.style.border = "1px solid #28a745"; // Green border
                label.style.color = "#155724"; // Green text
            } else {
                label.style.backgroundColor = ""; // Reset background
                label.style.border = ""; // Reset border
                label.style.color = ""; // Reset text color
            }
        });
    });

    // Select all functionality
    selectAllCheckbox.addEventListener("change", function () {
        const isChecked = this.checked;
        checkboxes.forEach(checkbox => {
            checkbox.checked = isChecked;
            const label = checkbox.closest('label');
            if (isChecked) {
                label.style.backgroundColor = "#d4edda"; // Light green
                label.style.border = "1px solid #28a745"; // Green border
                label.style.color = "#155724"; // Green text
            } else {
                label.style.backgroundColor = ""; // Reset background
                label.style.border = ""; // Reset border
                label.style.color = ""; // Reset text color
            }
        });
    });
});
