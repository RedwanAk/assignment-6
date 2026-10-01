'use client';
import { CardContext } from '@/context/CardContext';
import React, { useContext } from 'react';
import type { WorkoutCard } from '@/context/CardContext';
import { toast } from 'react-toastify';


const Savebutton = ({ data }: { data: WorkoutCard }) => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error('SaveButton must be used within CardProvider.');
  }
  const { PlanCards, Saved, addSavedCard } = context;
  const isSaved = Saved.some((card) => String(card.id) === String(data.id));
  const isPlanned = PlanCards.some((card) => String(card.id) === String(data.id));
  const isDisabled = isSaved || isPlanned;

  const handleSaveClick = () => {
    if (isDisabled) return;
    addSavedCard(data);
    toast.success(`You have added ${data.name} to your saved list`, {autoClose: 1000,});
  }
  
    return (
                        <button onClick={handleSaveClick} disabled={isDisabled} className="flex-1 bg-transparent border border-gray-700 hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50 text-gray-300 font-semibold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                            {isSaved
                              ? "Saved for later"
                              : isPlanned
                                ? "Already in today's plan"
                                : "Save for later"}
                        </button>
    );
};

export default Savebutton;