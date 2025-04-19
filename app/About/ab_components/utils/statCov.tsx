import React from 'react';

interface StatCovProps {
  name: string | number;
}

const StatCov: React.FC<StatCovProps> = ({ name }) => {
  return (
    <div className='bg-black text-white h-[15rem] w-[15rem] rounded-full flex items-center justify-center'>
      {name}
    </div>
  );
};

export default StatCov;