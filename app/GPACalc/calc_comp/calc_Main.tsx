// components/calc_Main.tsx
import React from 'react';
import { Course, Grade } from '@/types';

interface CalcMainProps {
  Grade: Record<Grade, number>; 
  courses: Course[];
  handleGradeChange: (index: number, value: Grade) => void;
  handleUnitsChange: (index: number, value: number) => void;
  removeCourse: (index?: number) => void;
  addCourse: () => void;
  calculate: () => void;
}

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
    <main>
      <section style={{ display: 'flex', marginBottom: '10px', fontWeight: 'bold' }}>
        <div style={{ width: '40%' }}>Courses</div>
        <div style={{ width: '30%' }}>Grade</div>
        <div style={{ width: '30%' }}>Credit Unit</div>
      </section>

      {courses.map((course, index) => (
        <section key={index} style={{ display: 'flex', marginBottom: '10px' }}>
          <div style={{ width: '40%' }}>Course {index + 1}:</div>
          <div style={{ width: '30%' }}>
            <select
              value={course.grade}
              onChange={(e) => handleGradeChange(index, e.target.value as Grade)}
            >
              {Object.keys(Grade).map((grade) => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>
          </div>
          <div style={{ width: '30%' }}>
            <select
              value={course.units}
              onChange={(e) => handleUnitsChange(index, Number(e.target.value))}
            >
              {Array.from({ length: 8 }, (_, i) => i + 1).map((unit) => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
          </div>
          {courses.length > 1 && (
            <button
              onClick={() => removeCourse(index)}
              style={{ marginLeft: '10px', color: 'red' }}
            >
              ×
            </button>
          )}
        </section>
      ))}

      <section style={{ margin: '20px 0' }}>
        <button
          onClick={addCourse}
          style={{ marginRight: '10px', padding: '5px 10px' }}
        >
          Add Course
        </button>
      </section>

      <button
        onClick={calculate}
        style={{
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Calculate
      </button>
    </main>
  );
};

export default Calc_Main;
