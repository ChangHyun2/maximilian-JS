```js

const left = 10;
const top = 20;

// &0 : contents가 overflow인 element

1. wrapper 스크롤 위치 움직이기

// overflow: hidden, overflow:scroll 등등 모든 상황에서 동작함.
$0.scrollTo(left, top); // 해당 위치로 스크롤이동
$0.scrollBy(left, top); // 현 위치에서 value값 만큼 이동



2. element 위치로 이동하며 wrapper 스크롤하기

scrollIntoView()
<nav>
    <li></li>
    <li></li>
    <li></li>
    <li class="find"></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
</nav>
document.querySelector('find').scrollIntoView({behavior: 'smooth'})



3. 스크롤 시 애니메이션 효과 추가하기

scrollIntoView({behavior:'smooth'})
scrollBy({top: 30, behavior:'smooth'})
scrollBy({top: 30, behavior:'smooth'})
```