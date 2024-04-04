// this script displays the users chosen items from the kitchen unit configurator
// this version does not include 'style'
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

            localStorage.setItem(swatchType, JSON.stringify(selection));
            displaySelection(swatchType, selection);
        });
    });

    ['door', 'cabinet'].forEach(swatchType => {
        const savedSelection = localStorage.getItem(swatchType);
        if (savedSelection) {
            try {
                const selection = JSON.parse(savedSelection);
                displaySelection(swatchType, selection);
            } catch (e) {
                console.error('Error parsing saved selection:', e);
                localStorage.removeItem(swatchType);
            }
        }
    });
});

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
}