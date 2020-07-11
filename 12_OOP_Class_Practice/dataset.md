`data-*` attributes allow us to store extra information on standard, semantic HTML elements 


## Example

```HTML

<article
id = 'electric-cars'
data-columns = '3'
data-index-number = '1234'
data-parent = 'cars'
>
</article>

```

```js
const article = document.querySelector('#electric-cars');

// 읽기
article.dataset.columns // '3'
article.dataset.indexNumber // '12314'
article.dataset.parent // 'cars'

// 쓰기
article.dataset.write = 'new dataset';
article.dataset.columns = '5';

```

```css

/* attr()함수로  */
article::before{
    content: attr(data-parent);
}

/* html 속성 selector로 접근 가능 */
article[data-columns='3']{
    width: 400px;
}
article[data-columns='4']{
    width: 600px;
}

```