// Function to update the container opacity based on result count
function updateContainerOpacity() {
  document.querySelectorAll('.option_results_span').forEach(span => {
    const resultCount = parseInt(span.textContent, 10);
    const container = span.closest('.btn_form_filter');

    if (resultCount === 0) {
      container.style.opacity = '0.2';
    } else {
      container.style.opacity = '1';
    }
  });
}

// Initialize MutationObserver to watch for changes in result counts
function observeResultChanges() {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList' || mutation.type === 'characterData') {
        updateContainerOpacity();
      }
    });
  });

  const config = { childList: true, subtree: true, characterData: true };
  const resultSpans = document.querySelectorAll('.option_results_span');

  resultSpans.forEach(span => {
    observer.observe(span, config);
  });
}

// Start observing when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  observeResultChanges();
  updateContainerOpacity(); // Initial check on page load
});