
function passFuncToSelectedBasedOnOrderI(cssSelectors, func){
    let elements = document.querySelectorAll(cssSelectors);
    const length = elements.length;
    for (let I = 0; I < length; I++){
        func(I, elements[I], length);
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
            top: calc(${I} * var(--HEADER_HIGHT));
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

const setHideOnScroll = function(){
    document.addEventListener("scroll", () =>{
        passFuncToSelectedBasedOnOrderI(".hideOnScroll", (I, item) =>{
            item.style.display = "none";
        })
    }, {once : true});
}