import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function RecommendedCourses() {
    return (
        <section>
            <div className='max-w-7xl px-6 py-16 mx-auto'>
                <h2 className='text-3xl sm:text-5xl font-extrabold text-gray-900 mb-10 text-center sm:text-left'>
                    Recommended <span className='text-primary'>Courses</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    {/* Card 1 */}
                    <div className="bg-white shadow-md rounded flex items-center gap-4 px-5 py-4 transform hover:-translate-y-1 transition-all duration-300">
                        <div>
                            <Image
                                src="/target.png"
                                alt="Git & GitHub"
                                width={50}
                                height={50}
                                className="object-contain"
                            />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-800 truncate">Git & GitHub</h3>
                            <p className="text-gray-500 text-sm">
                                Learn Git and work with others.
                            </p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white shadow-md rounded flex items-center gap-4 px-5 py-4 transform hover:-translate-y-1 transition-all duration-300">
                        <div>
                            <Image
                                src="/target.png"
                                alt="Flutter"
                                width={50}
                                height={50}
                                className="object-contain"
                            />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-800 truncate">Flutter</h3>
                            <p className="text-gray-500 text-sm">
                                Learn Flutter and build apps easily.
                            </p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white shadow-md rounded flex items-center gap-4 px-5 py-4 transform hover:-translate-y-1 transition-all duration-300">
                        <div>
                            <Image
                                src="/target.png"
                                alt="Python"
                                width={50}
                                height={50}
                                className="object-contain"
                            />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-800 truncate">Python</h3>
                            <p className="text-gray-500 text-sm">
                                Learn Python and apply in projects.
                            </p>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-white shadow-md rounded flex items-center gap-4 px-5 py-4 transform hover:-translate-y-1 transition-all duration-300">
                        <div>
                            <Image
                                src="/target.png"
                                alt="JavaScript"
                                width={50}
                                height={50}
                                className="object-contain"
                            />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-800 truncate">JavaScript</h3>
                            <p className="text-gray-500 text-sm">
                                Learn JavaScript and build web apps.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
                <div className="hidden lg:flex flex-col justify-center space-y-6 bg-[#F4F8F6] p-10 transform hover:-translate-y-1 transition-all duration-300 rounded shadow-sm">
                    <div className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm">
                        <div className="bg-[#E4F6F1] text-primary font-bold w-10 h-10 flex items-center justify-center rounded-full">
                            01
                        </div>
                        <p className="text-gray-800 font-medium text-lg">
                            Industry Standard Learning
                        </p>
                    </div>

                    <div className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm">
                        <div className="bg-[#E4F6F1] text-primary font-bold w-10 h-10 flex items-center justify-center rounded-full">
                            02
                        </div>
                        <p className="text-gray-800 font-medium text-lg">
                            Career-Oriented Guidance
                        </p>
                    </div>

                    <div className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm">
                        <div className="bg-[#E4F6F1] text-primary font-bold w-10 h-10 flex items-center justify-center rounded-full">
                            03
                        </div>
                        <p className="text-gray-800 font-medium text-lg">
                            Informative Learning Materials
                        </p>
                    </div>

                    <div className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm">
                        <div className="bg-[#E4F6F1] text-primary font-bold w-10 h-10 flex items-center justify-center rounded-full">
                            04
                        </div>
                        <p className="text-gray-800 font-medium text-lg">
                            Community Contribution & Support
                        </p>
                    </div>

                    {/* Added extra points to balance both sides */}
                    <div className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm">
                        <div className="bg-[#E4F6F1] text-primary font-bold w-10 h-10 flex items-center justify-center rounded-full">
                            05
                        </div>
                        <p className="text-gray-800 font-medium text-lg">
                            Hands-on Practical Projects
                        </p>
                    </div>


                </div>



                <div className="flex flex-col justify-center space-y-6  lg:text-left">
                    <span className="text-primary font-semibold uppercase tracking-wide">
                        Learn Emerging Skills
                    </span>

                    <h2 className="text-3xl font-bold text-gray-900 leading-snug">
                        Learn and Grow Your Skills with Us
                    </h2>

                    <p className=" leading-relaxed">
                        Skill Swap is a modern learning platform built to help you grow personally and professionally. Whether you’re starting your journey or advancing your career, it offers structured and practical paths in development, design, AI, and more — making complex topics easy to learn and apply.
                    </p>

                    <p className=" leading-relaxed">
                        What makes Skill Swap unique is its real-world approach. You’ll learn by doing — through hands-on projects and practical tasks that reflect real professional experiences, helping you think critically and build true confidence in your skills.
                    </p>

                    <p className=" leading-relaxed">
                        At Skill Swap, we believe learning is stronger together. Our vibrant community of learners, mentors, and professionals helps you stay inspired and grow through collaboration, shared ideas, and meaningful feedback.
                    </p>

                    <p className=" leading-relaxed">
                        With Skill Swap, you don’t just learn — you transform. Join us today to upgrade your skills, build real experience, and take confident steps toward your dream career in the ever-evolving digital world.
                    </p>

                    <div className="flex  lg:justify-start">
                        <Link
                            href="/courses"
                            className="bg-secondary text-white font-semibold px-4 py-2 rounded-md shadow hover:bg-primary transition duration-300 text-sm"
                        >
                            Start Learning
                        </Link>
                    </div>
                </div>

            </div>


        </section>

    )
}
