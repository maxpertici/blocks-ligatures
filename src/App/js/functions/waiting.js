/**
 * Waiting Element (single node)
 * @param querySelector
 *
 */
const waitingElement = (querySelector = "") => {
  return new Promise((resolve, reject) => {
    // delay : https://stackoverflow.com/questions/40328932/javascript-es6-promise-for-loop
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    (function loop(i) {
      if (null !== document.querySelector(querySelector)) {
        resolve(true);
        return;
      } // done
      delay(100).then(() => {
        loop(i + 1);
      });
    })(0);
  });
};

const waitingDependencies = (dependencies = []) => {
  return new Promise((resolve, reject) => {
    // delay : https://stackoverflow.com/questions/40328932/javascript-es6-promise-for-loop
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    (function loop(i) {
      // console.log( dependencies ) ;
      if (dependencies.every((dep) => window.hasOwnProperty(dep))) {
        resolve(true);
        return;
      } // done
      delay(100).then(() => {
        loop(i + 1);
      });
    })(0);
  });
};

export { waitingElement, waitingDependencies };
