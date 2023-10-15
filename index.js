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

function useScrollableDiv() {
    // Get the user-agent string 
    const userAgentString =  
        navigator.userAgent; 
    const deviceType = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgentString)
        ? 'Mobile'
        : 'Desktop';
    // Detect Chrome 
    let chromeAgent = userAgentString.indexOf("Chrome") > -1; 
    // Detect Safari 
    let safariAgent = userAgentString.indexOf("Safari") > -1; 
    // Discard Safari since it also matches Chrome 
    if ((chromeAgent) && (safariAgent)) safariAgent = false; 
    // console.log(`${deviceType}, safari: ${safariAgent}`);
    return ((deviceType == 'Mobile') && (safariAgent == false));
}

const convertImgToInlineSVG = (query, callback) => {
    const images = document.querySelectorAll(query);
  
    images.forEach(image => {
      fetch(image.src)
      .then(res => res.text())
      .then(data => {
        const parser = new DOMParser();
        const svg = parser.parseFromString(data, 'image/svg+xml').querySelector('svg');
  
        if (image.id) svg.id = image.id;
        if (image.className) svg.classList = image.classList;
  
        image.parentNode.replaceChild(svg, image);
      })
      .then(callback)
      .catch(error => console.error(error))
    });
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

const setSectionsColourfull = function(){
    passFuncToSelectedBasedOnOrderI("section", (item, I) =>{
        item.style.cssText = `
            background-color: hsl(${INITIAL_HUE + STEP_OF_HUE * (I + 1)}, var(--MAIN-SAT), var(--MAIN-LIGHT));
        `;
    });
}

function handleScroll() {
    if (!document.hasOwnProperty("stickyHeaders")){
        document.stickyHeaders = Array.from(document.querySelectorAll(STICKY_HEADERS_QUERY));
    }
    document.stickyHeaders.forEach(setCssStickyPosPropOnRelativeHeight);
}

const setHideOnScroll = function(targetObj){
    targetObj.addEventListener("scroll", () =>{
        passFuncToSelectedBasedOnOrderI(".hideOnScroll", (item) =>{
            item.style.display = "none";
        })
    }, {once : true});
}

const defineScrollBehavior = function(targetObj){
    targetObj.addEventListener("scroll", () => {
        handleScroll();
    });
    setHideOnScroll(targetObj);
}