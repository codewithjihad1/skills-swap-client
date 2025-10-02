import Image from "next/image";
import img from "../../../public/banner.jpeg";
import { GraduationCap, Medal } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
    return (
        <div className="bg-gradient-to-r from-[#FCFAEF] to-[#EBF6ED] dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-800 px-4 sm:px-6 md:px-12 lg:px-20 py-12 md:py-16 flex flex-col md:flex-row items-center justify-center md:justify-between gap-10">
            {/* Left Side -  */}
            <div className="relative w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[380px] md:h-[360px] lg:w-[420px] lg:h-[400px]">
                {/* Round Image */}
                <div className="w-full h-full overflow-hidden rounded-r-full rounded-b-full relative">
                    <Image
                        src={img}
                        alt="Instructor"
                        fill
                        className="object-cover mx-auto"
                        priority
                    />
                </div>

                {/* Top Left Icon */}
                <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 bg-teal-600 dark:bg-teal-500 text-white p-2 sm:p-3 rounded-lg shadow-lg dark:shadow-gray-700">
                    <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>

                {/* Bottom Right */}
                <div className="absolute bottom-14 -right-4 sm:bottom-20 sm:-right-6 bg-black dark:bg-gray-700 text-white p-3 sm:p-5 shadow-lg dark:shadow-gray-700 rounded">
                    <Medal className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>

                {/* Name */}
                <div className="absolute top-6 -right-6 sm:top-8 sm:-right-10 bg-white dark:bg-gray-800 px-3 py-2 sm:px-4 sm:py-2 rounded-lg shadow-md dark:shadow-gray-700">
                    <p className="font-semibold text-red-500 dark:text-red-400 text-sm sm:text-base">
                        Skill Swap
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                        Online instructor
                    </p>
                </div>
            </div>

            {/* Right Side - Text */}
            <div className="max-w-xl text-center md:text-left">
                <p className="italic text-gray-600 dark:text-gray-300 mb-2 text-sm sm:text-base md:text-lg">
                    Welcome to SkillShare.
                </p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-snug sm:leading-tight mb-4 border-l-4 border-red-500 dark:border-red-400 pl-3 sm:pl-4 text-gray-900 dark:text-white">
                    Your Gateway to <br /> Excellence in <br /> Online Learning
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-base sm:text-lg md:text-xl">
                    Embark on a journey of knowledge and skill enhancement{" "}
                    <br className="hidden sm:block" />
                    with Skill Boost.
                </p>
                <Button variant="gradient" size="lg">
                    Explore Academic Courses
                </Button>
            </div>
        </div>
    );
};

export default HeroSection;
