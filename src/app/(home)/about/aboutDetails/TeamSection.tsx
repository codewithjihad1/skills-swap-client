'use client';

import { motion } from 'framer-motion';
import { 
  Users, 
  Github,
  Linkedin,
  Mail,
  Sparkles,
  Award,
  Target,
  HeartHandshake
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const TeamSection = () => {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: "MD JIHAD HOSSAIN",
      role: "Full-Stack Developer & Team Leader",
      bio: "Visionary leader with expertise in modern web technologies. Passionate about creating impactful digital experiences.",
      image: "/jihad.jpg",
      social: {
        twitter: "#",
        linkedin: "https://www.linkedin.com/in/codewithjihad1/",
        github: "https://github.com/codewithjihad1",
        email: "mdjihadhossain793@gmail.com"
      },
      skills: ["Leadership", "React", "Node.js", "Next.js", "TypeScript"],
      color: "from-green-600 to-emerald-600"
    },
    {
      id: 2,
      name: "Raj Kumar Sarkar",
      role: "Full-Stack Developer",
      bio: "Specializes in scalable platforms and UI/UX. Brings technical excellence to create seamless user experiences.",
      image: "/Raj.jpg",
      social: {
        linkedin: "https://www.linkedin.com/in/rajkumar-sarkar/",
        github: "https://github.com/Raj3460",
        email: "sarkarrajkumar3460@gmail.com"
      },
      skills: ["React", "Node.js", "Next.js", "JavaScript", "Database"],
      color: "from-emerald-600 to-teal-600"
    },
    {
      id: 3,
      name: "Sourav Mitra",
      role: "Full-Stack Developer",
      bio: "Creates intuitive experiences with human-centered design principles. Focuses on accessibility and usability.",
      image: "/shourav.jpg",
      social: {
        linkedin: "https://www.linkedin.com/in/dev-sourav-mitra/",
        github: "https://github.com/souravMitra02/",
        email: "inf.souravmitra@gmail.com"
      },
      skills: ["React", "Next.js", "JavaScript", "TypeScript", "UI/UX"],
      color: "from-teal-600 to-cyan-600"
    },
    {
      id: 4,
      name: "Ihsan Uddin Khan",
      role: "Full-Stack Developer",
      bio: "Builds engaged communities with passion. Connects people and fosters meaningful interactions through technology.",
      image: "/ishan.jpeg",
      social: {
        linkedin: "https://www.linkedin.com/in/ihsanuddin-dev/",
        github: "https://github.com/ihsanuddin637/",
        email: "ihsanuddin.dev@gmail.com"
      },
      skills: ["React", "Node.js", "Next.js", "JavaScript", "Community"],
      color: "from-lime-600 to-green-600"
    }
  ];

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-950">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div 
            className="inline-flex items-center justify-center mb-4 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-gray-200 dark:border-gray-700"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-5 h-5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full mr-2 flex items-center justify-center">
              <Users className="w-3 h-3 text-white" />
            </div>
            <span className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider">Our Team</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white"
          >
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Team</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Passionate developers creating exceptional digital experiences
          </motion.p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
              onMouseEnter={() => setHoveredMember(member.id)}
              onMouseLeave={() => setHoveredMember(null)}
            >
              {/* Main Card - Compact Version */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md transition-all duration-300 group-hover:shadow-lg h-full flex flex-col border border-gray-200 dark:border-gray-700 group-hover:border-green-500/30">
                {/* Circular Image Container - Modified to take full width */}
                <div className="relative flex justify-center mb-4">
                  <div className="relative w-full aspect-square max-w-[120px] mx-auto">
                    {/* Outer gradient circle */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${member.color} rounded-full blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-300`}></div>
                    
                    {/* Image container - Full circular image */}
                    <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white dark:border-gray-800 shadow-md">
                      <Image
                        src={member.image}
                        width={150}
                        height={150}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-sm">
                      <Sparkles className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col text-center">
                  <h3 className="text-sm font-bold mb-1 text-gray-900 dark:text-white">{member.name}</h3>
                  <p className="text-green-600 dark:text-green-400 text-xs font-medium mb-2">{member.role}</p>
                  
                  {/* Skills - Only show on hover */}
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: hoveredMember === member.id ? 1 : 0,
                      height: hoveredMember === member.id ? 'auto' : 0
                    }}
                    transition={{ duration: 0.2 }}
                    className="mb-2 overflow-hidden"
                  >
                    <div className="flex flex-wrap justify-center gap-1">
                      {member.skills.slice(0, 3).map((skill, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Social Links - Only show on hover */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredMember === member.id ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex justify-center space-x-2 mt-auto pt-2"
                  >
                    {[
                      { icon: Linkedin, href: member.social.linkedin },
                      { icon: Github, href: member.social.github },
                      { icon: Mail, href: `mailto:${member.social.email}` }
                    ].map((social, i) => (
                      <motion.a
                        key={i}
                        href={social.href}
                        whileHover={{ scale: 1.2 }}
                        className="w-7 h-7 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center transition-colors duration-200 hover:bg-green-500/20"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <social.icon className="w-3 h-3 text-gray-700 dark:text-gray-300" />
                      </motion.a>
                    ))}
                  </motion.div>
                </div>
              </div>

              {/* Hover Details Panel - Appears above card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{
                  opacity: hoveredMember === member.id ? 1 : 0,
                  scale: hoveredMember === member.id ? 1 : 0.8,
                  y: hoveredMember === member.id ? -5 : 10
                }}
                transition={{ duration: 0.2 }}
                className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg z-20 pointer-events-none border border-gray-200 dark:border-gray-700 min-w-[200px]"
              >
                <div className="text-center">
                  <h4 className="text-sm font-bold mb-1 text-gray-900 dark:text-white">{member.name}</h4>
                  <p className="text-green-600 dark:text-green-400 text-xs mb-2">{member.role}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">{member.bio}</p>
                  
                  <motion.a
                    href={`mailto:${member.social.email}`}
                    whileHover={{ scale: 1.05 }}
                    className="inline-block bg-gradient-to-r from-green-600 to-emerald-600 text-white py-1 px-3 rounded-full text-xs font-medium pointer-events-auto shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    Contact
                  </motion.a>
                </div>
                
                {/* Arrow pointing to card */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-4 h-4">
                  <div className="w-4 h-4 bg-white dark:bg-gray-800 transform rotate-45 border-b border-r border-gray-200 dark:border-gray-700"></div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Team Stats - More Compact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-500/10 dark:to-emerald-500/10 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "4", label: "Team Members", icon: Users, color: "text-green-600 dark:text-green-400" },
              { value: "4+", label: "Years Experience", icon: Award, color: "text-emerald-600 dark:text-emerald-400" },
              { value: "25+", label: "Projects", icon: Target, color: "text-teal-600 dark:text-teal-400" },
              { value: "100%", label: "Dedicated", icon: HeartHandshake, color: "text-lime-600 dark:text-lime-400" }
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-12 h-12 mx-auto mb-2 bg-white/80 dark:bg-gray-800/80 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className={`text-xl font-bold mb-1 ${stat.color}`}>{stat.value}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;