const tableBody = document.getElementById('tableBody');
const paginationContainer = document.getElementById('pagination');

const apiUrls = [
  'https://opencritic-api.p.rapidapi.com/game/463',
  'https://opencritic-api.p.rapidapi.com/game/1557',
  'https://opencritic-api.p.rapidapi.com/game/5434',
  'https://opencritic-api.p.rapidapi.com/game/12919'
];

const itemsPerPage = 1;
let currentPage = 1;

// Function to fetch data from the API and populate the table
async function fetchAndDisplayGameData(apiUrl) {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '725b1c420fmsh5729b57fe33b411p19dfbajsn7d7a59faff70',
      'X-RapidAPI-Host': 'opencritic-api.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(apiUrl, options);
    const data = await response.json();

    // Create a new row for the game
    const row = document.createElement('tr');

    // Populate the cells with the game information
    const nameCell = document.createElement('td');
    nameCell.textContent = data.name;
    row.appendChild(nameCell);

    const reviewCell = document.createElement('td');
    reviewCell.textContent = data.topCriticScore;
    row.appendChild(reviewCell);

    const genreCell = document.createElement('td');
    genreCell.textContent = data.Genres[0].name;
    row.appendChild(genreCell);

    const descriptionCell = document.createElement('td');
    descriptionCell.textContent = data.description;
    row.appendChild(descriptionCell);


    // Append the row to the table body
    tableBody.appendChild(row);
  } catch (error) {
    console.error(error);
  }
}

// Function to display the pagination
function displayPagination() {
  paginationContainer.innerHTML = '';

  const totalPages = Math.ceil(apiUrls.length / itemsPerPage);

  for (let page = 1; page <= totalPages; page++) {
    const button = document.createElement('button');
    button.textContent = page;
    button.addEventListener('click', () => {
      currentPage = page;
      renderTable();
    });
    paginationContainer.appendChild(button);
  }
}

// Function to render the table based on current page
function renderTable() {
  tableBody.innerHTML = '';

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const gamesToDisplay = apiUrls.slice(startIndex, endIndex);

  gamesToDisplay.forEach(apiUrl => {
    fetchAndDisplayGameData(apiUrl);
  });

  displayPagination();
}

// Initial render
renderTable();
