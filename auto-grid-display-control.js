const control = document.getElementById('tools-display-control');
const grid = document.getElementById('tools-display');

const UpdateGridOnControlValue = function(){
    grid.style.setProperty('--_min-column-size', `${control.value}rem`)
};

control.addEventListener('input', UpdateGridOnControlValue);