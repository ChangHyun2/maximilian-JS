class DOMHelper {
  static clearEventListeners(element) {
    const clonedElement = element.cloneNode(true);
    // https://pawelgrzybek.com/cloning-dom-nodes-and-handling-attached-events/
    element.replaceWith(clonedElement); // 자식 노드를 교체
    // https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/replaceWith
    return clonedElement;
  }

  static moveElement(elementId, newDestinationSelector) {
    const element = document.getElementById(elementId);
    const destinationElement = document.querySelector(newDestinationSelector);
    destinationElement.append(element);
  }
}

class Component {
  detach = () => {
    this.element.remove();
    //   this.element.parentElement.removeChild(this.element);
  };
  attach() {
    const tooltipElement = document.createElement("div");
    tooltipElement.className = "card";
    tooltipElement.textContent = "DUMMY";
    this.element = tooltipElement;
    tooltipElement.addEventListener("click", this.closeTooltip);
    document.body.append(tooltipElement);
  }
}

class Tooltip {
  constructor(closeNotifierFunction) {
    this.closeNotifier = closeNotifierFunction;
  }

  closeTooltip = () => {
    this.detach();
    this.closeNotifier();
  };

  detach = () => {
    this.element.remove();
    //   this.element.parentElement.removeChild(this.element);
  };
  attach() {
    const tooltipElement = document.createElement("div");
    tooltipElement.className = "card";
    tooltipElement.textContent = "DUMMY";
    this.element = tooltipElement;
    tooltipElement.addEventListener("click", this.closeTooltip);
    document.body.append(tooltipElement);
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
    const tooltip = new Tooltip(() => {
      this.hasActiveTooltip = false;
    });
    tooltip.attach();
    this.hasActiveTooltip = true;
  }

  connectMoreInfoButton() {
    const projectItemElement = document.getElementById(this.id);
    const moreInfoBtn = projectItemElement.querySelector(
      "button:first-of-type"
    );
    moreInfoBtn.addEventListener("click", this.showMoreInfoHandler);
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
    console.log(this.projects);
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
  }
}

App.init();
