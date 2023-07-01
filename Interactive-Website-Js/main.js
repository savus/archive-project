const theme = 'theme';
const dataTheme = 'data-theme';
const themeTab = '.theme-tab';
const switcherBtn = '.switcher-btn';
const dark = 'dark';
const light = 'light';
const open = 'open';
const active = 'active';

const modalOpen = '[data-open]';
const modalClose = '[data-close]';
const isVisible = 'is-visible';

const dataFilter = '[data-filter]';
const portfolioData = '[data-item]';


const root = document.documentElement;

// const uniqueData = {
//    portfolioCards: [
//       { 
//          dataOpen: 'web-1',
//          dataItem : 'web',
//          imgSrc : './assets/images/portfolio-1.jpg',
//          divText : 'Web Development',
//          headerText : 'Food Website',
//       },
//       { 
//          dataOpen: 'web-2',
//          dataItem : 'web',
//          imgSrc : './assets/images/portfolio-2.jpg',
//          divText : 'Web Development',
//          headerText : 'Skate Website',
//       },
//       { 
//          dataOpen: 'web-3',
//          dataItem : 'web',
//          imgSrc : './assets/images/portfolio-3.jpg',
//          divText : 'Web Development',
//          headerText : 'Eating Website',
//       },
//       { 
//          dataOpen: 'ui-1',
//          dataItem : 'ui',
//          imgSrc : './assets/images/portfolio-4.jpg',
//          divText : 'UI Design',
//          headerText : 'Cool Design',
//       },
//       { 
//          dataOpen: 'app-1',
//          dataItem : 'app',
//          imgSrc : './assets/images/portfolio-5.jpg',
//          divText : 'App Development',
//          headerText : 'Game App',
//       },
//       { 
//          dataOpen : 'app-2',
//          dataItem : 'app',
//          imgSrc : './assets/images/portfolio-6.jpg',
//          divText : 'App Development',
//          headerText : 'Gambling App',
//       },
//       { 
//          dataOpen : 'app-3',
//          dataItem : 'app',
//          imgSrc : './assets/images/portfolio-7.jpg',
//          divText : 'App Development',
//          headerText : 'Money Website',
//       },
//       { 
//          dataOpen : 'ui-2',
//          dataItem : 'ui',
//          imgSrc : './assets/images/portfolio-8.jpg',
//          divText : 'UI Design',
//          headerText : 'Fantastic Design',
//       }
//    ],

//    modals: [
//       {
//          id: 'web-1',
//          headerText: 'Web Project 1',
//          imgSrc: './assets/images/portfolio-1.jpg',
//          strongText: 'My first awesome website',
//          paragraph1: 'Lorem ipsum',
//          paragraph2: 'lorem ipsum'
//      },
//      {
//          id: 'web-2',
//          headerText: 'Web Project 2',
//          imgSrc: './assets/images/portfolio-2.jpg',
//          strongText: 'My first awesome website',
//          paragraph1: 'Lorem ipsum',
//          paragraph2: 'lorem ipsum'
//      },
//      {
//          id: 'web-3',
//          headerText: 'Web Project 3',
//          imgSrc: './assets/images/portfolio-3.jpg',
//          strongText: 'My first awesome website',
//          paragraph1: 'Lorem ipsum',
//          paragraph2: 'lorem ipsum'
//      },
//      {
//          id: 'app-1',
//          headerText: 'App Project 1',
//          imgSrc: './assets/images/portfolio-4.jpg',
//          strongText: 'My first awesome website',
//          paragraph1: 'Lorem ipsum',
//          paragraph2: 'lorem ipsum'
//      },
//      {
//          id: 'app-2',
//          headerText: 'App Project 2',
//          imgSrc: './assets/images/portfolio-5.jpg',
//          strongText: 'My first awesome website',
//          paragraph1: 'Lorem ipsum',
//          paragraph2: 'lorem ipsum'
//      },
//      {
//          id: 'app-3',
//          headerText: 'App Project 3',
//          imgSrc: './assets/images/portfolio-6.jpg',
//          strongText: 'My first awesome website',
//          paragraph1: 'Lorem ipsum',
//          paragraph2: 'lorem ipsum'
//      },
//      {
//          id: 'ui-1',
//          headerText: 'UI Project 1',
//          imgSrc: './assets/images/portfolio-7.jpg',
//          strongText: 'My first awesome website',
//          paragraph1: 'Lorem ipsum',
//          paragraph2: 'lorem ipsum'
//      },
//      {
//          id: 'ui-2',
//          headerText: 'UI Project 2',
//          imgSrc: './assets/images/portfolio-8.jpg',
//          strongText: 'My first awesome website',
//          paragraph1: 'Lorem ipsum',
//          paragraph2: 'lorem ipsum'
//       }
//    ]
// };

// function createPortfolioCard(card) {
//    const portfolioTemplate = `
//       <div class="portfolio-card" data-item="${card.dataItem}" data-open="${card.dataOpen}">
//          <div class="card-body">
//             <img src="${card.imgSrc}" alt="portfolio-icon">
//             <div class="card-popup-box">
//                <div>${card.divText}</div>
//                <h3>${card.headerText}</h3>
//             </div>
//          </div>
//       </div>`;
//    document.querySelector('.portfolio-grid').innerHTML += portfolioTemplate;
// }

// for (const card of uniqueData.portfolioCards) {
//    createPortfolioCard(card);
// }

