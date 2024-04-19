document.addEventListener('DOMContentLoaded', function () {
    const storagePrefix = 'uniquePrefix_';

    // Manage display of selections
    function displaySelection(swatchType, selection) {
        let targetElementSelector = `.chosen_colourway_swatch[data-active-swatch="${swatchType}"]`;
        let chosenSwatchContainers = document.querySelectorAll(`${targetElementSelector} .chosen_swatch_container`);
        let swatchLabels = document.querySelectorAll(`${targetElementSelector} .swatch_label`);
        
        chosenSwatchContainers.forEach((container, index) => {
            if (container) {
                container.style.backgroundColor = selection.bgColor;
                container.setAttribute('data-theme', selection.dataTheme);
            }
            if (swatchLabels[index]) {
                swatchLabels[index].textContent = selection.label;
            }
        });
    }

    // Initialize listeners for swatches and storage
    initSwatchesAndStorage();

    function updateSelectFields(selectClass, value) {
        document.querySelectorAll(selectClass).forEach(select => {
            const option = Array.from(select.options).find(opt => opt.value === value);
            if (option) {
                select.value = value;
                select.dispatchEvent(new Event('change', { 'bubbles': true }));
            }
        });
    }

    function saveSelection(key, value) {
        localStorage.setItem(storagePrefix + key, value);
    }

    function loadAndApplySelection(key, selectClass) {
        let savedValue = localStorage.getItem(storagePrefix + key);
        if (savedValue) {
            requestAnimationFrame(() => updateSelectFields(selectClass, savedValue));
        }
    }

    function attachButtonListeners(buttonClass, selectClass, storageKey) {
        document.querySelectorAll(buttonClass).forEach(button => {
            button.addEventListener('click', function() {
                const value = this.getAttribute('data-value');
                updateSelectFields(selectClass, value);
                saveSelection(storageKey, value);
                checkAllSelected(); // Ensure we check the overall state after each update
            });
        });
    }

    function initSwatchesAndStorage() {
        document.querySelectorAll('button[data-swatch-btn]').forEach(button => {
            button.addEventListener('click', function() {
                const swatchType = this.getAttribute('data-swatch-type');
                const label = this.querySelector('.btn_colourway_label').textContent;
                let selection = {
                    swatchName: this.getAttribute('data-swatch-name'),
                    bgColor: this.style.backgroundColor,
                    dataTheme: this.getAttribute('data-theme'),
                    label: label
                };
                saveSelection(swatchType, JSON.stringify(selection));
                displaySelection(swatchType, selection);
            });
        });

        attachButtonListeners('.color-btn', '.color-select', 'colorSelection');
        attachButtonListeners('.assembly-btn', '.assembly-select', 'assemblySelection');
        attachButtonListeners('.cabinet-color-btn', '.cabinet-color-select', 'cabinetColorSelection');
    }

    function checkAllSelected() {
        const allSelected = ['door-colour', 'cabinet-colour', 'assembly'].every(group => localStorage.getItem(`tooltip-${group}`) === 'true');
        if (allSelected) {
            document.querySelector('.products_blocker').style.display = 'none';
        } else {
            document.querySelector('.products_blocker').style.display = 'block'; // Ensure blocker is shown if not all selected
        }
    }

    function restoreAndObserveTooltips() {
        ['door-colour', 'cabinet-colour', 'assembly'].forEach(group => {
            const isActive = localStorage.getItem(`tooltip-${group}`);
            if (isActive === 'true') {
                document.querySelector(`[data-tooltip="${group}"]`).style.opacity = '0';
            }
        });

        document.querySelectorAll('button[data-btngroup]').forEach(button => {
            button.addEventListener('click', function() {
                const group = this.getAttribute('data-btngroup');
                localStorage.setItem(`tooltip-${group}`, 'true');
                document.querySelector(`[data-tooltip="${group}"]`).style.opacity = '0';
                checkAllSelected(); // Ensure we update the display state after changing tooltip states
            });
        });

        checkAllSelected(); // Perform an initial check to update UI based on stored states
    }

    // Initial load of selections
    loadAndApplySelection('colorSelection', '.color-select');
    loadAndApplySelection('assemblySelection', '.assembly-select');
    loadAndApplySelection('cabinetColorSelection', '.cabinet-color-select');
    restoreAndObserveTooltips();
});
