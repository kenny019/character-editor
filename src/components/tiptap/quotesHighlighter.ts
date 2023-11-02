import { Extension } from "@tiptap/react";
import { Plugin } from "@tiptap/pm/state";

import findQuotes from "./findQuotes";

export const quotesHighlighter = Extension.create({
  name: "quotesHighlighter",

  addProseMirrorPlugins() {
    return [
      new Plugin({
        state: {
          init(_, { doc }) {
            return findQuotes(doc);
          },
          apply(transaction, oldState) {
            return transaction.docChanged
              ? findQuotes(transaction.doc)
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
