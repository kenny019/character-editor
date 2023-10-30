import { Label } from "./ui/label";

const Interactive = () => {
  return (
    <div className="flex flex-col space-y-4 rounded-md bg-muted p-4">
      <div className="grid gap-2">
        <Label className="text-muted-foreground">Preview</Label>
      </div>
    </div>
  );
};

export default Interactive;
