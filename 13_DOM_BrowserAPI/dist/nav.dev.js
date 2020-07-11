// class NavSlider {
//   contents = [];
//   constructor($target, className, pixel) {
//     this.$target = $target;
//     this.className = className;
//     this.pixel = pixel;
//   }
//   fetchItems(contents) {
//     this.contents = contents;
//   }
//   get width(adjust = 0) {
//     let totalLength = this.contents.reduce(
//       (accum, text) => accum + text.length,
//       0
//     );
//     return (totalLength + adjust) * this.pixel;
//   }
//   set width(width) {
//     this.width = width;
//   }
//   render() {
//     const ul = document.createElement("ul");
//     ul.className = this.className;
//     this.opener = new NavSliderItem(
//       ul,
//       `${this.className}__opener`,
//       "+",
//       "opener"
//     );
//     this.closer = new NavSliderItem(ul, `${this.className}__closer`, "x");
//     this.$target.append(ul);
//   }
// }
// class NavSliderItem {
//   constructor($target = document.body, className, text, toggler = false) {
//     this.$target = $target;
//     this.className = className;
//     this.text = text;
//     if (toggler) this.toggler = toggler;
//   }
//   render() {
//     const li = document.createElement("li");
//     li.textContent = this.text;
//     setToggler(this.toggler);
//     $target.append(li);
//   }
//   setToggler(toggler) {
//     if ((toggler = "opener")) {
//       li.setAttribute("id", "opener");
//       li.classList.add("nav-slide__opener show");
//     }
//     if ((toggler = "closer")) {
//       li.setAttribute("id", "closer");
//       li.classList.add("nav-slide__closer show");
//     }
//   }
// }
"use strict";