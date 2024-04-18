<script>
// Toggles 'required' attribute on inputs (Hinge Side) based on visibility.

/*
This script overcomes the problem where users were not able to add
items to basket becuase they did not select a hinge side even though
it was not relevant on some products. 
*/

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
</script>