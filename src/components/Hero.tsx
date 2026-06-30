import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, FileText, ArrowRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import portraitImg from '../assets/developer_portrait.png';

const TITLES = [
  "Software Development Engineer",
  "Full Stack Developer",
  "React & Python Specialist",
  "Problem Solver"
];

export function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: any;
    const fullText = TITLES[titleIndex];
    const typingSpeed = isDeleting ? 30 : 80;

    if (!isDeleting && currentText === fullText) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % TITLES.length);
    } else {
      timer = setTimeout(() => {
        setCurrentText(
          isDeleting
            ? fullText.substring(0, currentText.length - 1)
            : fullText.substring(0, currentText.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, titleIndex]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 rounded-full bg-brand-purple/10 dark:bg-brand-purple/20 blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full bg-brand-cyan/10 dark:bg-brand-cyan/20 blur-3xl animate-pulse-slow" />

      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

        {/* Intro Text (Left Column) */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-xs font-semibold text-brand-purple dark:text-brand-cyan mb-6"
          >
            <span>Available for Opportunities</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-none"
          >
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-cyan">Tikam Chand</span>
          </motion.h1>

          {/* Typing Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-10 sm:h-12 mt-4 flex items-center"
          >
            <p className="text-xl sm:text-2xl font-mono text-gray-600 dark:text-gray-300">
              {currentText}
              <span className="inline-block w-1.5 h-6 bg-brand-purple dark:bg-brand-cyan ml-1 animate-pulse" />
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base sm:text-lg text-gray-500 dark:text-gray-400 mt-6 max-w-xl leading-relaxed"
          >
            I am a Software Development Engineer specializing in end-to-end full-stack modules. I construct high-reliability backends in Python and Node.js, performant frontends in React, and support scalable infrastructure using AWS services and modern databases.
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-4 mt-8 w-full"
          >
            <a
              href="#projects"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-purple to-brand-cyan text-white font-semibold hover:shadow-lg hover:shadow-brand-purple/20 transition-all duration-300 cursor-pointer hover:-translate-y-0.5"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="https://drive.google.com/file/d/1TNnHmZiEla3Wg2Mccv33hkiasVqPbID9/"
              className="flex items-center gap-2 px-6 py-3 rounded-xl glass-panel text-gray-900 dark:text-white font-semibold hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-800 hover:-translate-y-0.5"
            >
              <FileText className="w-4 h-4 text-brand-purple dark:text-brand-cyan" />
              <span>Download Resume</span>
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center gap-4 mt-8"
          >
            <span className="text-sm font-medium text-gray-400 dark:text-gray-500">Profiles:</span>
            <a
              href="https://github.com/Tikam12"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-brand-purple dark:text-gray-400 dark:hover:text-brand-cyan transition-colors"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/tikam12"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-brand-purple dark:text-gray-400 dark:hover:text-brand-cyan transition-colors"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>
            <a
              href="mailto:bt21cse031@nituk.ac.in"
              className="text-gray-600 hover:text-brand-purple dark:text-gray-400 dark:hover:text-brand-cyan transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </motion.div>
        </div>

        {/* Profile Card (Right Column) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          {/* Subtle colored glow behind portrait */}
          <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-brand-purple/20 to-brand-cyan/20 blur-2xl opacity-75 dark:opacity-50 animate-pulse-slow pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -8, 0]
            }}
            transition={{
              opacity: { duration: 0.6 },
              scale: { duration: 0.6, type: 'spring' },
              y: {
                repeat: Infinity,
                duration: 6,
                ease: "easeInOut"
              }
            }}
            className="relative w-72 h-72 sm:w-80 sm:h-80 group cursor-default"
          >
            {/* Outer glass panel with hover color transition */}
            <div className="w-full h-full rounded-2xl overflow-hidden glass-panel p-2 border-2 border-brand-purple/20 dark:border-brand-cyan/20 shadow-2xl hover:border-brand-purple dark:hover:border-brand-cyan transition-colors duration-500 flex flex-col items-center justify-center relative">
              <img
                src={portraitImg}
                alt="Tikam Chand"
                className="w-full h-full object-cover rounded-xl transition-all duration-500 ease-out scale-100 group-hover:scale-[1.03] group-hover:-translate-y-1.5 group-hover:rotate-1"
              />

              {/* Status overlay badge */}
              {/* <div className="absolute bottom-4 left-4 right-4 py-2 px-3 rounded-xl bg-gray-950/80 backdrop-blur-md border border-gray-800 flex items-center justify-between text-white shadow-lg">
                <span className="text-xs font-mono font-medium text-gray-300">Tikam Chand</span>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-semibold tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>ONLINE & WORKING</span>
                </div>
              </div> */}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
