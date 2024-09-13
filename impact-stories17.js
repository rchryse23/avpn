// Create a variable for the API endpoint
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
            const cardContainer1 = document.getElementById("impact-stories");
            const cardContainer2 = document.getElementById("impact-stories2");

            // Get the template card element that will be cloned
            const templateCard = document.getElementById('story');

            // Loop through each story item returned by the API
            data.forEach((storyItem, index) => {
                // Clone the template card
                const card = templateCard.cloneNode(true);

                // Remove the id attribute since IDs must be unique
                card.removeAttribute('id');

                // Get all IMG elements within the cloned card and set their src and srcset attributes
                const imgs = card.getElementsByTagName('IMG');
                for (let i = 0; i < imgs.length; i++) {
                    imgs[i].src = storyItem.Story_Image_URL;
                    imgs[i].srcset = storyItem.Story_Image_URL;
                }

                // Set the text content of the h3 element to the story title
                const h3 = card.getElementsByTagName('H3')[0];
                h3.textContent = storyItem.Story_Title;

                // Set the text content of the first P element to the story description
                const p = card.getElementsByTagName('P')[0];
                p.textContent = storyItem.Story_Description;

                // Append the cloned card to the appropriate container
                if (index < 5) {
                    cardContainer1.appendChild(card); // First 5 stories to impact-stories
                } else if (index >= 5 && index < 9) {
                    cardContainer2.appendChild(card); // Next 4 stories to impact-stories2
                }
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
