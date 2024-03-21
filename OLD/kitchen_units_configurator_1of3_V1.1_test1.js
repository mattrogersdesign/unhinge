(function() {
    // Unique prefix for localStorage to avoid conflicts
    const localStoragePrefix = 'uniquePrefix_';

    // Helper function to update SVG colors
    function updateSvgColors(matchColor, newColor) {
        document.querySelectorAll('svg').forEach(svg => {
            const paths = svg.querySelectorAll('path');
            paths.forEach(path => {
                if (path.getAttribute('fill') === matchColor) {
                    path.setAttribute('fill', newColor);
                }
            });
        });
    }

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

                // Update SVG colors based on swatch type
                if (swatchType === 'door') {
                    updateSvgColors('#d34242', selection.bgColor);
                } else if (swatchType === 'cabinet') {
                    updateSvgColors('#b0ff32', selection.bgColor);
                }
                break;
            default:
                console.error('Unrecognized swatch type:', swatchType);
        }
    }

    // Event listener for DOMContentLoaded
    document.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('button[data-swatch-btn]').forEach(button => {
            button.addEventListener('click', function() {
                const swatchType = this.getAttribute('data-swatch-type');
                const label = this.querySelector('.btn_colourway_label').textContent;

                let selection;
                const swatchName = this.getAttribute('data-swatch-name');
                const bgColor = this.style.backgroundColor;
                const dataTheme = this.getAttribute('data-theme');
                selection = { swatchName, bgColor, dataTheme, label };

                localStorage.setItem(localStoragePrefix + swatchType, JSON.stringify(selection));
                displaySelection(swatchType, selection);
            });
        });

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
