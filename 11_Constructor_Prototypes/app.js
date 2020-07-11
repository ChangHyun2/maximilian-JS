// class AgedPerson {
//   printAge() {
//     console.log(this.age);
//   }
// }

// class Person extends AgedPerson {
//   name = "jun";

//   constructor() {
//     super();
//     this.age = 30;
//   }
//   greet() {
//     console.log(`hi i am ${this.name} and I am ${this.age} years old`);
//   }
// }

// // function Person() {
// //   //   this = {}; // new를 통해 functino을 실행할 경우, this 인스턴스를 생성
// //   this.age = 30;
// //   this.name = "jun";
// //   this.greet = () => {
// //     console.log(`hi i am ${this.name} and I am ${this.age} years old`);
// //   };
// //   //   return this; // new를 통해 function을 실행할 경우, this인스턴스를 생성하고, return함
// // }

// // 첫 글자 대문자는 convention일 뿐
// // Person 구성자 함수에 의해 생성되는 this.age, this.name, this.greet 등등은,
// // class의 constructor(){}내에 위치하는 properties와 동일.

// // class의 field에 생성되는 것은 ###prototype###임!!
// const person = new Person();
// person.greet();
// console.dir(Person);
// console.log(person); // Person 구성자 함수의 인스턴스
// console.log(person.__proto__); // Person 구성자 함수의 prototype, greet 메소드 포함.
// console.log(person.__proto__.__proto__);
// console.log(person.__proto__.__proto__.__proto__);

// console.log(person.toString()); // person의 prototype의 prototype인 object의 method임.
// console.log(Person.prototype); // agedPerson {}
// console.log(Person.__proto__); // Function
// console.log(person.__proto__);

// console.log(Person.prototype == person.__proto__);

// Person.prototype = {
//   sayHello() {
//     console.log("hello");
//   },
// };
// console.log(Person.prototype == person.__proto__);

// const person2 = new Person();
// console.log(Person.prototype == person2.__proto__);

// // prototype은 함수에 존재함.
// // __proto__는 js의 모든 obejct를 나타냄.

//************ classes Prototypes************** */
class AgedPerson {
  constructor() {
    console.log(this.name);
  }

  printAge() {
    console.log(this.age);
  }
}

class Person extends AgedPerson {
  name = "Max";

  constructor() {
    super();
    console.log(this.name);
    // this.greet = function () {
    //   console.log(this.name);
    // };
    // optimizing이 되지 않아. 인스턴스마다 greet가 생성됨.
    this.greet();
    this.age = 30;
    this.greet();
    this.name = "max";
    console.log(this.name);
  }

  // greet = function(){
  //   console.log(this.naem, this.age)
  // }
  // 동작상 아래의 메소드와 같아보이지만, greet은 optimize가 되지 않아.
  // Person의 인스턴스마다 greet가 생성됨.
  // but 퍼포먼스에 큰 차이는 없음.
  // greet = ()=>{
  //   console.log(this.name, this.age):
  // }
  // 만약 expression으로 선언할 경우, arrow func 쓸 것.
  greet() {
    console.log(this.name, this.age);
  }
}

const p = new Person();
const p2 = new Person();
console.log(p);
console.log(p.__proto__);
// optimizing을 위해 class의 필드에 선언되는 메소드는 constructor의 prototype으로 넘김.
/* function으로 구현할 경우,
Person.prototype.greet = function(){
  console.log(this.name, this.age);
}
*/
console.log(p.__proto__ === p.__proto__);

//************* set get prototypes ************** */

const course = {
  // new Object();
  title: "Javascript - The Complete Guide",
  rating: 5,
};
console.log(course.__proto__); // 새롭게 등장한 get prorotype 메소드
console.log(Object.getPrototypeOf(course)); // official get prototype method

// set prototype
Object.setPrototypeOf(course, {
  printRating: function () {
    console.log(`${this.rating}/5`);
  },
});
// add prototype
Object.setPrototypeOf(course, {
  ...Object.getPrototypeOf(course),
  printRating2: function () {
    console.log(`${this.rating}/100`);
  },
});
console.log(course);
course.printRating();
course.printRating2();

const student = Object.create(
  {
    printProgress: function () {
      console.log(this.progress);
    },
  },
  {
    name: {
      value: "jun",
      configurable: true,
      enuerable: true,
      writable: true,
    },
  }
);
// descripted Object에 prototype을 추가

// student.name = "jun";
// descriptor를 지정하며 property 추가
Object.defineProperty(student, "progress", {
  configurable: true,
  enumerable: true,
  value: 0.8,
  writable: false,
});

console.log(student);
