'use client'
import { createContext, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';

export interface WorkoutCard {
    id: string | number;
    name: string;
    image: string;
    muscleGroups?: string[];
    equipment?: string;
    difficulty?: string;
    duration?: number | string;
    calories?: string;
    caloriesBurned?: number;
    sets?: number;
    reps?: string;
    rating?: number;
    description?: string;
    instructions?: string | string[];
    isDone?: boolean;
}

interface CardContextValue {
    PlanCards: WorkoutCard[];
    setPlanCards: Dispatch<SetStateAction<WorkoutCard[]>>;
    Saved: WorkoutCard[];
    setSaved: Dispatch<SetStateAction<WorkoutCard[]>>;
    addPlanCard: (card: WorkoutCard) => void;
    addSavedCard: (card: WorkoutCard) => void;
    moveSavedCardToPlan: (card: WorkoutCard) => void;
    removePlanCard: (id: WorkoutCard["id"]) => void;
    removeSavedCard: (id: WorkoutCard["id"]) => void;
    togglePlanCardDone: (id: WorkoutCard["id"]) => void;
}

export const CardContext = createContext<CardContextValue | undefined>(undefined);

const CardProvider = ({children}: { children: ReactNode}) => {
    const [PlanCards , setPlanCards] = useState<WorkoutCard[]>([]);
    const [Saved, setSaved] = useState<WorkoutCard[]>([]);

    const addPlanCard = (card: WorkoutCard) => {
        if (Saved.some((item) => String(item.id) === String(card.id))) return;
        setPlanCards((cards) =>
            cards.some((item) => String(item.id) === String(card.id))
                ? cards
                : [...cards, card],
        );
    };
    const addSavedCard = (card: WorkoutCard) => {
        if (PlanCards.some((item) => String(item.id) === String(card.id))) return;
        setSaved((cards) =>
            cards.some((item) => String(item.id) === String(card.id))
                ? cards
                : [...cards, card],
        );
    };
    const moveSavedCardToPlan = (card: WorkoutCard) => {
        setSaved((cards) =>
            cards.filter((item) => String(item.id) !== String(card.id)),
        );
        setPlanCards((cards) =>
            cards.some((item) => String(item.id) === String(card.id))
                ? cards
                : [...cards, card],
        );
    };
    const removePlanCard = (id: WorkoutCard["id"]) => {
        setPlanCards((cards) =>
            cards.filter((card) => String(card.id) !== String(id)),
        );
    };
    const removeSavedCard = (id: WorkoutCard["id"]) => {
        setSaved((cards) =>
            cards.filter((card) => String(card.id) !== String(id)),
        );
    };
    const togglePlanCardDone = (id: WorkoutCard["id"]) => {
        setPlanCards((cards) =>
            cards.map((card) =>
                card.id === id ? { ...card, isDone: !card.isDone } : card,
            ),
        );
    };

    const sharedData = {
        PlanCards,
        setPlanCards,
        Saved,
        setSaved,
        addPlanCard,
        addSavedCard,
        moveSavedCardToPlan,
        removePlanCard,
        removeSavedCard,
        togglePlanCardDone,
    }


    return <CardContext.Provider value={sharedData}>{children}</CardContext.Provider>;
};

export default CardProvider;