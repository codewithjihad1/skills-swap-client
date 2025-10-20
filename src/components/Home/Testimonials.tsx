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
  course: string;
  content: string;
  avatar: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Raj Kumar",
    role: "MERN Stack Web Development",
    course: "Full Stack Development",
    content:
      "This course is very good, I especially like the daily routines and the videos of these routines. And I love the presentation of this video",
    avatar: "/Raj.jpg",
    rating: 5,
  },
  {
    id: 2,
    name: "Sourav",
    role: "UI/UX Design",
    course: "Product Design Masterclass",
    content:
      "Amazing course! Every video is presented in a very simple way. I can now design professionally with Figma.",
    avatar: "/shourav.jpg",
    rating: 5,
  },
  {
    id: 3,
    name: "Jihad",
    role: "Mobile App Development",
    course: "React Native & Flutter",
    content:
      "Learning experience was amazing! The instructor's teaching style is very clear. I built 3 apps during this course and got my first client.",
    avatar: "/jihad.jpg",
    rating: 5,
  },
  {
    id: 4,
    name: "Ihsan",
    role: "Digital Marketing",
    course: "SEO & Content Marketing",
    content:
      "Best online course platform in Bangladesh! I learned digital marketing and now I am freelancing and earning well.",
    avatar: "/ishan.jpeg",
    rating: 5,
  },
  {
    id: 5,
    name: "Raj Kumar",
    role: "Python & Data Science",
    course: "Data Analytics Bootcamp",
    content:
      "The practical approach of teaching made complex topics easy to understand. The community support is excellent. Highly recommended!",
    avatar: "/Raj.jpg",
    rating: 5,
  },
  {
    id: 6,
    name: "Sourav",
    role: "Graphic Design",
    course: "Adobe Creative Suite",
    content:
      "I was a beginner, now a professional designer! Both the course content quality and support system are excellent.",
    avatar: "/shourav.jpg",
    rating: 5,
  },
];

const avatarImages = [
  "/Raj.jpg",
  "/shourav.jpg",
  "/jihad.jpg",
  "/ishan.jpeg",
  "/Raj.jpg",
  "/shourav.jpg",
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
      <section className="hidden md:block min-h-screen bg-gradient-to-br from-primary via-primary to-secondary py-8 sm:py-8 md:py-16 px-4 sm:px-6 md:px-8 flex items-center relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Left Section - Content */}
            <div className="text-white space-y-6 sm:space-y-8 order-2 lg:order-1">
              {/* Badge */}
              <div className="inline-block">
                <span className="text-sm sm:text-base font-medium bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                  Testimonials
                </span>
              </div>

              {/* Heading */}
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
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-amber-400 object-cover"
                        width={48}
                        height={48}
                      />
                    </div>
                  ))}
                </div>
                <div className="bg-white text-emerald-600 font-bold text-lg w-12 h-12 rounded-full flex items-center justify-center border-2 border-emerald-400">
                  6+
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => swiperInstance?.slidePrev()}
                  className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 border border-white/30 hover:scale-105"
                  aria-label="Previous Testimonial"
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
                  aria-label="Next Testimonial"
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
      <section className="md:hidden bg-gradient-to-br from-emerald-400 to-emerald-500 py-8 px-4 flex items-center justify-center relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <div className="w-full max-w-2xl mx-auto relative z-10">
          {/* Header Section */}
          <div className="pl-8 mb-6 text-left">
            <h2 className="text-2xl font-bold text-white mb-6">
              What Our <br /> Students Say
            </h2>

            {/* Avatar Group */}
            <div className="flex mb-8">
              <div className="flex -space-x-3 mr-4">
                {avatarImages.map((img, idx) => (
                  <div key={idx} className="relative">
                    <Image
                      src={img}
                      alt={`Student ${idx + 1}`}
                      className="w-8 h-8 rounded-full border-2 border-emerald-400 object-cover"
                      width={32}
                      height={32}
                    />
                  </div>
                ))}
              </div>
              <div className="bg-white text-emerald-600 font-bold text-sm w-8 h-8 rounded-full flex items-center justify-center border-2 border-emerald-400">
                6+
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
                el: ".mobile-pagination",
                bulletClass:
                  "w-2 h-2 rounded-full bg-white/40 mx-1 cursor-pointer transition-all duration-300",
                bulletActiveClass: "bg-white w-4",
              }}
              loop={true}
              className="mb-4"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <div className="text-center relative">
                    {/* Profile Image - FULLY CIRCULAR with white background */}
                    <div className="flex justify-center mb-4">
                      <div className="relative -bottom-12 z-20">
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
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation Arrows - Moved to bottom */}
            <div className="flex justify-center gap-4 mt-6 mb-4">
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

            {/* Pagination Dots */}
            <div className="mobile-pagination flex justify-center space-x-2 mb-6"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;