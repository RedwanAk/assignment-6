"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useContext, useMemo, useState } from "react";
import { CardContext } from "@/context/CardContext";

const Page = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("Plan page must be used within CardProvider.");
  }

  const {
    PlanCards,
    Saved,
    removePlanCard,
    removeSavedCard,
    moveSavedCardToPlan,
    togglePlanCardDone,
  } = context;
  const [activeTab, setActiveTab] = useState<"today" | "saved">("today");
  const [sortBy, setSortBy] = useState("Duration");

  const workouts = activeTab === "today" ? PlanCards : Saved;

  const sortedWorkouts = useMemo(
    () =>
      [...workouts].sort((first, second) => {
        if (sortBy === "Name") {
          return (first.name || "").localeCompare(second.name || "");
        }
        if (sortBy === "Calories") {
          return (
            (second.caloriesBurned ?? Number.parseInt(second.calories ?? "0", 10)) -
            (first.caloriesBurned ?? Number.parseInt(first.calories ?? "0", 10))
          );
        }
        return (
          Number(second.duration ?? 0) - Number(first.duration ?? 0)
        );
      }),
    [sortBy, workouts],
  );

  const totalMinutes = PlanCards.reduce(
    (total, workout) => total + Number(workout.duration ?? 0),
    0,
  );

  const totalCalories = PlanCards.reduce(
    (total, workout) =>
      total +
      (workout.caloriesBurned ??
        Number.parseInt(workout.calories ?? "0", 10)),
    0,
  );

  return (
    <div className="min-h-screen bg-[#090b0e] text-white p-6 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div>
          <h1 className="text-3xl font-extrabold uppercase tracking-wide text-white">
            MY PLAN
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Stats Section */}
        <div className="bg-[#12151c] border border-gray-800/60 rounded-xl p-6 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-800/80">
          
          {/* Exercises */}
          <div className="flex flex-col justify-between pb-4 md:pb-0 md:pr-6">
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
              Exercises
            </p>
            <p className="text-3xl font-bold text-[#ccff00] mt-2">
              {PlanCards.length}
            </p>
          </div>

          {/* Minutes */}
          <div className="flex flex-col justify-between py-4 md:py-0 md:px-6">
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
              Minutes
            </p>
            <p className="text-3xl font-bold text-white mt-2">
              {totalMinutes}
            </p>
          </div>

          {/* Calories */}
          <div className="flex flex-col justify-between pt-4 md:pt-0 md:pl-6">
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
              Calories
            </p>
            <p className="text-3xl font-bold text-white mt-2">
              {totalCalories}
            </p>
          </div>

        </div>

        {/* Navigation & Controls Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Tabs */}
          <div className="bg-[#12151c] border border-gray-800/60 p-1 rounded-lg inline-flex max-w-max">
            <button
              onClick={() => setActiveTab("today")}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
                activeTab === "today"
                  ? "bg-[#1d222a] text-white shadow"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Today&apos;s Plan
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
                activeTab === "saved"
                  ? "bg-[#1d222a] text-white shadow"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Saved
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-400 text-xs font-medium">Sort By</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#12151c] border border-gray-800 text-white text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-gray-600 cursor-pointer"
            >
              <option value="Duration">Duration</option>
              <option value="Calories">Calories</option>
              <option value="Name">Name</option>
            </select>
          </div>

        </div>

        {/* Main Content Area */}
        {workouts.length === 0 ? (
          <div className="bg-[#12151c]/40 border border-dashed border-gray-800/80 rounded-xl p-16 flex flex-col items-center justify-center text-center min-h-80">
            <h2 className="text-xl font-extrabold uppercase tracking-wide text-white">
              NOTHING HERE YET
            </h2>
            <p className="text-gray-400 text-xs mt-2 max-w-sm">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="mt-6 bg-[#ccff00] hover:bg-[#b8e600] text-black font-semibold text-xs py-2.5 px-6 rounded-full transition-transform active:scale-95 shadow-lg shadow-[#ccff00]/10"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          <div className="w-full space-y-3">
            {sortedWorkouts.map((workout) => {
              const calories =
                workout.caloriesBurned ??
                workout.calories ??
                "0";
              const equipment = workout.equipment;
              const rating = workout.rating;

              return (
                <div
                  key={workout.id}
                  className="bg-[#12151c] border border-gray-800/70 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-gray-700 transition-colors"
                >
                  {/* Left: Thumbnail & Info */}
                  <div className="flex items-center space-x-4">
                    <div className="relative w-28 h-20 rounded-xl overflow-hidden bg-gray-900 shrink-0">
                      <Image
                        src={workout.image}
                        alt={workout.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-base font-extrabold uppercase tracking-wide text-white">
                        {workout.name}
                      </h3>
                      <p className="text-xs text-gray-400 font-medium">
                        {equipment}
                      </p>

                      {/* Stats row */}
                      <div className="flex items-center space-x-3 text-xs text-gray-300 pt-1">
                        {/* Duration */}
                        <div className="flex items-center space-x-1">
                          <svg className="w-3.5 h-3.5 text-[#ccff00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="9" strokeWidth="2" />
                            <path strokeWidth="2" strokeLinecap="round" d="M12 7v5l3 2" />
                          </svg>
                          <span>{workout.duration ?? 0} min</span>
                        </div>

                        {/* Calories */}
                        <div className="flex items-center space-x-1">
                          <svg className="w-3.5 h-3.5 text-[#ccff00]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 23c-4.97 0-9-4.03-9-9 0-3.53 2.04-6.85 4.5-9.1.39-.36 1-.08.98.45-.09 1.8.48 3.58 1.58 4.9 1.02-1.37 2.1-2.92 2.62-4.75.12-.41.68-.53.97-.22 2.18 2.29 4.35 5.23 4.35 8.72 0 4.97-4.03 9-9 9z"/>
                          </svg>
                          <span>{calories} kcal</span>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center space-x-1">
                          <svg className="w-3.5 h-3.5 text-[#ccff00]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z" />
                          </svg>
                          <span>{rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
                    <Link
                      href={`/Workout/${workout.id}`}
                      className="text-xs font-semibold px-4 py-2 rounded-full border border-gray-700 text-gray-200 hover:text-white hover:border-gray-500 transition-colors"
                    >
                      View Details
                    </Link>

                    {activeTab === "today" ? (
                      <>
                        <button
                          onClick={() => togglePlanCardDone(workout.id)}
                          className={`flex items-center space-x-1.5 text-xs font-bold px-4 py-2 rounded-full transition-transform active:scale-95 ${
                            workout.isDone
                              ? "bg-gray-800 text-gray-400"
                              : "bg-[#ccff00] hover:bg-[#b8e600] text-black shadow-md shadow-[#ccff00]/10"
                          }`}
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{workout.isDone ? "Done" : "Mark as Done"}</span>
                        </button>

                        <button
                          onClick={() => removePlanCard(workout.id)}
                          className="text-gray-500 hover:text-gray-300 p-1.5 rounded-lg transition-colors"
                          aria-label="Remove workout"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => moveSavedCardToPlan(workout)}
                          className="text-xs font-bold px-4 py-2 rounded-full bg-[#ccff00] hover:bg-[#b8e600] text-black transition-colors"
                        >
                          Add to today&apos;s plan
                        </button>
                        <button
                          onClick={() => removeSavedCard(workout.id)}
                          className="text-gray-500 hover:text-gray-300 p-1.5 rounded-lg transition-colors"
                          aria-label="Remove saved workout"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default Page;