import { BrothContainer } from "./components/BrothContainer/BrothContainer";
import { LoadError } from "./components/LoadError";
import { OrderPlaced } from "./components/OrderPlaced";

import { ProteinContainer } from "./components/ProteinContainer/ProteinContainer";
import { clickOnIngredientsEvent } from "./Functions/clickOnIngredientsEvent";
import { createCarousel } from "./Functions/createCarousel";

import "./styles/style.css";
import { Order } from "./types/order";

import { options, postOptions } from "./utils/apiOptions";
import { throttle } from "./utils/throttle";

const mainDiv = document.querySelector<HTMLDivElement>("#app");

let brothId: null | string = null;
let proteinId: null | string = null;

const init = () => {
  if (mainDiv) {
    const button = mainDiv.querySelector("#place-order");

    getBroths();
    getProteins();

    if (button) {
      button.addEventListener("click", createOrder);

      checkButtonState();
    }
  }
};

const getBroths = () =>
  fetch("https://api.tech.redventures.com.br/broths", options)
    .then((ingredients) => ingredients.json())
    .then((ingredients) => {
      const brothElement = mainDiv!.querySelector(".broth-list__container");

      if (brothElement) {
        brothElement.innerHTML = BrothContainer(ingredients);

        const brothElementsOnDom = mainDiv!.querySelectorAll(".broth");

        if (brothElementsOnDom.length) {
          brothElementsOnDom.forEach((element) => {
            element.addEventListener("click", (e) => {
              brothId = clickOnIngredientsEvent(e, brothElementsOnDom);
              checkButtonState();
            });
          });

          createCarousel();
        }
      }
    })
    .catch((err) => {
      console.error(err);

      const brothElement = mainDiv!.querySelector(".broth-list__container");

      if (brothElement) brothElement.innerHTML = LoadError;
    });

const getProteins = () =>
  fetch("https://api.tech.redventures.com.br/proteins", options)
    .then((ingredients) => ingredients.json())
    .then((ingredients) => {
      const proteinElement = mainDiv?.querySelector(".protein-list__container");

      if (proteinElement) {
        proteinElement.innerHTML = ProteinContainer(ingredients);

        const proteinElementsOnDom = mainDiv?.querySelectorAll(".protein");

        if (proteinElementsOnDom?.length) {
          proteinElementsOnDom.forEach((element) => {
            element.addEventListener("click", (e) => {
              proteinId = clickOnIngredientsEvent(e, proteinElementsOnDom);
              checkButtonState();
            });
          });

          createCarousel();
        }
      }
    })
    .catch((err) => {
      console.error(err);

      const proteinElement = mainDiv!.querySelector(".protein-list__container");

      if (proteinElement) proteinElement.innerHTML = LoadError;
    });

export const ingredientClick = (type: string, id: string) => {
  switch (type) {
    case "broth":
      brothId = id;
      break;

    case "protein":
      proteinId = id;
      break;

    default:
      break;
  }
};

const createOrder = throttle(() => {
  if (brothId !== ("" || null) && proteinId !== ("" || null)) {
    fetch("https://api.tech.redventures.com.br/orders", {
      method: postOptions.method,
      headers: postOptions.headers,
      body: postOptions.body(brothId, proteinId),
    })
      .then((response) => response.json())
      .then((order: Order) => {
        mainDiv!.innerHTML = OrderPlaced(order);
        window.scrollTo(0, 0);
      })
      .catch((err) => {
        const button = mainDiv!.querySelector("#place-order");

        console.error(err);

        if (button) {
          button.setAttribute(
            "data-query-error",
            "Houve um problema ao enviar seu pedido"
          );

          setTimeout(() => {
            button.removeAttribute("data-query-error");
          }, 3500);
        }
      });
  } else window.alert("Escolha seus ingredientes");
}, 5000);

export const checkButtonState = () => {
  const buttonElement = mainDiv!.querySelector("#place-order");

  if (buttonElement) {
    if (brothId === null || proteinId === null) {
      buttonElement.classList.add("inactive");
    } else buttonElement.classList.remove("inactive");
  }
};

mainDiv!.innerHTML = `
  <div class="container">
  <div class="container__top-section">
    <div class="header">
      <img class="logo" src="main-logo.svg"/>
    </div>
    <div class="hero">
      <span class="hero__image-container">
       <img class="hero-image" src="main-illustration.svg"/>
      </span>
      <span class="hero__texts-container">
        <h1>ラ l メ ン <br/> <span>GO!</span></h1>
        <p>Enjoy a good ramen in the comfort of your house. Create your own ramen and choose your favorite flavour combination!</p>
        <button onclick="window.location = '/#order-section'" class="button">
          Place My Order 
          <img src="white-arrow.svg"/>
        </button>
      </span>
    </div>
  </div>
  <div id="order-section" class="container__order-section">
    <div class="container__order-section___broth">
      <h3 class="title">
        First things first: select your favorite broth.
      </h3>
      <p class="description">
        It will give the whole flavor on your ramen soup. 
      </p>
      <div class="broth-list__container slider">
      </div>
    </div>
    <div class="container__order-section___protein">
      <h3 class="title">
        It's time to choose (or not) your meat!
      </h3>
      <p class="description">
        It will give the whole flavor on your ramen soup. 
      </p>
      <div class="protein-list__container slider">
      </div>
    </div>
      <button id="place-order" class="button">
        Place My Order 
        <img src="white-arrow.svg"/>
      </button>
  </div>
`;

init();
