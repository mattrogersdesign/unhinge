document.addEventListener('DOMContentLoaded', function () {
    function updateSelectFields(selectClass, value) {
        const selects = document.querySelectorAll(selectClass);
        selects.forEach(select => {
            const option = Array.from(select.options).find(opt => opt.value === value);
            if (option) {
                select.value = value;
                // Trigger change event to ensure any listeners (including the third-party script) are notified
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
            // Ensure DOM is fully updated before attempting to update select fields
            requestAnimationFrame(() => updateSelectFields(selectClass, savedValue));
        }
    }

    // Unified MutationObserver setup to handle all select types
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
        // Observe changes in all select types; adjust or add more selectors as necessary
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

    attachButtonListeners('.color-btn', '.color-select', 'colorSelection');
    attachButtonListeners('.assembly-btn', '.assembly-select', 'assemblySelection');
    attachButtonListeners('.cabinet-color-btn', '.cabinet-color-select', 'cabinetColorSelection');

    // Setup observers for dynamically loaded content
    setupObservers();

    // Initial load for all select fields
    loadAndApplySelection('colorSelection', '.color-select');
    loadAndApplySelection('assemblySelection', '.assembly-select');
    loadAndApplySelection('cabinetColorSelection', '.cabinet-color-select');

    // Additional functionality for the "Load more" button
    const loadMoreButton = document.querySelector('.w-pagination-next.next');
    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', function() {
            waitForContentLoadAndApplySelections();
        });
    }

    function waitForContentLoadAndApplySelections() {
        const productContainer = document.querySelector('[data-products-container="all-products"]');
        const observer = new MutationObserver((mutations) => {
            let selectsToObserve = 0;
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // Element node
                        const dynamicSelects = node.querySelectorAll('.color-select, .assembly-select');
                        selectsToObserve += dynamicSelects.length;
                        dynamicSelects.forEach((select) => {
                            observeSelectOptions(select, () => {
                                selectsToObserve--;
                                if (selectsToObserve === 0) {
                                    // Apply selections once all dynamic selects have been populated
                                    loadAndApplySelection('colorSelection', '.color-select');
                                    loadAndApplySelection('assemblySelection', '.assembly-select');
                                    loadAndApplySelection('cabinetColorSelection', '.cabinet-color-select');
                                }
                            });
                        });
                    }
                });
            });
            if (selectsToObserve === 0) { // No dynamic selects found, disconnect
                observer.disconnect();
            }
        });

        observer.observe(productContainer, { childList: true, subtree: true });
    }

    function observeSelectOptions(selectElement, callback) {
        const optionsObserver = new MutationObserver((mutations) => {
            for (let mutation of mutations) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    optionsObserver.disconnect();
                    callback();
                    break;
                }
            }
        });

        optionsObserver.observe(selectElement, { childList: true });
    }

});
