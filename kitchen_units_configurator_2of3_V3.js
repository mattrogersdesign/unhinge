document.addEventListener('DOMContentLoaded', function () {

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
        try {
            localStorage.setItem(key, value);
        } catch (e) {
            console.error("Error saving to localStorage", e);
        }
    }

    function loadAndApplySelection(key, selectClass) {
        let savedValue = null;
        try {
            savedValue = localStorage.getItem(key);
        } catch (e) {
            console.error("Error loading from localStorage", e);
        }
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

    function setupObservers() {
        const config = { childList: true, subtree: true };
        document.querySelectorAll('[data-products-container]').forEach(container => {
            const observer = new MutationObserver(mutations => {
                mutations.forEach(mutation => {
                    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                        mutation.addedNodes.forEach(node => {
                            if (node.nodeType === Node.ELEMENT_NODE) {
                                // Directly load and apply selections if new products are detected
                                loadAndApplySelection('colorSelection', '.color-select');
                                loadAndApplySelection('assemblySelection', '.assembly-select');
                                loadAndApplySelection('cabinetColorSelection', '.cabinet-color-select');
                            }
                        });
                    }
                });
            });

            observer.observe(container, config);
        });
    }

    attachButtonListeners('.color-btn', '.color-select', 'colorSelection');
    attachButtonListeners('.assembly-btn', '.assembly-select', 'assemblySelection');
    attachButtonListeners('.cabinet-color-btn', '.cabinet-color-select', 'cabinetColorSelection');

    setupObservers();

    // Initial load
    loadAndApplySelection('colorSelection', '.color-select');
    loadAndApplySelection('assemblySelection', '.assembly-select');
    loadAndApplySelection('cabinetColorSelection', '.cabinet-color-select');
});
