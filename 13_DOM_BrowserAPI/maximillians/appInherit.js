class DOMHelper {
  static clearEventListeners(element) {
    const clonedElement = element.cloneNode(true);
    element.replaceWith(clonedElement);
    return clonedElement;
  }
  static moveElement(elementId, newDestinationSelector) {
    const element = document.getElementById(elementId);
    const destinationElement = document.querySelector(newDestinationSelector);
    destinationElement.append(element);
    element.scrollIntoView({ behavior: "smooth" });
  }
}

class Component {
  constructor(hostElementId, insertBefore = false) {
    if (hostElementId) {
      this.hostElement = document.getElementById(hostElementId);
    } else {
      this.hostElement = document.body;
    }
    this.insertBefore = insertBefore;
  }

  detach() {
    if (this.element) {
      this.element.remove();
      //   this.element.parentElement.removeChild(this.element);
    }
  }

  attach() {
    this.hostElement.insertAdjacentElement(
      this.insertBefore ? "beforebegin" : "beforeend",
      this.element
    );
  }
}

class Tooltip extends Component {
  constructor(closeNotifierFunction, text, hostElementId) {
    super(hostElementId);
    this.closeNotifier = closeNotifierFunction;
    this.text = text;
    this.create();
  }

  closeTooltip = () => {
    this.detach();
    this.closeNotifier();
  };

  create() {
    const tooltipElement = document.createElement("div");
    tooltipElement.className = "card";
    const tooltipTemplate = document.getElementById("tooltip");
    const tooltipBody = document.importNode(tooltipTemplate.content, true);
    // import only content and make node
    // boolean : deep import
    tooltipBody.querySelector("p").textContent = this.text;
    tooltipElement.append(tooltipBody);
    // HTML code를 HTML파일에 옮겨두기 때문에 snippet이 길어질 수록, js에서는 코드가 짧아짐.
    // 협업에 유리해.

    console.log(this.hostElement.getBoundingClientRect());
    console.dir(this.hostElement);
    const { offsetLeft, offsetTop, clientHeight } = this.hostElement;
    const parentScrolling = this.hostElement.parentElement.scrollTop;

    console.log(this.hostElement.parentElement.scrollTop, parentScrolling);
    const x = offsetLeft + 20;
    const y = offsetTop + clientHeight - parentScrolling - 10;

    tooltipElement.style.left = x + "px";
    tooltipElement.style.top = y + "px";
    tooltipElement.style.position = "absolute";

    // 스크롤한 길이를 빼줘야 돼.

    tooltipElement.addEventListener("click", this.closeTooltip);
    this.element = tooltipElement;
  }
}

class ProjectItem {
  hasActiveTooltip = false;

  constructor(id, updateProjectListsFunction, type) {
    this.id = id;
    this.updateProjectListsHandler = updateProjectListsFunction;
    this.connectMoreInfoButton();
    this.connectSwitchButton(type);
  }

  showMoreInfoHandler() {
    if (this.hasActiveTooltip) {
      return;
    }

    //list item has data attribute
    const projectElement = document.getElementById(this.id);
    // dataset을 추가하는 방법
    // console.log(projectElement.dataset);
    // projectElement.dataset.someInfo = "Test";
    // DOMStringMap 객체로 출력됨.
    const tooltipText = projectElement.dataset.extraInfo;
    const tooltip = new Tooltip(
      () => {
        this.hasActiveTooltip = false;
      },
      tooltipText,
      this.id
    );

    tooltip.attach();

    this.hasActiveTooltip = true;
  }

  connectMoreInfoButton() {
    const projectItemElement = document.getElementById(this.id);
    const moreInfoBtn = projectItemElement.querySelector(
      "button:first-of-type"
    );
    moreInfoBtn.addEventListener("click", this.showMoreInfoHandler.bind(this));
  }
  connectSwitchButton(type) {
    const projectItemEl = document.getElementById(this.id);
    let switchBtn = projectItemEl.querySelector("button:last-of-type");
    switchBtn = DOMHelper.clearEventListeners(switchBtn);
    switchBtn.textContent = type === "active" ? "Finish" : "Activate";
    switchBtn.addEventListener(
      "click",
      this.updateProjectListsHandler.bind(null, this.id)
    );
    // handler 함수를 상위에서 인자로 전달받으면, 상위 컴포넌트의 메소드를 끌어다 쓸 수 있음.
  }
  update(updateProjectListFn, type) {
    this.updateProjectListsHandler = updateProjectListFn;
    this.connectSwitchButton(type);
  }
}

class ProjectList {
  projects = [];

  constructor(type, switchHandlerFunction) {
    this.type = type;
    this.switchHandler = switchHandlerFunction;
    const prjItems = document.querySelectorAll(`#${type}-projects li`);
    for (const prjItem of prjItems) {
      this.projects.push(
        new ProjectItem(prjItem.id, this.switchProject.bind(this), this.type)
        // 하위 컴포넌트 item을 클릭할 경우, list에서 이를 처리함.
        // so, this를 바인드한채로, switchProject callback을 전달.
      );
    }
  }

  setSwitchHandlerFunction(switchHandlerFunction) {
    this.switchHandler = switchHandlerFunction;
  }

  addProject(project) {
    this.projects.push(project);
    DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
    project.update(this.switchProject.bind(this), this.type); // switchhandler를 update.
  }

  switchProject(projectId) {
    //   const projectIndex = this.projects.findIndex(p=>p.id===projectId);
    //   this.projects.splice(projectIndex, 1);
    this.switchHandler(this.projects.find((p) => p.id === projectId));
    this.projects = this.projects.filter((p) => p.id !== projectId);
  }
}

class App {
  static init() {
    const activeProjectsList = new ProjectList("active");
    const finishedProjectsList = new ProjectList("finished");

    activeProjectsList.setSwitchHandlerFunction(
      finishedProjectsList.addProject.bind(finishedProjectsList)
      // bind하지 않으면, App이 this가 됨.
      // 다른 컴포넌트의 함수를 인자로 전달해,
      // activeProjectsList의 switchHandler로 지정.
    );
    finishedProjectsList.setSwitchHandlerFunction(
      activeProjectsList.addProject.bind(activeProjectsList)
    );

    document
      .getElementById("btn-sendSomething")
      .addEventListener("click", this.sendSomething);
  }
  static sendSomething() {
    const sendScript = document.createElement("script");
    sendScript.src = "sendSomething.js";
    sendScript.defer = true;
    document.head.append(sendScript);
  }
}

App.init();
