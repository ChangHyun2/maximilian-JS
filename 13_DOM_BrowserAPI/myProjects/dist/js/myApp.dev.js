"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// /**************************************** practice ******************************************* */
// class Component {
//   attach() {}
// }
// class ProjectList extends Component {
//   constructor(type) {
//     super();
//     this.type = type;
//     this.fetchProjects();
//   }
//   projects = [];
//   fetchProjects() {
//     const projects = document.querySelectorAll("card");
//     projects.forEach((p) => this.projects.push(new ProjectItem(p.id, p.type)));
//   }
// }
// class ProjectItem {
//   cosntructor(id, type) {
//     this.id = id;
//     this.type = type;
//   }
//   bindEvents(infoHandler, switchHandler) {
//     const infoBtn = document.querySelector("button:first-of-type");
//     const switchBtn = document.querySelector("button:last-of-type");
//     infoBtn.addEventListener("click", infoHandler);
//     switchBtn.addEventListener("click", switchHandler);
//   }
//   infoHandler() {
//     const dataInfo = document.getElementById(id).dataset.dataInfo;
//   }
// }
// class ToolTip {
//   constructor(targetId, text) {
//     this.target = document.querySelector(`#${targetId}`);
//     this.text = text;
//   }
//   create() {
//     const toolTip = document.createElement("div");
//     toolTip.textContent = this.text;
//     this.target.append(toolTip);
//   }
// }
// class App {
//   static init() {
//     const activeProjectsList = new ProjectList("active");
//     const finishedProjectList = new ProjectList("finished");
//   }
// }
// HEADER STICKY CONTROLLER
var headerSticky = {
  target: document.querySelector(".header-wrap"),
  className: "sticky",
  position: 18
};

function AddClassOnScrollY(parameters) {
  var _this = this;

  this.handler = function () {
    var target = parameters.target,
        className = parameters.className,
        position = parameters.position;

    if (window.scrollY > position) {
      target.classList.add(className);
      window.removeEventListener("scroll", _this.handler);
    }
  };

  window.addEventListener("scroll", this.handler);
}

new AddClassOnScrollY(headerSticky); // NAV-SLIDE CONTROLLER

var ns = document.querySelector(".nav-slide");
var nsItems = Array.from(_toConsumableArray(ns.children));
var opener = document.getElementById("opener");
var closer = document.getElementById("closer");

(function () {
  var timeout = false;
  return function () {
    opener.addEventListener("mouseover", function () {
      if (!nsItems[1].classList.value) timeout = false;
      if (timeout) return;
      timeout = true;
      ns.classList.add("widen");
      ns.classList.remove("condense");
      nsItems.forEach(function (item, i) {
        item.id === "closer" ? item.classList.add("invert--closer") : item.classList.add("invert");

        if (item.id === "opener") {
          item.classList.remove("toBlack");
          console.log(item);
          item.firstElementChild.classList.add("hide");
        }

        setTimeout(function () {
          item.id !== "opener" && item.classList.add("show");
        }, 200 * i);
      });
    });
    closer.addEventListener("click", function () {
      ns.classList.remove("widen");
      ns.classList.add("condense");

      _toConsumableArray(nsItems).reverse().forEach(function (item, i) {
        setTimeout(function () {
          item.id === "closer" ? item.classList.remove("invert--closer") : item.classList.remove("invert");

          if (item.id === "opener") {
            item.classList.add("toBlack");
            item.firstElementChild.classList.remove("hide");
          }

          item.id !== "opener" && item.classList.remove("show");
        }, 200 * i);
      });
    });
  }();
})();