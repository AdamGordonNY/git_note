import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import { useEffect } from "react";

const RenderedCodeEditor = ({ code }: { code: string }) => {
  useEffect(() => {
    const highlightCode = () =>
      Prism.highlight(code, Prism.languages.javascript, "javascript");
    highlightCode();
  });

  return (
    <pre className="language-javascript !h-auto !overflow-y-auto !rounded-lg !border-white-500 !bg-black-800 !p-4 !text-[14px]">
      <code dangerouslySetInnerHTML={{ __html: code }} />
    </pre>
  );
};

export default RenderedCodeEditor;
