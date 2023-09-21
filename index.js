
function passFuncToSelectedBasedOnOrderI(cssSelectors, func){
    let elements = document.querySelectorAll(cssSelectors);
    for (let I = 0; I < elements.length; I++){
        func(I, elements[I]);
    }
}

// color settings for dynamic hsl pallet
const initialHue = Math.random() * 360;
const stepOfHue = 10;

const setRandomBG_Hue = function(){
    document.documentElement.style.setProperty('--BGCOLOR-HUE', initialHue);
}

const setHeadersStickyAndColourfull = function(){
    passFuncToSelectedBasedOnOrderI("main h1, main h2", (I, item) =>{
        item.style.cssText = `
            position: sticky;
            top: calc(${I} * 2rem);
            z-index: 1;
            background-color: hsl(${initialHue + stepOfHue * I}, var(--MAIN-SAT), var(--MAIN-LIGHT));
        `;
    });
}

const setSectionsColourfull = function(){
    passFuncToSelectedBasedOnOrderI("main section", (I, item) =>{
        item.style.cssText = `
            background-color: hsl(${initialHue + stepOfHue * (I + 1)}, var(--MAIN-SAT), var(--MAIN-LIGHT));
        `;
    });
}