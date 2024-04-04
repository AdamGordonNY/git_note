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
    <>
      <Controller
        control={control}
        name="code"
        render={({ field }) => (
          <Editor
            apiKey="wknaobzhc821ctbgxsuizxuespxevrwodrpf5uahr6ig86q3"
            init={{
              plugins:
                "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
              toolbar:
                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
              tinycomments_mode: "embedded",
              tinycomments_author: "Author name",
              mergetags_list: [
                { value: "First.Name", title: "First Name" },
                { value: "Email", title: "Email" },
              ],
            }}
            initialValue="Welcome to TinyMCE!"
            value={field.value}
          />
        )}
      />
    </>
  );
};

export default NewContent;
