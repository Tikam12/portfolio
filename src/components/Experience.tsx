import { useState, useEffect, useRef } from 'react';
import { Briefcase, GraduationCap, Calendar, MapPin } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';

interface TimelineItem {
  id: number;
  type: 'work' | 'education';
  role: string;
  organization: string;
  location: string;
  duration: string;
  points: string[];
}

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  const timelineData: TimelineItem[] = [
    {
      id: 1,
      type: 'work',
      role: 'Software Development Engineer',
      organization: 'CausalFunnel',
      location: 'Jaipur, India (Remote)',
      duration: 'July 2025 – Present',
      points: [
        'Implemented end-to-end full-stack modules using Python for backend services and React/JavaScript for frontend, optimizing workflows and improving system reliability.',
        'Managed and supported scalable infrastructure using AWS services, Firebase, and MongoDB, alongside Nginx and Linux server scripting for task automation.',
        'Integrated third-party analytics and marketing platforms like Google Analytics and SpyFu via APIs to enrich tracking data.',
        'Onboarded clients with custom tracking setups, analytics pipelines, dashboard reporting, and Python/Jupyter-based revenue analyses.',
        'Partnered with the team to deliver Shopify and WordPress analytics solutions (including heatmaps and user journeys) scaled into the core platform dashboard.'
      ],
    },
    {
      id: 2,
      type: 'work',
      role: 'Full Stack Developer Intern',
      organization: 'CausalFunnel',
      location: 'Jaipur, India (Remote)',
      duration: 'Feb 2025 – June 2025',
      points: [
        'Developed and expanded a dynamic dashboard system, enhancing data visualization metrics and improving user experience.',
        'Optimized backend API infrastructure, significantly enhancing scalability and query performance for high-traffic operations.',
        'Integrated Machine Learning models and capabilities to assist clients in data-driven automation.',
        'Collaborated with cross-functional development teams, ensuring seamless integrations between front-end and back-end logic.'
      ],
    },
    {
      id: 3,
      type: 'education',
      role: 'Bachelor of Technology in Computer Science & Engineering',
      organization: 'National Institute of Technology, Uttarakhand',
      location: 'Srinagar, Uttarakhand',
      duration: 'Aug 2021 – June 2025',
      points: [
        'Studied core computer science fundamentals including Software Engineering, Data Structures & Algorithms, Operating Systems, Database Management systems, Computer Networks, and Artificial Intelligence.',
        'Maintained active participation in coding challenges, technical seminars, and college project developments.'
      ],
    }
  ];

  const DEFAULT_PATH = "M 50,0 C 50,12 45,12 45,24 C 45,37 55,37 55,50 C 55,63 45,63 45,76 C 45,88 50,88 50,100";
  const [pathD, setPathD] = useState(DEFAULT_PATH);

  const updatePath = () => {
    if (!containerRef.current) return;
    const containerHeight = containerRef.current.offsetHeight;
    if (containerHeight === 0) return;

    // Get the midpoints of each row relative to the container
    const midpoints = timelineData.map((_, idx) => {
      const row = rowRefs.current[idx];
      if (!row) return null;
      const midpointY = row.offsetTop + row.offsetHeight / 2;
      return (midpointY / containerHeight) * 100;
    });

    // Check if we got all midpoints
    if (midpoints.some(val => val === null)) return;

    const [y0, y1, y2] = midpoints as number[];

    // Construct the smooth Bezier path
    const newPath = `M 50,0 ` +
      `C 50,${y0 * 0.5} 45,${y0 * 0.5} 45,${y0} ` +
      `C 45,${y0 + (y1 - y0) * 0.5} 55,${y0 + (y1 - y0) * 0.5} 55,${y1} ` +
      `C 55,${y1 + (y2 - y1) * 0.5} 45,${y1 + (y2 - y1) * 0.5} 45,${y2} ` +
      `C 45,${y2 + (100 - y2) * 0.5} 50,${y2 + (100 - y2) * 0.5} 50,100`;

    setPathD(newPath);
  };

  useEffect(() => {
    // Initial update
    updatePath();

    // Setup resize observer on container to handle dynamic layout changes
    if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
      const observer = new ResizeObserver(() => {
        updatePath();
      });
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    } else {
      window.addEventListener('resize', updatePath);
      return () => window.removeEventListener('resize', updatePath);
    }
  }, []);

  const renderCard = (item: TimelineItem, isEven: boolean) => {
    return (
      <motion.div
        initial={{ opacity: 0, x: isEven ? -60 : 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100, damping: 15 }}
        className="glass-panel rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-2xl hover:border-brand-purple/40 dark:hover:border-brand-cyan/40 hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden text-left"
      >
        {/* Background hover light effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-purple/5 to-brand-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Header Information */}
        <div className="flex flex-col border-b border-gray-200/50 dark:border-gray-800/50 pb-4 mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-purple group-hover:to-brand-cyan transition-all duration-300">
            {item.role}
          </h3>
          <h4 className="text-md font-semibold text-brand-purple dark:text-brand-cyan mt-1">
            {item.organization}
          </h4>

          <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-gray-500 dark:text-gray-400 mt-2">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-brand-purple/75" />
              {item.duration}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-brand-cyan/75" />
              {item.location}
            </span>
          </div>
        </div>

        {/* Body bullet points */}
        <ul className="space-y-2.5 text-sm sm:text-base text-gray-600 dark:text-gray-300 list-none">
          {item.points.map((pt, pIdx) => (
            <li key={pIdx} className="leading-relaxed flex items-start gap-2.5">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-purple dark:bg-brand-cyan shrink-0" />
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    );
  };

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-purple/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            My Journey
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-brand-purple to-brand-cyan mx-auto mt-4 rounded-full" />
          <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-lg mx-auto">
            A chronological timeline of my professional software engineering experiences and academic education.
          </p>
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative max-w-5xl mx-auto mt-16 pb-8">
          {/* Central Winding Curvy Line (Desktop) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* Background Track Line */}
            <path
              d={pathD}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.3"
              className="text-gray-200 dark:text-gray-800/60"
            />
            {/* Animated Progress Line */}
            <motion.path
              d={pathD}
              fill="none"
              stroke="url(#journey-gradient)"
              strokeWidth="0.4"
              style={{ pathLength: scaleY }}
            />
            <defs>
              <linearGradient id="journey-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#aa3bff" />
                <stop offset="50%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>

          {/* Straight Line (Mobile/Tablet) */}
          <div className="absolute left-[23px] lg:hidden top-0 bottom-0 w-[2px] bg-gray-200 dark:bg-gray-800/80 -translate-x-1/2 z-0" />
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute left-[23px] lg:hidden top-0 bottom-0 w-[2px] bg-gradient-to-b from-brand-purple via-indigo-500 to-brand-cyan -translate-x-1/2 z-0"
          />

          <div className="space-y-12 relative z-10">
            {timelineData.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    rowRefs.current[idx] = el;
                  }}
                  className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between w-full relative"
                >

                  {/* Timeline icon dot */}
                  <div className={`absolute left-[23px] ${isEven ? 'lg:left-[45%]' : 'lg:left-[55%]'} top-6 lg:top-1/2 -translate-x-1/2 lg:-translate-y-1/2 flex items-center justify-center z-20`}>
                    <motion.span
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ type: "spring", stiffness: 150, damping: 15, delay: idx * 0.1 }}
                      className="flex items-center justify-center w-11 h-11 rounded-full bg-white dark:bg-gray-950 border-2 border-brand-purple dark:border-brand-cyan shadow-md text-brand-purple dark:text-brand-cyan hover:scale-115 hover:shadow-brand-purple/20 transition-all duration-300"
                    >
                      {item.type === 'work' ? (
                        <Briefcase className="w-5 h-5" />
                      ) : (
                        <GraduationCap className="w-5 h-5" />
                      )}
                    </motion.span>
                  </div>

                  {isEven ? (
                    <>
                      {/* Card (Left) */}
                      <div className="w-full lg:w-[45%] pl-12 lg:pl-0 lg:pr-8">
                        {renderCard(item, isEven)}
                      </div>
                      {/* Spacer (Right) */}
                      <div className="hidden lg:block lg:w-[55%]" />
                    </>
                  ) : (
                    <>
                      {/* Spacer (Left) */}
                      <div className="hidden lg:block lg:w-[55%]" />
                      {/* Card (Right) */}
                      <div className="w-full lg:w-[45%] pl-12 lg:pl-8">
                        {renderCard(item, isEven)}
                      </div>
                    </>
                  )}

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
