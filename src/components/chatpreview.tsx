import { GearIcon } from "@radix-ui/react-icons";
import { Label } from "./ui/label";

const ChatPreview = () => {
  return (
    <div className="flex flex-col space-y-4 rounded-md bg-muted p-4">
      <div className="flex justify-between border-b border-b-muted-foreground pb-2">
        <div className="grid gap-2">
          <Label className="text-muted-foreground">Preview</Label>
        </div>
        <GearIcon className="h-3 w-3 cursor-pointer text-muted-foreground hover:text-foreground" />
      </div>
    </div>
  );
};

export default ChatPreview;
