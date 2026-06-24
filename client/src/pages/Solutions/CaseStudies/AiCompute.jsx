import React from 'react'
import { FaHardHat, FaHourglassHalf, FaTools } from 'react-icons/fa'

export default function AiCompute() {
  return (
    <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center px-6 py-20 text-center">

      <div className="max-w-2xl">

        {/* Funny Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          🚧 This Page is Under Construction 🚧
        </h1>

        <p className="mt-4 text-gray-300 text-lg md:text-xl">
          Chill bro... I'm building it right now.  
          <br /> 
          <span className="text-blue-400 font-semibold">
            Good things take time (especially when you’re the only developer 😭).
          </span>
        </p>

        <p className="text-gray-500 text-sm mt-10">
          Come back later — I promise I won’t disappoint (hopefully).
        </p>
      </div>
    </div>
  )
}
