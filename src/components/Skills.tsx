import React, { useState } from 'react';
import { Code2, Server, Wrench, Puzzle } from 'lucide-react';
import { motion } from 'framer-motion';

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
  color: string;
}

interface SkillDetail {
  icons?: string[];
  customIcon?: React.ReactNode;
  brandColor: string;
}

const SKILL_DETAILS: Record<string, SkillDetail> = {
  'Python': { icons: ['python'], brandColor: '#3776AB' },
  'JavaScript (ES6+)': { icons: ['javascript'], brandColor: '#F7DF1E' },
  'TypeScript': { icons: ['typescript'], brandColor: '#3178C6' },
  'C++': { icons: ['cplusplus'], brandColor: '#00599C' },
  'SQL': { icons: ['postgresql'], brandColor: '#4169E1' },
  'HTML5 & CSS3': { icons: ['html5', 'css3'], brandColor: '#E34F26' },
  'React.js': { icons: ['react'], brandColor: '#61DAFB' },
  'EJS': { icons: ['ejs'], brandColor: '#B4CA65' },
  'Node.js': { icons: ['nodedotjs'], brandColor: '#339933' },
  'Express.js': { icons: ['express'], brandColor: '#888888' },
  'MongoDB': { icons: ['mongodb'], brandColor: '#47A248' },
  'Firebase': { icons: ['firebase'], brandColor: '#FFCA28' },
  'Tailwind CSS': { icons: ['tailwindcss'], brandColor: '#06B6D4' },
  'Bootstrap': { icons: ['bootstrap'], brandColor: '#7952B3' },
  'Material UI': { icons: ['mui'], brandColor: '#007FFF' },
  'Git & GitHub': { icons: ['git', 'github'], brandColor: '#F05032' },
  'RESTful APIs': { 
    customIcon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <path d="m15 6-9 5.4M6 12.6l9 5.4" />
      </svg>
    ), 
    brandColor: '#10B981' 
  },
  'JWT / Session Auth': { icons: ['jsonwebtokens'], brandColor: '#d63aff' },
  'Postman': { icons: ['postman'], brandColor: '#FF6C37' },
  'VS Code': { icons: ['visualstudiocode'], brandColor: '#007ACC' },
  'Vercel': { icons: ['vercel'], brandColor: '#6b7280' },
  'Render': { icons: ['render'], brandColor: '#46E3B7' },
  'Shopify Analytics': { icons: ['shopify'], brandColor: '#7AB55C' },
  'WordPress': { icons: ['wordpress'], brandColor: '#21759B' },
  'BigCommerce': { icons: ['bigcommerce'], brandColor: '#1f2937' },
  'Squarespace': { icons: ['squarespace'], brandColor: '#5a5a5a' },
  'Webflow': { icons: ['webflow'], brandColor: '#4353FF' },
  'GoHighLevel': { 
    customIcon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3h18v2L14 12v7l-4 3v-10L3 5V3z" />
      </svg>
    ), 
    brandColor: '#2A5C91' 
  },
  'Google Analytics': { icons: ['googleanalytics'], brandColor: '#E37400' },
  'SpyFu API': { 
    customIcon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3M11 8a3 3 0 0 0-3 3" />
      </svg>
    ), 
    brandColor: '#8ABB40' 
  },
};

function SkillBadge({ name, sIdx }: { name: string; sIdx: number }) {
  const [hovered, setHovered] = useState(false);
  const getIconUrl = (slug: string) => {
    if (slug === 'css3') {
      return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg';
    }
    if (slug === 'visualstudiocode') {
      return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg';
    }
    return `https://cdn.simpleicons.org/${slug}`;
  };

  const detail = SKILL_DETAILS[name];
  const color = detail?.brandColor || '#aa3bff';

  const badgeStyle = hovered 
    ? {
        borderColor: color,
        boxShadow: `0 0 12px ${color}40`,
        color: color === '#000000' || color === '#ffffff' ? '' : color,
        backgroundColor: `${color}08`,
      }
    : {};

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: sIdx * 0.05 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium bg-white/50 dark:bg-gray-950/40 text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-gray-800/80 transition-all duration-300 shadow-sm cursor-default hover:scale-[1.03] hover:-translate-y-[1px]"
      style={badgeStyle}
    >
      {/* Brand icon list */}
      {detail?.icons?.map((slug) => {
        const isInvertible = ['express', 'github', 'vercel', 'squarespace', 'bigcommerce'].includes(slug);
        return (
          <img
            key={slug}
            src={getIconUrl(slug)}
            alt={`${name} logo`}
            className={`w-4 h-4 object-contain ${isInvertible ? 'dark:invert' : ''}`}
            loading="lazy"
          />
        );
      })}

      {/* Custom inline icon */}
      {detail?.customIcon && (
        <span className="w-4 h-4 flex items-center justify-center shrink-0">
          {detail.customIcon}
        </span>
      )}

      <span>{name}</span>
    </motion.span>
  );
}

export function Skills() {
  const categories: SkillCategory[] = [
    {
      title: 'Languages & Libraries',
      icon: <Code2 className="w-6 h-6" />,
      color: 'from-brand-purple to-indigo-500',
      skills: ['Python', 'JavaScript (ES6+)', 'TypeScript', 'C++', 'SQL', 'HTML5 & CSS3', 'React.js', 'EJS']
    },
    {
      title: 'Frameworks & Databases',
      icon: <Server className="w-6 h-6" />,
      color: 'from-brand-cyan to-blue-500',
      skills: ['Node.js', 'Express.js', 'MongoDB', 'Firebase', 'Tailwind CSS', 'Bootstrap', 'Material UI']
    },
    {
      title: 'Tools & Other Skills',
      icon: <Wrench className="w-6 h-6" />,
      color: 'from-pink-500 to-rose-500',
      skills: ['Git & GitHub', 'RESTful APIs', 'JWT / Session Auth', 'Postman', 'VS Code', 'Vercel', 'Render']
    },
    {
      title: 'Platforms & Integrations',
      icon: <Puzzle className="w-6 h-6" />,
      color: 'from-amber-500 to-orange-500',
      skills: ['Shopify Analytics', 'WordPress', 'BigCommerce', 'Squarespace', 'Webflow', 'GoHighLevel', 'Google Analytics', 'SpyFu API']
    }
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50/30 dark:bg-gray-900/10 backdrop-blur-[2px] relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-purple/5 dark:via-brand-cyan/2 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Technical Arsenal
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-brand-purple to-brand-cyan mx-auto mt-4 rounded-full" />
          <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-lg mx-auto">
            A comprehensive overview of languages, frameworks, developer tools, and platform integrations I use.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-panel rounded-2xl p-6 sm:p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${cat.color} text-white shadow-md shadow-brand-purple/10 group-hover:scale-110 transition-transform duration-300`}>
                  {cat.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  {cat.title}
                </h3>
              </div>

              {/* Skills Badges Wrapper */}
              <div className="flex flex-wrap gap-2.5">
                {cat.skills.map((skill, sIdx) => (
                  <SkillBadge key={skill} name={skill} sIdx={sIdx} />
                ))}
              </div>

            </motion.div>
          ))}
        </div>

        {/* Stats highlight / Achievements Callout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-panel rounded-2xl p-6 sm:p-8 mt-12 max-w-2xl mx-auto border border-brand-purple/20 dark:border-brand-cyan/20 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left"
        >
          <div>
            <h4 className="text-lg font-bold text-gray-900 dark:text-white">Problem Solving Stats</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Active developer solving data structures & algorithm challenges.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-cyan">500+</span>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 leading-tight">
              Problems Solved<br />on Coding Platforms
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
