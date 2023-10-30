import { V2 } from "character-card-utils";

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
}
