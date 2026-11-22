const songListElement = document.getElementById("songList");

const card = document.createElement("li");
card.className = "song-card";

const title = document.createElement("h3");
title.className = "song-card__title";
title.textContent = "Sandstorm";

const artist = document.createElement("p");
artist.className = "song-card__artist";
artist.textContent = "Darude";

const genre = document.createElement("p");
genre.className = "song-card__genre";
genre.textContent = "Electronic";

const duration = document.createElement("p");
duration.className = "song-card__duration";
duration.textContent = "3:45";

card.append(title, artist, genre, duration);
songListElement.append(card);
