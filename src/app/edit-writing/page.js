"use client";
import { genres, displayGenres } from "@/lib/genres";
import { useState } from "react";

function EditWriting() {
  const startingGenreState = {};
  genres.forEach((genre) => {
    if (genre === "no-genre") {
      startingGenreState[genre] = {
        checked: true,
        disabled: false,
      };
    } else {
      startingGenreState[genre] = {
        checked: false,
        disabled: false,
      };
    }
  });
  console.log(startingGenreState);
  const [genreState, setGenreState] = useState(
    structuredClone(startingGenreState),
  );
  const [genreQuantity, setGenreQuantity] = useState(0);

  function handleGenreInput(genre) {
    if (genre === "no-genre") {
      setGenreState(structuredClone(startingGenreState));
      setGenreQuantity(0);
      return;
    }
    const isChecked = genreState[genre].checked;

    if (isChecked) {
      if (genreQuantity - 1 === 0) {
        setGenreState(structuredClone(startingGenreState));
        setGenreQuantity(0);
        return;
      }
      const changeable = structuredClone(genreState);
      changeable[genre].checked = false;
      for (const key in changeable) {
        changeable[key].disabled = false;
      }
      setGenreState(changeable);
      setGenreQuantity(genreQuantity - 1);
    } else {
      const changeable = structuredClone(genreState);
      changeable[genre].checked = true;
      changeable["no-genre"].checked = false;
      if (genreQuantity === 2) {
        for (const key in changeable) {
          if (!changeable[key].checked && key !== "no-genre") {
            changeable[key].disabled = true;
          }
        }
      }
      setGenreState(changeable);
      setGenreQuantity(genreQuantity + 1);
    }

    // else if (genreQuantity <= 2) {
    //   const changeable = structuredClone(genreState);
    //   changeable[genre].checked = !genreState[genre].checked;
    //   if (genreQuantity + 1 === 3) {
    //     for (const key in changeable) {
    //       if (!changeable[key].checked) {
    //         changeable[key].disabled = true;
    //       }
    //     }
    //   }
    //   changeable["no-genre"] = {
    //     checked: false,
    //     disabled: false,
    //   };
    //   setGenreState(changeable);
    //   setGenreQuantity(genreQuantity + 1);
    // }
  }

  const genreCheckBoxes = genres.map((genre, index) => {
    return (
      <div key={genre}>
        <input
          type="checkbox"
          checked={genreState[genre].checked}
          disabled={genreState[genre].disabled}
          onChange={() => handleGenreInput(genre)}
        />
        <label>{displayGenres[index]}</label>
      </div>
    );
  });
  return (
    <div>
      editwriting
      {genreCheckBoxes}
    </div>
  );
}

export default EditWriting;
