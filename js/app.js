// Connecting the ul songList in the html to the js
const songListElement = document.getElementById("songList");

// Connecting the search field to the js
const searchInputElement = document.getElementById("searchInput");

// Connecting the genre dropdown menu to js
const selectGenreElement = document.getElementById("selectGenre");

// Connecting the sorting dropdown menu to js
const sortingByElement = document.getElementById("sortingBy");

// Connecting the sort direction button to js
const sortDirectionButtonElement = document.getElementById(
  "sortDirectionButton",
);

// Connecting the empty-state message for the collection to js
const collectionEmptyElement = document.getElementById("collectionEmpty");

// Remembers whether the sort order is reversed
let isDescending = false;

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

  // Show the empty message only when there are no songs to display
  collectionEmptyElement.hidden = songList.length > 0;
}

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

  // Sorting by Title, artist or duration
  const sortingBy = sortingByElement.value;

  const sortedSongs = [...filteredSongs].sort((songA, songB) => {
    if (sortingBy === "duration") {
      return songA.duration - songB.duration;
    }
    return songA[sortingBy].localeCompare(songB[sortingBy]);
  });

  // Reverse the order if descending
  if (isDescending) {
    sortedSongs.reverse();
  }

  showSongs(sortedSongs);
}

// So the songs get sorted by title when you enter the page
updateSongList();

// Update the list whenever changes in search are done
searchInputElement.addEventListener("input", updateSongList);
selectGenreElement.addEventListener("change", updateSongList);
sortingByElement.addEventListener("change", updateSongList);

// Flip the sort direction, update the button text, and update the list
sortDirectionButtonElement.addEventListener("click", () => {
  if (isDescending === true) {
    isDescending = false;
    sortDirectionButtonElement.textContent = "Ascending";
  } else {
    isDescending = true;
    sortDirectionButtonElement.textContent = "Descending";
  }

  updateSongList();
});
