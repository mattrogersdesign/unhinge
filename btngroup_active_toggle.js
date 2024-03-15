// Interactive Button Groups with Active State Management.
document.addEventListener('DOMContentLoaded', () => {
  const findElementText = (element) => {
    return element.tagName.toLowerCase() === 'button' || !element.querySelector('.btn_main_text') ?
      element.textContent.trim() :
      element.querySelector('.btn_main_text').textContent.trim();
  };

  const updateActive = (groupElement, elementText) => {
    const groupName = groupElement.getAttribute('data-btngroup');
    const elements = document.querySelectorAll(`[data-btngroup="${groupName}"][data-action="toggle-active"]`);
    elements.forEach(el => {
      el.removeAttribute('data-active');
      if (findElementText(el) === elementText) {
        el.setAttribute('data-active', 'true');
        localStorage.setItem(groupName, elementText);
      }
    });
  };

  const reapplyActiveState = () => {
    document.querySelectorAll('[data-btngroup]').forEach(groupElement => {
      const groupName = groupElement.getAttribute('data-btngroup');
      const savedElementText = localStorage.getItem(groupName);
      if (savedElementText) {
        updateActive(groupElement, savedElementText);
      }
    });
  };

  const handleElementClick = (event) => {
    const target = event.target.closest('[data-action="toggle-active"]');
    if (target && target.getAttribute('data-btngroup')) {
      const groupElement = target.closest('[data-btngroup]');
      const elementText = findElementText(target);
      updateActive(groupElement, elementText);
    }
  };

  reapplyActiveState();
  document.addEventListener('click', handleElementClick);
});