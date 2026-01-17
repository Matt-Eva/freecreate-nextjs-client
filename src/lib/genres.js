export const genres = [
  "no-genre",
  "action",
  "adventure",
  "comedy",
  "drama",
  "erotica",
  "fantasy",
  "historical-fiction",
  "horror",
  "literary-fiction",
  "magical-realism",
  "realism",
  "romance",
  "science-fiction",
  "speculative-fiction",
  "social-fiction",
  "superhero",
  "supernatural",
  "thriller",
];

export const displayGenres = genres.map((genre) => {
  const split = genre.split("-");

  const capSplit = split.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  const str = capSplit.join(" ");
  return str;
});
