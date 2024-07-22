"use client";

import { Editor } from "@tinymce/tinymce-react";

const Content = ({
  onChange,
  content = "",
}: {
  onChange: any;
  content?: string;
}) => {
  return (
    <section className="flex flex-col">
      <h3 className="paragraph-3-medium mb-6 text-white-500">CONTENT</h3>
      <Editor
        id="editor_content"
        apiKey="2799b9gk2hf8hje8k7kp1bri4nhcuw8jj5w4b49drfj6pg9a"
        init={{
          menubar: false,
          content_style: `body { background-color: #1D2032; color: #ADB3CC; border: none; line-height: 1.25} a { color: #11b7ff } p { margin-top: 10px; margin-bottom: 10px }`,
          plugins: "lists link image",
          toolbar:
            "bold | italic | underline | blockquote | link | image | checklist | bullist | numlist | align | indent | outdent",
          tinycomments_mode: "embedded",
          tinycomments_author: "Author name",
          mergetags_list: [
            { value: "First.Name", title: "First Name" },
            { value: "Email", title: "Email" },
          ],
        }}
        initialValue={content}
        onEditorChange={(content) => onChange(content)}
      />
    </section>
  );
};

export default Content;
