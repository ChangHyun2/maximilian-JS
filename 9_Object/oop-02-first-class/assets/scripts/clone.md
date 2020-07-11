**Product : class를 이용한 data scaffolding 생성**
- constructor
  - argument를 통해 this.property 정의

**productList**
- `products`
  - Product constructor를 활용한 item 생성
- `render()`
  - get `<app>`
  - create `<ul>`
    - `className`
  - `for of loop` `this.products` 
    - create `li`  
    - `className`
    - `innerHTML` 
      - `div`
        - `item.imgageURL`  
        - `div` 
          - `item.title`
          - `item.price`
          - `item.description`
    - `ul`.append(`li`)
  - `app`.append(`ul`)

**productList.render()**
          