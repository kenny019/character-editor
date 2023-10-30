import { Character } from "@/lib/character";
import React, { createContext, useContext, useMemo, useState } from "react";

type CardProviderProps = {
  children: React.ReactNode;
};

type CardProviderState = {
  card?: Character;
  setCard?: (cardData: Character) => void;
};

const initialState: CardProviderState = {
  card: undefined,
  setCard: () => null,
};

const CardProviderContext = createContext<CardProviderState>(initialState);

export function CardProvider({ children, ...props }: CardProviderProps) {
  const [card, setCard] = useState<Character>();

  const value = useMemo(
    () => ({
      card,
      setCard,
    }),
    [card]
  );

  return (
    <CardProviderContext.Provider {...props} value={value}>
      {children}
    </CardProviderContext.Provider>
  );
}

export const useCard = () => {
  const context = useContext(CardProviderContext);

  if (context === undefined)
    throw new Error("useCard must be used within a CardProvider");

  return context;
};
