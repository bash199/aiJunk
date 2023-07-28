import { files } from "./app.js";
import { file_input, imagesBbox } from "./selectors.js";

export let selectedImage = null;

export const addImageBtnClick = (e) => {
   e.preventDefault();
   file_input.click();
};

const makeTop = () => {
   let doWihle = true;
   let height = imagesBbox.clientHeight;
   let width = imagesBbox.clientWidth;
   let top = 0;
   let left = 0;
   while (doWihle) {
      top = Math.random() * imagesBbox.clientHeight;
      left = Math.random() * imagesBbox.clientWidth;
      if (top < height && left < width) doWihle = false;
   }
   return { top, left };
};

export const file_inputChange = (e) => {
   let file = e.target.files[0];
   const timeStamp = Date.now();

   if (file) {
      const fielName = `${timeStamp}-${file.name}`;
      let img = document.createElement("img");
      img.src = URL.createObjectURL(file);
      img.setAttribute("class", "image");
      img.setAttribute("data-filename", fielName);
      img.id = timeStamp;
      files[fielName] = img.id;
      const maxTop = imagesBbox.clientHeight - 100;
      const maxLeft = imagesBbox.clientWidth - 100;
      const top = Math.floor(Math.random() * maxTop);
      const left = Math.floor(Math.random() * maxLeft);
      img.style.top = `${top}px`;
      img.style.left = `${left}px`;
      if (imagesBbox.children.length === 0) {
         selectedImage = fielName;
         img.style.outline = "1px solid red";
         img.style.zIndex = 1;
      }

      imagesBbox.appendChild(img);

      img.addEventListener("click", (e) => {
         const fielName = e.target.getAttribute("data-filename");
         if (selectedImage) {
            const prevImg = document.getElementById(files[selectedImage]);
            prevImg.style.outline = "";
            prevImg.style.zIndex = 0;
         }

         selectedImage = fielName;
         e.target.style.outline = "1px solid red";
         e.target.style.zIndex = 1;
      });
   }
};

export const keysMetods = {
   ArrowUp: (img) => {
      let top = parseInt(img.style.top) || 0;
      top -= 10;
      if (top >= 0) {
         img.style.top = `${top}px`;
      }
   },
   ArrowDown: (img) => {
      let top = parseInt(img.style.top) || 0;
      top += 10;
      if (top < imagesBbox.clientHeight - 100) {
         img.style.top = `${top}px`;
      }
   },
   ArrowLeft: (img) => {
      let left = parseInt(img.style.left) || 0;
      left -= 10;
      if (left >= 0) {
         img.style.left = `${left}px`;
      }
   },
   ArrowRight: (img) => {
      let left = parseInt(img.style.left) || 0;
      left += 10;
      if (left < imagesBbox.clientWidth - 100) {
         img.style.left = `${left}px`;
      }
   },
};
