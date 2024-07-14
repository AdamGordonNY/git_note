"use client";
import Prism from "prismjs";
import "prismjs/themes/prism-dark.css";
import { useEffect, useRef, useState } from "react";

const RenderedCodeEditor = ({
  code,
  active,
}: {
  code: string;
  active: boolean;
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [codeView, setCodeView] = useState<string | null>(null);
  useEffect(() => {
    if (code) {
      setCodeView(code);
    }
    Prism.highlightAll(true);
    console.log(code);
    if (!textAreaRef.current) return;
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  }, [code]);

  return (
    <section className="flex w-[80%] items-center justify-center">
      <pre className="language-javascript line-numbers !h-auto !overflow-y-auto !rounded-lg !border-white-500 !bg-black-800 !p-4 !text-[14px]">
        <code
          className="!text-wrap"
          dangerouslySetInnerHTML={{ __html: codeView! }}
        />
      </pre>
    </section>
  );
};

export default RenderedCodeEditor;
