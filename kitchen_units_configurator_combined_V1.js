document.addEventListener('DOMContentLoaded', function () {
    // Namespace for unique localStorage operations
    const storagePrefix = 'uniquePrefix_';

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

    // Initialize listeners for swatches and storage
    initSwatchesAndStorage();

    // Functions for handling selection updates and storage
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
            });
        });
    }

    function initSwatchesAndStorage() {
        ['door', 'cabinet'].forEach(swatchType => {
            const savedSelection = localStorage.getItem(storagePrefix + swatchType);
            if (savedSelection) {
                try {
                    const selection = JSON.parse(savedSelection);
                    displaySelection(swatchType, selection);
                } catch (e) {
                    console.error('Error parsing saved selection:', e);
                    localStorage.removeItem(storagePrefix + swatchType);
                }
            }
        });

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

    // Initialize tooltip restoration and observer setup
    restoreAndObserveTooltips();
    
    function restoreAndObserveTooltips() {
        ['door-colour', 'cabinet-colour', 'assembly'].forEach(group => {
            const isActive = localStorage.getItem(`tooltip-${group}`);
            if (isActive === 'true') {
                document.querySelector(`[data-tooltip="${group}"]`).style.display = 'none';
            }
        });

        document.querySelectorAll('button[data-btngroup]').forEach(button => {
            button.addEventListener('click', function() {
                const group = this.getAttribute('data-btngroup');
                localStorage.setItem(`tooltip-${group}`, 'true');
                document.querySelector(`[data-tooltip="${group}"]`).style.opacity = '0';
                checkAllSelected();
            });
        });

        function checkAllSelected() {
            const allSelected = ['door-colour', 'cabinet-colour', 'assembly'].every(group => localStorage.getItem(`tooltip-${group}`) === 'true');
            if (allSelected) {
                document.querySelector('.products_blocker').style.display = 'none';
                const shopUnits = document.getElementById('shop-units');
                if (shopUnits) {
                    shopUnits.style.opacity = '1';
                }
            }
        }
    }

    // Initial load of selections
    loadAndApplySelection('colorSelection', '.color-select');
    loadAndApplySelection('assemblySelection', '.assembly-select');
    loadAndApplySelection('cabinetColorSelection', '.cabinet-color-select');
});

