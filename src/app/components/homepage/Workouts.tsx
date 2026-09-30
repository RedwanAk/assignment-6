import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export interface CardProps {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string;
}

const getCards = async (): Promise<CardProps[]> => {
  const res = await fetch('https://api.abcz.workers.dev/api/fitlog', {
    cache: 'no-store',
  });
  const data = await res.json();
  return data;
};

const Page = async () => {
  const data = await getCards();

  return (
    <div className="container mx-auto my-8 px-4 text-white">
      <h2 className="font-extrabold text-3xl tracking-tight uppercase">
        THE LIBRARY
      </h2>
      <p className="text-base-content/60 mt-1 mb-8">
        Twelve lifts covering every major muscle group.
      </p>

      {/* Grid Layout Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => (
          /* Link wrapped around each individual card */
          <Link
            key={item.id}
            href={`/Workout/${item.id}`}
            className="card bg-[#12131A] shadow-xl border border-base-300/10 overflow-hidden hover:border-gray-700 transition-colors"
          >
            {/* Card Banner Image */}
            <figure className="relative w-full h-48 sm:h-52">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </figure>

            {/* Card Content Body */}
            <div className="card-body p-5 justify-between">
              <div>
                {/* DaisyUI Badges */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.muscleGroups.map((group, index) => (
                    <span
                      key={index}
                      className="badge bg-[#C6FF00] text-black border-none font-black text-xs px-3 py-2 uppercase tracking-wider"
                    >
                      {group}
                    </span>
                  ))}
                </div>

                {/* Title & Subtitle */}
                <h3 className="card-title font-extrabold text-xl text-white uppercase tracking-wide">
                  {item.name}
                </h3>
                <p className="text-gray-400 text-sm mt-0.5">
                  {item.equipment}
                </p>
              </div>

              {/* Bottom Metadata Bar */}
              <div className="flex items-center gap-6 mt-6 pt-4 text-xs font-semibold text-gray-400 border-t border-gray-800/60">
                {/* Clock / Duration */}
                <div className="flex items-center gap-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6l4 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <span>{item.duration} min</span>
                </div>

                {/* Flame / Calories */}
                <div className="flex items-center gap-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
                    />
                  </svg>
                  <span>{item.caloriesBurned} kcal</span>
                </div>

                {/* Star / Rating */}
                <div className="flex items-center gap-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385c.116.488-.415.87-.832.618L12 17.712l-4.73 2.834c-.417.252-.948-.13-.832-.618l1.285-5.385a.563.563 0 0 0-.182-.557l-4.204-3.602c-.38-.325-.178-.948.32-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>
                  <span>{item.rating}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;