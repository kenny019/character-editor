import { useTheme } from "@/providers/theme";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

type Props = {
  className?: string;
};
const ThemeButton = ({ className }: Props) => {
  const { theme, setTheme } = useTheme();
  return (
    <>
      {theme === "dark" ? (
        <SunIcon onClick={() => setTheme("light")} className={className} />
      ) : (
        <MoonIcon onClick={() => setTheme("dark")} className={className} />
      )}
    </>
  );
};

export default ThemeButton;
