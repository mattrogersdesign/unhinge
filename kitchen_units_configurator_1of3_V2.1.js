(function() {
    // Unique prefix for localStorage to avoid conflicts
    const localStoragePrefix = 'uniquePrefix_';

    // Encapsulated function to display the selection
    function displaySelection(swatchType, selection) {
        let targetElementSelector, chosenSwatchContainers, swatchLabels;

        switch (swatchType) {
            case 'door':
            case 'cabinet':
                targetElementSelector = `.chosen_colourway_swatch[data-active-swatch="${swatchType}"]`;
                chosenSwatchContainers = document.querySelectorAll(`${targetElementSelector} .chosen_swatch_container`);
                swatchLabels = document.querySelectorAll(`${targetElementSelector} .swatch_label`);

                chosenSwatchContainers.forEach((container, index) => {
                    if (container) {
                        container.style.backgroundColor = selection.bgColor;
                        container.setAttribute('data-theme', selection.dataTheme);
                    }
                    if (swatchLabels[index]) {
                        swatchLabels[index].textContent = selection.label;
                    }
                });
                break;
            default:
                console.error('Unrecognized swatch type:', swatchType);
        }

        // Call updateSvgColor here to ensure real-time updates
        updateSvgColor(swatchType, selection.bgColor);
    }

    // Function to update SVG color based on swatch type
    function updateSvgColor(swatchType, color) {
        const svgs = document.querySelectorAll('svg');
        if (!svgs.length) return; // Exit if no SVG found

        svgs.forEach(svg => {
            // Define the color targets based on swatch type
            const colorTarget = swatchType === 'door' ? '#d34242' : '#b0ff32';
            const paths = svg.querySelectorAll(`[style*="fill:${colorTarget}"]`);
            paths.forEach(path => {
                // Update the fill color
                path.style.fill = color;
            });
        });
    }

    // Event listener for DOMContentLoaded
    document.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('button[data-swatch-btn]').forEach(button => {
            button.addEventListener('click', function() {
                const swatchType = this.getAttribute('data-swatch-type');
                const label = this.querySelector('.btn_colourway_label').textContent;

                const selection = {
                    swatchName: this.getAttribute('data-swatch-name'),
                    bgColor: this.style.backgroundColor,
                    dataTheme: this.getAttribute('data-theme'),
                    label: label
                };

                localStorage.setItem(localStoragePrefix + swatchType, JSON.stringify(selection));
                displaySelection(swatchType, selection);
            });
        });

        // Apply saved selections for instant update on DOM load without reload
        ['door', 'cabinet'].forEach(swatchType => {
            const savedSelection = localStorage.getItem(localStoragePrefix + swatchType);
            if (savedSelection) {
                try {
                    const selection = JSON.parse(savedSelection);
                    displaySelection(swatchType, selection);
                } catch (e) {
                    console.error('Error parsing saved selection:', e);
                    localStorage.removeItem(localStoragePrefix + swatchType);
                }
            }
        });
    });
})();