import React from "react";
import { ThemeProvider } from "./theme";
import { CardProvider } from "./card";

type Props = {
  children: React.ReactNode;
};

const Provider = ({ children }: Props) => {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="char-theme">
        <CardProvider>{children}</CardProvider>
      </ThemeProvider>
    </>
  );
};

export default Provider;
