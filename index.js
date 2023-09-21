function setRandomBG_Hue(){
    const randomHue = Math.random() * 360;
    document.documentElement.style.setProperty('--BGCOLOR-HUE', randomHue);
}