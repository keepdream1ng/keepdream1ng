function setRandomBG_Hue(){
    const randomHue = Math.random() * 360;
    document.documentElement.style.setProperty('--BGCOLOR-HUE', randomHue);
}

function setCssCounterForElements(htmlTag, startCounter){
    let elements = Array.from(document.getElementsByTagName(htmlTag));
    elements.forEach((item) => {
        item.style.setProperty('--counter', startCounter++);
    });
}