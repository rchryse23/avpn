// Create a variable for the API endpoint
let xanoUrl = new URL('https://rchryse23.github.io/avpn/avpn_impact-stories.json');

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

            // Get the container where the cards will be placed
            const cardContainer1 = document.getElementById("impact-stories");
            const cardContainer2 = document.getElementById("impact-stories2");

            // Get the template card element that will be cloned
            const templateCard = document.getElementById('story');

            // Get the base class from the template card
            const baseClass = templateCard.classList[0]; // Assume the base class is the first one

            // Loop through each story item returned by the API
            data.forEach((storyItem, index) => {
                // Clone the template card
                const card = templateCard.cloneNode(true);

                // Remove the id attribute since IDs must be unique
                card.removeAttribute('id');

                // Remove all classes and reassign only the base class
                card.className = baseClass;

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
                if (index < 4) {
                    cardContainer1.appendChild(card); // First 4 stories to impact-stories
                } else if (index >= 4 && index < 8) {
                    cardContainer2.appendChild(card); // Next 4 stories to impact-stories2
                }
            });

            // Reinitialize Webflow interactions to ensure animations apply to the new elements
            Webflow.require('ix2').init();

            // Set up Intersection Observer to animate cards when they come into view
            setupIntersectionObserver();
        }
    };

    // Send the request to the API
    request.send();
}

// Function to set up Intersection Observer for the cards
function setupIntersectionObserver() {
    // Create a new Intersection Observer instance
    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // If the card is in view
            if (entry.isIntersecting) {
                // Apply the fade-in animation to the card
                anime({
                    targets: entry.target,
                    opacity: [0, 1], // Fade-in effect
                    easing: "easeOutExpo",
                    duration: 1400
                });

                // Unobserve the card once it's been animated
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger animation when 10% of the card is visible
    });

    // Observe each card in both containers
    document.querySelectorAll('#impact-stories .story, #impact-stories2 .story').forEach(card => {
        observer.observe(card);
    });
}

// Run the getStories function when the document is ready
(function() {
    getStories();
})();
