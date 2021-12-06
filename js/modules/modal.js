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

export default modal;
export {closeModal, openModal};