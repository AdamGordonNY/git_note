import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

interface NewContentProps {
  control: any;
}
const NewContent = ({ control }: NewContentProps) => {
  const editorRef = useRef<any>(null);

  return (
    <section>
      <Controller
        control={control}
        name="content"
        render={({ field }) => (
          <Editor
            id="content"
            onBlur={field.onBlur}
            apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
            onEditorChange={(content) => field.onChange(content)}
            onInit={(evt, editor) => {
              // @ts-ignore
              editorRef.current = editor;
            }}
            ref={field.ref}
            init={{
              height: 350,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "codesample",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
              ],
              toolbar:
                "codesample | bold italic h1 h2 image blockquote link" +
                " bullist numlist",
              content_style:
                "body { font-family:Inter; font-size:16px; background-color:#1D2032; color:#ADB2CC }",
            }}
            value={field.value}
          />
        )}
      />
    </section>
  );
};

export default NewContent;
