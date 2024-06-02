export const clickOnIngredientsEvent = (
  eventElement: { currentTarget: any },
  elementsOnDom:
    | NodeListOf<Element>
    | {
        getAttribute: (arg0: string) => string | null;
        classList: { remove: (arg0: string) => void };
      }[]
) => {
  const actualElement = eventElement.currentTarget;

  const actualElementDataId = (actualElement as HTMLElement).getAttribute(
    "data-id"
  );

  //   brothId = actualElementDataId;

  elementsOnDom.forEach(
    (element: {
      getAttribute: (arg0: string) => string | null;
      classList: { remove: (arg0: string) => void };
    }) => {
      if (element.getAttribute("data-id") !== actualElementDataId) {
        element.classList.remove("active");
      }
    }
  );

  (actualElement as HTMLElement).classList.add("active");

  //   checkButtonState();
  return actualElementDataId;
};
