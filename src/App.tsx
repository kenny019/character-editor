import "./App.css";
import ActionBar from "./components/actionbar";
import CharacterFields from "./components/charfields";
import FileInput from "./components/fileinput";
import Header from "./components/header";
import { cn } from "./lib/utils";
import { useCard } from "./providers/card";
import ChatPreview from "./components/chatpreview";

function App() {
  const { card } = useCard();
  return (
    <div className="flex h-full flex-col">
      <Header />
      <div className="mt-8 flex-1">
        <div
          className={cn(
            card ? "flex-col space-y-4" : "items-center justify-center py-8",
            "flex min-h-[80vh] rounded-md border shadow-sm"
          )}
        >
          {card ? (
            <>
              <ActionBar />
              <div className="grid h-full w-full grid-cols-[1fr_350px] items-stretch gap-6 px-4 pb-4">
                <CharacterFields />
                <ChatPreview />
              </div>
            </>
          ) : (
            <FileInput />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
