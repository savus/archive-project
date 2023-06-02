const menuList = document.querySelectorAll('.menu-list li');
let menuDelay = parseFloat(window.getComputedStyle(document.documentElement).getPropertyValue('--main-menu-delay'));

menuList.forEach((item, itemIndex) => {
   item.style.animation = `slideRightBack 0.8s linear ${(menuDelay + 1) + (itemIndex / 4)}s forwards`;
});
