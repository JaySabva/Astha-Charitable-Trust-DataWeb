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
function toggleSearchForm() {
    const searchForm = document.getElementById('searchForm');
    searchForm.style.display = searchForm.style.display === 'none' ? 'block' : 'none';
}
async function searchLabharthi() {
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

        const response = await fetch(`https://aastha-charitable-trust.onrender.com/api/labharthi/view?${queryString}`);
        const data = await response.json();

        if (response.ok) {
            // Clear existing labharthi details
            clearLabharthiDetails();
            // Display the new labharthi details
            displayLabharthiCards(data.users);
        } else {
            console.error(data);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

function clearLabharthiDetails() {
    const labharthiContainer = document.getElementById('labharthiContainer');
    labharthiContainer.innerHTML = ''; // Remove all child elements
}

async function fetchLabharthiDetails() {
    try {
        const response = await fetch('https://aastha-charitable-trust.onrender.com/api/labharthi/view');
        const data = await response.json();

        if (response.ok) {
            // Clear existing labharthi details
            clearLabharthiDetails();
            // Display all labharthi details
            displayLabharthiCards(data.users);
        } else {
            console.error(data);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

function editLabharthi(id) {
    openEditModal();
    const editForm = document.getElementById('editForm');
    editForm.addEventListener('submit', event => updateLabharthi(event, id));
}

function updateLabharthi(event, id) {
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

    fetch(`https://aastha-charitable-trust.onrender.com/api/labharthi/edit/${id}`, {
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
                fetchLabharthiDetails();
            } else {
                console.error(data);
            }
        })
        .catch(error => console.error('An error occurred:', error));
}

function deleteLabharthi(id) {
    // create a two button for confirmation
    const confirmation = confirm('Are you sure you want to delete this labharthi?');
    if (!confirmation) {
        return;
    }
    fetch(`https://aastha-charitable-trust.onrender.com/api/labharthi/delete/${id}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                fetchLabharthiDetails();
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
    editButton.addEventListener('click', () => editLabharthi(id));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteLabharthi(id));

    editDeleteButtonsDiv.appendChild(editButton);
    editDeleteButtonsDiv.appendChild(deleteButton);

    return editDeleteButtonsDiv;
}

function displayLabharthiCards(users) {
    const labharthiContainer = document.getElementById('labharthiContainer');

    users.forEach(user => {
        const labharthiCard = document.createElement('div');
        labharthiCard.className = 'labharthiCard';

        labharthiCard.innerHTML = `
                        <h2>${user.fname} ${user.mname} ${user.lname}</h2>
                        <div class="labharthiInfo">
                            <div>
                                <p><strong>First Name:</strong> ${user.fname}</p>
                                <p><strong>Middle Name:</strong> ${user.mname}</p>
                                <p><strong>Last Name:</strong> ${user.lname}</p>
                                <p><strong>Reference Name:</strong> ${user.referenceName}</p>
                                <p><strong>Date of Birth:</strong> ${user.dob}</p>
                                <p><strong>Aadhar Card Number:</strong> ${user.aadharCardNo}</p>
                                <p><strong>Address:</strong> ${user.address}</p>
                                <p><strong>Type of Disability:</strong> ${user.typeofDisability}</p>
                                <p><strong>Percentage of Disability:</strong> ${user.precentageOfDisability}</p>
                            </div>
                            <div>
                                <p><strong>Mobile Number:</strong> ${user.mobileNo}</p>
                                <p><strong>Date of Visit:</strong> ${user.dateofVisit}</p>
                                <p><strong>Purpose of Visit:</strong> ${user.purposeofVisit}</p>
                                <p><strong>Help Type:</strong> ${user.help.help}</p>
                                <p><strong>Help Organization:</strong> ${user.help.helpOrganization}</p>
                                <p><strong>Help Date:</strong> ${user.help.helpDate}</p>
                                <p><strong>User ID:</strong>${user._id}</p>
                            </div>
                        </div>
                        <div class="labharthiInfo">
                            <div>

                            </div>
                        </div>
                    `;
        const editDeleteButtons = createEditDeleteButtons(user._id);
        labharthiCard.appendChild(editDeleteButtons);

        labharthiContainer.appendChild(labharthiCard);
    });
}


// Fetch labharthi details when the page loads
fetchLabharthiDetails();