// function createModal(modalObject) {
//    const modalTemplate = 
//    `<div class="modal" id="${modalObject.id}" data-animation="slideInOutTop">
//        <div class="modal-dialog">
//            <header class="modal-header">
//                <h3>${modalObject.headerText}</h3>
//                <i class="fas fa-times" data-close></i>
//            </header>
//            <div class="modal-body">
//                <div class="img-wrapper">
//                    <img src="${modalObject.imgSrc}" alt="popup image">
//                </div>
//                <div class="text-wrapper">
//                    <p>
//                        <strong>
//                        ${modalObject.strongText}
//                        </strong>
//                    </p>
//                    <p>${modalObject.paragraph1}</p>
//                    <p>${modalObject.paragraph2}</p>
//                </div>
//            </div>
//        </div>
//    </div>`;
//    document.body.innerHTML += modalTemplate;
// }

// for (const elm of uniqueData.modals) {
//    createModal(elm);
// }



/* Theme */

const toggleTheme = document.querySelector(themeTab);
const switcher = document.querySelectorAll(switcherBtn);
const currentTheme = localStorage.getItem(theme);

/* Portfolio */
const filterLink = document.querySelectorAll(dataFilter);
const portfolioItems = document.querySelectorAll(portfolioData);
const searchBox = document.querySelector('#search');

const setTheme = (val) => {
   if (val === dark) {
      root.setAttribute(dataTheme, dark);
      localStorage.setItem(theme, dark);
   } else {
      root.setAttribute(dataTheme, light);
      localStorage.setItem(theme, light);
   }
};

if (currentTheme) {
   root.setAttribute(dataTheme, currentTheme);
   switcher.forEach((btn) => {
      btn.classList.remove(active);
   });
}

if (currentTheme === dark) {
   switcher[1].classList.add(active);
} else {
   switcher[0].classList.add(active);
}

const setActive = (elm, selector) => {
   if (document.querySelector(`${selector}.${active}`) !== null) {
      document.querySelector(`${selector}.${active}`).classList.remove(active);
   } 
   elm.classList.add(active);
};

toggleTheme.addEventListener('click', function() {
   const tab = this.parentElement.parentElement;
   if (!tab.className.includes(open)) {
      tab.classList.add(open);
   } else {
      tab.classList.remove(open);
   }
});

for (const elm of switcher) {
   elm.addEventListener('click', function() {
      const toggle = this.dataset.toggle;
      //set active state
      setActive(elm, switcherBtn);
      setTheme(toggle);
   });
}

searchBox.addEventListener('keyup', (e) => {
   const searchInput = e.target.value.toLowerCase().trim();
   portfolioItems.forEach((card) => {
      if (card.dataset.item.includes(searchInput)) {
         card.style.display = 'block';
      } else {
         card.style.display = 'none';
      }
   });
});

for (const link of filterLink) {
   link.addEventListener('click', function(){
      setActive(link, '.filter-link');
      const filter = this.dataset.filter;
      portfolioItems.forEach((card) => {
         if (filter === 'all') {
            card.style.display = 'block';
         } else if (card.dataset.item === filter) {
            card.style.display = 'block';
         } else {
            card.style.display = 'none';
         }
      });
   });
}

/* Modal */ 
const openModal = document.querySelectorAll(modalOpen);
const closeModal = document.querySelectorAll(modalClose);

// Modal/Full site modal 'open buttons'
for (const elm of openModal) {
   elm.addEventListener('click', function() {
      const modalId = this.dataset.open;
      document.getElementById(modalId).classList.add(isVisible);
   });   
}   

for (const elm of closeModal) {
   elm.addEventListener('click', function() {
      this.parentElement.parentElement.parentElement.classList.remove(isVisible);
   });   
}   

//Modal 
document.addEventListener('click', (e) => {
   const element = document.querySelector(`.modal.${isVisible}`);
   if (e.target === document.querySelector(`.modal.${isVisible}`)) {
      document.querySelector('.modal.is-visible').classList.remove(isVisible);
   }
});

document.addEventListener('keyup', (e) => {
   if (e.key === 'Escape') {
      document.querySelector('.modal.is-visible').classList.remove(isVisible);
   }
});

/* Carousel */

const slides = document.querySelectorAll('.review-item');
const slideBtns = document.querySelectorAll('.slide-ctrl-container button');

let currentSlider = Math.floor(Math.random() * slides.length);
let nextSlider = (currentSlider < slides.length - 1) ? currentSlider + 1 : 0;
let prevSlider = (currentSlider > 0) ? currentSlider - 1 : slides.length - 1;

const updateCarousel = () => {
   slides.forEach((slide) => {
      slide.classList.remove('active', 'previous', 'next');
   });;
   slides[prevSlider].classList.add('previous');
   slides[currentSlider].classList.add('active');
   slides[nextSlider].classList.add('next');
};

const goToNum = (num) => {
   currentSlider = num;
   nextSlider = (currentSlider < slides.length - 1) ? currentSlider + 1 : 0;
   prevSlider = (currentSlider > 0) ? currentSlider - 1 : slides.length - 1;
   
   updateCarousel();
   console.log('prev', prevSlider);
   console.log('current', currentSlider);
   console.log('next', nextSlider);
};

const goToNext = () => (currentSlider < slides.length - 1) ? goToNum(currentSlider + 1) : goToNum(0);
const goToPrev = () => (currentSlider > 0) ? goToNum(currentSlider - 1) : goToNum(slides.length - 1);

for (let i = 0; i < slideBtns.length; i++) {
   slideBtns[i].addEventListener('click', () => (i === 0) ? goToPrev() : goToNext());
}

updateCarousel();

/*marquee*/

// get # of elements displayed
const elmsDisplayed = getComputedStyle(root).getPropertyValue('--marquee-elms-displayed');
const marqueeContent = document.querySelector('ul.marquee-content');
root.style.setProperty('--marquee-elms', marqueeContent.children.length);

for (let i = 0; i < elmsDisplayed; i++) {
   marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
}
