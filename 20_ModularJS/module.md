
한 파일을 여러 파일로 쪼개어 관리

```html
<script src="app.js" defer type="module"></script>
```

```js
export class Component{

}
```

malicious한 js파일을 import해서는 안 되므로 
same domain에서 다운로드되는 file만 허용됨.
따라서, CORS error가 발생할 수 있음.

파일 프로토콜에서 app을 serving하는 중이기 때문에
button을 클릭할 경우, 해당 file들 간의 처리가 server에서 행해지는 게 아니라
file 프로토콜에서 실행됨.

serve를 치면, 서버가 열림.

import할 때  import {Component} from 'Component/js'로 하면
export class로 바로 import해도 괜춘

import Component from 'Component/js'로 import할 경우엔 export할 떄 export default로 설정해줘야돼.

function export

export function myFunction(a, b){
    //do function
}

import {myFunction} from './'

동시에 여러 개 import 가능
import {myFunction, DOMHelper} from './js'

import * as DOMH from './js' 으로 import할 시, 
여러 export 항목들을 bundling할 수 있어. 이 경우 bundle된 DOMHelp 객체의 property를 통해 접근

const ProjectItem = 'abc';

import {Componet as Comp} from './js'
변수를 바꿀 수 있어.

default로 export할 경우 다른 파일에서 변수명을 지정해줘야 됨.
{}로 사용하는 건, export되는 객체를 destructuring하는 것임.

한 파일에서,

export default class comp {}
export function doSomething(){}하면,

다른 파일에서 import할 경우

import variableHere, {doSomething} from './js'로 import해야됨.

위 방법은 static하게 file을 import하는 방법임.

만약 어떤 컴포넌트가 필요 시에만 load하면 될 경우,
해당 컴포넌트를 동적으로 불러와 필요 시에만 load할 수 있음.

```js

    import("./Tooltip.js").then((module) => {
      const tooltip = new module.Tooltip(
        () => {
          this.hasActiveTooltip = false;
        },
        tooltipText,
        this.id
      );
      tooltip.attach();
      this.hasActiveTooltip = true;
    });

```

모듈에서는 global로 window만 보임.
this는 안 잡혀

console.log(window);
console.log(this);
console.log(globalThis); // node.js, browser모두에서 동작

module 사용 시,
this는 node.js에서
window는 browser에서 사용 가능
globalThis는 양 쪽 모두에서 사용 가능

