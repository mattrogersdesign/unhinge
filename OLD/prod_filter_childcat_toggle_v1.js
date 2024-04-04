document.addEventListener('DOMContentLoaded', () => {
  // Initially hide all filter accord content and btn_clear_filters button
  const allContents = document.querySelectorAll('div[data-radio-content]');
  allContents.forEach(content => content.classList.remove('active'));

  const btnClearFilters = document.getElementById('btn_clear_filters');
  btnClearFilters.style.display = 'none'; // Hide on load

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

    // Hide the btn_clear_filters button again
    btnClearFilters.style.display = 'none';
  }

  // Create a custom event for clearing filters
  const customClearEvent = new CustomEvent('customClearFilters');

  // Listen for the custom event
  document.addEventListener('customClearFilters', customClearFiltersLogic);

  // If you need to programmatically trigger the clear filters action from your existing button,
  // without removing the third-party function, you could add a click listener that dispatches the custom event.
  document.getElementById('btn_clear_filters').addEventListener('click', () => {
    // Dispatch the custom clear event after a slight delay to ensure any third-party actions are initiated first
    setTimeout(() => {
      document.dispatchEvent(customClearEvent);
    }, 10); // Adjust delay as needed to manage conflicts
    btnClearFilters.style.display = 'none'; // Hide the button again
  });
});
