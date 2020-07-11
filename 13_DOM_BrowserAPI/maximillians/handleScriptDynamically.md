보안과 관련된 cross-site scripting과 같은 이슈가 있으니 잘 알고 사용해야됨!

script에 inject되는 악성 코드를 validate하거나 sanitize해야됨.

## js로 script 파일 생성, 실행하기

```js
이런 식으로 js파일의 원하는 위치에서 스크립트를 생성할 수 있어.
const someScript = document.createElement("script");
someScript.textContent = 'alert("hi there");';
document.head.append(someScript);
```




## 작성된 script파일을 원하는 시점에 실행하기

```js
// analytics.js

class App{

    static init(){
        // setTimeout(this.sendSomething, 3000);
        const timerId = setTimeout(this.sendSomething, 3000);
        document.querySelector('#btn-stopSending').addEventListener('click', ()=>{
            clearTimeout(timerId);
        }));
    }

    static sendSomething(){
        const sendScript = document.createElement('script');
        sendScript.src = 'sendSomething.js'; // relative directory
        sendScript.defer = true; // defer/async 세팅
        document.head.append(sendScript);
    }
}

App.init();
```

