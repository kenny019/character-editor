import { V2 } from "character-card-utils";
import llamaTokenizer from "llama-tokenizer-js";

function InitCharacterV2(): V2 {
  return {
    spec: "chara_card_v2",
    spec_version: "2.0",
    data: {
      name: "My Character",
      first_mes: `Hi! This is the first message that will get "sent" to the frontend/chat.`,
      scenario: "My Character tells a story",
      description: "{{char}} is very happy.",
      personality: "",
      mes_example: "{{user}}: You're so cool.\n{{char}}: Thanks!",
      creator_notes:
        "Place your notes here! Example: My Character is very funny.",
      post_history_instructions: "Your reply must be funny.",
      alternate_greetings: [
        "Hello, this is a greeting from to you.",
        "Whats up gang!",
      ],
      tags: ["male", "female", "funny"],
      creator: "Author",
      character_version: "1",
      extensions: {},
      system_prompt: "",
    },
  };
}

export class Character {
  imageBuffer?: Uint8Array;
  characterData: V2;

  constructor(image?: Uint8Array, characterData?: V2) {
    if (image) this.imageBuffer = image;
    if (characterData) {
      this.characterData = characterData;
    } else {
      this.characterData = InitCharacterV2();
    }
  }

  public tokens(field?: string) {
    if (!field) {
      const { description, first_mes, mes_example } = this.characterData.data;
      const prompt = `${description}\n${first_mes}\n${mes_example}`;
      return llamaTokenizer.encode(prompt) as string[];
    }

    const data = this.characterData.data;
    return llamaTokenizer.encode(data[field as keyof typeof data]) as string[];
  }
}
