const middleOfTheWindow = window.innerHeight * 0.5;
const ABOVE = "html element is above middle of the window";
const BELOW = "html element is below middle of the window";
const STICKY_HEADERS_QUERY = "main h1, main h2";
// color settings for dynamic hsl pallet
const INITIAL_HUE = Math.random() * 360;
const STEP_OF_HUE = 10;

function passFuncToSelectedBasedOnOrderI(cssSelectors, func){
    let elements = document.querySelectorAll(cssSelectors);
    const length = elements.length;
    for (let I = 0; I < length; I++){
        func(elements[I], I, length);
    }
}

const setRandomBG_Hue = function(){
    document.documentElement.style.setProperty('--BGCOLOR-HUE', INITIAL_HUE);
}

const getRelativeHeight = function(element, position){
    const boundingRect = element.getBoundingClientRect();
    if (position > boundingRect.y){
        return ABOVE;
    } else{
        return BELOW;
    }
}

const setCssStickyPosPropOnRelativeHeight = function(element){
    let currentRelativePos = getRelativeHeight(element, middleOfTheWindow);
    if (currentRelativePos == element.relativeHeight) {return}
    element.relativeHeight = currentRelativePos;
    if (currentRelativePos == ABOVE){
        element.classList.add('stickyTopHeader');
        element.classList.remove('stickyBottomHeader');
    } else{
        element.classList.add('stickyBottomHeader');
        element.classList.remove('stickyTopHeader');
    }
}

const setHeadersStickyAndColourfull = function(){
    passFuncToSelectedBasedOnOrderI(STICKY_HEADERS_QUERY, (item, i, length) =>{
        item.style.cssText = `
            --coutFromTop: ${i};
            --coutFromBottom: ${length - i - 1};
            position: sticky;
            z-index: 1;
            background-color: hsl(${INITIAL_HUE + STEP_OF_HUE * i}, var(--MAIN-SAT), var(--MAIN-LIGHT));
        `;
        // console.log(getRelativeHeight(item));
        setCssStickyPosPropOnRelativeHeight(item);
    });
}

function handleScroll() {
    if (!document.hasOwnProperty("stickyHeaders")){
        document.stickyHeaders = Array.from(document.querySelectorAll(STICKY_HEADERS_QUERY));
    }
    document.stickyHeaders.forEach(setCssStickyPosPropOnRelativeHeight);
}

const setSectionsColourfull = function(){
    passFuncToSelectedBasedOnOrderI("section", (item, I) =>{
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