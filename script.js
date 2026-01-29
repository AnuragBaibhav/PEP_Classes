const container = document.getElementById('productContainer');

fetch('https://dummyjson.com/products')
  .then(res => res.json())
  .then(data => {
    const products = data.products;

    products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';

      card.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p class="price">₹ ${product.price}</p>
          `;

      container.appendChild(card);
    });
  })
  .catch(err => console.log(err));
