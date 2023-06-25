const mainMenuId = 'main-menu';

const root = document.documentElement;

const loadingScreenDelay = parseFloat(
   window
      .getComputedStyle(root)
      .getPropertyValue('--loading-screen-delay')
);

const active = 'active';
const menuDelay = 500;

const mainMenu = document.getElementById(mainMenuId);

const setActive = (elm, selector, isDelayed = false, timingDelay) => {
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
