const mainMenuId = 'main-menu';
const gameMenuId = 'games-menu';

const optionsMenuList = '.options-menu-list';


const root = document.documentElement;

const loadingScreenDelay = parseFloat(
   window
      .getComputedStyle(root)
      .getPropertyValue('--loading-screen-delay')
);

const active = 'active';
const menuDelay = 500;


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
}

const mainMenu = document.getElementById(mainMenuId);
const gameMenu = document.getElementById(gameMenuId);

const optionsMenuLists = document.querySelectorAll(optionsMenuList);

optionsMenuLists.forEach((menuList) => {
   Array.from(menuList.children).forEach((listItem, index) => {
      setTimeout(() => {
         listItem.classList.add(active);
      }, index * 200);
   })
})