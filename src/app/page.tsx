import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Banner from './assets/banner.png';
import Workouts from './components/homepage/Workouts';

const HomePage = () => {
  return (
    <>
      <div className="container mx-auto m-2 flex justify-between rounded-3xl bg-[#15171D] p-10">
        <div>
          <p className="mb-4 mt-10 text-sm text-[#8FD94B]">WORKOUT LIBRARY</p>
          <h2 className="text-4xl font-bold">
            TRAIN WITH INTENT. LOG <br />
            EVERY SET.
          </h2>
          <p className="my-4 text-[#9CA3AF]">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it{' '}
            <br />
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <Link
            href="#workouts"
            className="btn rounded-xl bg-[#C2F800] text-black"
          >
            BROWSE WORKOUTS
          </Link>
        </div>

        <Image src={Banner} alt="Banner" />
      </div>

      {/* Changed <Workout/> to <Workouts/> to match the import */}
      <Workouts />
    </>
  );
};

export default HomePage;