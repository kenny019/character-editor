import { Extension } from "@tiptap/react";
import { Plugin } from "@tiptap/pm/state";

import findItalic from "./findItalic.js";

export const italicHighlighter = Extension.create({
  name: "italicHighlighter",

  addProseMirrorPlugins() {
    return [
      new Plugin({
        state: {
          init(_, { doc }) {
            return findItalic(doc);
          },
          apply(transaction, oldState) {
            return transaction.docChanged
              ? findItalic(transaction.doc)
              : oldState;
          },
        },
        props: {
          decorations(state) {
            return this.getState(state);
          },
        },
      }),
    ];
  },
});
