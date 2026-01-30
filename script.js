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
      card.addEventListener('click', () => {
        console.log('Card Clicked', product.id);
        window.location.href = `product.html?id=${product.id}`;
      });
    });
  })
  .catch(err => console.log(err));

/////////////////////////////////////////////////////////////Search feature//////////////////////////////////////////
const btn = document.getElementById('btn');
const searchInput = document.getElementById('searchInput');

btn.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (!query) return;
  ////////////////////////////////////////////////////////Local Storage/////////////////////////////////////////
  let history = JSON.parse(localStorage.getItem('searchHistory')) || [];
  if (!history.some(item => item.query === query)) {
    //to avoid dupliacte query
    history.push({
      query: query,
      time: Date.now(),
    });
    localStorage.setItem('searchHistory', JSON.stringify(history));
  }

  ///////////////////////////////////////////redirect with query params
  window.location.href = `search.html?q=${encodeURIComponent(query)}`;
  searchInput.value = '';
});

/////////////////////////////////////////SUGGESTIONS//////////////////////////////

const suggestionBox = document.getElementById('suggestions');

searchInput.addEventListener('input', () => {
  console.log('Suggestion working');

  const text = searchInput.value.toLowerCase();
  const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
  // console.log(history);

  //Filter based on query field
  const matches = history.filter(item =>
    item.query.toLowerCase().includes(text)
  );

  //clear previous suggestions
  suggestionBox.innerHTML = '';

  //show suggestions
  matches.forEach(item => {
    const div = document.createElement('div');
    div.className = 'suggestion-item';
    div.innerHTML = item.query;

    div.addEventListener('click', () => {
      searchInput.value = item.query;
      suggestionBox.innerHTML = '';
    });
    suggestionBox.appendChild(div);
  });
});
