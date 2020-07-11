## OOP?

work with (real-life) entities in your code

1.  productList
- fetch + render
- DB의 products를 fetch해서 list에 render

2. product
- rendering + cart-adding
- product에 대한 디테일을 render하고, cart에 추가하는 것을 allow.

3. ShoppingCart
- products를 render하고 user가 order할 수 있게 allow.
- render + ordering(server communication) 

## class fields vs properties

```js

class Product{
    category = 'Default'; // field
    constructor(title){
        this.title = title; // constructor에 작성 : property
    }
}

    printInfo(){
        console.log(this.title, this.category);
    }

```

## static Properties, Fields & Methods


1. static Field / Property / Method

- Defined with static keyword
- Only accessible on class itself, without instantiation (i.e. not an instance)
- typically used in helper classes, global configuration etc.

2. instnace Field / Property / Method

- Defined without static keyword
- Only accessible on instances(=objects) based on class
- Used for core, re-usable logic

## When to use Classes

Are object literals ({}) obsolete?
    - No!
      - great for general data gropuing, objects which you only create once 
      - Quick & easy to create, no overhead
    - But also consider classes!
      - great when you re-create the same type of object over and over again
      - More overhead initially but easy 'object duplication' thereafter


## Inheritance

Post : title text creatorId

ImagePost : title text creatorId imageUrl imageDescription

VideoPost : title text creatorId videoUrl ageRating

building multiple classes with code duplication is suboptimal! >> extend base class(post class)

## Private Fields, Properties & Methods

1. Public 

- accessible outside of the class/object

- the 'things' you work with in your other code

- example: product.buy()

2. Private

- accessible Only inside of the class/object

- the 'things' you work with in your class only (to split & re-use code)

- example: hard-coded(fallback) values, re-used class-specific logic

## instanceof 

```js

class Person{
    name = 'jun';
}

const p = new Person();

console.log(p);
console.log(typeof p); // 'object'

console.log(p instanceof Person); // true

const btn = document.querySelector('button');
console.dir(btn);
btn instanceof HTMLButtonElement // true
btn instanceof HTMLElement // true 
// built in class.
btn instanceof Person // false;
```

## built in classes

```js
obj = new Object();
obj2 = {};
array = new Array();
arr = [];

// {}, []와 같은 literal notation을 사용할 것.
```

## Object descriptors

```js
person = {name: 'jun', greet(){console.log(this.name)}};

Object.getOwnPropertyDescriptors(person);
// {name: {...}, greet:{...}} property descriptors 객체를 return함.

Object.defineProperty(person, 'name', {
    configurable: true,
    enumerable: true,
    value: person.name,
    writable: false
});
//writable을 false로!

person.name = 'changhyun';
person; // {name: 'jun'}

delete person.name // true

person; // {greet:f}

Object.defineProperty(person, 'name', {
    configurable: false,
    enumerable:true,
    value: person.name,
    writable:false
}); // {greet:f, name:undefined}
delete person.name; //false
person // {greet:f, name:undefined}

for(const key in person){
    console.log(key);
}
// greet
// name

Object.defineProperty(person, 'name2', {
    configurable: false,
    enumerable: true,
    value: 'max',
    writable: false
})
Object.defineProperty(person, 'greet', {
    configurable:true,
    enumerable:false,
    value: person.greet,
    writable:false
})
for(const key in person){
    console.log(key);
}
// name
// name2
// greet는 enumerable이 false이기 때문에, skip됨.

```

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
 

