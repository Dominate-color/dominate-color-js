import { colorDetection } from "@dominate-color-js/core";

type error = { stack: string };

try {
  const ctx = self;

  ctx.addEventListener("message", (event) => {
    colorDetection(event.data, "fast", 5)
      .then((colors) => {
        const colorsString = colors.map(
          (color) => `rgb(${color[0]},${color[1]},${color[2]})`
        );
        const message = {
          type: "success",
          value: colorsString,
        };
        postMessage(message);
      })
      .catch((error: error) => {
        const message = {
          type: "error",
          value: JSON.stringify(error),
        };
        postMessage(message);
      });
  });
} catch (e) {
  const message = {
    type: "error",
    value: `error: ${e}`,
  };
  postMessage(message);
}
