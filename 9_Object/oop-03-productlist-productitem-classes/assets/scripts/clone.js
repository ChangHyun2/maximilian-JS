// data 생성자

class Product {
  constructor(title, image, desc, price) {
    this.title = title;
    this.imageURL = image;
    this.description = desc;
    this.price = price;
  }
}

// data를 통한 listItem 형성
class ProductItem {
  constructor(product) {
    this.produt = product;
  } // 우선 데이터를 받아 그대로 저장

  // data를 통해 element 형성
  render() {
    const prodEl = document.createElement('li');
    prodEl.className = 'prod-list';
    // li 하위에 포함될 항목 생성
    prodEl.innerHTML = `
            <div>
                <img src="${this.product.imageURL}" alt ='${
      this.product.title
    }';>
                <div class="${product - item__content}">
                    <h2>${this.product.title}</h2>
                    <h3>${title.product.price}</h3>
                    <p>${title.product.description}</p>
                    <button>Add to Cart</button>
                </div>
            </div>
        `;
    // append할 곳이 없어 prodEl을 우선 return
    // so, 상위 ul을 생성할 때에 이를 new로 만들어 append할 것임.
    return prodEl;
  }
}

class ProductList {
  products = [
    new Product('title1', 'image1', 'desc1', 'price'),
    new Product('title1', 'image1', 'desc1', 'price'),
    new Product('title1', 'image1', 'desc1', 'price'),
  ]; // new를 통해 배열에 item 저장.

  //data를 render.
  render() {
    // 부모가 될 app을 가져오고,
    // ul을 만들어 app에 append
    // item을 ul에 append
    const renderHook = document.getElementById('app');

    const prodList = document.createElement('ul');
    prodList.className = 'product-list';

    for (const prod of this.products) {
      const prodItem = new ProductItem(prod);
      const prodEl = prodItem.render();

      prodList.append(prodEl);
    }
    renderHook.append(prodList);
  }
}

const productList = new ProductList();
productList.render();

// 반복되는 코드? >> new를 통한 data 생성, render, create, get
