import { Node } from "@tiptap/pm/model";
import { Decoration, DecorationSet } from "@tiptap/pm/view";

export default function (doc: Node): DecorationSet {
  const regex = /"([^"]*)"/gi;
  const decorations: Decoration[] = [];

  doc.descendants((node, position) => {
    if (!node.text) {
      return;
    }

    Array.from(node.text.matchAll(regex)).forEach((match) => {
      const index = match.index || 0;
      const from = position + index;
      const to = from + match[0].length;
      const decoration = Decoration.inline(from, to, {
        class: "text-quote",
      });

      decorations.push(decoration);
    });
  });

  return DecorationSet.create(doc, decorations);
}
