/**
 * Função para evitar chamadas desnecessárias de outra
 */
export const throttle = (fn: { (): void; apply?: any }, wait: number) => {
  let inThrottle: boolean, lastFn: number | undefined, lastTime: number;
  return function (this: unknown) {
    const context = this,
      args = arguments;
    if (!inThrottle) {
      fn.apply(context, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(function () {
        if (Date.now() - lastTime >= wait) {
          fn.apply(context, args);
          lastTime = Date.now();
        }
      }, Math.max(wait - (Date.now() - lastTime), 0));
    }
  };
};
