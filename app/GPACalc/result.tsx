import React from 'react';
import { ResultProps } from '@/types';


const Result: React.FC<ResultProps> = ({ result, mode}) => {
  return (
<React.Fragment>
{<div>
    {result !== null && (
    <section className='text-center pt-5'>
        <h2>
        Result: {mode.toUpperCase()} = {result.toFixed(2)}
        </h2>
        <div>
        {result >= 4.5 && 'First Class!'}
        {result >= 3.5 && result < 4.5 && 'Second Class Upper!'}
        {result >= 2.5 && result < 3.5 && 'Second Class Lower!'}
        {result >= 1.5 && result < 2.5 && 'Third Class!'}
        {result < 1.5 && 'You can do better!'}
        </div>
    </section>
    )}
</div>}
    </React.Fragment>
);
};

export default Result;