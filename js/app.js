// Connecting the ul songList in the html to the js
const songListElement = document.getElementById("songList");

// Connecting the search field to the js
const searchInputElement = document.getElementById("searchInput");

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

// Search by title or artist
searchInputElement.addEventListener("input", () => {
  const searchText = searchInputElement.value.toLowerCase();

  const filteredSongs = songs.filter((song) => {
    return (
      song.title.toLowerCase().includes(searchText) ||
      song.artist.toLowerCase().includes(searchText)
    );
  });

  // Show filtered songs
  showSongs(filteredSongs);
});
