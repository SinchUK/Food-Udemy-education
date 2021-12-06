import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

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

      postData("http://localhost:3000/requests", json)
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
    openModal('.modal', modalTimerId);

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
      closeModal('.modal');
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

export default forms;
