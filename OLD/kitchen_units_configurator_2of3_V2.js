document.addEventListener('DOMContentLoaded', function () {
    // Function definitions remain unchanged
    function updateSelectFields(selectClass, value) {
        const selects = document.querySelectorAll(selectClass);
        selects.forEach(select => {
            const option = Array.from(select.options).find(opt => opt.value === value);
            if (option) {
                select.value = value;
                select.dispatchEvent(new Event('change', { 'bubbles': true }));
            }
        });
    }

    function saveSelection(key, value) {
        localStorage.setItem(key, value);
    }

    function loadAndApplySelection(key, selectClass) {
        const savedValue = localStorage.getItem(key);
        if (savedValue) {
            requestAnimationFrame(() => updateSelectFields(selectClass, savedValue));
        }
    }

    function setupObservers() {
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    loadAndApplySelection('colorSelection', '.color-select');
                    loadAndApplySelection('assemblySelection', '.assembly-select');
                    loadAndApplySelection('cabinetColorSelection', '.cabinet-color-select');
                }
            });
        });

        const config = { childList: true, subtree: true };
        ['.color-select', '.assembly-select', '.cabinet-color-select'].forEach(selectClass => {
            document.querySelectorAll(selectClass).forEach(select => observer.observe(select, config));
        });
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

    // Modification: Generalized content load handling
    function setupProductContainerObserver() {
        const productContainer = document.querySelector('[data-products-container]');
        if (!productContainer) return;

        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.addedNodes.length > 0) {
                    // New products have been added
                    loadAndApplySelection('colorSelection', '.color-select');
                    loadAndApplySelection('assemblySelection', '.assembly-select');
                    loadAndApplySelection('cabinetColorSelection', '.cabinet-color-select');
                }
            });
        });

        observer.observe(productContainer, { childList: true, subtree: true });
    }

    attachButtonListeners('.color-btn', '.color-select', 'colorSelection');
    attachButtonListeners('.assembly-btn', '.assembly-select', 'assemblySelection');
    attachButtonListeners('.cabinet-color-btn', '.cabinet-color-select', 'cabinetColorSelection');

    setupObservers();

    loadAndApplySelection('colorSelection', '.color-select');
    loadAndApplySelection('assemblySelection', '.assembly-select');
    loadAndApplySelection('cabinetColorSelection', '.cabinet-color-select');

    // Call generalized observer setup to monitor the products container
    setupProductContainerObserver();
});
