"use client";

import { useEffect } from "react";

function Error({ error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <div>Oops! An error occurred.</div>;
}

export default Error;
