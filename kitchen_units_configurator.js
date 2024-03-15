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

// This script updates all select fields based on kitchen unit configurator
document.addEventListener('DOMContentLoaded', () => {
    function updateSelectField(groupName, selectedValue) {
        document.querySelectorAll(`select[data-selectfield="${groupName}"]`).forEach(select => {
            select.value = selectedValue;
            // Dispatch a 'change' event after updating the select value
            const event = new Event('change', { 'bubbles': true, 'cancelable': true });
            select.dispatchEvent(event); 

            localStorage.setItem(groupName, selectedValue);
        });
    }

    function applyStoredSelections() {
        document.querySelectorAll('select[data-selectfield]').forEach(select => {
            const groupName = select.getAttribute('data-selectfield');
            const storedSelection = localStorage.getItem(groupName);
            if (storedSelection) {
                select.value = storedSelection;
                // Dispatch a 'change' event to ensure consistency
                const event = new Event('change', { 'bubbles': true, 'cancelable': true });
                select.dispatchEvent(event);
            }
        });
    }

    function handleAttributeChange(mutationsList) {
        for (const mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-active') {
                const button = mutation.target;
                const groupName = button.getAttribute('data-btngroup');
                const selectedValue = button.textContent.trim();
                if (button.getAttribute('data-active') === "true") {
                    updateSelectField(groupName, selectedValue);
                }
            }
        }
    }

    const buttonObserver = new MutationObserver(handleAttributeChange);
    document.querySelectorAll('button[data-btngroup]').forEach(button => {
        buttonObserver.observe(button, { attributes: true });
    });

    applyStoredSelections();

    const observer = new MutationObserver((mutationsList, observer) => {
        let shouldApplySelections = false;
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList' && mutation.addedNodes.length) {
                shouldApplySelections = true;
                break;
            }
        }
        if (shouldApplySelections) {
            applyStoredSelections();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
});

// This script identifies when user has successfully completed kitchen unit configurator
document.addEventListener('DOMContentLoaded', function() {
    function restoreState() {
        ['door-colour', 'cabinet-colour', 'assembly'].forEach(group => {
            const isActive = localStorage.getItem(`tooltip-${group}`);
            if (isActive === 'true') {
                document.querySelector(`[data-tooltip="${group}"]`).style.display = 'none';
            }
        });
        checkAllSelected();
    }

    function updateStateAndHideTooltip(group) {
        localStorage.setItem(`tooltip-${group}`, 'true');
        document.querySelector(`[data-tooltip="${group}"]`).style.opacity = '0';
        checkAllSelected();
    }

    function checkAllSelected() {
        const allSelected = ['door-colour', 'cabinet-colour', 'assembly'].every(group => {
            return localStorage.getItem(`tooltip-${group}`) === 'true';
        });
        if (allSelected) {
            document.querySelector('.products_blocker').style.display = 'none';
            const shopUnits = document.getElementById('shop-units');
            if (shopUnits) {
                shopUnits.style.opacity = '1';
            }
        }
    }

	document.querySelectorAll('button[data-btngroup]').forEach(button => {
        button.addEventListener('click', function() {
            const group = this.getAttribute('data-btngroup');
            updateStateAndHideTooltip(group);
        });
    });

    restoreState();
});
