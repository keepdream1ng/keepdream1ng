function setRandomBG_Hue(){
    const randomHue = Math.random() * 360;
    document.documentElement.style.setProperty('--BGCOLOR-HUE', randomHue);
}

function setCssCounterForElements(cssSelectors){
    passFuncToSelectedBasedOnOrderI(cssSelectors, (I, item) =>{
        item.style.setProperty('--counter', I);
    });
}

function passFuncToSelectedBasedOnOrderI(cssSelectors, func){
    let elements = document.querySelectorAll(cssSelectors);
    for (let I = 0; I < elements.length; I++){
        func(I, elements[I]);
    }
}