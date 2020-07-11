class Product {
  constructor(title, image, desc, price) {
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }
}

class ProductItem {
  constructor(product) {
    this.product = product;
  }

  addToCart() {
    App.addProductToCart(this.product); // App의 static method를 호출해서, productItem의 product 정보를 넘김. //this가 app이 되고, app에 담긴 cart를 update하게 됨.
    // why? ProductItem에서 이를 설정해버리면, 상위 render에서 수정사항을 render할 수 없게 되어버림.
  }
  render() {
    const prodEl = document.createElement('li');
    prodEl.className = 'product-item';
    prodEl.innerHTML = `
        <div>
        <img src="${this.product.imageUrl}" alt="${this.product.title}" >
        <div class="product-item__content">
          <h2>${this.product.title}</h2>
          <h3>\$${this.product.price}</h3>
          <p>${this.product.description}</p>
          <button>Add to Cart</button>
        </div>
      </div>
        `;
    const prodAddBtn = prodEl.querySelector('button'); // div에 포함된 btn을 queryselect.
    prodAddBtn.addEventListener('click', addToCart.bind(this)); // add할 value는 productItem의 product이므로, this로 binding해준다.
    // add시, product data를 통으로 넘김.
    return prodEl;
  }
}

class ProductList {
  products = [
    new Product('title', 'image', 'desc', 'price'),
    new Product('title', 'image', 'desc', 'price'),
  ];

  render() {
    const prodList = document.createElement('ul');
    prodList.className = 'product-list';
    for (const prod of this.products) {
      const productItem = new ProductItem(prod);
      const prodEl = productItem.render();
      prodList.append(prodEl);
    }
    return prodList;
  }
}

class ShoppingCart {
  items = [];

  
  render(){
      const cartEl = document.createElement('section');
      cartEl.innerHTML = `
        <h2>Total : \$${}</h2>
        <button>Order now</button>
      `;
      cartEl.className = 'cart';
      this.totalOutput = cartEl.querySelector('h2');
      return cartEl;
  }

  addProduct(product) {
    this.items.push(product);
    this.totalOutput.innerHTML = `<h2>Total : ${1}</h2>`;
    // 동적 생성 가능.
  }

}

class Page {
  render() {
    const renderHook = document.getElementById('app');

    this.cart = new ShoppingCart(); // addProduct(product) 메소드를 넘김.
    const cartEl = this.cart.render();
    const productList = new ProductList();
    const prodListEl = productList.render();
    renderHook.append(cartEl);
    renderHook.append(prodListEl);
  }
}

class App {
  static cart;

  static init() {
    const page = new Page();
    page.render();
    this.cart = page.cart; // to use addProductToCart 
  }
  static addProductToCart(product) {
    this.cart.addProductToCart(product);
     // addProductToCart from cart
  }
}

App.init();