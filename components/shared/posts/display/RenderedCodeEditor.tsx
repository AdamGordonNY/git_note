"use client";
import { useToast } from "@/components/ui/use-toast";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { Copy } from "lucide-react";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/hljs";

const RenderedCodeEditor = ({ code }: { code: string }) => {
  const { toast } = useToast();

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied to clipboard",
    });
  };

  return (
    <div className="flex w-full items-center justify-center px-10">
      <SyntaxHighlighter
        wrapLongLines
        showInlineLineNumbers
        customStyle={{
          border: "1px solid #1D2032",
          backgroundColor: "#131625",
          borderRadius: "5px",
          fontFamily: "'JetBrains Mono', monospace",
        }}
        language="typescript"
        style={tomorrow}
        PreTag={(props) => <pre {...props} className="relative" />}
        CodeTag={(props) => {
          return (
            <>
              <code {...props} key={1} />
              <button
                onClick={() => copyCode(code)}
                className="absolute right-0 top-0 rounded-sm bg-black-800 p-4"
              >
                <Copy size={24} />
              </button>
            </>
          );
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default RenderedCodeEditor;
