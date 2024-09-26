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
            // Sort stories by Sort_Order
            data.sort((a, b) => a.Sort_Order - b.Sort_Order);

            // Get the containers where the cards will be placed
            const cardContainer1 = document.getElementById("impact-stories");
            const cardContainer2 = document.getElementById("impact-stories2");

            // Get the template card element that will be cloned
            const templateCard = document.getElementById('story');

            // Get the base class from the template card
            const baseClass = templateCard.classList[0]; // Assume the base class is the first one

            // Define a function to append cloned cards to a container
            function appendCards(container, start, end) {
                for (let i = start; i < end; i++) {
                    let storyItem = data[i % data.length]; // Cycle through data if needed

                    // Clone the template card
                    const card = templateCard.cloneNode(true);

                    // Remove the id attribute since IDs must be unique
                    card.removeAttribute('id');

                    // Remove all classes and reassign only the base class
                    card.className = baseClass;

                    // Set IMG elements' src and srcset attributes
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

                    // Append the cloned card to the container
                    container.appendChild(card);
                }
            }

            // Append the first set of stories
            appendCards(cardContainer1, 0, 4);
            appendCards(cardContainer2, 4, 8);

            // Duplicate content to create a seamless marquee effect
            appendCards(cardContainer1, 0, 4); // Duplicate first set for seamless scrolling
            appendCards(cardContainer2, 4, 8); // Duplicate second set for seamless scrolling

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
