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

                // Set the opacity to 0 initially to make the fade-in effect visible
                //card.style.opacity = '0';

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
        }
    };

    // Send the request to the API
    request.send();
}

// Run the getStories function when the document is ready
document.addEventListener('DOMContentLoaded', function() {
    getStories();
});

// Function to initialize the Intersection Observer and trigger the animation
function setupObserverForAnimation() {
  // Select the wrapper element
  const targetElement = document.querySelector('.review_impact_stories-wrapper');

  // Create an Intersection Observer instance
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      // Check if the wrapper element is in the viewport
      if (entry.isIntersecting) {
        // Run the anime.js timeline animation
        anime.timeline({ loop: false })
          .add({
            targets: '.review_impact_story',
            opacity: [0, 1], // Fade in effect
            easing: "easeOutExpo",
            duration: 1400,
            delay: anime.stagger(500), // Stagger the delay for each element
            
          });

        // Stop observing after the animation triggers once
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1 // Trigger when 10% of the target is in view
  });

  // Observe the wrapper element
  observer.observe(targetElement);
}

// Initialize the observer when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  setupObserverForAnimation();
});

