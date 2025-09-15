import React from "react";
import { ProperIntroProps } from "@/types";
const ProperIntro: React.FC<ProperIntroProps> = ({ title, note }) => {
  return (
    <div className="w-full bg-white p-3 rounded-md bg-opacity-35 text-[#000]">
      <h1 className="font-bold text-2xl">{title}</h1>
      <p>{note}</p>
    </div>
  );
};

export default ProperIntro;
