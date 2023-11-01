import { Character } from "@/lib/character";
import React, { createContext, useContext, useMemo, useState } from "react";

type CardProviderProps = {
  children: React.ReactNode;
};

type CardProviderState = {
  card?: Character;
  setCard?: (cardData?: Character) => void;
  tokens?: string[];
};

const initialState: CardProviderState = {
  card: undefined,
  setCard: () => null,
  tokens: [],
};

const CardProviderContext = createContext<CardProviderState>(initialState);

export function CardProvider({ children, ...props }: CardProviderProps) {
  const [card, setCard] = useState<Character>();

  const tokens = useMemo(
    () => card?.tokens(),
    [
      card?.characterData.data.description,
      card?.characterData.data.mes_example,
      card?.characterData.data.first_mes,
    ]
  );

  const value = useMemo(
    () => ({
      card,
      setCard,
      tokens,
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
