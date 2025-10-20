"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import { useState } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Jayanta Mondal",
    role: "MERN Stack Web Development",
    content:
      "According to me this is the best course among MERN stack courses in Bangladesh. I personally follow Rabbil sir. His lectures seem easy to me and complex concepts become clear after repeating few times",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Frontend Developer",
    content:
      "Skill Swap completely transformed my career! I learned React and landed my dream job within 3 months. The community is incredibly supportive and the mentors are top-notch.",
    avatar:
 "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=80&h=80&fit=crop&crop=face",
    rating: 5,
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "UX Designer",
    content:
      "The design courses here are exceptional. I went from a complete beginner to designing for major clients. The hands-on projects and feedback really accelerated my learning.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    rating: 5,
  },
];

const avatarImages = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80&h=80&fit=crop&crop=face",
];

const Testimonials = () => {
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [mobileSwiperInstance, setMobileSwiperInstance] = useState<any>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Desktop View - Hidden on mobile */}
      <section className="hidden md:block min-h-screen bg-gradient-to-br from-emerald-400 via-green-500 to-teal-500 py-8 sm:py-8 md:py-16 px-4 sm:px-6 md:px-8 flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Left Section - Bengali Content */}
            <div className="text-white space-y-6 sm:space-y-8 order-2 lg:order-1">
              {/* Bengali Badge */}
              <div className="inline-block">
                <span className="text-sm sm:text-base font-medium bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                  Testimonials
                </span>
              </div>

              {/* Bengali Heading */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                What Our <br className="hidden sm:block" /> Students Say
              </h2>

              {/* Avatar Group */}
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-3">
                  {avatarImages.map((img, idx) => (
                    <div key={idx} className="relative">
                      <Image
                        src={img}
                        alt={`student ${idx + 1}`}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-emerald-400 object-cover"
                        width={48}
                        height={48}
                      />
                    </div>
                  ))}
                </div>
                <div className="bg-white text-emerald-600 font-bold text-lg w-12 h-12 rounded-full flex items-center justify-center border-2 border-emerald-400">
                  ৬+
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => swiperInstance?.slidePrev()}
                  className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 border border-white/30 hover:scale-105"
                  aria-label="পূর্ববর্তী টেস্টিমোনিয়াল"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => swiperInstance?.slideNext()}
                  className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 border border-white/30 hover:scale-105"
                  aria-label="পরবর্তী টেস্টিমোনিয়াল"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right Section - Testimonial Card */}
            <div className="relative order-1 lg:order-2">
              <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                onSwiper={setSwiperInstance}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                loop={true}
                className="testimonial-swiper"
              >
                {testimonials.map((testimonial) => (
                  <SwiperSlide key={testimonial.id}>
                    <div className="relative">
                      {/* Text Content Card - Separate White Card */}
                      <div className="bg-white rounded-2xl z-30 shadow-xl p-6 w-7/12 relative mt-16 sm:mt-20 lg:mt-24">
                        <div className="space-y-4">
                          {/* Name */}
                          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                            {testimonial.name}
                          </h3>

                          {/* Course/Role Title */}
                          <p className="text-emerald-600 font-semibold text-lg sm:text-xl">
                            {testimonial.role}
                          </p>

                          {/* Testimonial Text */}
                          <p className="text-gray-700 leading-relaxed text-base">
                            "{testimonial.content}"
                          </p>
                        </div>
                      </div>

                      {/* Profile Image Card - Separate Card Positioned Above */}
                      <div className="absolute -top-24 right-4 z-20">
                        <div className="bg-white rounded-2xl shadow-xl">
                          <div className="relative">
                            <Image
                              src={testimonial.avatar}
                              alt={testimonial.name}
                              className="w-80 h-80 rounded-xl"
                              width={160}
                              height={160}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile View - Hidden on desktop */}
      <section className="md:hidden bg-gradient-to-br from-emerald-400 to-emerald-500 py-8 px-4 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-2xl mx-auto">
          {/* Header Section */}
          <div className="pl-8 mb-6 text-left">
            <h2 className="text-2xl font-bold text-white mb-6">
              what our <br /> students say
            </h2>

            {/* Avatar Group */}
            <div className="flex  mb-8">
              <div className="flex -space-x-3 mr-4">
                {avatarImages.map((img, idx) => (
                  <div key={idx} className="relative">
                    <Image
                      src={img}
                      alt={`শিক্ষার্থী ${idx + 1}`}
                      className="w-8 h-8 rounded-full border-2 border-emerald-400 object-cover"
                      width={32}
                      height={32}
                    />
                  </div>
                ))}
              </div>
              <div className="bg-white text-emerald-600 font-bold text-sm w-8 h-8 rounded-full flex items-center justify-center border-2 border-emerald-400">
                ৬+
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="relative">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              onSwiper={setMobileSwiperInstance}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{
                clickable: true,
                el: '.mobile-pagination',
                bulletClass: 'w-2 h-2 rounded-full bg-white/40 mx-1 cursor-pointer transition-all duration-300',
                bulletActiveClass: 'bg-white w-4',
              }}
              loop={true}
              className="mb-4"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <div className="text-center relative">
                    {/* Profile Image - FULLY CIRCULAR with white background */}
                    <div className="flex justify-center mb-4">
                      <div className="relative z-20">
                        <div className="bg-white rounded-full shadow-lg p-2">
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-48 h-48 rounded-full object-cover"
                            width={192}
                            height={192}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Content Card - Extended higher for image overlap */}
                    <div className="bg-white rounded-2xl shadow-xl pt-16 pb-6 px-6 mx-2 -mt-12 relative z-10">
                      <div className="space-y-3 text-left">
                        {/* Name */}
                        <h3 className="text-xl font-bold text-gray-900">
                          {testimonial.name}
                        </h3>

                        {/* Course/Role Title */}
                        <p className="text-emerald-600 font-semibold text-sm">
                          {testimonial.role}
                        </p>

                        {/* Testimonial Text */}
                        <p className="text-gray-700 leading-relaxed text-sm">
                          "{testimonial.content}"
                        </p>
                        {/* Star Rating REMOVED */}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation Arrows - Positioned on right side */}
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 z-30 flex flex-col gap-3">
              <button
                onClick={() => mobileSwiperInstance?.slidePrev()}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-all duration-300 border border-gray-200 shadow-lg"
                aria-label="Previous Testimonial"
              >
                <svg
                  className="w-5 h-5 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={() => mobileSwiperInstance?.slideNext()}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-all duration-300 border border-gray-200 shadow-lg"
                aria-label="Next Testimonial"
              >
                <svg
                  className="w-5 h-5 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Pagination Dots - More dots (6-7) */}
            <div className="mobile-pagination flex justify-center space-x-2 mb-6">
              {/* Custom pagination dots will be injected here by Swiper */}
            </div>

          
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;