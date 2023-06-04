const slideRightBack = 'slideRightBack';
const menuItem = '.menu-list li';
const active = 'active';
const menuScreen = '.menu-screen';
const menuList = document.querySelectorAll(menuItem);
let menuDelay = parseFloat(window.getComputedStyle(document.documentElement).getPropertyValue('--main-menu-delay'));

const setActive = (elm, selector) => {
   const activeElement = document.querySelector(`${selector}.${active}`);
   if (activeElement !== null) {
      activeElement.classList.remove(active);
   }
   elm.classList.add(active);
};

menuList.forEach((item, itemIndex) => {
   item.style.animation = `${slideRightBack} 0.8s linear ${(menuDelay + 1) + (itemIndex / 4)}s forwards`;
   item.addEventListener('click', function() {
      const linkedElement = document.querySelector(this.dataset.link);
      setActive(linkedElement, menuScreen);
   });
});
