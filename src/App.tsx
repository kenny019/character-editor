import "./App.css";
import CharacterFields from "./components/charfields";
import FileInput from "./components/fileinput";
import Header from "./components/header";
import Interactive from "./components/interactive";
import { cn } from "./lib/utils";
import { useCard } from "./providers/card";

function App() {
  const { card } = useCard();
  return (
    <div className="flex h-full flex-col">
      <Header />
      <div className="mt-8 flex-1">
        <div
          className={cn(
            card ? "" : "items-center justify-center",
            "flex min-h-[80vh] rounded-md border px-4 py-8 shadow-sm"
          )}
        >
          {card ? (
            <div className="grid h-full w-full grid-cols-[1fr_350px] items-stretch gap-6">
              <CharacterFields />
              <Interactive />
            </div>
          ) : (
            <FileInput />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
