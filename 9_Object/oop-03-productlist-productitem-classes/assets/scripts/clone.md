***ProductList***

- `products` []
  - `new ` product로 data 생성 후 push
- render()
  - get `<app>` : const renderHook
  - create `<ul>` : `className`
  - `for of this.products`
    - `new` prodItem(item)
    - `ul`.`append`(item)
  renderHook.`append`(`ul`)

***new ProductList & render***
- `new` ProductList
- render()