// Connecting the ul songList in the html to the js
const songListElement = document.getElementById("songList");

// Connecting the search field to the js
const searchInputElement = document.getElementById("searchInput");

// Connecting the genre dropdown menu to js
const selectGenreElement = document.getElementById("selectGenre");

// Changing from seconds to minutes + seconds. And adding "0" infront if minutes/seconds are less than 10.
function formatDuration(totalSeconds) {
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return minutes + ":" + seconds;
}

// Making a Song Card with a function and returning it to whoever calls the function
function createSongCard(song) {
  const card = document.createElement("li");
  card.className = "song-card";

  const title = document.createElement("h3");
  title.className = "song-card__title";
  title.textContent = song.title;

  const artist = document.createElement("p");
  artist.className = "song-card__artist";
  artist.textContent = song.artist;

  const genre = document.createElement("p");
  genre.className = "song-card__genre";
  genre.textContent = song.genre;

  const duration = document.createElement("p");
  duration.className = "song-card__duration";
  duration.textContent = formatDuration(song.duration);

  card.append(title, artist, genre, duration);
  return card;
}

// Shows and replaces any former song cards
function showSongs(songList) {
  const cards = songList.map(createSongCard);
  songListElement.replaceChildren(...cards);
}

// Show songs
showSongs(songs);

// Find all genres in songs.js
function fillGenreOptions() {
  const genres = [...new Set(songs.map((song) => song.genre))];

  genres.forEach((genre) => {
    const option = document.createElement("option");
    option.value = genre;
    option.textContent = genre;
    selectGenreElement.append(option);
  });
}

// Adds genres to the dropdown menu
fillGenreOptions();

// Combined search by title or artist with genre dropdown menu, and shows filtered songs
function updateSongList() {
  const searchText = searchInputElement.value.toLowerCase();
  const selectedGenre = selectGenreElement.value;

  const filteredSongs = songs.filter((song) => {
    const matchesSearch =
      song.title.toLowerCase().includes(searchText) ||
      song.artist.toLowerCase().includes(searchText);
    const matchesGenre =
      selectedGenre === "all" || song.genre === selectedGenre;

    return matchesSearch && matchesGenre;
  });

  showSongs(filteredSongs);
}

// Update the list whenever searching or changes the genre
searchInputElement.addEventListener("input", updateSongList);
selectGenreElement.addEventListener("change", updateSongList);
