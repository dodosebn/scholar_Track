'use client';
import React, { useState } from 'react';

type Grade = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
type Mode = 'gp' | 'cgpa';

interface Course {
  grade: Grade;
  units: number;
}

const GpCalculator: React.FC = () => {
  const grades: Record<Grade, number> = {
    A: 5,
    B: 4,
    C: 3,
    D: 2,
    E: 1,
    F: 0
  };

  const [mode, setMode] = useState<Mode>('gp');
  const [courses, setCourses] = useState<Course[]>([{ grade: 'A', units: 1 }]);
  const [result, setResult] = useState<number | null>(null);
  const [previousCredits, setPreviousCredits] = useState<number>(0);
  const [previousGpa, setPreviousGpa] = useState<number>(0);

  const handleGradeChange = (index: number, value: Grade) => {
    const updatedCourses = [...courses];
    updatedCourses[index].grade = value;
    setCourses(updatedCourses);
  };

  const handleUnitsChange = (index: number, value: number) => {
    const updatedCourses = [...courses];
    updatedCourses[index].units = value;
    setCourses(updatedCourses);
  };

  const addCourse = () => {
    setCourses([...courses, { grade: 'A', units: 1 }]);
  };

  const removeCourse = (index?: number) => {
    if (courses.length > 1) {
      if (index !== undefined) {
        setCourses(courses.filter((_, i) => i !== index));
      } else {
        setCourses(courses.slice(0, -1));
      }
    }
  };

  const calculate = () => {
    let totalPoints = 0;
    let totalUnits = 0;

    courses.forEach(course => {
      totalPoints += grades[course.grade] * course.units;
      totalUnits += course.units;
    });

    if (mode === 'cgpa' && previousCredits > 0) {
      const cumulativePoints = (previousGpa * previousCredits) + totalPoints;
      const cumulativeUnits = previousCredits + totalUnits;
      setResult(cumulativePoints / cumulativeUnits);
    } else {
      setResult(totalPoints / totalUnits);
    }
  };
 
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>GP / CGPA Calculator</h1>
      
      <section style={{ margin: '20px 0' }}>
        <label>
          <input 
            type="radio" 
            name="mode" 
            checked={mode === 'gp'} 
            onChange={() => setMode('gp')} 
          />
          GP
        </label>
        <label style={{ marginLeft: '20px' }}>
          <input 
            type="radio" 
            name="mode" 
            checked={mode === 'cgpa'} 
            onChange={() => setMode('cgpa')} 
          />
          CGPA
        </label>
      </section>

      {mode === 'cgpa' && (
        <section style={{ margin: '20px 0' }}>
          <h3>Previous Semester</h3>
          <div>
            <label>
              Previous Credits:
              <input 
                type="number" 
                value={previousCredits}
                onChange={(e) => setPreviousCredits(Number(e.target.value))}
                min="0"
                style={{ marginLeft: '10px' }}
              />
            </label>
          </div>
          <div>
            <label>
              Previous GPA:
              <input 
                type="number" 
                value={previousGpa}
                onChange={(e) => setPreviousGpa(Number(e.target.value))}
                min="0"
                max="5"
                step="0.01"
                style={{ marginLeft: '10px' }}
              />
            </label>
          </div>
        </section>
      )}

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
                {Object.keys(grades).map((grade) => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
            </div>
            <div style={{ width: '30%' }}>
              <select 
                value={course.units}
                onChange={(e) => handleUnitsChange(index, Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((unit) => (
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

      {result !== null && (
        <section style={{ marginTop: '20px', fontSize: '1.2em' }}>
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
    </div>
  );
};

export default GpCalculator;