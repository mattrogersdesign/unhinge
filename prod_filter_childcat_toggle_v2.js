document.addEventListener('DOMContentLoaded', () => {
  // Initially hide all filter accord content, btn_clear_filters button, and show_results button
  const allContents = document.querySelectorAll('div[data-radio-content]');
  allContents.forEach(content => content.classList.remove('active'));

  const btnClearFilters = document.getElementById('btn_clear_filters');
  const btnClearFilters2 = document.getElementById('btn_clear_filters_2'); // Additional button
  const showResultsBtn = document.getElementById('show_results'); // New button for showing results

  // Hide on load
  btnClearFilters.style.display = 'none';
  btnClearFilters2.style.display = 'none';
  showResultsBtn.style.display = 'none'; // Also hide show_results button initially

  // Function to handle radio change
  const handleRadioChange = (e) => {
    const radioValue = e.target.parentNode.getAttribute('data-radio-btn');
    const correspondingContent = document.querySelector(`div[data-radio-content="${radioValue}"]`);

    // Hide all radio buttons
    document.querySelectorAll('label[data-radio-btn]').forEach(label => label.classList.add('hidden'));

    // Show corresponding content
    if (correspondingContent) {
      correspondingContent.classList.add('active');
    }

    // Get the text from the selected radio button's span and update the button text, preserving the icon
    const selectedRadioText = e.target.nextSibling.textContent;
    btnClearFilters.querySelector('span').textContent = selectedRadioText; // Only update the text part
    btnClearFilters.style.display = ''; // Show the button
    btnClearFilters2.style.display = ''; // Show the button
    showResultsBtn.style.display = ''; // Show the show_results button in sync
  };

  // Attach event listener to all radio buttons
  document.querySelectorAll('input[type="radio"][name="parent_group"]').forEach(radio => {
    radio.addEventListener('change', handleRadioChange);
  });

  // Custom clear filters logic encapsulated in a function
  function customClearFiltersLogic() {
    // Hide all contents
    allContents.forEach(content => {
      content.classList.remove('active');
      content.style.display = ''; // Clear the inline display style
    });

    // Show all radio labels
    document.querySelectorAll('label[data-radio-btn]').forEach(label => {
      label.classList.remove('hidden');
      setTimeout(() => label.style.display = '', 500); // Clear the inline display style after transition
    });

    // Hide the btn_clear_filters button and show_results button again
    btnClearFilters.style.display = 'none';
    btnClearFilters2.style.display = 'none';
    showResultsBtn.style.display = 'none'; // Also hide show_results button
  }

  // Create a custom event for clearing filters
  const customClearEvent = new CustomEvent('customClearFilters');

  // Listen for the custom event
  document.addEventListener('customClearFilters', customClearFiltersLogic);

  // Attach event listeners to both clear filter buttons
  [btnClearFilters, btnClearFilters2].forEach(btn => {
    btn.addEventListener('click', () => {
      // Dispatch the custom clear event after a slight delay to ensure any third-party actions are initiated first
      setTimeout(() => {
        document.dispatchEvent(customClearEvent);
      }, 10); // Adjust delay as needed to manage conflicts
      
      if (btn.id === 'btn_clear_filters_2') {
        // For btn_clear_filters_2, do not hide the button
        btn.style.display = ''; // Keep it visible
      } else {
        // For btn_clear_filters, hide the button
        btn.style.display = 'none';
      }
    });
  });
});