import { Extension } from "@tiptap/react";
import { Plugin } from "@tiptap/pm/state";

import findUser from "./findUser";

export const userHighlighter = Extension.create({
  name: "userHighlighter",

  addProseMirrorPlugins() {
    return [
      new Plugin({
        state: {
          init(_, { doc }) {
            return findUser(doc);
          },
          apply(transaction, oldState) {
            return transaction.docChanged
              ? findUser(transaction.doc)
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
