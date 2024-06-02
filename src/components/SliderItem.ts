import { ingredientClick } from "../main";
import { Broth } from "../types/broth";
import { Protein } from "../types/protein";

export const SliderItem = (element: Protein | Broth, type: string) => `
    <li class="slide__container">
        <article class="${type}" onclick="${() =>
  ingredientClick(type, element.id)}" data-id="${element.id}">
            <img class="inactive-image" src="${element.imageInactive}"/>
            <img class="active-image" src="${element.imageActive}"/>
            <h4>${element.name}</h4>
            <h5>${element.description}</h5>
            <h6>US$ ${element.price}</h6>
        </article>
    </li>

`;
