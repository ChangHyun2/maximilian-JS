//product data
class Product {
  constructor(title, image, desc, price) {
    this.title = title;
    this.imageURL = image;
    this.description = desc;
    this.price = price;
  }
}

//product  <li> element
class ProductItem {
  constructor(product) {
    this.product = product;
  }

  addToCart() {
    // new Product를 통해 들어온 this.product data를 이용해, add될 시 cart에 data를 넘길 것임. 이 handler는 추후 사용될 예정.
    console.log(this.product);
  }

  render() {
    const prodEl = document.createElement('li');
    prodEl.className = 'product-item';
    prodEl.innerHTML = `
            <div>
                <img src="${this.product.imageURL} alt="${this.product.title}>
                <div class="product-item__content">
                <h2>${this.product.title}</h2>
                <h3>${this.product.price}</h3>
                <p>${this.product.description}</p>
                </div>
            </div>
        `;
    const prodAddBtn = prodEl.querySelector('button');
    // this.addToCart의 this는 class에서의 this이기 때문에 class의 property가 this가 됨.
    // addToCart가 call될 시, this는 btn이 되어버림. so, bind해줌. call을 사용하면 함수가 즉시 실행됨.
    prodAddBtn.addEventListener('click', this.addToCart.bind(this));
    return prodEl;
  }
}

class ProductList {
  products = [
    new Product('title', 'image', 'desc', 'pridce'),
    new Product('title', 'image', 'desc', 'pridce'),
    new Product('title', 'image', 'desc', 'pridce'),
  ];

  constructor() {}

  render() {
    const renderHook = document.getElementById('app');
    const prodList = document.createElement('ul');
    prodList.className = 'product-list';
    for (const prod of products) {
      const prodItem = new ProductItem(prod); // 구성자를 통해 scaffolding이 완성됨 상태, 함수를 불러와야 el이 return됨.
      const prodEl = prodItem.render();
      prodList.append(prodEl);
    }
    renderHook.append(prodList);
  }
}

const productList = new ProductList();
productList.render();
