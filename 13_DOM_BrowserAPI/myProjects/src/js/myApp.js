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

const headerSticky = {
  target: document.querySelector(".header-wrap"),
  className: "sticky",
  position: 18,
};

function AddClassOnScrollY(parameters) {
  this.handler = () => {
    const { target, className, position } = parameters;
    if (window.scrollY > position) {
      target.classList.add(className);
      window.removeEventListener("scroll", this.handler);
    }
  };

  window.addEventListener("scroll", this.handler);
}
new AddClassOnScrollY(headerSticky);

// NAV-SLIDE CONTROLLER
const ns = document.querySelector(".nav-slide");
const nsItems = Array.from([...ns.children]);
const opener = document.getElementById("opener");
const closer = document.getElementById("closer");

(() => {
  let timeout = false;
  return (() => {
    opener.addEventListener("mouseover", () => {
      if (!nsItems[1].classList.value) timeout = false;
      if (timeout) return;
      timeout = true;

      ns.classList.add("widen");
      ns.classList.remove("condense");

      nsItems.forEach((item, i) => {
        item.id === "closer"
          ? item.classList.add("invert--closer")
          : item.classList.add("invert");
        if (item.id === "opener") {
          item.classList.remove("toBlack");
          console.log(item);
          item.firstElementChild.classList.add("hide");
        }
        setTimeout(() => {
          item.id !== "opener" && item.classList.add("show");
        }, 200 * i);
      });
    });

    closer.addEventListener("click", () => {
      ns.classList.remove("widen");
      ns.classList.add("condense");

      [...nsItems].reverse().forEach((item, i) => {
        setTimeout(() => {
          item.id === "closer"
            ? item.classList.remove("invert--closer")
            : item.classList.remove("invert");
          if (item.id === "opener") {
            item.classList.add("toBlack");
            item.firstElementChild.classList.remove("hide");
          }
          item.id !== "opener" && item.classList.remove("show");
        }, 200 * i);
      });
    });
  })();
})();
