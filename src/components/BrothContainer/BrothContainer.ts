import { Broth } from "../../types/broth";
import { ActiveBullet, Bullet } from "../Bullets";
import { SliderItem } from "../SliderItem";

export const BrothContainer = (response: any[]) => {
  return `
    <span class="outside-wrapper">
        <ul class="sliders__container">
            ${response
              .map((brothElement: Broth) => SliderItem(brothElement, "broth"))
              .join(" ")}
        </ul>
        </span>
        <ul class="bullets">${response
          .map((brothElement: any, index: number) => {
            if (brothElement) {
              if (index === 0) {
                return ActiveBullet;
              } else return Bullet;
            }
          })
          .join(" ")}
        </ul>
        `;
};
