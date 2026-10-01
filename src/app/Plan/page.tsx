"use client";

import Link from "next/link";
import React, { useState } from "react";

const Page = () => {
  const [activeTab, setActiveTab] = useState("today"); // 'today' | 'saved'
  const [sortBy, setSortBy] = useState("Duration");

  return (
    <div className="min-h-screen bg-[#0d0f12] text-white p-6 md:p-10 font-sans">
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
        <div className="bg-[#13161c] border border-gray-800 rounded-xl p-6 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-800">
          
          {/* Exercises */}
          <div className="flex flex-col justify-between pb-4 md:pb-0 md:pr-6">
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
              Exercises
            </p>
            <p className="text-3xl font-bold text-[#ccff00] mt-2">
              2
            </p>
          </div>

          {/* Minutes */}
          <div className="flex flex-col justify-between py-4 md:py-0 md:px-6">
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
              Minutes
            </p>
            <p className="text-3xl font-bold text-white mt-2">
              23
            </p>
          </div>

          {/* Calories */}
          <div className="flex flex-col justify-between pt-4 md:pt-0 md:pl-6">
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
              Calories
            </p>
            <p className="text-3xl font-bold text-white mt-2">
              190
            </p>
          </div>

        </div>

        {/* Navigation & Controls Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Tabs */}
          <div className="bg-[#13161c] border border-gray-800 p-1 rounded-lg inline-flex max-w-max">
            <button
              onClick={() => setActiveTab("today")}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
                activeTab === "today"
                  ? "bg-[#1f242d] text-white shadow"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Today&apos;s Plan
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
                activeTab === "saved"
                  ? "bg-[#1f242d] text-white shadow"
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
              className="bg-[#13161c] border border-gray-800 text-white text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-gray-600 cursor-pointer"
            >
              <option value="Duration">Duration</option>
              <option value="Calories">Calories</option>
              <option value="Name">Name</option>
            </select>
          </div>

        </div>

        {/* Main Content / Empty State Area */}
        <div className="bg-[#13161c]/40 border border-dashed border-gray-800/80 rounded-xl p-16 flex flex-col items-center justify-center text-center min-h-[320px]">
          <h2 className="text-xl font-extrabold uppercase tracking-wide text-white">
            NOTHING HERE YET
          </h2>
          <p className="text-gray-400 text-xs mt-2 max-w-sm">
            Browse the library and add a lift to get today moving.
          </p>
          <Link href="/" className="mt-6 bg-[#ccff00] hover:bg-[#b8e600] text-black font-semibold text-xs py-2.5 px-6 rounded-full transition-transform active:scale-95 shadow-lg shadow-[#ccff00]/10">
            Go to workouts
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Page;