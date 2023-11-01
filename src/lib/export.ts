import { Character } from "./character";

import extract from "png-chunks-extract";
import encode from "png-chunks-encode";
import textEncode from "png-chunk-text";
import { Buffer } from "buffer";

type ImageChunk = {
  name: string;
  data: Uint8Array;
};

export function ExportCharacter(card: Character, image?: boolean): Blob {
  if (!image) {
    return new Blob([JSON.stringify(card.characterData)], {
      type: "text/plain",
    });
  }

  const chunks = extract(card.imageBuffer) as ImageChunk[];
  const cleanedChunks = chunks.reduce<ImageChunk[]>((acc, chunk) => {
    if (chunk.name === "tEXt") return acc;
    acc.push(chunk);
    return acc;
  }, []);

  const encodedData = Buffer.from(
    Buffer.from(JSON.stringify(card.characterData)).toString("base64")
  );

  cleanedChunks.splice(-1, 0, textEncode.encode("chara", encodedData));

  return new Blob([Buffer.from(encode(cleanedChunks))], {
    type: "image/png",
  });
}
