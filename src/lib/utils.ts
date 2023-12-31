import { V2 } from "character-card-utils";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const V2CardCharBookSchema = z.object({
  data: z.object({
    character_book: z.object({
      entries: z
        .object({
          position: z.string().optional(),
        })
        .array(),
    }),
  }),
});

export function fixChubBookEntries(data: Record<string, unknown>) {
  const V2CardCharRes = V2CardCharBookSchema.safeParse(data);

  if (!V2CardCharRes.success) return data;

  const cardData = data as V2;

  if (!cardData.data.character_book) return data;

  cardData.data.character_book.entries =
    cardData.data.character_book.entries.map((entry) => {
      const position = entry.position as string; // forced to cast
      if (position === "0")
        return {
          ...entry,
          position: "before_char",
        };
      if (position === "1")
        return {
          ...entry,
          position: "after_char",
        };
      return entry;
    });

  return cardData;
}

type JSONParseResSuccess<T> = {
  success: true;
  data: T;
  error: undefined;
};

type JSONParseResFail = {
  success: false;
  data: undefined;
  error: unknown;
};

export function safeJSONParse<T>(
  input: string
): JSONParseResSuccess<T> | JSONParseResFail {
  try {
    const data = JSON.parse(input) as T;
    return {
      success: true,
      data,
      error: undefined,
    };
  } catch (err) {
    return {
      success: false,
      error: err,
      data: undefined,
    };
  }
}
