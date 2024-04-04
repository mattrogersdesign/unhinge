(function() {
    // Global configuration for localStorage to avoid conflicts
    const localStorageConfig = {
        prefix: 'uniquePrefix_',
        getKey: function(key) {
            return this.prefix + key;
        }
    };

    // Function to handle display selection logic
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

    // Function to handle the application of stored selections from localStorage
    function applyStoredSelections(prefix) {
        document.querySelectorAll('select[data-selectfield], button[data-btngroup]').forEach(element => {
            const key = prefix + (element.getAttribute('data-selectfield') || element.getAttribute('data-btngroup'));
            const storedValue = localStorage.getItem(key);
            if (storedValue) {
                if (element.tagName.toLowerCase() === 'select') {
                    element.value = storedValue;
                    element.dispatchEvent(new Event('change', { 'bubbles': true, 'cancelable': true }));
                } else if (element.getAttribute('data-btngroup')) {
                    // Additional logic if needed for button elements
                }
            }
        });
    }

    // Initialization and event binding
    function init() {
        // Load and apply stored selections on DOMContentLoaded
        applyStoredSelections(localStorageConfig.prefix);

        // Event listeners for updates
        document.querySelectorAll('button[data-swatch-btn], select[data-selectfield]').forEach(element => {
            element.addEventListener(element.tagName.toLowerCase() === 'select' ? 'change' : 'click', function(event) {
                let key, value;
                if (this.tagName.toLowerCase() === 'button') {
                    const swatchType = this.getAttribute('data-swatch-type');
                    const label = this.querySelector('.btn_colourway_label').textContent;
                    let selection = {
                        swatchName: this.getAttribute('data-swatch-name'),
                        bgColor: this.style.backgroundColor,
                        dataTheme: this.getAttribute('data-theme'),
                        label
                    };
                    key = localStorageConfig.getKey(swatchType);
                    value = JSON.stringify(selection);
                    displaySelection(swatchType, selection);
                } else {
                    key = localStorageConfig.getKey(this.getAttribute('data-selectfield'));
                    value = this.value;
                }
                localStorage.setItem(key, value);
            });
        });

        // Observe mutations for dynamic changes
        const observer = new MutationObserver(mutationsList => {
            mutationsList.forEach(mutation => {
                if (mutation.type === 'childList' && mutation.addedNodes.length) {
                    applyStoredSelections(localStorageConfig.prefix);
                }
            });
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    document.addEventListener('DOMContentLoaded', init);
})();
