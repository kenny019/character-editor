import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useCard } from "@/providers/card";

const CharacterFields = () => {
  const { card } = useCard();

  if (!card || !card?.characterData) {
    return <div>An error has occurred.</div>;
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="grid h-full grid-cols-3 gap-6">
        <div className="space-y-2">
          {/* name */}
          <div className="space-y-2">
            <Label htmlFor="character-name">Name</Label>
            <Input
              id="character-name"
              defaultValue={card.characterData.data.name}
            />
          </div>
          {/* image */}
          <div className="space-y-2">
            <Label>Image</Label>
            {card.imageBuffer ? (
              <div>image</div>
            ) : (
              <div className="h-[300px] w-[200px] rounded-md border border-dashed"></div>
            )}
            <div></div>
          </div>
          {/* version */}
          <div className="space-y-2">
            <Label htmlFor="character-version">Version</Label>
            <Input
              id="character-version"
              defaultValue={card.characterData.data.character_version}
            />
          </div>
          {/* creator */}
          <div className="space-y-2">
            <Label htmlFor="author">Creator</Label>
            <Input id="author" defaultValue={card.characterData.data.creator} />
          </div>
          {/* creator notes */}
          <div className="space-y-2">
            <Label htmlFor="author-notes">Creator Notes</Label>
            <Textarea
              rows={5}
              id="author-notes"
              defaultValue={card.characterData.data.creator_notes}
            />
          </div>
        </div>
        <div className="mt-2 space-y-2">
          {/* description */}
          <div className="flex h-[calc(50%-4px)] flex-col space-y-2">
            <Label htmlFor="character-description">Description</Label>
            <Textarea
              id="character-description"
              className="h-full w-full"
              defaultValue={card.characterData.data.description}
            />
          </div>
          {/* first message */}
          <div className="flex h-[calc(50%-4px)] flex-col space-y-2">
            <Label htmlFor="character-first-msg">First Message</Label>
            <Textarea
              id="character-first-msg"
              className="h-full w-full"
              defaultValue={card.characterData.data.first_mes}
            />
          </div>
        </div>
        <div className="space-y-2">
          {/* example message */}
          <Label htmlFor="character-example-msg">Example Message</Label>
          <Textarea
            id="character-example-msg"
            className="min-h-[300px] w-full lg:min-h-[700px] xl:min-h-[700px]"
            defaultValue={card.characterData.data.mes_example}
          />
        </div>
      </div>
    </div>
  );
};

export default CharacterFields;
