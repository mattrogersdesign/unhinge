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