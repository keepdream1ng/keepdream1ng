
function passFuncToSelectedBasedOnOrderI(cssSelectors, func){
    let elements = document.querySelectorAll(cssSelectors);
    const length = elements.length;
    for (let I = 0; I < length; I++){
        func(elements[I], I, length);
    }
}

const middleOfTheWindow = window.innerHeight * 0.5;
// positions of elements relative to window
const ABOVE = "html element is above middle of the window";
const BELOW = "html element is below middle of the window";
// color settings for dynamic hsl pallet
const INITIAL_HUE = Math.random() * 360;
const STEP_OF_HUE = 10;

const setRandomBG_Hue = function(){
    document.documentElement.style.setProperty('--BGCOLOR-HUE', INITIAL_HUE);
}

const getRelativeHeight = function(element, position){
    if (!element.hasOwnProperty("boundingRect")){
        element.boundingRect = element.getBoundingClientRect();
    }
    if (position > element.boundingRect.y){
        return ABOVE;
    } else{
        return BELOW;
    }
}

const setHeadersStickyAndColourfull = function(){
    passFuncToSelectedBasedOnOrderI("main h1, main h2", (item, i, length) =>{
        item.countFromTop = i;
        item.countFromBottom = length - i - 1;
        item.relativeHeight = getRelativeHeight(item, middleOfTheWindow);
        item.style.cssText = `
            position: sticky;
            top: calc(${i} * var(--HEADER_HIGHT));
            z-index: 1;
            background-color: hsl(${INITIAL_HUE + STEP_OF_HUE * i}, var(--MAIN-SAT), var(--MAIN-LIGHT));
        `;
        console.log(item.relativeHeight);
    });
}

const setSectionsColourfull = function(){
    passFuncToSelectedBasedOnOrderI("main section", (item, I) =>{
        item.style.cssText = `
            background-color: hsl(${INITIAL_HUE + STEP_OF_HUE * (I + 1)}, var(--MAIN-SAT), var(--MAIN-LIGHT));
        `;
    });
}

const setHideOnScroll = function(){
    document.addEventListener("scroll", () =>{
        passFuncToSelectedBasedOnOrderI(".hideOnScroll", (item) =>{
            item.style.display = "none";
        })
    }, {once : true});
}