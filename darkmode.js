// check for saved 'darkMode' in localStorage
let darkMode = localStorage.getItem('setDarkMode'); 

const darkModeToggle = document.getElementById('dark-mode-toggle');

const enableDarkMode = () => {
  // 1. Change root property. 
  document.documentElement.style.setProperty('--CONTRAST-LIGHT', '90%');
  document.documentElement.style.setProperty('--MAIN-LIGHT', 'calc(var(--CONTRAST-LIGHT)/5)');
  // 2. Update darkMode in localStorage
  localStorage.setItem('setDarkMode', 'enabled');
}

const disableDarkMode = () => {
  // 1. Change root property. 
  document.documentElement.style.setProperty('--CONTRAST-LIGHT', 'calc(var(--MAIN-LIGHT)/7)');
  document.documentElement.style.setProperty('--MAIN-LIGHT', '80%');
  // 2. Update darkMode in localStorage 
  localStorage.setItem('setDarkMode', "disable");
}
 
// If the user already visited and enabled darkMode
// start things off with it on
if (darkMode === 'enabled') {
  enableDarkMode();
}

const preffersDarkMode = () => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

// If value is null then check preffered and write value.
if ((darkMode === null)&&(preffersDarkMode())) {
  enableDarkMode();
}

// When someone clicks the button
darkModeToggle.addEventListener('click', () => {
  // get their darkMode setting
  darkMode = localStorage.getItem('setDarkMode'); 
  
  if (darkMode !== 'enabled') {
    enableDarkMode();
  } else {  
    disableDarkMode(); 
  }
});