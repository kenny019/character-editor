import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useCard } from "@/providers/card";
import { klona } from "klona/lite";
import Tiptap from "./tiptap";
import ImageInput from "./imageinput";

const CharacterFields = () => {
  const { card, setCard } = useCard();

  if (!card || !card.characterData) {
    return <div>An error has occurred.</div>;
  }

  function modifyCardData(
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    if (!card || !setCard) return;

    const clonedCard = klona(card);
    Object.assign(clonedCard.characterData.data, {
      [event.currentTarget.id]: event.currentTarget.value,
    });

    setCard(clonedCard);
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="grid h-full grid-cols-3 gap-6">
        <div className="space-y-2">
          {/* name */}
          <div key={`${card.uniqueId}-name`} className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              defaultValue={card.characterData.data.name}
              onChange={modifyCardData}
            />
          </div>
          {/* image */}
          <div className="space-y-2" key={`${card.uniqueId}-image`}>
            <Label>Image</Label>
            <ImageInput />
          </div>
          {/* version */}
          <div key={`${card.uniqueId}-character_version`} className="space-y-2">
            <Label htmlFor="character_version">Version</Label>
            <Input
              id="character_version"
              defaultValue={card.characterData.data.character_version}
              onChange={modifyCardData}
            />
          </div>
          {/* creator */}
          <div className="space-y-2" key={`${card.uniqueId}-creator`}>
            <Label htmlFor="author">Creator</Label>
            <Input id="author" defaultValue={card.characterData.data.creator} />
          </div>
          {/* creator notes */}
          <div className="space-y-2" key={`${card.uniqueId}-creator_notes`}>
            <Label htmlFor="creator_notes">Creator Notes</Label>
            <Textarea
              id="creator_notes"
              defaultValue={card.characterData.data.creator_notes}
              onChange={modifyCardData}
              rows={4}
            />
          </div>
        </div>
        <div className="mt-2 space-y-2">
          {/* description */}
          <div
            key={`${card.uniqueId}-description`}
            className="flex h-[calc(50%-2px)] flex-col"
          >
            <Label htmlFor="description">Description</Label>
            <Tiptap
              id="description"
              defaultValue={card.characterData.data.description}
            />
            <p className="text-end text-xs">
              {card.tokens("description").length}
            </p>
          </div>
          {/* first message */}
          <div
            key={`${card.uniqueId}-first_mes`}
            className="flex h-[calc(50%-2px)] flex-col space-y-2"
          >
            <Label htmlFor="first_mes">First Message</Label>
            <Tiptap
              id="first_mes"
              defaultValue={card.characterData.data.first_mes}
            />
            <p className="text-end text-xs">
              {card.tokens("first_mes").length}
            </p>
          </div>
        </div>
        <div key={`${card.uniqueId}-mes_example`} className="space-y-2">
          {/* example message */}
          <Label htmlFor="mes_example">Example Message</Label>
          <Tiptap
            id="mes_example"
            className="min-h-[300px] w-full lg:min-h-[700px] xl:min-h-[700px]"
            defaultValue={card.characterData.data.mes_example}
          />
          <p className="text-end text-xs">
            {card.tokens("mes_example").length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CharacterFields;
