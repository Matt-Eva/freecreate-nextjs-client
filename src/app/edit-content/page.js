"use client";
import { useEffect, useRef } from "react";

function EditContent() {
  const editorEl = useRef(null);
  useEffect(() => {
    loadQuill();
  }, []);

  async function loadQuill() {
    const { default: Quill } = await import("quill");
    const quill = new Quill(editorEl.current, {
      theme: "snow",
    });
  }
  return <div id="editor" ref={editorEl}></div>;
}

export default EditContent;
