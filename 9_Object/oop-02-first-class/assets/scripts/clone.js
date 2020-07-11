// class를 이용한 data생성
class Product {
  //구성자로 scaffolding
  constructor(title, image, desc, price) {
    this.title = title;
    this.imageURL = image;
    this.description = desc;
    this.price = price;
  }
}

// list에 class의 constructor를 활용해 data 저장
const productList = {
  //구성자를 활용해 data list 생성
  products: [
    new Product('title1', 'image1', 'desc1', 1000),
    new Product('title2', 'image2', 'desc2', 2000),
    new Product('title3', 'image3', 'desc3', 3000),
  ],
  // data list에 접근해 view단에 rendering

  render() {
    const renderHook = document.getElementById('app');

    const prodList = document.createElement('ul');
    prodList.className = 'product-list';

    for (const prod of this.products) {
      const prodItem = document.createElement('li');
      prodItem.className = 'prod-item';
      prodItem.innerHTML = `
            <div>
                <img src="{prod.imageURL}" alt="{prod.title}">
                <div class="product-item__content>
                    <h2>${prod.title}</h2>
                    <h3>${prod.description}</h3>
                    <p>${prod.price}</p>
                    <button>Add to Cart</button>
                </div>
            </div>
        `;
      prodList.append(prodItem);
    }

    renderHook.append(prodEl);
  },
};

productList.render();
