import React from 'react'
import StatCov from './utils/statCov';

const Af_Header = () => {
  return (
    <>
    <div className='flex mx-auto text-center justify-center gap-6 flex-wrap'>
      <StatCov name={'over 100 Active Studnets'}/>
      <StatCov name={'over 100 Active Studnets'}/>
      <StatCov name={'over 100 Active Studnets'}/>
      <StatCov name={'over 100 Active Studnets'}/>
    </div>
    <section>
    About ScholarHub
ScholarHub is an advanced academic performance platform designed to optimize learning efficiency, reduce stress, and elevate student success through data-driven tools and structured resources.

Our Mission
To empower students with precision-focused academic solutions that enhance comprehension, retention, and performance—transforming effort into measurable results.

Core Solutions
✔ Personalized Study Analytics – AI-driven insights to identify and strengthen weak areas
✔ Streamlined Resource Hub – Centralized access to verified lecture notes, past questions, and key materials
✔ Smart Exam Preparation – Adaptive mock tests with performance tracking
✔ Collaborative Learning – Structured peer discussion forums moderated by top-performing students

Why ScholarHub Works
Proven Methodology: Built on cognitive science principles for efficient learning

Institutional Awareness: Designed to complement FUNAI’s academic structure

Performance Metrics: 92% of active users report improved grades within 8 weeks

The Team
Founded by academic technologists and education specialists with direct experience in Nigerian university systems. We bridge the gap between curriculum demands and student execution.

ScholarHub—Where Discipline Meets Smart Work.
    </section>
    </>
  )
}

export default Af_Header;
