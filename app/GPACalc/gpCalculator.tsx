'use client';
import React, { useState } from 'react';
import { Grade, Course } from '@/types';
import Calc_Main from './calc_Main';
import Result from './result';

const GpCalculator: React.FC = () => {
  const grades: Record<Grade, number> = {
    A: 5,
    B: 4,
    C: 3,
    D: 2,
    E: 1,
    F: 0
  };
  const [courses, setCourses] = useState<Course[]>([{ grade: 'A', units: 1 }]);
  const [result, setResult] = useState<number | null>(null);
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

    setResult(totalUnits > 0 ? totalPoints / totalUnits : 0);
  };

  return (
    <div>
      <h1>Hey Come Track Your Progress!</h1>

      <Calc_Main
        Grade={grades}
        courses={courses}
        handleGradeChange={handleGradeChange}
        handleUnitsChange={handleUnitsChange}
        removeCourse={removeCourse}
        addCourse={addCourse}
        calculate={calculate}
      />

      <Result result={result} mode={'Gp'} />
    </div>
  );
};

export default GpCalculator;
