import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import { useCard } from "@/providers/card";
import { Character } from "@/lib/character";

const FileInput = () => {
  const { setCard } = useCard();

  const onDrop = useCallback((file: File[]) => {
    console.log(file);
  }, []);

  const { getRootProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
    accept: {
      "image/png": [".png"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="flex min-h-[250px] min-w-[500px] flex-col justify-center space-y-2 rounded-md border border-dashed px-4 py-8 text-center"
    >
      {isDragActive ? (
        <p>Drop the image here...</p>
      ) : (
        <p className="text-muted-foreground">
          Drag an image to create or edit...
        </p>
      )}
      {!isDragActive && (
        <>
          <Button variant="secondary" onClick={() => open()}>
            Import Image
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
