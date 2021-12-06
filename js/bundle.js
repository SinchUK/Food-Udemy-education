/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calculator() {
    // Calculator __________________________________________________

    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    //встановлення налаштувань з localStorage
    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach( elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }

            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div','calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div','calculating__choose-item_active');


    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio ) {
            result.textContent = '____';
            return;
        } 

        if (sex === 'female') {
            console.log(sex, 'sex');
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {

              if (e.target.getAttribute('data-ratio')) {
                  ratio = +e.target.getAttribute('data-ratio'); 
                  localStorage.setItem('ratio',  +e.target.getAttribute('data-ratio'));    
              } else {
                  sex = e.target.getAttribute('id');
                  localStorage.setItem('sex', e.target.getAttribute('id'));
              }
  
              console.log(ratio,sex);
  
              elements.forEach(elem => {
                  elem.classList.remove(activeClass);
              });
              e.target.classList.add(activeClass);
  
              calcTotal();
          });
        });

    }

    getStaticInformation('#gender div','calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div','calculating__choose-item_active');

    function getDinamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

          if (input.value.match(/\D/g)) {
              input.style.border = '1px solid red';
          } else {
              input.style.border = 'none';
          }


            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        });

        
    }

    getDinamicInformation('#height');
    getDinamicInformation('#weight');
    getDinamicInformation('#age');

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...clases) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.clases = clases;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement("div");

      if (this.clases.length === 0) {
        this.element = "menu__item";
        element.classList.add(this.element);
      } else {
        this.clases.forEach((className) => element.classList.add(className));
      }

      element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>       
            `;
      this.parent.append(element);
    }
  }


  (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)("http://localhost:3000/menu").then((data) => {
    data.forEach(({ img, altimg, title, descr, price }) => {
      new MenuCard(
        img,
        altimg,
        title,
        descr,
        price,
        ".menu .container"
      ).render();
    });
  });

}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);


/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, modalTimerId) {
  //Forms
  const forms = document.querySelectorAll(formSelector);

  const message = {
    loading: "img/form/spinner.svg",
    success: "Дякуємо! Чекайте на відповідь",
    failure: "Щось пішло не так...",
  };

  forms.forEach((item) => {
    bindPostData(item);
  });

  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
          `;

      form.insertAdjacentElement("afterend", statusMessage); // метод альтернатива append();

      // request.setRequestHeader('Content-type', 'multipart/form-data');
      //При використанні XMLHttpRequest + FormData не потрібно встановлювати заголовки setRequestHeader вони встановлюються автоматично!!!

      //Якщо дані потрібно відправити у форматі JSON потрібно прописувати заголовки вручну.

      const formData = new FormData(form);

      // const obj = {};                       // якщо сервер приймає json
      // formData.forEach(function(value,key){ // якщо сервер приймає json
      //     obj[key] = value;
      // });

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      const obje = { a: 23, b: 50 };
      console.log(Object.entries(obje));

      (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)("http://localhost:3000/requests", json)
        .then((data) => {
          console.log(data, " data");
          showThanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
        });

      // request.send(formData);
      // використовується якщо сервер приймає дані у форматі  FormData
      // request.send(json);                   // якщо сервер приймає json
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.classList.add("hide");
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
          <div class="modal__content">
              <div class="modal__close" data-close>&times;</div>
              <div class="modal__title">${message}</div>
          </div>
      `;

    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
    }, 4000);
  }

  //Методи fetch() : text(), json()
  //приклад використання
  // fetch('https://jsonplaceholder.typicode.com/posts', {
  //     method: "POST",
  //     body: JSON.stringify({name: 'Alex'}),
  //     headers: {
  //       'Content-type': 'application/json'
  //     }
  // })
  //     .then(response => response.json()) //метод fetch перетворює json в об'єкт
  //     .then(json => console.log(json));

  // --------------------------------------------------------

  fetch("http://localhost:3000/menu")
    .then((data) => data.json())
    .then((res) => console.log(res));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);

  modal.classList.add("show");
  modal.classList.remove("hide");
  document.body.style.overflow = "hidden";

  console.log(modalTimerId, ' modalTimerID');

  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
  
}

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);

  modal.classList.add("hide");
  modal.classList.remove("show");
  document.body.style.overflow = "";
}

function modal(triggerSelector, modalSelector, modalTimerId) {
  
  //модальне вікно

  const modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);

  modalTrigger.forEach((btn) => {
    btn.addEventListener("click", () => openModal(modalSelector, modalTimerId)); // !!!!
  });

 

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute("data-close" == "")) {
      closeModal(modalSelector);
    }
  }); // закриття модального вікна при натисканні на кнопку esc

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModal(modalSelector);
    }
  }); // поява моадльного вікна через певний проміжок часу
  
  //   одноразова поява модального вікна при прокрутчуванні до кінця сторінки.

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal(modalSelector, modalTimerId); // видалення обробника події

      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  window.addEventListener("scroll", showModalByScroll); //Класи для карток
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
  
  let offset = 0;
  let slideIndex = 1;

  const slides = document.querySelectorAll(slide),
    slider = document.querySelector(container),
    prev = document.querySelector(prevArrow),
    next = document.querySelector(nextArrow),
    total = document.querySelector(totalCounter),
    current = document.querySelector(currentCounter),
    slidesWrapper = document.querySelector(wrapper),
    width = window.getComputedStyle(slidesWrapper).width,
    slidesField = document.querySelector(field);

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  function zeroIndicate() {
    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  }

  function makeOpacity() {
    dots.forEach((dot) => (dot.style.opacity = ".5"));
    dots[slideIndex - 1].style.opacity = 1;
  }

  function takeDigits(str) {
    return +width.replace(/\D.+/gm, "") + 1;
  }

  slidesField.style.width = 100 * slides.length + "%";
  slidesField.style.display = "flex";
  slidesField.style.transition = "0.5s all";

  slidesWrapper.style.overflow = "hidden";

  slides.forEach((slide) => {
    slide.style.width = width;
  });

  slider.style.position = "relative";

  const indicatiors = document.createElement("ol");
  const dots = [];

  indicatiors.classList.add("carousel-indicators");

  slider.append(indicatiors);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    dot.classList.add("dot");

    if (i == 0) {
      dot.style.opacity = 1;
    }

    indicatiors.append(dot);
    dots.push(dot);
  }

  next.addEventListener("click", () => {
    console.log(takeDigits(width), "res");
    if (offset == takeDigits(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += takeDigits(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    zeroIndicate();
    makeOpacity();
  });

  prev.addEventListener("click", () => {
    if (offset == 0) {
      offset = takeDigits(width) * (slides.length - 1);
    } else {
      offset -= takeDigits(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    zeroIndicate();
    makeOpacity();
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideTo = e.target.getAttribute("data-slide-to");

      slideIndex = slideTo;
      offset = takeDigits(width) * (slideTo - 1);

      slidesField.style.transform = `translateX(-${offset}px)`;

      zeroIndicate();
      makeOpacity();
    });
  });

  // ___________slider light version______________________________
  //   showSlides(slideIndex);

  //   if (slides.length < 10) {
  //       total.textContent = `0${slides.length}`;
  //   } else {
  //       total.textContent = slides.length;
  //   }

  //   function showSlides(n) {
  //       if (n > slides.length) {
  //           slideIndex = 1;
  //       }

  //       if (n < 1) {
  //           slideIndex = slides.length;
  //       }

  //       slides.forEach(item => item.style.display = 'none');

  //       slides[slideIndex - 1].style.display = 'block';

  //       if (slides.length < 10) {
  //         current.textContent = `0${slideIndex}`;
  //     } else {
  //       current.textContent = slideIndex;
  //     }

  //   };

  //   function plusSlides(n) {
  //     showSlides(slideIndex += n);
  //   }

  //   prev.addEventListener('click', () => {
  //       plusSlides(-1);
  //   });

  //   next.addEventListener('click', () => {
  //       plusSlides(+1);
  // });
 
  // Slider __________________________________________

  //   const slides = document.querySelectorAll('.offer__slide'),
  //         prev = document.querySelector('.offer__slider-prev'),
  //         next = document.querySelector('.offer__slider-next'),
  //         total = document.querySelector('#total'),
  //         current = document.querySelector('#current'),
  //         // slider carousel ----------------------------------------------
  //         slidesWrapper = document.querySelector('.offer__slider-wrapper'),
  //         slidesField = document.querySelector('.offer__slider-inner'),
  //         width = window.getComputedStyle(slidesWrapper).width;
  //   let slideIndex = 1;
  //   let offset = 0;

  // // ______________slider carousel__________________________________

  // if (slides.length < 10) {
  //       total.textContent = `0${slides.length}`;
  //       current.textContent = `0${slideIndex}`;
  //   } else {
  //       total.textContent = slides.length;
  //       current.textContent = slideIndex;
  //   }

  //   slidesField.style.width = 100 * slides.length + '%';
  //   slidesField.style.display = 'flex';
  //   slidesField.style.transition = '0.5s all';

  //   slidesWrapper.style.overflow = 'hidden';

  //   slides.forEach(slide => {
  //     slide.style.width = width;
  //   });

  //   next.addEventListener('click', () => {
  //       if (offset == (+width.slice(0, width.length - 2) * (slides.length - 1))) {
  //           offset = 0;
  //       } else {
  //          console.log(+width.slice(0, width.length - 2));
  //          console.log(offset, 'offset');
  //           offset += +width.slice(0, width.length - 2);
  //       }

  //       slidesField.style.transform = `translateX(-${offset}px)`;

  //       if (slideIndex == slides.length) {
  //         slideIndex = 1;
  //       } else {
  //         slideIndex++;
  //       };

  //       if (slides.length < 10) {
  //         current.textContent = `0${slideIndex}`;
  //       } else {
  //         current.textContent = slideIndex;
  //       }
  //   });

  //   prev.addEventListener('click', () => {
  //     if (offset == 0) {
  //         offset = +width.slice(0, width.length - 2) * (slides.length -1);
  //         // console.log(offset);
  //     } else {

  //         offset -= +width.slice(0, width.length - 2);
  //     }

  //     slidesField.style.transform = `translateX(-${offset}px)`;

  //     if (slideIndex == 1) {
  //       slideIndex = slides.length;
  //     } else {
  //       slideIndex--;
  //     };

  //     if (slides.length < 10) {
  //       current.textContent = `0${slideIndex}`;
  //     } else {
  //       current.textContent = slideIndex;
  //     }

  // });

  // Slider
  // __________________________________________________________________

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
  //Tabs ________________________________________________
  const tabs = document.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector),
    tabsParent = document.querySelector(tabsParentSelector);

  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });
    tabs.forEach((item) => {
      item.classList.remove(activeClass);
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.add("hide");
    tabs[i].classList.add(activeClass);
  }

  hideTabContent();
  showTabContent();
  tabsParent.addEventListener("click", (event) => {
    const target = event.target;

    if (target && target.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {
  // Timer ____________________________________

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((t / 1000 / 60) % 60),
      seconds = Math.floor((t / 1000) % 60);
    return {
      t,
      days,
      hours,
      minutes,
      seconds,
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);
    updateClock(); // устранение мигания цифр при обновлении

    function updateClock() {
      const t = getTimeRemaining(endtime);
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.t <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData),
/* harmony export */   "getResource": () => (/* binding */ getResource)
/* harmony export */ });
const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: data,
    });

    return await res.json();
  };



  const getResource = async (url) => {
    const res = await fetch(url);
  
    if (!res.ok) {
      throw new Error(`could not fetch ${url}, status: ${res.status}`);
    }
  
    return await res.json();
  };
  

  
  

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");










window.addEventListener("DOMContentLoaded", () => {

    const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalTimerId), 50000);
         
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])("[data-modal]",'.modal', modalTimerId);
    (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_2__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_3__["default"])('form', modalTimerId);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
        container: ".offer__slider",
        slide: ".offer__slide", 
        nextArrow: ".offer__slider-next", 
        prevArrow: ".offer__slider-prev", 
        totalCounter: "#total", 
        currentCounter: "#current", 
        wrapper: ".offer__slider-wrapper", 
        field: ".offer__slider-inner"
    });
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_4__["default"])('.timer', '2022-01-01');
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_5__["default"])();

});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map