import React from "react";
import Image from "next/image";
import movingShii from "@/public/images/yohhhh.gif";
import Divider from "@/utils/divider";

const Header = () => {
  return (
    <div>
      <section className="flex flex-col md:flex-row gap-8 md:gap-12 my-12">
        <div className="flex justify-center flex-1">
          <Image
            src={movingShii}
            alt="Student using ScholarHub"
            className="rounded-lg shadow-xl w-[30rem]"
            priority
          />
        </div>

        <Divider />

        <div className="flex-1">
          <p className="lg:leading-[2.4rem] text-gray-800 text-lg">
            ScholarHub is an all-in-one academic productivity platform built to
            help students work smarter, not harder. It simplifies campus life by
            providing smart tools to calculate CGPA, organize daily tasks with a
            dynamic to-do list, and prepare effectively with access to past
            questions. Beyond that, ScholarHub keeps students informed with
            timely academic news and insights, both on and off campus,
            empowering them to stay ahead and achieve their goals.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Header;
