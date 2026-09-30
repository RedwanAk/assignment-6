import Image from 'next/image';
import React from 'react';

// Interface for Card data based on the UI design
interface CardProps {
    id: string | number;
    name: string;
    description: string;
    image: string;
    muscleGroups?: string[];
    equipment?: string;
    difficulty?: string;
    sets?: number;
    reps?: string;
    duration?: string;
    calories?: string;
    rating?: number;
    instructions?: string[];
}

interface WorkoutPageProps {
    params: Promise<{
        id: string;
    }>;
}

const getCards = async (): Promise<CardProps[]> => {
    const res = await fetch('https://api.abcz.workers.dev/api/fitlog', {
        cache: 'no-store',
    });
    const data = await res.json();
    return data;
};

const Page = async ({ params }: WorkoutPageProps) => {
    const { id } = await params;
    const data = await getCards();
    const workout = data.find((item: CardProps) => String(item.id) === id) as CardProps;

    if (!workout) {
        return <div className="text-white text-center py-20">Workout not found.</div>;
    }

    return (
        <div className="min-h-screen bg-[#0d0f12] text-white p-4 md:p-10 flex items-center justify-center font-sans">
            <div className="container mx-auto bg-[#12161c] border border-gray-800 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-8 shadow-2xl">

                {/* Left Side: Image */}
                <div className="relative w-full md:w-1/2 aspect-square rounded-2xl overflow-hidden bg-gray-900">
                    <Image
                        src={workout.image}
                        alt={workout.name || 'Workout image'}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Right Side: Details */}
                <div className="w-full md:w-1/2 flex flex-col justify-between space-y-6">
                    <div>
                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl font-extrabold uppercase tracking-wide text-white">
                            {workout.name}
                        </h1>

                        {/* Description */}
                        <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                            {workout.description}
                        </p>

                        {/* Muscle Group Badges */}
                        {workout.muscleGroups && workout.muscleGroups.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                                {workout.muscleGroups.map((group, index) => (
                                    <span
                                        key={index}
                                        className="bg-[#ccff00] text-black font-semibold text-xs px-3 py-1 rounded-full uppercase"
                                    >
                                        {group}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Workout Stats Table */}
                        <div className="mt-6 bg-[#181e26] rounded-xl p-4 divide-y divide-gray-800/60 text-xs">
                            <div className="flex justify-between py-2.5">
                                <span className="text-gray-400 font-medium uppercase tracking-wider">Equipment</span>
                                <span className="text-gray-200 font-semibold">{workout.equipment || 'Barbell, Bench'}</span>
                            </div>
                            <div className="flex justify-between py-2.5">
                                <span className="text-gray-400 font-medium uppercase tracking-wider">Difficulty</span>
                                <span className="text-gray-200 font-semibold">{workout.difficulty || 'Intermediate'}</span>
                            </div>
                            <div className="flex justify-between py-2.5">
                                <span className="text-gray-400 font-medium uppercase tracking-wider">Sets</span>
                                <span className="text-gray-200 font-semibold">{workout.sets ?? 4}</span>
                            </div>
                            <div className="flex justify-between py-2.5">
                                <span className="text-gray-400 font-medium uppercase tracking-wider">Reps</span>
                                <span className="text-gray-200 font-semibold">{workout.reps || '6-8'}</span>
                            </div>
                            <div className="flex justify-between py-2.5">
                                <span className="text-gray-400 font-medium uppercase tracking-wider">Duration</span>
                                <span className="text-gray-200 font-semibold">{workout.duration || '25 min'}</span>
                            </div>
                            <div className="flex justify-between py-2.5">
                                <span className="text-gray-400 font-medium uppercase tracking-wider">Calories</span>
                                <span className="text-gray-200 font-semibold">{workout.calories || '180 kcal'}</span>
                            </div>
                            <div className="flex justify-between py-2.5">
                                <span className="text-gray-400 font-medium uppercase tracking-wider">Rating</span>
                                <span className="text-gray-200 font-semibold">{workout.rating ?? 4.8}</span>
                            </div>
                        </div>

                        {/* Instructions */}
                        <div className="mt-6">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
                                Instructions
                            </h3>
                            {workout.instructions && workout.instructions.length > 0 ? (
                                <ol className="list-decimal list-inside text-gray-400 text-xs space-y-2 leading-relaxed">
                                    {workout.instructions.map((step, idx) => (
                                        <li key={idx}>{step}</li>
                                    ))}
                                </ol>
                            ) : (
                                <ol className="list-decimal list-inside text-gray-400 text-xs space-y-2 leading-relaxed">
                                    <li>Lie on the bench with eyes under the bar and feet planted.</li>
                                    <li>Unrack with locked elbows and lower the bar to mid-chest.</li>
                                    <li>Press up in a slight arc until elbows lock without bouncing.</li>
                                    <li>Keep shoulder blades pinched and a natural arch in the back.</li>
                                </ol>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 pt-4">
                        <button className="flex-1 bg-[#ccff00] hover:bg-[#b3e600] text-black font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Add to today&apos;s plan
                        </button>
                        <button className="flex-1 bg-transparent border border-gray-700 hover:bg-gray-800 text-gray-300 font-semibold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                            Save for later
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Page;