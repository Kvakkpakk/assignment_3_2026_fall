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

// Connecting the playlist parts of the html to the js
const playlistListElement = document.getElementById("playlistList");
const playlistDurationElement = document.getElementById("playlistDuration");
const playlistEmptyElement = document.getElementById("playlistEmpty");

// The songs the user has added to My Playlist
let playlist = [];

// The name of the key to where the playlist is saved in the browser's local storage
const playlistStorageKey = "playlistSongIds";

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

// Adding a button to the song card
function buttonPlusCard(song) {
  const card = createSongCard(song);

  const addButton = document.createElement("button");
  addButton.type = "button";
  addButton.className = "song-card__button";
  addButton.textContent = "Add";
  addButton.addEventListener("click", () => addToPlaylist(song));

  card.append(addButton);
  return card;
}

// Shows and replaces any former song cards
function showSongs(songList) {
  const cards = songList.map(buttonPlusCard);
  songListElement.replaceChildren(...cards);

  // Show the empty message only when there are no songs to display
  collectionEmptyElement.hidden = songList.length > 0;
}

// Adds a song to My Playlist, unless it is already there
function addToPlaylist(song) {
  const alreadyInPlaylist = playlist.some(
    (playlistSong) => playlistSong.id === song.id,
  );

  if (alreadyInPlaylist) {
    return;
  }

  playlist.push(song);
  savePlaylist();
  showPlaylist();
}

// Shows the songs in My Playlist, or the empty message when there are none
function showPlaylist() {
  const cards = playlist.map(createPlaylistCard);
  playlistListElement.replaceChildren(...cards);

  // Add up the duration of every song in the playlist
  let totalSeconds = 0;
  playlist.forEach((song) => {
    totalSeconds = totalSeconds + song.duration;
  });
  playlistDurationElement.textContent =
    "Total duration: " + formatDuration(totalSeconds);

  playlistEmptyElement.hidden = playlist.length > 0;
}

// Playlist card: a normal song card plus a Remove button
function createPlaylistCard(song) {
  const card = createSongCard(song);

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className = "song-card__button";
  removeButton.textContent = "Remove";
  removeButton.addEventListener("click", () => removeFromPlaylist(song));

  card.append(removeButton);
  return card;
}

// Removes a song from My Playlist
function removeFromPlaylist(song) {
  playlist = playlist.filter((playlistSong) => playlistSong.id !== song.id);
  savePlaylist();
  showPlaylist();
}

// Saves the ids of the songs in My Playlist to local storage
function savePlaylist() {
  const songIds = playlist.map((song) => song.id);
  localStorage.setItem(playlistStorageKey, JSON.stringify(songIds));
}

// Loads the saved ids and finds the matching songs in songs.js
function loadPlaylist() {
  const savedSongIds = localStorage.getItem(playlistStorageKey);

  // Nothing saved yet, keeps the empty playlist
  if (savedSongIds === null) {
    return;
  }

  const songIds = JSON.parse(savedSongIds);
  playlist = songIds
    .map((songId) => songs.find((song) => song.id === songId))
    .filter((song) => song !== undefined);
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

// Load any playlist in local storage and show playlist when the page loads
loadPlaylist();
showPlaylist();
