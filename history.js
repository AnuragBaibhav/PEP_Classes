const historyList = document.getElementById('history-list');
const clearBtn = document.getElementById('clear-history');

function displayHistory() {
  const history = JSON.parse(localStorage.getItem('searchHistory')) || [];

  historyList.innerHTML = '';

  // 3. Map through history and create list items
  history.forEach(item => {
    const li = document.createElement('li');
    li.className = 'history-item';

    li.innerHTML = `
            <span class="history-text">${item.query}</span>
            <small>${new Date(item.time).toLocaleTimeString()}</small>
        `;

    li.addEventListener('click', () => {
      window.location.href = `search.html?q=${encodeURIComponent(item.query)}`;
    });

    historyList.appendChild(li);
  });
}

// 4. Clear History Functionality
clearBtn.addEventListener('click', () => {
  localStorage.removeItem('searchHistory');
  displayHistory(); // Refresh the UI
});

// 5. Initial Call
displayHistory();

//eventListener are continous listener by subscribing event.. use only in need instead use "functions"
