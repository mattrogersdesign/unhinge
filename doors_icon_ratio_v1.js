// Function to apply aspect ratio adjustments
function adjustAspectRatios() {
    document.querySelectorAll('.prod_card_wrap').forEach(grid => {
        const doorRatio = grid.querySelector('.door-ratio');
        const ratioH = grid.querySelector('.ratio-h');
        const ratioW = grid.querySelector('.ratio-w');

        if (doorRatio && ratioH && ratioW) {
            const maxWidth = 2540;
            const heightValue = parseInt(ratioH.innerText.trim(), 10);
            const widthValue = parseInt(ratioW.innerText.trim(), 10);
            const heightPercentage = (heightValue / maxWidth) * 100;
            
            doorRatio.style.aspectRatio = `${widthValue} / ${heightValue}`;
            doorRatio.style.height = `${heightPercentage}%`;
        }
    });
}

// Immediately adjust aspect ratios on page load
adjustAspectRatios();

// Observer callback to run when mutations are observed
const observerCallback = (mutationsList, observer) => {
    for(let mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            // Check if any of the added nodes are or contain .prod_card_wrap elements
            const addedProductItems = Array.from(mutation.addedNodes).some(node => 
                node.classList && node.classList.contains('prod_card_wrap') ||
                node.querySelector && node.querySelector('.prod_card_wrap')
            );

            // If .prod_card_wrap elements were added, adjust aspect ratios
            if(addedProductItems) {
                adjustAspectRatios();
            }
        }
    }
};

// Options for the observer (which mutations to observe)
const observerOptions = {
    childList: true, // Observe for additions or removals of children
    subtree: true    // Observe the descendants of the target node
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(observerCallback);

// Start observing the specific container for added/removed nodes
observer.observe(document.querySelector('.std_product_list_wrap'), observerOptions);