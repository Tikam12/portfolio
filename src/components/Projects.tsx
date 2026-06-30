import { useState } from 'react';
import { ExternalLink, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GithubIcon } from './Icons';
import urlShortenerImg from '../assets/project_url_shortener.png';
import movieAppImg from '../assets/project_movie_app.png';

interface Project {
  id: number;
  title: string;
  category: 'Full-Stack' | 'Frontend';
  description: string[];
  tech: string[];
  image: string;
  demoUrl: string;
  githubUrl: string;
}

export function Projects() {
  const [filter, setFilter] = useState<'All' | 'Full-Stack' | 'Frontend'>('All');

  const projectsData: Project[] = [
    {
      id: 1,
      title: 'Real-time URL Shortener',
      category: 'Full-Stack',
      description: [
        'Developed a system to shorten long URLs with real-time analytics tracking and link sharing metrics.',
        'Implemented secure user authentication utilizing JWT to manage personalized URL profiles.',
        'Leveraged MongoDB for dynamic data storage, and Node/Express for API microservices.'
      ],
      tech: ['Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'EJS', 'Render'],
      image: urlShortenerImg,
      demoUrl: 'https://shorturl-i6my.onrender.com/',
      githubUrl: 'https://github.com/Tikam12/Url-Shortener'
    },
    {
      id: 2,
      title: 'React Movie Search App',
      category: 'Frontend',
      description: [
        'Developed an application allowing users to search and explore a wide database of movies.',
        'Integrated a third-party API to query details, releases, and poster assets in real-time.',
        'Optimized loading performance using React Router, code splitting, and lazy loading.'
      ],
      tech: ['React.js', 'React Router', 'CSS3', 'RESTful API', 'Vercel'],
      image: movieAppImg,
      demoUrl: 'https://react-movie-app-pink-sigma.vercel.app/',
      githubUrl: 'https://github.com/Tikam12' // fall back to Github profile if repository name is unknown
    }
  ];

  const filteredProjects = filter === 'All' 
    ? projectsData 
    : projectsData.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Featured Projects
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-brand-purple to-brand-cyan mx-auto mt-4 rounded-full" />
          <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-lg mx-auto">
            A selection of technical projects showing full-stack integrations and frontend user experiences.
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center items-center gap-3 mb-12 flex-wrap">
          {(['All', 'Full-Stack', 'Frontend'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 text-sm font-semibold rounded-xl transition-all duration-300 cursor-pointer ${
                filter === cat
                  ? 'bg-gradient-to-r from-brand-purple to-brand-cyan text-white shadow-md'
                  : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="glass-panel rounded-2xl overflow-hidden flex flex-col hover:shadow-xl hover:border-brand-purple/20 dark:hover:border-brand-cyan/20 transition-all duration-300 group"
              >
                
                {/* Visual Area */}
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="flex gap-3">
                      <a 
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-lg bg-brand-cyan hover:bg-brand-cyan/95 text-white font-medium flex items-center gap-1 text-xs cursor-pointer shadow-md"
                      >
                        <Globe className="w-4 h-4" />
                        <span>Live Demo</span>
                      </a>
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-lg bg-gray-900 hover:bg-gray-800 text-white font-medium flex items-center gap-1 text-xs cursor-pointer shadow-md"
                      >
                        <GithubIcon className="w-4 h-4" />
                        <span>Codebase</span>
                      </a>
                    </div>
                  </div>
                  <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gray-950/70 border border-gray-800 backdrop-blur-sm text-xs font-mono font-medium text-brand-cyan">
                    {project.category}
                  </span>
                </div>

                {/* Info Area */}
                <div className="p-6 sm:p-8 flex flex-col flex-grow text-left">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-brand-purple dark:group-hover:text-brand-cyan transition-colors">
                    {project.title}
                  </h3>

                  {/* Bullet points */}
                  <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400 flex-grow mb-6 list-disc list-inside">
                    {project.description.map((desc, dIdx) => (
                      <li key={dIdx} className="leading-relaxed marker:text-brand-purple dark:marker:text-brand-cyan pl-1">
                        <span className="relative -left-2">{desc}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack Badge List */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tech.map((t) => (
                      <span 
                        key={t}
                        className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-200/40 dark:border-gray-800/80"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Standard CTA Buttons for smaller screen sizes or persistent accessibility */}
                  <div className="flex gap-4 border-t border-gray-100 dark:border-gray-800/60 pt-4 mt-auto">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm font-semibold text-brand-purple dark:text-brand-cyan hover:underline cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-brand-purple dark:hover:text-brand-cyan hover:underline cursor-pointer"
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>GitHub</span>
                    </a>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
