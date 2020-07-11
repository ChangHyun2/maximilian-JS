// 크롬 창에서 element 선택 후, 
```js
// $0 : 현재 선택한 element를 select.
$0.getBoundingClientRect()

// return DOMRect{
    top:100,
    bottom:300,
    height:200, // bottom(맨 위에서 얼마나 떨어진 위치에 bottom이 위치하는지.) - top
    left:100,
    right:304,
    width:300, // right - left
    x:4,
    y:100
    // 음의 height, width를 가질 경우, x/y가 left/top과 달라질 수 있음.
}

// top/left와 동일
$0.offsetTop
$0.offsetLeft 
$0.offsetWidth 
$0.offsetHeight

// outer box로부터 content box의 위치를 알려줌.
// content box는 borders, potential scroll bars를 제외한 box
$0.clientTop //15 (border의 두께)
$0.clientLeft //15 
$0.clientWidth // 마찬가지로 content box의 width
$0.cleintHeight 

// scrollHeight : scroll bars가 있는 박스에서, 보이지 않는 맨 끝까지의 height
$0.scrollHeight
// scrollTop : scroll이 위치한 곳에서, 박스의 top 좌표 
$0.scrollTop

//스크롤바를 포함한 width, height
window.innerWidth
window.innerHeight

//스크롤바를 무시한 width, height
document.documentElement.clientWidth
document.documentElement.clientHeight

const cloned = element.cloneNode(true); //이벤트 리스너는 떨어지고, 노드만 복사
element2.replaceWith(cloned); // element2 부모에서 element2를 지우고, cloned를 자식으로 대체

// element를 다른 부모로 append할 경우, 기존의 부모에서는 element가 사라짐.

class DOMHelper {
    static clearEventListeners(element){
        const cloned = element.cloneNode(true);
        element.replaceWith(cloned);
        return element;
    }
    static moveElement(elementSelector, newParentSelector){
        const element = document.querySelector(elementSelector);
        const newParent = document.querySelector(newParentSelector);
        newParent.append(element);
        //append할 경우, element의 포인터가 이동하기 때문에, 기존의 element를 지울 필요가 없음.
    }
}

// 부모로부터 detach하기
element.remove(); //부모 element에서, 자신을 삭제.
element.parentNode.removeChild(element); //이 동작과 동일.

// 부모에 attach하기
parent.append(child);
parent.insertAdjacentElement('beforebegin', child);
parent.insertAdjacentElement('beforeend', child);
parent.insertAdjacentElement('afterbegin', child);
parent.insertAdjacentElement('afterend', child);

class Component {

    this.element = element;

    constructor(parentId){
        if(parentId){
            this.$parent = document.getElementById(parentId);
        }else{
            this.$parent = document.body;
        }
    }

    detach(){
        if(this.element) this.element.remove();
    }

    attach(position){
        this.$parent.insertAdjacentElement(position, this.element);
    }
}
```
```html
<li id="item1" data-my-info='I can store data by my self' data-sub-info = 'i can store extra data'>
```
```js
// dataset을 가지는 list 생성
const li = document.createElement('li');
li.setAttribute('id', 'item1');
li.dataset.myInfo = 'ican store data by my self'
li.dataset.subInfo = 'ican store data by my self'
document.body.append(li);

// list의 dataset 확인 DOMStringMap 객체로 출력됨.
console.log(document.querySelector('#item1').dataset);

// p elements 생성, dataset의 property에 저장된 data를 활용해 텍스트입력
const p = document.createElement('p');
const p2 = document.createElement('p');
const $item1 = document.getElementById('item1');
const data1 = $item1.dataset;
p.textContent = data1.myInfo;
p2.textContent = data1.subInfo;

$item1.append(p);
$item1.append(p2);
```

