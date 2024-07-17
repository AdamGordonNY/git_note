"use client";
import { useToast } from "@/components/ui/use-toast";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
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
    <div className="flex w-full">
      <SyntaxHighlighter
        wrapLongLines
        customStyle={{
          border: "1px solid #1D2032",
          backgroundColor: "#131625",
          borderRadius: "5px",
        }}
        language="typescript"
        style={tomorrow}
        PreTag={(props) => <pre {...props} className="relative" />}
        CodeTag={(props) => {
          return (
            <>
              <code {...props} />
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
