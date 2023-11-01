import { GitHubLogoIcon } from "@radix-ui/react-icons";
import ThemeButton from "./themebutton";

const Header = () => {
  return (
    <div className="flex items-center justify-between rounded-md border px-6 py-4 shadow-sm">
      <p className="text-xl font-semibold">Character Editor</p>
      <div className="flex space-x-4 text-muted-foreground">
        <a href="https://github.com/kenny019/character-editor" target="_blank">
          <GitHubLogoIcon className="h-4 w-4 cursor-pointer hover:text-primary" />
        </a>
        <ThemeButton className="h-4 w-4 cursor-pointer transition-all hover:rotate-180 hover:text-primary" />
      </div>
    </div>
  );
};

export default Header;
