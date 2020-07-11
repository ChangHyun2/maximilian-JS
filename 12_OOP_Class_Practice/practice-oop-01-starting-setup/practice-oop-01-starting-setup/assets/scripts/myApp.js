// class Attribute {
//   constructor(attribute, value) {
//     this.attribute = attribute;
//     this.value = value;
//   }
// }

// class Component {
//   constructor(renderHookId, shouldRender) {
//     this.hookId = renderHookId;
//     if (shouldRender) this.render();
//   }

//   render() {}

//   createRootEl(tag, className, attributes) {
//     const $root = document.createElement(tag);
//     if (className) $root.className = className;
//     if (attributes.length > 0)
//       attributes.forEach(({ attribute, value }) =>
//         $root.setAttribute(attribute, value)
//       );

//     const $hook = document.getElementById(this.hookId);
//     $hook.append($root);

//     return $root;
//   }
// }

// header #main-header

// section #active-projects
//   header
//     h2
//   ul
//     li #p1 .card
//       h2
//       p
//       button .alt
//       button
//     li #p2 .card
//       h2
//       p
//       button .alt
//       button

// section #finished-projects
//   header
//     h2
//     ul
//       li #p3 .card
//         h2
//         p
//         button .alt
//         button

const data = [
  {
    state: "active",
    id: "p1",
    title: "Finish the Course",
    content: "Finish the course within the next two weeks.",
  },
  {
    state: "active",
    id: "p2",
    title: "Buy Groceries",
    content: "Don't forget to pick up groceries today.",
  },
  {
    state: "finished",
    id: "p3",
    title: "Book Hotel",
    content:
      "Academind conference takes place in December, don't forget to book a hotel.",
  },
];

class Planner {
  render() {
    const body = document.body;
    body.innerHTML = `
            <header></header>
            <main></main>
        `;
  }
}

class ListItem {
  constructor(id, title, content) {
    this.id = id;
    this.title = title;
    this.content = content;
  }

  render() {
    const el = document.createElement("li");
    el.className = "card";
    el.id = this.id;

    el.innerHTML = `
      <h2>${this.title}</h2>
      <p>${this.content}</p>
      <button class="alt">More Info</button>
      <button>Finish</button>
    `;
    return el;
  }
}

class ProjectList {
  data = [];

  constructor(id, title) {
    this.id = id;
    this.title = title;
    this.render();
    this.getProjectItems();
  }

  getProjectItems() {
    const _data = data.filter(({ state }) => this.id === `${state}-projects`);
    if (_data.length > 0) {
      _data.forEach(({ id, title, content }) =>
        this.data.push(new ListItem(id, title, content))
      );
    }
  }

  bindEvents() {
    this.data.forEach((each) => {
      each.addEventListener("click", function () {});
    });
  }

  render() {
    const el = document.createElement("section");
    el.id = this.id;
    el.innerHTML = `
      <header>
        <h2>${this.title}</h2>
      </header>
      <ul>
      </ul>
    `;
    return el;
  }
}

class ProjectPlanner {
  constructor() {
    this.getComonpents();
    this.render();
  }

  getComonpents() {
    this.header = document.createElement("header");
    this.header.id = "main-header";
    this.header.innerHTML = `
      <h1>Project Planner</h1>
    `;

    this.activeProjectList = new ProjectList(
      "active-projects",
      "active projects"
    );

    this.finishedProjectList = new ProjectList(
      "finished-projects",
      "finished projects"
    );
  }

  render() {
    const activeList = this.activeProjectList.render();
    const finishedList = this.finishedProjectList.render();
    document.body.append(this.header);
    document.body.append(activeList);
    document.body.append(finishedList);
    this.activeProjectItems = activeList.querySelector("ul");
    this.finishedProjectItems = finishedList.querySelector("ul");
    this.activeProjectList.data.forEach((each) =>
      this.activeProjectItems.append(each.render())
    );
    this.finishedProjectList.data.forEach((each) =>
      this.finishedProjectItems.append(each.render())
    );
  }
}

class App {
  static init() {
    this.planner = new ProjectPlanner();
  }
}

App.init();
