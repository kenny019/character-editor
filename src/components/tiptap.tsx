import { useEditor, EditorContent } from "@tiptap/react";

import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { Markdown } from "tiptap-markdown";

import { useCard } from "@/providers/card";
import { klona } from "klona/lite";
import { quotesHighlighter } from "./tiptap/quotesHighlighter";
import { italicHighlighter } from "./tiptap/italicHighlighter";
import { codeHighlighter } from "./tiptap/codeHighlighter";
import { cn } from "@/lib/utils";
import { userHighlighter } from "./tiptap/userHighlighter";

const extensions = [
  Document,
  Paragraph,
  Text,
  Markdown,
  codeHighlighter,
  quotesHighlighter,
  italicHighlighter,
  userHighlighter,
];

type Props = {
  defaultValue: string;
  id: string;
  className?: string;
};

const Tiptap = ({ defaultValue, id, className }: Props) => {
  const { card, setCard } = useCard();

  const editor = useEditor({
    extensions,
    content: `${defaultValue}`,
    editorProps: {
      attributes: {
        class:
          "focus:outline-none group flex flex-col w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 overflow-auto",
      },
    },
    onUpdate: async ({ editor }) => {
      if (!card || !setCard) return;

      const clonedCard = klona(card);

      Object.assign(clonedCard.characterData.data, {
        [id]: editor.getText(),
      });

      setCard(clonedCard);
    },
  });

  if (!editor) return <></>;

  return (
    <>
      <EditorContent
        className={cn(
          "my-2 flex h-full min-h-[100px] w-full resize-y overflow-hidden p-1",
          className
        )}
        editor={editor}
      />
    </>
  );
};

export default Tiptap;
