// This script identifies when user has successfully completed kitchen unit configurator

document.addEventListener('DOMContentLoaded', function() {
    function restoreState() {
        ['door-colour', 'cabinet-colour', 'assembly'].forEach(group => {
            const isActive = localStorage.getItem(`tooltip-${group}`);
            if (isActive === 'true') {
                document.querySelector(`[data-tooltip="${group}"]`).style.display = 'none';
            }
        });
        checkAllSelected();
    }

    function updateStateAndHideTooltip(group) {
        localStorage.setItem(`tooltip-${group}`, 'true');
        document.querySelector(`[data-tooltip="${group}"]`).style.opacity = '0';
        checkAllSelected();
    }

    function checkAllSelected() {
        const allSelected = ['door-colour', 'cabinet-colour', 'assembly'].every(group => {
            return localStorage.getItem(`tooltip-${group}`) === 'true';
        });
        if (allSelected) {
            document.querySelector('.products_blocker').style.display = 'none';
            const shopUnits = document.getElementById('shop-units');
            if (shopUnits) {
                shopUnits.style.opacity = '1';
            }
        }
    }

        document.querySelectorAll('button[data-btngroup]').forEach(button => {
        button.addEventListener('click', function() {
            const group = this.getAttribute('data-btngroup');
            updateStateAndHideTooltip(group);
        });
    });

    restoreState();
});