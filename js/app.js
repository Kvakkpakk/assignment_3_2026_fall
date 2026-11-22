// Connecting the ul songList in the html to the js
const songListElement = document.getElementById("songList");

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

// Going through each item/object in the "songs.js" and making cards.
songs.forEach((song) => {
  const card = createSongCard(song);
  songListElement.append(card);
});
