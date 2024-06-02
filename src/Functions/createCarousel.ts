export const createCarousel = () => {
  const sliderElementsOnDom = document.querySelectorAll(".slider");

  if (sliderElementsOnDom.length > 0) {
    if (window.innerWidth > 768) return;

    sliderElementsOnDom.forEach((actualSlide) => {
      const slider = actualSlide,
        sliderItems = actualSlide.querySelector(".sliders__container");
      const bullets = actualSlide.querySelectorAll(".bullet");

      function slide(wrapper: any, items: any) {
        let posX1 = 0,
          posX2 = 0,
          posInitial: any,
          posFinal,
          threshold = 100,
          slides = items.getElementsByClassName("slide__container"),
          slidesLength = slides.length,
          slideSize =
            slides[0].offsetWidth +
            parseInt(window.getComputedStyle(slides[0]).marginRight),
          index = 0,
          allowShift = true;

        wrapper.classList.add("loaded");

        items.onmousedown = dragStart;

        items.addEventListener("touchstart", dragStart);
        items.addEventListener("touchend", dragEnd);
        items.addEventListener("touchmove", dragAction);

        items.addEventListener("transitionend", checkIndex);

        function dragStart(e: any) {
          e = e || window.event;
          posInitial = items.offsetLeft;

          if (e.type === "touchstart") {
            posX1 = e.touches[0].clientX;
          } else {
            posX1 = e.clientX;
            document.onmouseup = dragEnd;
            document.onmousemove = dragAction;
          }
        }

        function dragAction(e: any) {
          e = e || window.event;

          if (e.type === "touchmove") {
            posX2 = posX1 - e.touches[0].clientX;
            posX1 = e.touches[0].clientX;
          } else {
            posX2 = posX1 - e.clientX;
            posX1 = e.clientX;
          }
          items.style.left = items.offsetLeft - posX2 + "px";
        }

        function dragEnd() {
          posFinal = items.offsetLeft;

          if (posFinal - posInitial < -threshold) {
            shiftSlide(1, "drag");
          } else if (posFinal - posInitial > threshold) {
            shiftSlide(-1, "drag");
          } else {
            items.style.left = posInitial + "px";
          }

          document.onmouseup = null;
          document.onmousemove = null;
        }

        function shiftSlide(dir: any, action?: any) {
          items.classList.add("shifting");

          if (allowShift) {
            if (!action) {
              posInitial = items.offsetLeft;
            }

            if (dir === 1) {
              if (index < slidesLength - 1) {
                items.style.left = posInitial - slideSize + "px";
                index++;
              } else {
                items.style.left = `-${(slidesLength - 1) * slideSize}px`;
              }
            } else if (dir === -1) {
              if (index > 0) {
                items.style.left = posInitial + slideSize + "px";
                index--;
              } else {
                items.style.left = `0px`;
              }
            }
          }

          allowShift = false;

          updateBullet();
        }

        function checkIndex() {
          items.classList.remove("shifting");

          if (index >= slidesLength - 1) {
            index = slidesLength - 1;
            items.style.left = `-${(slidesLength - 1) * slideSize}px`;
          }

          if (index <= 0) {
            index = 0;
            items.style.left = `0px`;
          }

          allowShift = true;
        }

        let currentIndex = 0;

        bullets.forEach(function (bullet, index) {
          bullet.addEventListener("click", function () {
            goToSlide(index);
          });
        });

        function goToSlide(index: number) {
          if (index < 0 || index >= bullets.length) return;

          (sliderItems as any).style.left = `-${index * 100}%`;

          bullets[currentIndex].classList.remove("active");

          bullets[index].classList.add("active");

          currentIndex = index;
        }

        function updateBullet() {
          bullets.forEach((bullet) => bullet.classList.remove("active"));

          bullets[index].classList.add("active");
        }
      }

      if (slider && sliderItems) {
        slide(slider, sliderItems);
      }
    });
  }
};
