import FileSaver from "file-saver";
import {
  DownloadIcon,
  FileIcon,
  ImageIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { useCard } from "@/providers/card";
import { Character } from "@/lib/character";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ExportCharacter } from "@/lib/export";
import { useToast } from "./ui/use-toast";

const ActionBar = () => {
  const { toast } = useToast();
  const { tokens, card, setCard } = useCard();
  if (!card) {
    return <></>;
  }

  return (
    <div className="flex w-full items-center justify-between border-b px-4 py-2 text-xs">
      <p>Tokens: {tokens ? tokens.length : 0}</p>
      <div className="flex flex-row space-x-2">
        {/* back */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="sm">
              Back
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will delete your character
                and overwrite any changes.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  if (!setCard) return;
                  setCard(undefined);
                }}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        {/* new */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="sm">
              New <PlusIcon className="ml-1 h-3 w-3" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will delete your character
                and overwrite any changes.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  if (!setCard) return;
                  setCard(new Character());
                }}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        {/* export  */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm">
              Export <DownloadIcon className="ml-1 h-3 w-3" />{" "}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-[0px]">
            <DropdownMenuItem
              onClick={() => {
                if (!card.imageBuffer) {
                  toast({
                    title: "Error saving as image",
                    description:
                      "Please upload an image to use as the character card before saving.",
                    variant: "destructive",
                  });
                  return;
                }
                FileSaver.saveAs(
                  ExportCharacter(card, true),
                  `${card.characterData.data.name}.png`
                );
              }}
              className="gap-1 text-xs"
            >
              Image <ImageIcon className="h-3 w-3" />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                FileSaver.saveAs(
                  ExportCharacter(card),
                  `${card.characterData.data.name}.json`
                )
              }
              className="gap-1 text-xs"
            >
              JSON <FileIcon className="h-3 w-3" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ActionBar;
