function setRandomBG_Hue(){
    const randomHue = Math.random() * 360;
    document.documentElement.style.setProperty('--BGCOLOR-HUE', randomHue);
}

function setCssCounterForElements(cssSelectors, startCounter){
    let elements = Array.from(document.querySelectorAll(cssSelectors));
    elements.forEach((item) => {
        item.style.setProperty('--counter', startCounter++);
    });
}