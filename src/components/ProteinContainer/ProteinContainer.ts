import { Protein } from "../../types/protein";
import { ActiveBullet, Bullet } from "../Bullets";
import { SliderItem } from "../SliderItem";

export const ProteinContainer = (response: any[]) => {
  return `
    <span class="outside-wrapper">
          <ul class="sliders__container">
            ${response
              .map((proteinElement: Protein) =>
                SliderItem(proteinElement, "protein")
              )
              .join(" ")}
          </ul>
        </span>
        <ul class="bullets">${response
          .map((proteinElement: any, index: number) => {
            if (proteinElement) {
              if (index === 0) {
                return ActiveBullet;
              } else return Bullet;
            }
          })
          .join(" ")}
        </ul>
    `;
};
