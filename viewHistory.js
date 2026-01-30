const container = document.getElementById('historyContainer');
const history = JSON.parse(localStorage.getItem('viewHistory')) || [];

if (history.length === 0) {
  container.innerHTML = 'No history yet.';
}

history.reverse().forEach(item => {
  //---------------------- Fetch product info using the ID (which you saved as 'query')
  fetch(`https://dummyjson.com/products/${item.query}`)
    .then(res => res.json())
    .then(product => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
                <img src="${product.thumbnail}">
                <h3>${product.title}</h3>
                <p>₹ ${product.price}</p>
            `;

      card.onclick = () =>
        (window.location.href = `product.html?id=${product.id}`);
      container.appendChild(card);
    });
});
