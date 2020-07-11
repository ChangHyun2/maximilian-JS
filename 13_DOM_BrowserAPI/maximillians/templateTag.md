
## templateTag

협업에 유리.
js파일을 최소화하고 html에서 html코드를 관리
DOM을 형성하지만 render되지는 않아.

```html

<template id='component'>
    <h2>치킨 타코야끼 달강정</h2>
    <p>${componentText}</p>
</template>
```


```js

importNode(content, shouldDeepClone)

const component= document.createElement("div");
component.className = 'component';
const componentText = '타코야끼';

const componentTemplate = document.getElementById('component');
const componentBody = document.importNode(componentTemplate.content, true);
componentBody.querySelector('p').textContent = componentText; // 변수를 넘길 수 있어.
componentTemplate.append(componentBody);

```