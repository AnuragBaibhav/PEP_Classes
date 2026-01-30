const detailsContainer = document.getElementById('detailsContainer');

const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

if (productId) {
  // 2. Fetch only the specific product using its ID
  fetch(`https://dummyjson.com/products/${productId}`)
    .then(res => res.json())
    .then(product => {
      displayFullDetails(product);
    })
    .catch(err => console.error('Error fetching product details:', err));
} else {
  detailsContainer.innerHTML = '<p>Product not found.</p>';
}

function displayFullDetails(product) {
  detailsContainer.innerHTML = `
    <div class="product-detail-view">
      <img src="${product.images[0]}" alt="${product.title}">
      <h1>${product.title}</h1>
      <p class="description">${product.description}</p>
      <p class="category">Category: ${product.category}</p>
      <p class="price">Price: ₹ ${product.price}</p>
    </div>
  `;
}
