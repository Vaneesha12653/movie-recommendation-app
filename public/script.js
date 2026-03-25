const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const moviesContainer = document.getElementById("moviesContainer");

searchBtn.addEventListener("click", searchMovies);

async function searchMovies() {
  const query = searchInput.value.trim();

  if (!query) {
    alert("Please enter a movie name");
    return;
  }

  try {
    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    const movies = await response.json();

    displayMovies(movies);
  } catch (error) {
    moviesContainer.innerHTML = "<p>Failed to load movies.</p>";
  }
}

function displayMovies(movies) {
  if (!movies.length) {
    moviesContainer.innerHTML = "<p>No movies found.</p>";
    return;
  }

  moviesContainer.innerHTML = movies
    .map(movie => {
      const imageUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/500x750?text=No+Image";

      return `
        <div class="movie-card">
          <img src="${imageUrl}" alt="${movie.title}" />
          <h3>${movie.title}</h3>
          <p>⭐ ${movie.vote_average}</p>
          <p>Release: ${movie.release_date || "N/A"}</p>
        </div>
      `;
    })
    .join("");
}