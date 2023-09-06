// Function to add a custom link
function addCustomLink(url, title) {
    const linkList = document.getElementById('linkList');
    const li = document.createElement('li');
    const a = document.createElement('a');
    const deleteButton = document.createElement('button');

    a.href = url;
    a.textContent = title;

    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';

    deleteButton.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this link?')) {
            const customLinks = JSON.parse(localStorage.getItem('customLinks')) || [];
            const updatedLinks = customLinks.filter(link => link.url !== url || link.title !== title);
            localStorage.setItem('customLinks', JSON.stringify(updatedLinks));
            li.remove();
        }
    });

    li.appendChild(a);
    li.appendChild(deleteButton);
    linkList.appendChild(li);
}

// Function to populate the list of custom links
function populateCustomLinks() {
    const customLinks = JSON.parse(localStorage.getItem('customLinks')) || [];

    for (const link of customLinks) {
        addCustomLink(link.url, link.title);
    }
}

// Function to save custom links to local storage
function saveCustomLinks(customLinks) {
    localStorage.setItem('customLinks', JSON.stringify(customLinks));
}

// Add event listener for the "Add Link" button
document.getElementById('addButton').addEventListener('click', () => {
    const urlInput = document.getElementById('url');
    const titleInput = document.getElementById('title');
    const url = urlInput.value.trim();
    const title = titleInput.value.trim();

    if (url !== '' && title !== '') {
        const customLinks = JSON.parse(localStorage.getItem('customLinks')) || [];
        customLinks.push({ url, title });
        saveCustomLinks(customLinks);
        addCustomLink(url, title);
        urlInput.value = '';
        titleInput.value = '';
    }
});

// Add event listener for the "Edit Links" button
document.getElementById('editButton').addEventListener('click', () => {
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => button.style.display = 'block');
});

// Initial population of custom links
populateCustomLinks();
