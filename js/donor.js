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
async function searchDonor() {
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

        const response = await fetch(`http://localhost:3000/api/donor/view?${queryString}`);
        const data = await response.json();

        if (response.ok) {
            // Clear existing donor details
            clearDonorDetails();
            // Display the new donor details
            displayDonorCards(data.user);
        } else {
            console.error(data);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

function clearDonorDetails() {
    const donorContainer = document.getElementById('donorContainer');
    donorContainer.innerHTML = '';
}

async function fetchDonorDetails() {
    try {
        const response = await fetch('http://localhost:3000/api/donor/view');
        const data = await response.json();

        if (response.ok) {
            // Clear existing donor details
            clearDonorDetails();
            // Display all donor details
            displayDonorCards(data.user);
        } else {
            console.error(data);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

function editDonor(id) {
    openEditModal();
    const editForm = document.getElementById('editForm');
    editForm.addEventListener('submit', event => updateDonor(event, id));
}

function updateDonor(event, id) {
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

    fetch(`http://localhost:3000/api/donor/edit/${id}`, {
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
                fetchDonorDetails();
            } else {
                console.error(data);
            }
        })
        .catch(error => console.error('An error occurred:', error));
}

function deleteDonor(id) {
    // create a two button for confirmation
    const confirmation = confirm('Are you sure you want to delete this donor?');
    if (!confirmation) {
        return;
    }
    fetch(`http://localhost:3000/api/donor/delete/${id}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                fetchDonorDetails();
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
    editButton.addEventListener('click', () => editDonor(id));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteDonor(id));

    editDeleteButtonsDiv.appendChild(editButton);
    editDeleteButtonsDiv.appendChild(deleteButton);

    return editDeleteButtonsDiv;
}

function displayDonorCards(donors) {
    const donorContainer = document.getElementById('donorContainer');

    donors.forEach(donor => {
        const donorCard = document.createElement('div');
        donorCard.className = 'donorCard';

        donorCard.innerHTML = `
            <h2>${donor.fname} ${donor.mname} ${donor.lname}</h2>
            <div class="donorInfo">
                <div>
                    <p><strong>Date of Birth:</strong> ${donor.dob}</p>
                    <p><strong>Aadhar Card Number:</strong> ${donor.aadharCardNo}</p>
                    <p><strong>Address:</strong> ${donor.address}</p>
                </div>
                <div>
                    <p><strong>Mobile Number:</strong> ${donor.mobileNo}</p>
                    <p><strong>WhatsApp Number:</strong> ${donor.whatsappNo}</p>
                </div>
            </div>
            <div class="donorInfo">
                <div>
                    <p><strong>Date of Visit:</strong> ${donor.dateofVisit}</p>
                    <p><strong>Info of Donation:</strong> ${donor.infoOfDonation}</p>
                </div>
                <div>
                    <p><strong>Review:</strong> ${donor.review}</p>
                    <p><strong>User ID:</strong>${donor._id}</p>
                </div>
            </div>
        `;

        const editDeleteButtons = createEditDeleteButtons(donor._id);
        donorCard.appendChild(editDeleteButtons);

        donorContainer.appendChild(donorCard);
    });
}

// Fetch donor details when the page loads
fetchDonorDetails();
