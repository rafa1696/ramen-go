import { Order } from "../types/order";

export const OrderPlaced = (order: Order) => `
<div class="container order-placed">
    <div class="container__order-placed__left-column">
       <div class="hero">
          <div class="container__top-section">
            <div class="header">
              <img class="logo" src="orange-logo.svg"/>
            </div>
          </div>
          <span class="hero__image-container">
            <img src="${order.image}"/>
          </span>
          <span class="hero__texts-container">
            <h1>Your Order:</h1>
            <h2>${order.description}</h2>
            <p>Enjoy a good ramen in the comfort of your house. Create your own ramen and choose your favorite flavour combination!</p>
          </span>
        </div>
      </div>
      <div class="container__order-placed__right-column">
        <span class="right-column__container___order-other-info">
          <img src="order-placed.svg"/>
          <h2>どもありがとうございます。<span>Your order is being prepared</span></h2>
          <p>Hold on, when you least expect you will be eating your rámen. </p>
          <button class="button" onclick="location.replace('/ramen-go')">
            Place New Order
            <img src="yellow-arrow.svg"/>
          </button>
        </span>
      </div>
    </div>
`;
