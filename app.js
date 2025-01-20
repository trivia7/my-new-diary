// Select form and container elements
const entryForm = document.getElementById('entry-form');
const entriesContainer = document.getElementById('entries-container');

// Array to hold diary entries and their comments
let diaryEntries = [];

// Save entries to local storage
function saveEntriesToLocalStorage() {
    localStorage.setItem('diaryEntries', JSON.stringify(diaryEntries));
}

// Load entries from local storage
function loadEntriesFromLocalStorage() {
    const savedEntries = localStorage.getItem('diaryEntries');
    if (savedEntries) {
        diaryEntries = JSON.parse(savedEntries);
    }
}

// Function to display entries
function displayEntries() {
    // Clear the container
    entriesContainer.innerHTML = '';

    // Loop through entries and add them to the container
    diaryEntries.forEach((entry, index) => {
        const entryDiv = document.createElement('div');
        entryDiv.className = 'bg-white p-6 shadow-md rounded-lg space-y-4';

        // Entry content
        entryDiv.innerHTML = `
            <p class="text-gray-800">${entry.text}</p>
            <small class="text-sm text-gray-500">
                <strong>By:</strong> ${entry.author} <br />
                <strong>Created on:</strong> ${entry.date}
            </small>
            <button 
                class="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg" 
                onclick="deleteEntry(${index})"
            >
                Delete
            </button>
            <div class="comments-section mt-4" id="comments-${index}">
                <h4 class="font-semibold text-lg">Comments</h4>
                <ul id="comment-list-${index}" class="space-y-2">
                    ${entry.comments
                        .map(
                            (comment) => `
                            <li class="bg-gray-50 p-3 rounded-md shadow-sm">
                                <p class="text-gray-800">${comment.text}</p>
                                <small class="text-sm text-gray-500">
                                    <strong>By:</strong> ${comment.author} <br />
                                    <strong>Commented on:</strong> ${comment.date}
                                </small>
                            </li>
                        `
                        )
                        .join('')}
                </ul>
                <form 
                    class="mt-4 space-y-2" 
                    onsubmit="addComment(event, ${index})"
                >
                    <input 
                        type="text" 
                        placeholder="Your Name" 
                        class="block w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" 
                        required
                    />
                    <textarea 
                        placeholder="Add a comment..." 
                        class="block w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" 
                        required
                    ></textarea>
                    <button 
                        type="submit" 
                        class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                    >
                        Comment
                    </button>
                </form>
            </div>
        `;

        entriesContainer.appendChild(entryDiv);
    });

    // Save the updated entries to local storage
    saveEntriesToLocalStorage();
}

// Function to handle form submission for diary entries
entryForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get the value of the author's name and the diary entry
    const authorName = document.getElementById('entry-author').value;
    const entryText = document.getElementById('entry-text').value;

    // Get the current date and time
    const currentDate = new Date();
    const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;

    // Add the entry to the array with an author, empty comments array, and creation date
    diaryEntries.push({ author: authorName, text: entryText, comments: [], date: formattedDate });

    // Clear the input fields
    document.getElementById('entry-author').value = '';
    document.getElementById('entry-text').value = '';

    // Update the display
    displayEntries();
});

// Function to delete an entry
function deleteEntry(index) {
    diaryEntries.splice(index, 1); // Remove the entry at the given index
    displayEntries(); // Update the display
}

// Function to add a comment
function addComment(event, entryIndex) {
    event.preventDefault();

    // Get the comment author's name and text
    const form = event.target;
    const authorName = form.querySelector('input[type="text"]').value;
    const commentText = form.querySelector('textarea').value;

    // Get the current date and time
    const currentDate = new Date();
    const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;

    // Add the comment to the corresponding entry
    diaryEntries[entryIndex].comments.push({ author: authorName, text: commentText, date: formattedDate });

    // Clear the input fields
    form.querySelector('input[type="text"]').value = '';
    form.querySelector('textarea').value = '';

    // Update the comments display
    displayEntries();
}

// Initialize the app
loadEntriesFromLocalStorage();
displayEntries();
