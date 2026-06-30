import { Mail, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export function Footer() {
  const socialLinks = [
    { name: 'GitHub', icon: <GithubIcon className="w-5 h-5" />, href: 'https://github.com/Tikam12' },
    { name: 'LinkedIn', icon: <LinkedinIcon className="w-5 h-5" />, href: 'https://linkedin.com/in/tikam12' },
    { name: 'Email', icon: <Mail className="w-5 h-5" />, href: 'mailto:bt21cse031@nituk.ac.in' },
  ];

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white/20 dark:bg-gray-950/20 backdrop-blur-md py-8 mt-20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Text */}
        <div className="text-center md:text-left">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Tikam Chand Choudhary. All rights reserved.
          </p>
        </div>

        {/* Social & Scroll Up */}
        <div className="flex items-center gap-6">
          <div className="flex gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-100 hover:bg-brand-purple/10 dark:bg-gray-900 dark:hover:bg-brand-cyan/10 text-gray-600 hover:text-brand-purple dark:text-gray-400 dark:hover:text-brand-cyan transition-all duration-300 cursor-pointer"
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>

          <a
            href="#home"
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-colors cursor-pointer"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
