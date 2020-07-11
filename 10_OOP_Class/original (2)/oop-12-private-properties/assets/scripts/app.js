/*

## Prouct 
  - title
  - image
  - desc
  - price

## Component
  - hookId
  - render
    - createElement

## ShoppingCart
  - set cartItems
  - get totalPrice
  - addProduct
  - 
*/

class Product {
  constructor(title, image, desc, price) {
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }
}

class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}

class Component {
  constructor(renderHookId, shouldRender = true) {
    this.hookId = renderHookId;
    if (shouldRender) {
      this.render();
      // component를 상속한 class를 new와 함께 사용해 인스턴스를 생성할 경우, this는 subclass가 됨.
      // 따라서, super로 constructor를 상속할 경우, this.render()의 this는 subclass를 가리키게 됨. so, render가 subclass의 render를 실행하게 됨.
    }
  }

  render() {}
  // constructor의 this.render()가 가리키는 method인데,
  // 만약 render 메소드를 subclass에서 사용하게 되면, 해당 메소드를 overrride하게 됨.

  createRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClasses) rootElement.className = cssClasses;
    if (attributes && attributes.length > 0)
      attributes.forEach(({ name, value }) =>
        rootElement.setAttribute(name, value)
      );

    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}

class ShoppingCart extends Component {
  items = [];

  set cartItems(items) {
    this.items = items;
    this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(
      2
    )}</h2>`;
  }

  get totalAmount() {
    const sum = this.items.reduce(
      (prevValue, curItem) => prevValue + curItem.price,
      0
    );
    return sum;
  }

  constructor(renderHookId) {
    super(renderHookId, false);
    // 부모 class를 상속(inherit)
    this.orderProducts = () => {
      // constructor에서 곧바로 실행하기 위해서,
      console.log("Ordering...");
      console.log(this.items);
    };
    this.render();
  }

  addProduct(product) {
    const updatedItems = [...this.items, product];
    this.cartItems = updatedItems; // by setter
  }

  render() {
    const cartEl = this.createRootElement("section", "cart");
    cartEl.innerHTML = `
      <h2>Total: \$${0}</h2>
      <button>Order Now!</button>
    `;
    const orderButton = cartEl.querySelector("button");
    // orderButton.addEventListener("click", this.orderProducts); // this가 orderButton이므로, this.items가 undefined가 됨
    // orderButton.addEventListener("click", () => this.orderProducts()); // orderProducts의 콜러가 lexical context인 현재 class가됨.
    // orderButton.addEventListener("click", this.orderProducts.bind(this)); // this가 class에 바인딩되어, this.items가 Class.items가 됨.
    orderButton.addEventListener("click", this.orderProducts);
    this.totalOutput = cartEl.querySelector("h2");
  }
}

class ProductItem extends Component {
  constructor(product, renderHookId) {
    super(renderHookId, false);
    // 바로 render하지 않고,
    // manually render
    this.product = product;
    //product를 만들고 나서, render
    this.render();
  }

  addToCart() {
    App.addProductToCart(this.product);
    // 다른 class 컴포넌트의 메소드를 불러올 경우,
    // App class에서 static으로 다른 class의 인스턴스를 생성하고, 실행하는 메소드를 만들고,
    // App.staticMethod를 불러온다.
  }

  render() {
    const { title, imageUrl, price, description } = this.product;
    const prodEl = this.createRootElement("li", "product-item");
    prodEl.innerHTML = `
        <div> 
          <img src="${imageUrl}" alt="${title}" >
          <div class="product-item__content">
            <h2>${title}</h2>
            <h3>\$${price}</h3>
            <p>${description}</p>
            <button>Add to Cart</button>
          </div>
        </div>
      `;
    const addCartButton = prodEl.querySelector("button");
    addCartButton.addEventListener("click", this.addToCart.bind(this));
  }
}

class ProductList extends Component {
  // property = "hi"; // ProductList class 객체의 property로.
  // method() {
  //   console.log("hi"); // ProductList class의 __proto__의 메소드로.
  // }
  #products = [];
  // #을 붙이면, private field가 됨.

  constructor(renderHookId) {
    super(renderHookId, false);
    // class 생성 시, super가 가장 최우선으로 실행되고
    // 곧바로 this.#products를 생성함.
    // 그 후, 나머지 constructor를 실행.
    console.log(this.#products);
    console.log(this);
    this.render(); // 이 시점에서는 모든 field가 생성됨.
    this.fetchProducts();
    this.renderProducts();
    // 먼저 element를 만들어 놓  고,
    // this.render();
    // this.fetchProducts();
    // constructor가 우선 실행되고, 필드가 생성이 됨.
    // super에 의해 Component constructor에서 render를 실행하게 되어있음.
    // so, rpdocuts=[item1, item2]이 아직 선언되기 전에 this.render()에서 this.#products를 접근하는 중.
    // 이를 없애기 위해 constructor 내에 this.#products=[]에 item1, item2를 추가해주는 코드를 실행해야함.
  }

  fetchProducts() {
    this.#products = [
      new Product(
        "A Pillow",
        "https://www.maxpixel.net/static/photo/2x/Soft-Pillow-Green-Decoration-Deco-Snuggle-1241878.jpg",
        "A soft pillow!",
        19.99
      ),
      new Product(
        "A Carpet",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Ardabil_Carpet.jpg/397px-Ardabil_Carpet.jpg",
        "A carpet which you might like - or not.",
        89.99
      ),
    ];
  }

  renderProducts() {
    for (const prod of this.#products) {
      new ProductItem(prod, "prod-list");
    }
  }

  render() {
    this.createRootElement("ul", "product-list", [
      new ElementAttribute("id", "prod-list"),
    ]);
    // products가 없을 경우엔, ul만 create함.
    if (this.#products && this.#products.length > 0) {
      this.renderProducts();
      // products가 있으면 products를 render함.
    }
  }
}

class Shop {
  constructor() {
    this.render();
  }

  render() {
    this.cart = new ShoppingCart("app");
    new ProductList("app");

    // const list = new ProductList("app");
    // console.log(list.#products); // error발생
  }
}

class App {
  static cart; // static field를 선언해두면 가독성에 좋아.

  static init() {
    const shop = new Shop();
    // shop.render();
    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();
