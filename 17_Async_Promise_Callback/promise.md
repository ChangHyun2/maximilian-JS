
## js : 싱글스레드

동시에 하나의 function만 수행할 수 있어.
so, 순서에 따라 순차적으로 코드가 실행 돼.

```js
console.log('hi'); // 1
function1(); // 2
btn.disabled = true; // 3
function2(); // 4
```

1 > 2 > 3 > 4 순으로 task를 순차적으로 진행.

1이 끝나면, 2
2가 끝나면, 3
3이 끝나면, 4

그렇다면 setTimeout()은..?? http request는?
setTimeout에 세팅된 시간이 지나는 걸 마냥 기달리 순 없잖아!

`script에서 setTimeout을 실행하면, callback과 timer를 멀티스레드인 browser로 넘겨버림.
so, javascript code는 계속해서 실행되고,
브라우저에서 타이머와 callback을  가지고 코드를 처리해.
`

## async code execution

```js
cons btnHandler = ()=>console.log('hi');
btn.addEventListener('click', btnHandler);

let result = 0;
for(let i=0; i<1000000000; i++){
    result +=i;
};

console.log(result);
```

addEventListener에 의해 click eventListener에 btnHandler가 등록이 됨.
for loop를 도는 동안 event가 발생하면 call stack에서 함수가 실행되고 있기 때문에(task가 실행 중이기 때문에) for loop가 종료된 후(call stack이 비어있으면) btnHandler함수가 실행됨.

이럼 동작이 지연되잖아. 브라우저로 넘겨버림.

js engine: stack
browser APIs : setTimeout event loop message queue

setTimeout : timer를 관리. 전달받은 timer가 지나면 callback을 message queue로 넘김
event loop : call stack을 계속 쳐다보면서, 빌 경우 message queue에 있는 callback을 stack으로 넘김. call stack에서 callback을 실행.

## sync + async 

```js

const btn = $button;
const output = $p;

function trackUserHandler(){
    navigator.geolocation.getCurrentPosition(positionData => {
        console.log(positionData);
    }, error=>{
        console.log(error);
    });
    console.log('getting position...'); // 이게 먼저 실행 돼
}   
btn.addEventListener('click', trackUserHandler);
```
navigator : browser API
getCurrentPosition을 실행하는 순간, user에게 동의 팝업창을 띄움. 
user가 yes/no를 클릭하는 동안, positionData, error를 처리하는 함수를 message queue안에 넣어둠.

```js
function trackUserHandler(){
    navigator.geolocation.getCurrentPosition(
    positionData => { //async
        setTimeout(()=>{
            console.log(positionData); //async > async
        }, 2000);
    }, 
    error=>{
        console.log(error);
    });
    setTimeout(()=>console.log('timerdone'),0)
    console.log('getting position...'); // 이게 먼저 실행 돼
}   
btn.addEventListener('click', trackUserHandler);
```

## Promise

setTimeout으로 여러 단계의 async를 처리하면, callback hell에 빠지게 돼

```js
someAsyncTask()
.then(()=>anotherTask())
.then(()=>yetAnotherTask())
.then(...)
```

```js

const getPosition = (opts) =>{
    const promise = new Promise((res, rej)=>{
        navigator.geolocation.getCurrentPosition(success =>{
            resolve(success);
        },opts);
    })
    return promise;
}

const setTimer = duration =>{
    const promise = new Promise((resolve, reject)=>{
        setTimeout(()=>{
          resolve('Done!');
        }, duration);
    });
    return promise;
}

function trackUserHandler(){
    navigator.geolocation.getCurrentPosition(
        posData =>{
            setTimer(2000).then(data=>{
                console.log(Data, posData);
            });
        }, 
        error=>{
            console.log(error);
        }
    )
    setTimer(1000).then(()=>{
        console.log('done...!');
    })
    console.log('getting position...');
})
```

## Promise state


```js
const vlaue = 20;

const promise = new Promise((res, rej)=>{
    if(value<100){
        res(value);
    }else{
        rej('too big');
    }
})
promise()
.then((data)=>console.log(data))
.catch(err=>console.log(err));

const promiseFunction = (value)  =>{
    const promise = new Promise((res, rej)=>{
        if(value<100){
            res();
        }else{
            rej();
        }
    }
    return promise
};

const promiseFunction = (value)=>{
    return new Promise((res, rej)=>{
        if(value<100){
            res();
        }else{
            rej();
        }
    }
}

1. then & catch
promiseFunction(30)
.then(data=>console.log(data))
.catch(err=>console.log(err));

2. only then
promiseFunction(30)
.then(
    data => console.log(Data),
    err => console.log(err)
);

```

1. PENDING
    resolve, reject할 준비가 된 상황
2. Resolved
    resolve된 state, then문 실행
3. rejected
    reject된 state, catch문 실행

.then()
.catch()

then과 catch문은 
return값을 resolve하는 새로운 promise를 생성하고
생성한 promise를 리턴함.
만약 then catch문이 return하는 값이 promise라면 이 promise를턴함.


When you have another then() block after a catch() or then() block, the promise re-enters PENDING mode
(keep in mind: then() and catch() always return a new promise - 
either not resolving to anything or resolving to what you return inside of then()). 
Only if there are no more then() blocks left, it enters a new, final mode: SETTLED.

Once SETTLED, you can use a special block - finally() - to do final cleanup work. 
finally() is reached no matter if you resolved or rejected before.

Here's an example:

somePromiseCreatingCode()
    .then(firstResult => {
        return 'done with first promise';
    })
    .catch(err => {
        // would handle any errors thrown before
        // implicitly returns a new promise - just like then()
    })
    .finally(() => {
        // the promise is settled now - finally() will NOT return a new promise!
        // you can do final cleanup work here
    });
You don't have to add a finally() block (indeed we haven't in the lectures).
