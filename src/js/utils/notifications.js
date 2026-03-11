import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export function showNotification(message) {
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: "bottom",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "tomato",
    },
  }).showToast();
}
