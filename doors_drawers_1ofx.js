(function() {
    // Unique prefix for localStorage to avoid conflicts
    const localStoragePrefix = 'DoorsDrawers_';

    // Encapsulated function to display the selection
    function displaySelection(swatchType, selection) {
        let targetElementSelector, chosenSwatchContainers, swatchLabels;

        switch (swatchType) {
            case 'door':
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

        // Check and display for "door" swatchType only
        const savedSelection = localStorage.getItem(localStoragePrefix + 'door');
        if (savedSelection) {
            try {
                const selection = JSON.parse(savedSelection);
                displaySelection('door', selection);
            } catch (e) {
                console.error('Error parsing saved selection:', e);
                localStorage.removeItem(localStoragePrefix + 'door');
            }
        }
    });
})();
