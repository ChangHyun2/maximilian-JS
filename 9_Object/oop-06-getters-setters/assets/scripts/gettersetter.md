data properties & accessor properties

accessor properties ( set, get)
getting and setting a value
but, look like regular properties to an external code

let obj = {
get propName {
//getter
}
set propName(value){
//setter
}
}

let obj = {
name: 'john',
surname: 'smith'
get fullName{
return `${this.name} ${this.surname}`;
}
//데이터의 가변이 요구될 경우 사용한다.
}
alert(user.fullName);

let user = {
get fullName(){
return `...`;
}
//getter만 사용할 시 error 발생.
항상 one pair로 사용
}

let user = {
name: 'changhyun',
surname: 'jun',

get fullName(){
return `${this.name} ${this.surname};
}
set fullName(value){
[this.name, this.surname] = value.split(' ');
}
}

user.fullName = 'park changhyun';
clg (user surname); // 'park'

getter, setter를 이용함으로써 객체 외부에서 property로써 값을 read할 수 있고 또한 그 값을 write해 수정할 수 있다.

객체가 생성되는 시점 밖에서 수정이 필요할 경우 사용할 수 있겠네?

const language = {
  set current(name) {
    this.log.push(name);
  },
  log: []
}

language.current = 'EN';
language.current = 'FA';

console.log(language.log);
// expected output: Array ["EN", "FA"]

***property가 changed될 때 setter에 정의된 function을 실행한다.***
***delete를 이용해 setter를 제거할 수 있다.***
***define property와 같이 사용한다면, existing object에 setter를 define할 수 있다.***