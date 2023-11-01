import { Extension } from "@tiptap/react";
import { Plugin } from "@tiptap/pm/state";

import findCode from "./findCode.js";

export const codeHighlighter = Extension.create({
  name: "codeHighlighter",

  addProseMirrorPlugins() {
    return [
      new Plugin({
        state: {
          init(_, { doc }) {
            return findCode(doc);
          },
          apply(transaction, oldState) {
            return transaction.docChanged
              ? findCode(transaction.doc)
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
