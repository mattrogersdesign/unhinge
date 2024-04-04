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

    // Observer setup for detecting changes in select fields
    function setupObservers() {
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    loadAndApplySelection('colorSelection', '.color-select');
                }
            });
        });

        const config = { childList: true, subtree: true };
        document.querySelectorAll('.color-select').forEach(select => {
            observer.observe(select, config);
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

    // Generalized content load handling removed for simplicity as it's not needed without multiple selections

    attachButtonListeners('.color-btn', '.color-select', 'colorSelection');
    setupObservers();
    loadAndApplySelection('colorSelection', '.color-select');
});