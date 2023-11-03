import { Node } from "@tiptap/pm/model";
import { Decoration, DecorationSet } from "@tiptap/pm/view";
import llamaTokenizer from "llama-tokenizer-js";

const pastelColors = [
  "rgba(107,64,216,.3)",
  "rgba(104,222,122,.4)",
  "rgba(244,172,54,.4)",
  "rgba(239,65,70,.4)",
  "rgba(39,181,234,.4)",
];

export default function (doc: Node): DecorationSet {
  const decorations: Decoration[] = [];

  doc.descendants((node, position) => {
    if (!node.text) {
      return;
    }

    const encodedTokens = llamaTokenizer.encode(node.text) as number[];
    const decodedTokens = encodedTokens.map((token) => {
      const chars = llamaTokenizer.decode([token], false, false);
      if (token === 0) return "<unk>";
      if (token === 1) return "<s>";
      if (token === 2) return "</s>";
      if (token >= 3 && token <= 258) return llamaTokenizer.vocabById[token];
      return chars;
    }) as string[];

    let oldPos = 1;
    let startfrom = 0;
    if (oldPos !== position) {
      oldPos = position;
      startfrom = 0;
    }

    decodedTokens.forEach((token, index) => {
      const from = (node.text?.indexOf(token, startfrom) || 0) + position;
      const to = from + token.length + 1;
      startfrom = (node.text?.indexOf(token, startfrom) || 0) + token.length;

      const decoration = Decoration.inline(from, to, {
        style: `background-color: ${pastelColors[index % pastelColors.length]}`,
      });

      decorations.push(decoration);
    });
  });

  return DecorationSet.create(doc, decorations);
}
