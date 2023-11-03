import { useEditor, EditorContent, Editor, EditorOptions } from "@tiptap/react";

import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";

import { useCard } from "@/providers/card";
import { klona } from "klona/lite";
import { quotesHighlighter } from "./tiptap/quotesHighlighter";
import { italicHighlighter } from "./tiptap/italicHighlighter";
import { codeHighlighter } from "./tiptap/codeHighlighter";
import { cn } from "@/lib/utils";
import { userHighlighter } from "./tiptap/userHighlighter";
import { CodeIcon } from "@radix-ui/react-icons";
import { Toggle } from "./ui/toggle";
import { tokenizerHighlighter } from "./tiptap/tokenizerHighlighter";
import { useEffect, useState } from "react";

// const tokenizerExtensions = [Document, Document, Paragraph, Text];

type Props = {
  defaultValue: string;
  id: string;
  className?: string;
  tokenize?: boolean;
};

const extensions = [
  Document,
  Paragraph,
  Text,
  codeHighlighter,
  quotesHighlighter,
  italicHighlighter,
  userHighlighter,
];

// hacky
const extensionsTokenized = [
  Document,
  Paragraph,
  Text,
  codeHighlighter,
  quotesHighlighter,
  italicHighlighter,
  userHighlighter,
  tokenizerHighlighter,
];

const Tiptap = ({ defaultValue, id, className, tokenize }: Props) => {
  const { card, setCard } = useCard();
  const [shouldTokenize, setShouldTokenize] = useState(false);

  const editorSettings = {
    extensions: extensions,
    content: defaultValue,
    parseOptions: {
      preserveWhitespace: "full",
    },
    editorProps: {
      attributes: {
        class:
          "focus:outline-none flex flex-col w-full rounded-t-none rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 overflow-auto",
      },
    },
    onUpdate: async ({ editor }: { editor: Editor }) => {
      if (!card || !setCard) return;

      const clonedCard = klona(card);

      Object.assign(clonedCard.characterData.data, {
        [id]: editor.getText(),
      });

      setCard(clonedCard);
    },
  } as unknown as EditorOptions;

  const tokenizedEditorSettings = {
    extensions: extensionsTokenized,
    content: defaultValue,
    parseOptions: {
      preserveWhitespace: "full",
    },
    editorProps: {
      attributes: {
        class:
          "focus:outline-none flex flex-col w-full rounded-t-none rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 overflow-auto",
      },
    },

    onUpdate: async ({ editor }: { editor: Editor }) => {
      if (!card || !setCard) return;

      const clonedCard = klona(card);

      Object.assign(clonedCard.characterData.data, {
        [id]: editor.getText(),
      });

      setCard(clonedCard);
    },
  } as unknown as EditorOptions;

  const editor = useEditor(editorSettings);

  const tokenizedEditor = useEditor(tokenizedEditorSettings);

  useEffect(() => {
    if (!card) return;

    const data = card.characterData.data;
    const updatedData = data[id as keyof typeof data] as string;

    if (editor)
      editor.commands.setContent(updatedData, true, {
        preserveWhitespace: "full",
      });
    if (tokenizedEditor)
      tokenizedEditor.commands.setContent(updatedData, true, {
        preserveWhitespace: "full",
      });
  }, [shouldTokenize]);

  if (!editor || !tokenizedEditor) return <></>;

  return (
    <div className="my-2 flex flex-col items-center justify-center overflow-hidden">
      <div className="flex w-[calc(100%-1px)] justify-end rounded-md rounded-b-none border border-b-0 px-4 py-[2px]">
        {tokenize && (
          <Toggle
            onClick={() => setShouldTokenize(!shouldTokenize)}
            size="sm"
            aria-label="Toggle Tokenizer"
          >
            <CodeIcon className="h-3 w-3" />
          </Toggle>
        )}
      </div>
      {shouldTokenize ? (
        <EditorContent
          key={`tiptap-tokenize-${id}`}
          className={cn(
            "flex h-full min-h-[100px] w-full resize-y overflow-hidden px-[1px] py-[1px]",
            className
          )}
          editor={tokenizedEditor}
        />
      ) : (
        <EditorContent
          key={`tiptap-${id}`}
          className={cn(
            "flex h-full min-h-[100px] w-full resize-y overflow-hidden px-[1px] py-[1px]",
            className
          )}
          editor={editor}
        />
      )}
    </div>
  );
};

export default Tiptap;
