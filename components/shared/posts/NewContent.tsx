import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
interface NewContentProps {
  register: any;
  control: any;
}
const NewContent = ({ register, control }: NewContentProps) => {
  const editorRef = useRef<any>(null);

  return (
    <section className="border-#4448691A border-t">
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
                "body { font-family:Inter; font-size:16px background-color:black-700; color:white-300 }",
              skin: "oxide-dark",
              content_css: "dark",
            }}
            initialValue={field.value}
            value={field.value}
          />
        )}
      />
    </section>
  );
};

export default NewContent;
