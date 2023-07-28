import { addImageBtnClick, file_inputChange, keysMetods, selectedImage } from "./eventHandlers.js";
import { addImageBtn, file_input } from "./selectors.js";

export let files = {};

addImageBtn.addEventListener("click", addImageBtnClick);
file_input.addEventListener("change", file_inputChange);

document.addEventListener("keyup", (e) => {
   if (selectedImage && keysMetods[e.key]) {
      const id = files[selectedImage];
      const img = document.getElementById(id);
      keysMetods[e.key](img);
   }
});
