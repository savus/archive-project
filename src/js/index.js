const slideRightBack = "slideRightBack";
const menuUl = ".menu-list";
const menuItem = ".menu-list li";
const active = "active";
const menuScreen = ".menu-screen";
const mainMenuId = "#main-menu";
const mainMenu = document.querySelector(mainMenuId);
const portfolioId = "#portfolio-menu";
const portfolioMenu = document.querySelector(portfolioId);
const menuList = document.querySelectorAll(menuUl);
let loadingDelay = parseFloat(
  window
    .getComputedStyle(document.documentElement)
    .getPropertyValue("--main-menu-delay")
);
const menuDelay = 500;

const setActive = (elm, selector, isDelayed = false) => {
  const activeElement = document.querySelector(`${selector}.${active}`);
  if (activeElement !== null) {
    activeElement.classList.remove(active);
  }
  if (isDelayed) {
    setTimeout(function(){
      elm.classList.add(active);
    }, menuDelay);
  } else {
   elm.classList.add(active);
  }
};

menuList.forEach((menuList) => {
  const listItems = Array.from(menuList.children);
  listItems.map((item, itemIndex) => {
    const adjustedIndex = itemIndex + 1;
    item.style.animationDelay = `${0.5 + adjustedIndex / 7}s`;
    item.addEventListener("click", function () {
      const linkedElement = document.querySelector(this.dataset.link);
      setActive(linkedElement, menuScreen, true);
    });
  });
});

setTimeout(function () {
  setActive(mainMenu, menuScreen);
  console.log("success");
}, `${loadingDelay * 1150}`);
