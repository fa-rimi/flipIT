// Function to create and render the leaderboard table
function renderLeaderboard(data) {
  const leaderboardTable = document.getElementById("leaderboard-table");
  leaderboardTable.innerHTML = ""; // Clear the table content

  // Create table header
  const tableHeader = document.createElement("thead");
  tableHeader.innerHTML = `
      <tr>
        <th>Rank</th>
        <th>Player Name</th>
        <th>Time Taken</th>
      </tr>
    `;
  leaderboardTable.appendChild(tableHeader);

  // Create table body
  const tableBody = document.createElement("tbody");

  // Iterate over the data and create rows
  data.forEach((entry, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${index + 1}</td>
        <td>${entry.playerName}</td>
        <td>${entry.time}</td>
      `;
    tableBody.appendChild(row);
  });

  leaderboardTable.appendChild(tableBody);
}

// Function to fetch and display leaderboard data for a specific game mode
async function fetchAndDisplayLeaderboard(mode) {
  try {
    const res = await fetch(`http://localhost:3001/leaderboard/${mode}`);
    if (res.ok) {
      const data = await res.json();
      console.log(data);

      // Call the renderLeaderboard function to display the data in the HTML
      renderLeaderboard(data);
    } else {
      console.error(`Failed to fetch leaderboard data for ${mode}`);
    }
  } catch (error) {
    console.error(`Error fetching leaderboard data for ${mode}:`, error);
  }
}

// Event listeners for difficulty buttons
const easyBtn = document.getElementById("easy");
easyBtn.addEventListener("click", () => {
  fetchAndDisplayLeaderboard("easy");
});

const mediumBtn = document.getElementById("medium");
mediumBtn.addEventListener("click", () => {
  fetchAndDisplayLeaderboard("medium");
});

const hardBtn = document.getElementById("hard");
hardBtn.addEventListener("click", () => {
  fetchAndDisplayLeaderboard("hard");
});

const harderBtn = document.getElementById("harder");
harderBtn.addEventListener("click", () => {
  fetchAndDisplayLeaderboard("harder");
});
