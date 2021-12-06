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

export default slider;
