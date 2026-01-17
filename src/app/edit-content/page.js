"use client";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const Quill = dynamic(() => import("quill"));

function EditContent() {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    const container = editorRef.current;
    async function loadQuill() {
      const { default: Quill } = await import("quill");
      const toolbarOptions = [
        ["bold", "italic", "underline", "strike"], // toggled buttons
        ["blockquote", "code-block"],
        ["link"],
        //[ "image", "video", "formula"],

        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        [{ script: "sub" }, { script: "super" }], // superscript/subscript
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        //[{ direction: "rtl" }], // text direction

        //   [{ size: ["small", false, "large", "huge"] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],

        //   [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        //   [{ font: [] }],
        [{ align: [] }],

        ["clean"], // remove formatting button
      ];

      if (!quillRef.current) {
        const editorContainer = editorRef.current.appendChild(
          document.createElement("div"),
        );
        quillRef.current = new Quill(editorContainer, {
          theme: "snow",
          modules: {
            toolbar: toolbarOptions,
          },
        });
      }
    }
    loadQuill();
    return () => {
      if (quillRef.current) {
        container.innerHTML = null;
        quillRef.current = null;
      }
    };
  }, []);

  return <div ref={editorRef}></div>;
}

export default EditContent;
