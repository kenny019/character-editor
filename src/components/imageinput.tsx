import { useCallback } from "react";
import { useToast } from "./ui/use-toast";
import { useCard } from "@/providers/card";
import { useDropzone } from "react-dropzone";
import { klona } from "klona/lite";

const ImageInput = () => {
  const { toast } = useToast();
  const { card, setCard } = useCard();

  const onDrop = useCallback((file: File[]) => {
    // const reader = new FileReader()
    const inputFile = file[0];
    if (!inputFile || !inputFile.type) {
      toast({
        title: "Invalid File Format",
        description: `Only .png file formats are supported currently.`,
        variant: "destructive",
      });
    }

    const reader = new FileReader();

    reader.onload = async () => {
      // todo: refactor
      if (!card || !setCard) return;
      const clonedCard = klona(card);
      const fileData = reader.result as ArrayBuffer;
      clonedCard.imageBuffer = new Uint8Array(fileData);

      setCard(clonedCard);
    };

    if (inputFile.type === "application/json") {
      reader.readAsText(inputFile);
    } else {
      reader.readAsArrayBuffer(inputFile);
    }
  }, []);

  const { getRootProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
    },
  });

  if (!card) return <></>;

  return (
    <>
      {card.imageBuffer ? (
        <img
          src={URL.createObjectURL(
            new Blob([card.imageBuffer], { type: "image/png" })
          )}
          className="h-[300px] w-[200px] cursor-pointer rounded-md border object-cover"
          {...getRootProps()}
        />
      ) : (
        <div
          className="flex h-[300px] w-[200px] cursor-pointer flex-col rounded-md border border-dashed"
          {...getRootProps()}
        >
          {isDragActive && <p>Drop image here...</p>}
        </div>
      )}
    </>
  );
};

export default ImageInput;
