import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import { useCard } from "@/providers/card";
import { Character } from "@/lib/character";
import exifr from "exifr";
import { Buffer } from "buffer";
import { safeParseToV2 } from "character-card-utils";
import { fixChubBookEntires } from "@/lib/utils";

const FileInput = () => {
  const { setCard } = useCard();

  const onDrop = useCallback((file: File[]) => {
    // const reader = new FileReader()
    const inputFile = file[0];

    const reader = new FileReader();
    reader.onload = async () => {
      // todo: refactor
      if (inputFile.type === "application/json") {
        const fileData = reader.result as string;

        const V2ParseRes = safeParseToV2(JSON.parse(fileData));

        if (!V2ParseRes.success) {
          // add toast
          console.error(V2ParseRes.error);
          return;
        }

        const fileCardData = V2ParseRes.data;

        const character = new Character(undefined, fileCardData);

        if (!setCard) return;

        setCard(character);
        return;
      }

      const fileData = reader.result as ArrayBuffer;
      const exif = await exifr.parse(fileData);

      const decodedExifData = JSON.parse(
        Buffer.from(exif.chara, "base64").toString()
      );

      const toParseData = fixChubBookEntires(decodedExifData);

      console.log(toParseData);
      const V2ParseRes = safeParseToV2(toParseData);

      if (!V2ParseRes.success) {
        console.error(V2ParseRes.error);
        return;
      }

      const fileCardData = V2ParseRes.data;

      const character = new Character(new Uint8Array(fileData), fileCardData);

      if (!setCard) return;

      setCard(character);
    };

    if (inputFile.type === "application/json") {
      reader.readAsText(inputFile);
    } else {
      reader.readAsArrayBuffer(inputFile);
    }
  }, []);

  const { getRootProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
    accept: {
      "image/png": [".png"],
      "application/json": [".json"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="flex min-h-[250px] min-w-[500px] flex-col justify-center space-y-2 rounded-md border border-dashed px-4 py-8 text-center"
    >
      {isDragActive ? (
        <p>Drop file here...</p>
      ) : (
        <p className="text-muted-foreground">Drag an image or JSON file...</p>
      )}
      {!isDragActive && (
        <>
          <Button variant="secondary" onClick={() => open()}>
            Import PNG/JSON
          </Button>
          <div className="h-1 w-full border-b px-2" />
          <Button
            onClick={() => {
              const blankCard = new Character();
              if (setCard) {
                setCard(blankCard);
              }
            }}
          >
            Create New
          </Button>
        </>
      )}
    </div>
  );
};

export default FileInput;
