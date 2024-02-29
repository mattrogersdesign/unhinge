// Toggles 'required' attribute on inputs (Hinge Side) based on visibility.

document.addEventListener("DOMContentLoaded", function() {

  // Function to check if an element is visible
  function isElementVisible(element) {
    return element.offsetParent !== null;
  }

  // Every time the user clicks on the document
  document.addEventListener('click', function() {

    // Get all inputs with the ms-code attribute
    const inputs = document.querySelectorAll('[ms-code="required-if-visible"]');

    // Loop through each input
    inputs.forEach(function(input) {

      // Check if the input or its parent is visible
      if (isElementVisible(input)) {

        // If the input is visible, add the required attribute
        input.required = true;
      } else {

        // If the input is not visible, remove the required attribute
        input.required = false;
      }
    });
  });
});



// (Quick cart) Removes empty option divs dynamically for cleaner UI.
  function checkAndRemoveOptions() {
    const optionDivs = document.querySelectorAll('div[cart-item="options"]');
    optionDivs.forEach(div => {
      const valueDiv = div.querySelector('div[option="value"].option-value');
      if (valueDiv.textContent.trim() === '""') {
        div.remove(); // This removes the div from the DOM
      }
    });
  }

  // Create an observer instance linked to a callback function
  const observer = new MutationObserver((mutationsList, observer) => {
    // Check and remove options whenever mutations are observed
    checkAndRemoveOptions();
  });

  // Start observing the document body for configured mutations
  observer.observe(document.body, { childList: true, subtree: true });

  // Ensure to check options on initial load as well
  document.addEventListener('DOMContentLoaded', checkAndRemoveOptions);



// (Swatches) Function to add active classes to the swatches when selected
  function setupButtonGroup(attributeSelector) {
    const buttons = document.querySelectorAll(`button[${attributeSelector}]`);

    buttons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove `active_swatch` class from all buttons in the same group
        buttons.forEach(btn => {
          btn.classList.remove('active_swatch');
          // Adjust aria-pressed for accessibility
          btn.setAttribute('aria-pressed', 'false');
        });

        // Add `active_swatch` class to the clicked button
        this.classList.add('active_swatch');
        // Mark the button as selected for screen readers
        this.setAttribute('aria-pressed', 'true');
      });
    });
  }

  // Initialize both button groups with their respective attributes
  setupButtonGroup('door-colour');
  setupButtonGroup('cab-colour');


// Function to display selected colour swatches and update button text
function updateSelectedSwatch(selectedButton, targetId) {
  const targetDiv = document.getElementById(targetId);
  const swatchChangeButton = targetDiv.querySelector('.swatch_change_button');

  // Clear existing content except for the .swatch_change_button
  Array.from(targetDiv.childNodes).forEach(child => {
    if (child !== swatchChangeButton) {
      targetDiv.removeChild(child);
    }
  });

  // Clone the selected button
  const clone = selectedButton.cloneNode(true);
  if (swatchChangeButton) {
    targetDiv.insertBefore(clone, swatchChangeButton);
  } else {
    targetDiv.appendChild(clone);
  }

  // Update the button text from "Select" to "Change"
  // Assuming the text is directly within .swatch_change_button or its first child
  if (swatchChangeButton.childNodes.length > 0) {
    // Checking if the first child is a text node or an element
    if (swatchChangeButton.childNodes[0].nodeType === Node.TEXT_NODE) {
      swatchChangeButton.childNodes[0].nodeValue = 'Change';
    } else if (swatchChangeButton.childNodes[0].nodeType === Node.ELEMENT_NODE) {
      swatchChangeButton.childNodes[0].textContent = 'Change';
    }
  }
}

// Function to save the selection to local storage
function saveSelectionToLocalStorage(attribute, value) {
  localStorage.setItem(attribute, value);
}

// Function to restore selection from local storage
function restoreSelection(attributeSelector, targetId) {
  const savedValue = localStorage.getItem(attributeSelector);
  if (savedValue) {
    const button = document.querySelector(`button[${attributeSelector}="${savedValue}"]`);
    if (button) {
      button.classList.add('active_swatch');
      button.setAttribute('aria-pressed', 'true');
      updateSelectedSwatch(button, targetId);
    }
  }
}

// Updated function to setup button group with additional functionality
function setupButtonGroup(attributeSelector) {
  const buttons = document.querySelectorAll(`button[${attributeSelector}]`);
  const targetId = attributeSelector === 'door-colour' ? 'selected_door_swatch' : 'selected_cab_swatch';

  buttons.forEach(button => {
    button.addEventListener('click', function() {
      // Logic to remove and add `active_swatch` class remains the same
      buttons.forEach(btn => {
        btn.classList.remove('active_swatch');
        btn.setAttribute('aria-pressed', 'false');
      });

      this.classList.add('active_swatch');
      this.setAttribute('aria-pressed', 'true');

      // Clone the button into the correct div and update the button text
      updateSelectedSwatch(this, targetId);

      // Save the selection to local storage
      saveSelectionToLocalStorage(attributeSelector, this.getAttribute(attributeSelector));
    });
  });

  // Restore selection from local storage on page load for each group
  restoreSelection(attributeSelector, targetId);
}

// Call setupButtonGroup for both attributes on page load
document.addEventListener('DOMContentLoaded', function() {
  setupButtonGroup('door-colour');
  setupButtonGroup('cab-colour');
});


// Toggles text between "Show" and "Hide" on click for a cleaner UI.

document.addEventListener('DOMContentLoaded', function() {
    // Target the button by its class
    var button = document.querySelector('.btn_main_wrap');

    // Add click event listener to the button
    button.addEventListener('click', function() {
        // Target the span containing "Hide" or "Show" text by its class
        var toggleText = document.querySelector('.hide_filter_title');

        // Check the current text and toggle it
        if (toggleText.textContent.trim() === "Hide") {
            toggleText.textContent = "Show";
        } else {
            toggleText.textContent = "Hide";
        }
    });
});
</script>
