"use client";
import React from "react";
import { motion } from "framer-motion";
import ReviewEasyAdd from "@/utils/reviewEasyAdd";
import Image from "next/image";

const Reviews = () => {
  const RevLength = ReviewEasyAdd.length;

  const Numb = Math.floor(Math.random() * (RevLength - 3));

  return (
    <div className="container z-20 mx-auto flex flex-col lg:flex-row items-center justify-around gap-4 px-8 md:px-14">
      <div className="relative overflow-x-hidden">
        <div className="flex justify-between flex-wrap gap-6">
          {ReviewEasyAdd.slice(Numb, Numb + 3).map((itm, index) => (
            <div
              key={`${itm.id}-${index}`}
              className="flex-shrink-0 w-80 bg-[#fafafa] p-6 shadow-sm"
            >
              <div className="flex flex-col items-center text-center">
                {itm.img && (
                  <div className="mb-4">
                    <Image
                      src={itm.img}
                      alt={itm.name}
                      width={64}
                      height={64}
                      className="w-16 h-16 object-cover rounded-full border-2 border-white shadow-md"
                    />
                  </div>
                )}
                <blockquote className="text-gray-600 italic mb-4">
                  "{itm.comment}"
                </blockquote>
                <cite className="font-semibold text-gray-800 not-italic">
                  — {itm.name}
                </cite>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
