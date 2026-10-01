'use client';
import { CardContext } from '@/context/CardContext';
import React, { useContext } from 'react';
import type { WorkoutCard } from '@/context/CardContext';
import { toast } from 'react-toastify';


const Planbutton = ({ data }: { data: WorkoutCard }) => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error('Planbutton must be used within CardProvider.');
  }
  const { PlanCards, Saved, addPlanCard } = context;
  const isAdded = PlanCards.some((card) => String(card.id) === String(data.id));
  const isSaved = Saved.some((card) => String(card.id) === String(data.id));
  const isDisabled = isAdded || isSaved;

  const handlePlanClick = () => {
    if (isDisabled) return;
    addPlanCard(data);
    toast.success(`You have added ${data.name} to your plan`, {autoClose: 1000,});
  }
  
    return (
                        <button onClick={handlePlanClick} disabled={isDisabled} className="flex-1 bg-[#ccff00] hover:bg-[#b3e600] disabled:cursor-not-allowed disabled:opacity-50 text-black font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {isAdded
                              ? "Added to today's plan"
                              : isSaved
                                ? "Already saved"
                                : "Add to today's plan"}
                        </button>
    );
};

export default Planbutton;