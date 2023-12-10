function toggleSearchForm() {
    const searchForm = document.getElementById('searchForm');
    searchForm.style.display = searchForm.style.display === 'none' ? 'block' : 'none';
}
function openEditModal() {
    const editModal = document.getElementById('editModal');
    editModal.style.display = 'block';
}

function closeEditModal() {
    const editModal = document.getElementById('editModal');
    editModal.style.display = 'none';
}
async function searchOther() {
    try {
        const searchForm = document.getElementById('searchForm');
        const formData = new FormData(searchForm);

        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });

        const queryString = Object.keys(formDataObject)
            .filter(key => formDataObject[key] !== '')
            .map(key => `${key}=${encodeURIComponent(formDataObject[key])}`)
            .join('&');

        const response = await fetch(`http://localhost:3000/api/other/view?${queryString}`);
        const data = await response.json();

        if (response.ok) {
            // Clear existing other details
            clearOtherDetails();
            // Display the new other details
            displayOtherCards(data.others);
        } else {
            console.error(data);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

function clearOtherDetails() {
    const otherContainer = document.getElementById('otherContainer');
    otherContainer.innerHTML = '';
}

async function fetchOtherDetails() {
    try {
        const response = await fetch('http://localhost:3000/api/other/view');
        const data = await response.json();

        if (response.ok) {
            // Clear existing other details
            clearOtherDetails();
            // Display all other details
            displayOtherCards(data.user);
        } else {
            console.error(data);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

function editOther(id) {
    openEditModal();
    const editForm = document.getElementById('editForm');
    editForm.addEventListener('submit', event => updateOther(event, id));
}

function updateOther(event, id) {
    event.preventDefault();

    const editForm = document.getElementById('editForm');
    const formData = new FormData(editForm);

    const formDataObject = {};
    // select only those fields which have been edited
    formData.forEach((value, key) => {
        if (value !== '') {
            formDataObject[key] = value;
        }
    });

    fetch(`http://localhost:3000/api/other/edit/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataObject)
    })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                closeEditModal();
                fetchOtherDetails();
            } else {
                console.error(data);
            }
        })
        .catch(error => console.error('An error occurred:', error));
}

function deleteOther(id) {
    // create a two button for confirmation
    const confirmation = confirm('Are you sure you want to delete this entry?');
    if (!confirmation) {
        return;
    }
    fetch(`http://localhost:3000/api/other/delete/${id}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                fetchOtherDetails();
            } else {
                console.error(data);
            }
        })
        .catch(error => console.error('An error occurred:', error));
}

function createEditDeleteButtons(id) {
    const editDeleteButtonsDiv = document.createElement('div');
    editDeleteButtonsDiv.className = 'editDeleteButtons';

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => editOther(id));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteOther(id));

    editDeleteButtonsDiv.appendChild(editButton);
    editDeleteButtonsDiv.appendChild(deleteButton);

    return editDeleteButtonsDiv;
}

function displayOtherCards(others) {
    const otherContainer = document.getElementById('otherContainer');

    others.forEach(other => {
        const otherCard = document.createElement('div');
        otherCard.className = 'otherCard';

        otherCard.innerHTML = `
            <h2>${other.fname} ${other.mname} ${other.lname}</h2>
            <div class="otherInfo">
                <p><strong>Date of Visit:</strong> ${other.dateofVisit}</p>
                <p><strong>Mobile Number:</strong> ${other.mobileNo}</p>
                <p><strong>Reason of Visit:</strong> ${other.reasonOfVisit}</p>
                <p><strong>User ID:</strong>${other._id}</p>
            </div>
        `;

        const editDeleteButtons = createEditDeleteButtons(other._id);
        otherCard.appendChild(editDeleteButtons);

        otherContainer.appendChild(otherCard);
    });
}

// Fetch other details when the page loads
fetchOtherDetails();
