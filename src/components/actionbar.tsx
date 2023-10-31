import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { useCard } from "@/providers/card";

const ActionBar = () => {
  const { tokens } = useCard();
  return (
    <div className="flex w-full items-center justify-between border-b px-4 py-2 text-xs">
      <p>Tokens: {tokens ? tokens.length : 0}</p>
      <Button onClick={() => console.log(tokens)} variant="ghost" size="sm">
        New <PlusIcon className="ml-1 h-3 w-3" />
      </Button>
    </div>
  );
};

export default ActionBar;
