// Select form and container elements
const entryForm = document.getElementById('entry-form');
const entriesContainer = document.getElementById('entries-container');

// Array to hold diary entries and their comments
let diaryEntries = [];

// Function to display entries
function displayEntries() {
    // Clear the container
    entriesContainer.innerHTML = '';

    // Loop through entries and add them to the container
    diaryEntries.forEach((entry, index) => {
        const entryDiv = document.createElement('div');
        entryDiv.className = 'entry';

        // Entry content
        entryDiv.innerHTML = `
            <p>${entry.text}</p>
            <small><em>Created on: ${entry.date}</em></small>
            <button onclick="deleteEntry(${index})">Delete</button>
            <div class="comments-section" id="comments-${index}">
                <h4>Comments</h4>
                <ul id="comment-list-${index}">
                    ${entry.comments
                        .map(
                            (comment) => `
                            <li>
                                <p>${comment.text}</p>
                                <small><em>Commented on: ${comment.date}</em></small>
                            </li>
                        `
                        )
                        .join('')}
                </ul>
                <form onsubmit="addComment(event, ${index})">
                    <textarea placeholder="Add a comment..." required></textarea>
                    <button type="submit">Comment</button>
                </form>
            </div>
        `;

        entriesContainer.appendChild(entryDiv);
    });
}

// Function to handle form submission for diary entries
entryForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get the value of the textarea
    const entryText = document.getElementById('entry-text').value;

    // Get the current date and time
    const currentDate = new Date();
    const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;

    // Add the entry to the array with an empty comments array and the creation date
    diaryEntries.push({ text: entryText, comments: [], date: formattedDate });

    // Clear the textarea
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

    // Get the comment text
    const form = event.target;
    const commentText = form.querySelector('textarea').value;

    // Get the current date and time
    const currentDate = new Date();
    const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;

    // Add the comment to the corresponding entry
    diaryEntries[entryIndex].comments.push({ text: commentText, date: formattedDate });

    // Clear the textarea
    form.querySelector('textarea').value = '';

    // Update the comments display
    displayEntries();
}

// Initialize display
displayEntries();
