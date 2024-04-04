// This script identifies when a user has successfully completed a configuration step in the kitchen unit configurator

document.addEventListener('DOMContentLoaded', function() {
    function restoreState() {
        const isActive = localStorage.getItem('tooltip-door-colour');
        if (isActive === 'true') {
            document.querySelector('[data-tooltip="door-colour"]').style.display = 'none';
        }
        checkAllSelected();
    }

    function updateStateAndHideTooltip(group) {
        localStorage.setItem(`tooltip-${group}`, 'true');
        document.querySelector(`[data-tooltip="${group}"]`).style.opacity = '0';
        checkAllSelected();
    }

    function checkAllSelected() {
        const isSelected = localStorage.getItem('tooltip-door-colour') === 'true';
        if (isSelected) {
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
            if(group === 'door-colour') { // Ensure we only respond to 'door-colour' button clicks
                updateStateAndHideTooltip(group);
            }
        });
    });

    restoreState();
});
