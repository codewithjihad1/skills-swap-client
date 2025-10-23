"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { Pencil, Star, Handshake, CalendarDays, User, Edit3, Camera, MapPin } from "lucide-react";

export interface UserProfile {
  id: string;
  name: string;
  avatar?: string | null;
  image?: string | null;
  bio?: string;
  location?: string;
  rating?: number;
  completedExchanges?: number;
  memberSince?: string;
  status?: "online" | "offline";
  createdAt?: string;
  isActive?: boolean;
}

const SidebarCard = ({ title, value, icon }: { title: string; value: any; icon?: JSX.Element }) => (
  <div className="bg-white rounded-xl shadow-md p-5 flex items-center gap-4 hover:shadow-lg transition duration-300">
    {icon && <span className="text-green-600">{icon}</span>}
    <div>
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className="text-lg font-semibold text-gray-900">{value}</p>
    </div>
  </div>
);

const ProfilePage: React.FC = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<"name" | "bio" | "location" | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => { AOS.init({ duration: 600, easing: "ease-in-out", once: true }); }, []);

  useEffect(() => {
    if (!session?.user?.email) { setLoading(false); return; }
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/users/email/${session.user.email}`);
        const u = res.data;
        // calculate member since dynamically
        const memberSince = new Date(u.createdAt).toLocaleString("en-US", {
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: true,
});

        setUser({ ...u, memberSince, status: u.isOnline ? "online" : "offline" });
        setAvatarPreview(u.avatar || u.image || null);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch user profile");
      } finally { setLoading(false); }
    };
    fetchUser();
  }, [session?.user?.email]);

  const openEdit = (field: "name" | "bio" | "location") => { setEditingField(field); setEditValue((user as any)?.[field] ?? ""); };
  const cancelEdit = () => { setEditingField(null); setEditValue(""); };
  const saveEdit = async () => {
    if (!user || !editingField) return;
    try {
      const updated = { ...user, [editingField]: editValue };
      setUser(updated);
      setEditingField(null);
      await axios.put(`http://localhost:5000/api/users/${user.id}`, { [editingField]: editValue });
      alert("Updated successfully!");
    } catch (err) { console.error(err); alert("Update failed. Try again."); }
  };

  const onChooseFile = () => fileInputRef.current?.click();
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return alert("Please choose an image file.");
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      try {
        await axios.put(`http://localhost:5000/api/users/${user?.id}`, { avatar: base64 });
        const res = await axios.get(`http://localhost:5000/api/users/email/${session?.user?.email}`);
        const u = res.data;
        const memberSince = new Date(u.createdAt).toLocaleString("en-US", { month: "long", year: "numeric" });
        setUser({ ...u, memberSince, status: u.isOnline ? "online" : "offline" });
        setAvatarPreview(u.avatar || u.image || null);
        alert("Avatar updated successfully!");
      } catch (err) {
        console.error(err);
        alert("Failed to update avatar");
      }
    };
    reader.readAsDataURL(file);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error || !user) return <div className="min-h-screen flex items-center justify-center text-red-500">{error ?? "User not found"}</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Banner */}
        <div className="relative rounded-2xl h-56 shadow-lg overflow-hidden mb-28">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-400 opacity-95"></div>
          <div className="absolute -top-10 -left-10 w-24 h-24 rounded-full bg-green-300 opacity-50 animate-bounce-slow"></div>
          <div className="absolute top-5 right-16 w-16 h-16 rounded-full bg-green-200 opacity-40 animate-pulse-slow"></div>
          <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 320">
            <path fill="white" fillOpacity="0.3" d="M0,64L60,101.3C120,139,240,213,360,224C480,235,600,181,720,165.3C840,149,960,171,1080,192C1200,213,1320,235,1380,245.3L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
          </svg>
        </div>

        {/* Avatar */}
        <div className="relative -mt-32 flex justify-center">
          <div className="relative w-36 h-36">
            <Image src={avatarPreview || "/avatar.png"} alt={user.name || "User"} width={144} height={144} className="rounded-full border-4 border-white shadow-lg object-cover" />
            <button onClick={onChooseFile} className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow hover:scale-110 transition" title="Update avatar">
              <Camera className="w-5 h-5 text-gray-700" />
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            <div className={`absolute bottom-1 left-1 w-5 h-5 rounded-full border-2 border-white ${user.status === "online" ? "bg-green-500 animate-pulse shadow-md" : "bg-gray-400"}`} title={user.status === "online" ? "Active now" : "Offline"} />
          </div>
        </div>

        {/* Profile Info */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left / Main */}
          <div className="lg:col-span-2 space-y-6">
            {/* Name & Stats */}
            <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4" data-aos="fade-up">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <User className="w-6 h-6 text-green-600" />
                  {editingField === "name" ? (
                    <div className="flex gap-2 items-center">
                      <input value={editValue} onChange={e => setEditValue(e.target.value)} className="border px-3 py-1 rounded-lg" />
                      <button onClick={saveEdit} className="bg-green-600 text-white px-3 py-1 rounded-md">Save</button>
                      <button onClick={cancelEdit} className="text-gray-500 px-2">Cancel</button>
                    </div>
                  ) : (
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                  )}
                </div>
                {editingField !== "name" && <button onClick={() => openEdit("name")} className="p-2 rounded-md hover:bg-gray-100 transition"><Pencil className="w-5 h-5 text-gray-600" /></button>}
              </div>

              <div className="flex flex-wrap gap-4 mt-4">
                <div className="bg-green-50 rounded-lg shadow p-4 flex items-center gap-2 hover:shadow-lg transition">
                  <Handshake className="w-5 h-5 text-green-600" />
                  <span>{user.completedExchanges ?? 0} Trades</span>
                </div>
                <div className="bg-yellow-50 rounded-lg shadow p-4 flex items-center gap-2 hover:shadow-lg transition">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span>{user.rating ?? 0} Rating</span>
                </div>
                <div className={`bg-blue-50 rounded-lg shadow p-4 flex items-center gap-2 hover:shadow-lg transition ${user.isActive ? "animate-pulse" : ""}`}>
                  <CalendarDays className="w-5 h-5 text-blue-600" />
                  <span>Member since {user.memberSince}</span>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="bg-green-50 rounded-xl shadow p-6" data-aos="fade-up" data-aos-delay="100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-green-600" />
                  <h2 className="font-semibold text-gray-900">About Me</h2>
                </div>
                {editingField !== "bio" && <button onClick={() => openEdit("bio")} className="p-2 rounded-md hover:bg-gray-100 transition"><Pencil className="w-5 h-5 text-gray-600" /></button>}
              </div>
              <div className="mt-3">
                {editingField === "bio" ? (
                  <div className="flex flex-col gap-3">
                    <textarea value={editValue} onChange={e => setEditValue(e.target.value)} className="w-full p-3 border rounded-lg min-h-[100px]" />
                    <div className="flex gap-2">
                      <button onClick={saveEdit} className="bg-green-600 text-white px-4 py-1 rounded-lg">Save</button>
                      <button onClick={cancelEdit} className="px-4 py-1 border rounded-lg">Cancel</button>
                    </div>
                  </div>
                ) : <p className="text-gray-700">{user.bio ?? "No bio yet."}</p>}
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-xl shadow p-6 flex items-center justify-between" data-aos="fade-up" data-aos-delay="200">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-green-600" />
                {editingField === "location" ? (
                  <input value={editValue} onChange={e => setEditValue(e.target.value)} className="border px-3 py-1 rounded-lg" />
                ) : (
                  <p className="text-gray-700">{user.location ?? "No location set."}</p>
                )}
              </div>
              {editingField !== "location" ? (
                <button onClick={() => openEdit("location")} className="p-2 rounded-md hover:bg-gray-100 transition">
                  <Pencil className="w-5 h-5 text-gray-600" />
                </button>
              ) : (
                <div className="flex gap-2">
                  <button onClick={saveEdit} className="bg-green-600 text-white px-3 py-1 rounded-md">Save</button>
                  <button onClick={cancelEdit} className="px-3 py-1 border rounded-md">Cancel</button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="sticky top-24 space-y-6" data-aos="fade-left">
            <SidebarCard title="Member Since" value={user.memberSince} icon={<CalendarDays className="w-5 h-5 text-green-600" />} />
            <SidebarCard title="Completed Trades" value={user.completedExchanges ?? 0} icon={<Handshake className="w-5 h-5 text-green-600" />} />
            <SidebarCard title="Rating" value={user.rating ?? 0} icon={<Star className="w-5 h-5 text-green-600" />} />
            <SidebarCard title="Status" value={user.status === "online" ? "Active" : "Offline"} icon={<User className="w-5 h-5 text-green-600" />} />
          </div>
        </div>
      </div>

      {/* Extra animation classes */}
      <style jsx>{`
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .animate-bounce-slow { animation: bounce-slow 6s infinite; }
        @keyframes pulse-slow { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.8; } }
        .animate-pulse-slow { animation: pulse-slow 5s infinite; }
      `}</style>
    </div>
  );
};

export default ProfilePage;
