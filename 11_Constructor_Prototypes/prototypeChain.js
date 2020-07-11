// function Person(name) {
//   this.age = 30;
//   this.name = name;

//   this.greet = () => {
//     console.log(`hi i am ${this.name} and I am ${this.age} years old`);
//   };
// }
// const personPrototype = {
//   printAge() {
//     console.log(this.age);
//   },
//   printName() {
//     console.log(this.name);
//   },
// };
// Person.prototype = personPrototype;

// const p = new Person("jun");
// p.greet();
// p.printAge();
// p.printName();
// console.log(p.__proto__);
// console.log(p.__proto__ === personPrototype);
// console.log(p.toString());
// const p2 = new p.__proto__.constructor();
// console.log(p2);

function Person(name) {
  this.age = 30;
  this.name = name;

  this.greet = () => {
    console.log(`hi i am ${this.name} and I am ${this.age} years old`);
  };
}

Person.describe = function () {
  console.log("Creating persons...");
}; // instance에는 describe가 없고,
// function Object에는 describe가 붙음.
// Person 함수에 describe property를 선언했기 때문.

Person.prototype.printAge = function () {
  console.log(this.age);
};
Person.prototype.printName = function () {
  console.log(this.name);
};

// Person.prototype = {
//   printAge() {
//     console.log(this.age);
//   },
//   printName() {
//     console.log(this.name);
//   },
// };
// 위처럼 prototype에 객체를 할당할 경우, reference에 의해
// p.__proto__가 {printAge(){}, printName(){}}로 바뀜.

const p = new Person("jun");
p.greet();
p.printAge();
p.printName();
console.log(p);
console.log(p.length); // undefined
console.log(Person);
console.log(p.__proto__);
console.log(p.toString());
const p2 = new p.__proto__.constructor("chang");
p2.greet();
p2.printAge();
console.dir(Object); // Object에 length:1이 있지만, 이건 function의 property야.
// so, p.length에는 해당 property가 존재하지 않아.
console.dir(Object.prototype);
// 반면, Object의 prototype에 해당되는 메소드들은 p에서 모두 사용할 수 있음. how? prototype chaining
