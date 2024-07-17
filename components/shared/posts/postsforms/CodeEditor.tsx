"use client";

import React, { useEffect, useRef, useState } from "react";

import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/hljs";
import EyeIcon from "@/components/ui/icons/EyeIcon";
import CodeIcon from "@/components/ui/icons/CodeIcon";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/prism-async-light";

const CodeEditor = ({
  onChange,
  codeContent,
}: {
  onChange: (value: string) => void;
  codeContent: string;
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [numberOfEditorLines, setNumberOfEditorLines] = useState(0);
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    setNumberOfEditorLines(codeContent.split("\n").length);

    if (!textAreaRef.current) return;
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  }, [codeContent, isPreview]);

  return (
    <section className="flex flex-col space-y-2 text-white-300">
      <div className="paragraph-3-medium flex rounded-md border-none">
        <button
          type="button"
          className={`${
            isPreview ? "bg-black-800" : "bg-black-700"
          } flex items-center gap-x-2 rounded p-3`}
          onClick={() => setIsPreview(false)}
        >
          <CodeIcon size={20} />
          Code
        </button>

        <button
          type="button"
          className={`${
            isPreview ? "bg-black-700" : "bg-black-800"
          } flex items-center gap-x-2 rounded p-3`}
          onClick={() => setIsPreview(true)}
        >
          <EyeIcon size={20} />
          Preview
        </button>
      </div>

      {isPreview ? (
        <pre className="language-javascript ">
          <SyntaxHighlighter
            wrapLongLines
            showLineNumbers
            customStyle={{
              border: "1px solid #1D2032",
              backgroundColor: "#131625",
              borderRadius: "5px",
              fontFamily: "JetBrains Mono",
              height: "384px",
              fontSize: "14px",
              overflowY: "hidden",
              padding: "0px",
            }}
            language="typescript"
            style={tomorrow}
            PreTag={(props) => <pre {...props} className="relative" />}
            CodeTag={(props) => {
              return (
                <>
                  <code {...props} key={1} />
                </>
              );
            }}
          >
            {codeContent}
          </SyntaxHighlighter>
        </pre>
      ) : (
        <div className="relative flex h-96 overflow-y-auto bg-black-700">
          <div className="editorLineNumbers absolute left-0 top-0 flex flex-col pt-2">
            {[...Array(numberOfEditorLines)].map((_, idx) => (
              <span className="p" key={idx}>
                {idx + 1}
              </span>
            ))}
          </div>
          <textarea
            id="code-text-area"
            spellCheck={false}
            ref={textAreaRef}
            className="codeTextArea no-scrollbar w-full rounded-md border-none bg-black-700 pl-4 pt-2 focus:ring-0"
            onChange={(e) => onChange(e.target.value)}
            value={codeContent}
          />
        </div>
      )}
    </section>
  );
};

export default CodeEditor;
