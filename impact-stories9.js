// Create a variable for the API endpoint. In this example, we're accessing Xano's API
let xanoUrl = new URL('https://x8ki-letl-twmt.n7.xano.io/api:kH4I-Ysb/impact_stories');

// Define a function to get impact stories information
function getStories() {
    // Create a request variable and assign a new XMLHttpRequest object to it
    let request = new XMLHttpRequest();

    // Convert the URL object to a string
    let url = xanoUrl.toString();

    // Open a GET request to the URL
    request.open('GET', url, true);

    // Define what happens when the request loads
    request.onload = function() {
        // Parse the JSON response into a JavaScript object
        let data = JSON.parse(this.response);

        // Check if the request was successful
        if (request.status >= 200 && request.status < 400) {
            // Get the container where the cards will be placed
            const cardContainer = document.getElementById("impact-stories");

            // Get the template card element that will be cloned
            const templateCard = document.getElementById('story');

            // Loop through each story item returned by the API
            data.forEach(storyItem => {
                // Clone the template card
                const card = templateCard.cloneNode(true);

                // Remove the id attribute to avoid duplicate IDs
                card.removeAttribute('id');

                // Set the image source to the story image URL
                const img = card.getElementsByTagName('IMG')[0];
                img.src = storyItem.Story_Image_URL;
                img.srcset = storyItem.Story_Image_URL;

                // Set the text content of the h3 element to the story title
                const h3 = card.getElementsByTagName('H3')[0];
                h3.textContent = storyItem.Story_Title;

                // Append the cloned card to the container
                cardContainer.appendChild(card);
            });

            // Reinitialize Webflow interactions to ensure animations apply to the new elements
            Webflow.require('ix2').init(); 
        }
    };

    // Send the request to the API
    request.send();
}

// Run the getStories function when the document is ready
(function() {
    getStories();
})();
