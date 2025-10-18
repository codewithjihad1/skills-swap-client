import React from "react";

export default function CourseVideos() {
  const videos = [
    {
      id: 1,
      title: "Introduction to React",
      url: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      id: 2,
      title: "Components in React",
      url: "https://www.w3schools.com/html/movie.mp4",
    },
    {
      id: 3,
      title: "State and Props",
      url: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Course Videos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded shadow p-4 flex flex-col items-center"
          >
            <video
              src={video.url}
              controls
              className="rounded w-full mb-4"
            ></video>
            <h2 className="text-lg font-semibold">{video.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
