import React from 'react';
import { Grade, CalcMainProps } from '@/types';

const Calc_Main: React.FC<CalcMainProps> = ({
  Grade,
  courses,
  handleGradeChange,
  handleUnitsChange,
  removeCourse,
  addCourse,
  calculate
}) => {
  return (
    <main className="max-w-md mx-auto space-y-4">
      <div className="flex justify-between font-bold px-4 pt-[5rem]">
        <div className="w-1/4">Courses</div>
        <div className="w-1/4 pl-[2rem]">Grade</div>
        <div className="w-1/4 pl-[2rem]">Units</div>
        <div className="w-8"></div> 
      </div>

      <div className="space-y-3">
        {courses.map((course, index) => (
          <div key={index} className="flex items-center justify-between px-4 py-2">
            <div className="w-1/4">Course {index + 1}</div>
            
            <select
              value={course.grade}
              onChange={(e) => handleGradeChange(index, e.target.value as Grade)}
              className="w-1/4 p-1 border rounded"
            >
              {Object.keys(Grade).map((grade) => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>
            
            <select
              value={course.units}
              onChange={(e) => handleUnitsChange(index, Number(e.target.value))}
              className="w-1/4 p-1 border rounded"
            >
              {Array.from({ length: 9 }, (_, i) => i).map((unit) => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
            
            {courses.length > 1 && (
              <button
                onClick={() => removeCourse(index)}
                className="w-8 text-red-500 hover:text-red-700"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>

      <section className="flex justify-center mx-auto gap-4 pt-4">
<div>
        <button
          onClick={addCourse}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Course
        </button>
        </div>
        <button
          onClick={calculate}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Calculate
        </button>
      </section>
    </main>
  );
};

export default Calc_Main;