import { Extension } from "@tiptap/react";
import { Plugin } from "@tiptap/pm/state";

import setTokenized from "./setTokenized";

export const tokenizerHighlighter = Extension.create({
  name: "tokenizerHighlighter",

  addProseMirrorPlugins() {
    return [
      new Plugin({
        state: {
          init(_, { doc }) {
            return setTokenized(doc);
          },
          apply(transaction, oldState) {
            return transaction.docChanged
              ? setTokenized(transaction.doc)
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
