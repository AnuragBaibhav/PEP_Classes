const historyList = document.getElementById('history-list');
const clearBtn = document.getElementById('clear-history');

function displayHistory() {
  // 1. Get history from localStorage
  const history = JSON.parse(localStorage.getItem('searchHistory')) || [];

  // 2. Clear current list to avoid duplication on re-render
  historyList.innerHTML = '';

  // 3. Map through history and create list items
  history.forEach(item => {
    const li = document.createElement('li');
    li.className = 'history-item';

    // Use a span for the text and a button/icon for deleting individual items if needed
    li.innerHTML = `
            <span class="history-text">${item.query}</span>
            <small>${new Date(item.time).toLocaleTimeString()}</small>
        `;

    // Make the history item clickable to re-search
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
