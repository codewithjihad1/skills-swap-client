// 'use client';

import { Button } from '@/components/ui';
import { motion } from 'framer-motion';
import { 
  Users, 
  Target, 
  HeartHandshake,
  ArrowRight,
  Sparkles,
  CheckCircle
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const AboutUsSection = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerChildren = {
    visible: { transition: { staggerChildren: 0.2 } }
  };

  // Features list
  const features = [
    "Skill exchange platform",
    "Community-driven learning",
    "No monetary transactions",
    "Build meaningful connections",
    "Learn at your own pace",
    "Share your expertise"
  ];

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-green-500/5 to-transparent z-0"></div>
      <div className="absolute -left-20 bottom-1/4 w-72 h-72 bg-emerald-500/10 rounded-full filter blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerChildren}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Left Content */}
          <motion.div variants={fadeIn}>
            <motion.div variants={fadeIn} className="inline-flex items-center mb-4">
              <Sparkles className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-sm font-semibold text-green-600 uppercase tracking-wider">About Us</span>
            </motion.div>
            
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Transforming How People <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Share Skills</span>
            </motion.h2>
            
            <motion.p variants={fadeIn} className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              At SkillShareHub, we believe that everyone has valuable knowledge to share. Our platform connects people who want to learn new skills with those who can teach them, creating a community built on mutual growth and knowledge exchange.
            </motion.p>
            
            <motion.p variants={fadeIn} className="text-lg text-gray-700 dark:text-gray-300 mb-10">
              Unlike traditional learning platforms, we facilitate direct skill exchanges where users teach each other without monetary transactions. It's about building meaningful connections while expanding your capabilities.
            </motion.p>
            
            {/* Features list */}
            <motion.div variants={fadeIn} className="grid sm:grid-cols-2 gap-4 mb-10">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </div>
              ))}
            </motion.div>
            
            <motion.div variants={fadeIn} className="flex flex-wrap gap-4">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center shadow-lg hover:shadow-green-500/30 transition-all duration-300" asChild>
                <Link href="/auth/signup">Join Our Community <ArrowRight className="ml-2 w-5 h-5" /></Link>
              </Button>
              <Button className="bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-700 backdrop-blur-md text-gray-900 dark:text-white border border-gray-200/50 dark:border-gray-600/50 px-6 py-3 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all duration-300" asChild>
                <Link href="about/team">Meet The Team</Link>
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Right Image */}
          <motion.div 
            variants={fadeIn}
            className="relative"
          >
            <div className="relative z-10">
              {/* Main image - Replace with your actual image path */}
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/4member.png"
                  width={500}
                  height={500}
                  alt="SkillShareHub community"
                  className="w-full h-auto object-cover aspect-square"
                />
              </div>
              
              {/* Floating stats card */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
                className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg border border-gray-200 dark:border-gray-600"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">4</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Dedicated Team Members</div>
                  </div>
                </div>
              </motion.div>
              
              {/* Floating card 2 */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                viewport={{ once: true }}
                className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg border border-gray-200 dark:border-gray-600"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center mr-4">
                    <HeartHandshake className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">100%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Community Focused</div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Background decorative element */}
            <div className="absolute -z-10 top-6 -right-6 w-full h-full rounded-2xl bg-gradient-to-br from-green-200/30 to-emerald-200/30 dark:from-green-500/20 dark:to-emerald-500/20"></div>
          </motion.div>
        </motion.div>
        
        {/* Mission statement */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="mt-24 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-500/10 dark:to-emerald-500/10 rounded-2xl p-8 md:p-12 border border-gray-200 dark:border-gray-600"
        >
          <motion.div variants={fadeIn} className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center">
              <Target className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">Our Mission</h3>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              To create a world where knowledge sharing is accessible to everyone, breaking down barriers to learning and fostering communities where people can grow together through the exchange of skills and experiences.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUsSection;