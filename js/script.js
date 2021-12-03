/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

window.addEventListener("DOMContentLoaded", () => {
  //Tabs ________________________________________________
  const tabs = document.querySelectorAll(".tabheader__item"),
        tabsContent = document.querySelectorAll(".tabcontent"),
        tabsParent = document.querySelector(".tabheader__items");

  function hideTabContent() {
    tabsContent.forEach(item => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });
    tabs.forEach(item => {
      item.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.add("hide");
    tabs[i].classList.add("tabheader__item_active");
  }

  hideTabContent();
  showTabContent();
  tabsParent.addEventListener("click", event => {
    const target = event.target;

    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  }); // Timer ____________________________________

  const deadline = "2021-12-12"; // console.log(deadline);

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
          days = Math.floor(t / (1000 * 60 * 60 * 24)),
          hours = Math.floor(t / (1000 * 60 * 60) % 24),
          minutes = Math.floor(t / 1000 / 60 % 60),
          seconds = Math.floor(t / 1000 % 60);
    return {
      t,
      days,
      hours,
      minutes,
      seconds
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
          seconds = timer.querySelector("#seconds");
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

  setClock(".timer", deadline); // Модальне вікно_______________________________________________________
  //мій варіант---------------------------------------
  // const modal = document.querySelector(".modal");
  // document.addEventListener("click", (e) => {
  //   let target = e.target;
  //   if (!target.hasAttribute("data-modal")) return;
  //   modal.style.display = "block";
  // });
  // document.addEventListener("click", (e) => {
  //   let target = e.target;
  //   if (!target.hasAttribute("data-close")) return;
  //   modal.style.display = "none";
  // });
  //варіант з уроку-------------------------------------
  //модальне вікно 

  const modalTrigger = document.querySelectorAll("[data-modal]"),
        modal = document.querySelector(".modal");

  function openModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimerId);
  }

  modalTrigger.forEach(btn => {
    btn.addEventListener("click", openModal);
  });

  function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }


  modal.addEventListener("click", e => {
    if (e.target === modal || e.target.getAttribute('data-close' == '')) {
      closeModal();
    }
  }); // закриття модального вікна при натисканні на кнопку esc

  document.addEventListener("keydown", e => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  }); // поява моадльного вікна через певний проміжок часу
  const modalTimerId = setTimeout(openModal, 50000);
  //   одноразова поява модального вікна при прокрутчуванні до кінця сторінки.

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal(); // видалення обробника події

      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll); //Класи для карток

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
        this.clases.forEach(className => element.classList.add(className));
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

  const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
       throw  new Error(`could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
};

  getResource('http://localhost:3000/menu')
      .then(data => {
          data.forEach(({img,altimg, title, descr, price}) => {
              new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
          });
      });

  //Forms
  const forms = document.querySelectorAll('form');

  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Дякуємо! Чекайте на відповідь',
    failure: 'Щось пішло не так...'
  };

  forms.forEach(item => {
    bindPostData(item);
  })

  const postData = async (url,data) => {
      const res = await fetch(url, {
        method: "POST",
        headers: {
                'Content-type': 'application/json'
              },
        body: data
      });

      return await res.json();
  };

  function bindPostData(form) {
      form.addEventListener('submit', (e) => {
          e.preventDefault();

          const statusMessage = document.createElement('img');
          statusMessage.src = message.loading;
          statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
          `;
          
          form.insertAdjacentElement('afterend', statusMessage); // метод альтернатива append();

         

          // request.setRequestHeader('Content-type', 'multipart/form-data');
          //При використанні XMLHttpRequest + FormData не потрібно встановлювати заголовки setRequestHeader вони встановлюються автоматично!!!


          //Якщо дані потрібно відправити у форматі JSON потрібно прописувати заголовки вручну.
          
          const formData = new FormData(form);

          // const obj = {};                       // якщо сервер приймає json
          // formData.forEach(function(value,key){ // якщо сервер приймає json
          //     obj[key] = value;
          // });

          const json = JSON.stringify(Object.fromEntries(formData.entries()));

          const obje = {a: 23, b: 50};
          console.log(Object.entries(obje));


          postData('http://localhost:3000/requests', json)
            .then(data => {
              console.log(data, ' data');
              showThanksModal(message.success);
              statusMessage.remove();
          }).catch(() => {
              showThanksModal(message.failure);
          }).finally(() => {
              form.reset();
          });

          // request.send(formData); 
          // використовується якщо сервер приймає дані у форматі  FormData
          // request.send(json);                   // якщо сервер приймає json

      });
  }

    function showThanksModal(message) {
      const prevModalDialog = document.querySelector('.modal__dialog');

      prevModalDialog.classList.add('hide');
      openModal();

      const thanksModal = document.createElement('div');
      thanksModal.classList.add('modal__dialog');
      thanksModal.innerHTML = `
          <div class="modal__content">
              <div class="modal__close" data-close>&times;</div>
              <div class="modal__title">${message}</div>
          </div>
      `;

      document.querySelector('.modal').append(thanksModal);
      setTimeout(()=> {
          thanksModal.remove();
          prevModalDialog.classList.add('show');
          prevModalDialog.classList.remove('hide');
          closeModal();
      },4000);
  };

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

  fetch('http://localhost:3000/menu')
      .then(data => data.json())
      .then(res => console.log(res));


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

let offset = 0;
    let slideIndex = 1;

    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),

        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        width = window.getComputedStyle(slidesWrapper).width,
        slidesField = document.querySelector('.offer__slider-inner');

    console.log(+width.replace(/\D.+/mg, '')+1, 'start');

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent =  `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent =  slideIndex;
    }

    function zeroIndicate() {
      if (slides.length < 10) {
        current.textContent =  `0${slideIndex}`;
       } else {
        current.textContent =  slideIndex;
       }
    }

    function makeOpacity() {
      dots.forEach(dot => dot.style.opacity = '.5');
      dots[slideIndex -1].style.opacity = 1;
    }

    function takeDigits(str) {
        return +width.replace(/\D.+/mg, '')+1;
    };

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicatiors = document.createElement('ol');
    const dots = [];


    indicatiors.classList.add('carousel-indicators');
    
    slider.append(indicatiors);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');

        if (i == 0) {
            dot.style.opacity = 1;
        }

        indicatiors.append(dot);
        dots.push(dot);
    }

    next.addEventListener('click', () => {
        console.log(takeDigits(width), 'res');
        if (offset == (takeDigits(width)) * (slides.length - 1)) {
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

    prev.addEventListener('click', () => {
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

    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        const slideTo = e.target.getAttribute('data-slide-to');

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
// ________________________________________________________________


// Calculator __________________________________________________



});

/***/ })

/******/ });
//# sourceMappingURL=script.js.map