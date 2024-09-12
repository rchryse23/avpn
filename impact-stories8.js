// Define the API endpoint URL for Xano
const xanoUrl = 'https://x8ki-letl-twmt.n7.xano.io/api:kH4I-Ysb/impact_stories';

// Function to fetch and display impact stories from Xano API
function getStories() {
    // Create a new XMLHttpRequest object to interact with the API
    const request = new XMLHttpRequest();

    // Open a GET request to the Xano API endpoint
    request.open('GET', xanoUrl, true);

    // Define the function to run when the API request completes
    request.onload = function() {
        // Parse the API response into a JavaScript object
        const data = JSON.parse(this.response);

        // Check if the request was successful
        if (request.status >= 200 && request.status < 400) {
            // Get the container element where the stories will be displayed
            const cardContainer = document.getElementById('impact-stories');

            // Get the template card element
            const cardTemplate = document.getElementById('story');

            // Loop through each story item in the API response
            data.forEach(storyItem => {
                // Clone the template card element, including all its children
                const card = cardTemplate.cloneNode(true);

                // Remove the id from the cloned element
                card.removeAttribute('id');

                // Update the card's image source
                const img = card.querySelector('img');
                img.src = storyItem.Story_Image_URL;
                img.srcset = storyItem.Story_Image_URL;

                // Update the card's title
                const h3 = card.querySelector('h3');
                h3.textContent = storyItem.Story_Title;

                // Append the cloned card to the container
                cardContainer.appendChild(card);
            });
        }
    };

    // Send the API request
    request.send();
}

// Execute the function when the document is ready
document.addEventListener('DOMContentLoaded', getStories);
