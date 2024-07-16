"use client";
import { useToast } from "@/components/ui/use-toast";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { monokai } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Image from "next/image";
const RenderedCodeEditor = ({ code }: { code: string }) => {
  const { toast } = useToast();

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied to clipboard",
    });
  };

  return (
    <section className="flex w-[80%] items-center justify-center">
      <SyntaxHighlighter
        wrapLongLines
        customStyle={{
          border: "1px solid #1D2032",
          backgroundColor: "#131625",
          borderRadius: "5px",
        }}
        language="typescript"
        style={monokai}
        PreTag={(props) => <pre {...props} className="relative" />}
        CodeTag={(props) => {
          return (
            <>
              <code {...props} />
              <button
                onClick={() => copyCode(code)}
                className="absolute right-0 top-0 rounded-sm bg-black-800 p-4"
              >
                <Image
                  src="/assets/icons/copy.svg"
                  alt="Copy Code Block"
                  width={16}
                  height={16}
                />
              </button>
            </>
          );
        }}
      >
        {code}
      </SyntaxHighlighter>
    </section>
  );
};

export default RenderedCodeEditor;
