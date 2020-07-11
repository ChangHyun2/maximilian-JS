**_ShoppingCart_**

- `items` []
- `addProduct`(product)
  - this.`items`에 product를 psuh
  - this.`totalOutput`.innerHTML
    - `<h2>`, %{totalPrice}
- render()
  - carete `section`
  - section.`innerHTML`
    - `<h2>` Total
    - `<button>` Order 안내 버튼
  - section.`className`
  - this.totalOutput = `<h2>` : shoppingCart class에 this.totaloutput property 동적 생성
  - return cartEl

**_Page_**

- render()
  - get `<app>`
  - this.cart = new ShoppingCart : cartEl(section) structure 생성
  - this.cart.render() : return `<section>`
  - new ProductList() : ProductList(ul) structure 생성
  - productList.render() : return `<ul>`
  - `<app>`.append(`<section>`, `<ul>`);

***App***

- static cart
- static init() static이므로 App 내에서만 접근 가능. class 외부에서 class를 통해 생성자 없이 자유롭게 호출이 가능. 즉, instance에 의존하지 않음.
  - `new Page()`
  - `newPage.render()`
  // 첫 rendering 후, 추가적인 상품 추가 반영 및 재rendering을 위해 page.cart에 cart의 data를 저장 
  - `this.cart` = `newPage.cart`
- static addProductToCart(product) // 수정사항은 최상위에서 render해야, 정상적으로 view단에 렌더링 됨.
  - this.cart.addProduct(product) 
App.init()