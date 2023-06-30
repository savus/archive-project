// Element ID's 
const mainMenuId = 'main-menu';
const gameMenuId = 'games-menu';

//Element queries
const optionsMenuList = '.options-menu-list';
const swapScreenSelector = '.swap-screen-container';

const root = document.documentElement;
const loadingScreenDelay = parseFloat(
   window
      .getComputedStyle(root)
      .getPropertyValue('--loading-screen-delay')
);

//CSS Classes
const active = 'active';

//Timing delays
const menuDelay = 500;
const menuLinksAnimationDelay = 2010;

//Functions
const setActive = (elm, selector, isDelayed = false, timingDelay = 300) => {
   const activeElement = document.querySelector(`${selector}.active`);
   if (activeElement !== null) {
      activeElement.classList.remove(active);
   }
   
   if (isDelayed) {
      setTimeout(() => {
         elm.classList.add(active);
      }, timingDelay);
   } else {
      elm.classList.add(active);
   }
};

const connectMenuLinks = (menuList) => {
   menuList.addEventListener('click', function(e) {
      const dataLink = e.target.dataset.link;
      if (dataLink !== null) {
         const elementToSwap = document.getElementById(dataLink);
         setActive(elementToSwap, swapScreenSelector, true, menuDelay);
      }
   });
};

const setLinkAnimationDelay = (menuList) => {
   const menuChildren = Array.from(menuList.children);
   menuChildren.forEach((listItem, index) => {
      //set animation delay
      setTimeout(() => {
         listItem.style.animationDelay = `${index * 0.18}s`;
      },menuLinksAnimationDelay);
   });
}

//Elements
const mainMenu = document.getElementById(mainMenuId);
const gameMenu = document.getElementById(gameMenuId);
const optionsMenuLists = document.querySelectorAll(optionsMenuList);

//Initialization logic
setTimeout(function(){
   setActive(mainMenu, '#loading-screen-container');
}, loadingScreenDelay * 1200)

optionsMenuLists.forEach((menuList) => {
   connectMenuLinks(menuList);
   setLinkAnimationDelay(menuList);
});

