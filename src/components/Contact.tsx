import { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle } from 'lucide-react';
// import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LinkedinIcon } from './Icons';

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Email',
      value: 'bt21cse031@nituk.ac.in',
      href: 'mailto:bt21cse031@nituk.ac.in',
      color: 'text-brand-purple bg-brand-purple/10'
    },
    // {
    //   icon: <Phone className="w-5 h-5" />,
    //   label: 'Phone',
    //   value: '+91 9549845868',
    //   href: 'tel:+919549845868',
    //   color: 'text-brand-cyan bg-brand-cyan/10'
    // },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: 'Location',
      value: 'Jaipur, India',
      href: 'https://maps.google.com/?q=Jaipur,India',
      color: 'text-pink-500 bg-pink-500/10'
    },
    {
      icon: <LinkedinIcon className="w-5 h-5" />,
      label: 'LinkedIn',
      value: 'linkedin.com/in/tikam12',
      href: 'https://linkedin.com/in/tikam12',
      color: 'text-blue-500 bg-blue-500/10'
    }
  ];

  const validate = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) tempErrors.subject = 'Subject is required';
    if (!formData.message.trim()) tempErrors.message = 'Message is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API request delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Auto clear success message after 5 seconds
      setTimeout(() => setIsSent(false), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear validation error when typing
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Get In Touch
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-brand-purple to-brand-cyan mx-auto mt-4 rounded-full" />
          <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-lg mx-auto">
            Have a project in mind, an opportunity, or just want to say hello? Drop me a line below!
          </p>
        </div>

        {/* Contact Split Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-5xl mx-auto">

          {/* Details (Left Column) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-6">
              {contactInfo.map((info) => (
                <a
                  key={info.label}
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-panel rounded-2xl p-5 flex items-center gap-4 hover:shadow-md hover:border-brand-purple/20 dark:hover:border-brand-cyan/20 transition-all duration-300 group cursor-pointer text-left"
                >
                  <div className={`p-3.5 rounded-xl ${info.color} group-hover:scale-110 transition-transform duration-300`}>
                    {info.icon}
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 block uppercase tracking-wider">
                      {info.label}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-gray-800 dark:text-gray-200 mt-0.5 block break-all">
                      {info.value}
                    </span>
                  </div>
                </a>
              ))}
            </div>

            {/* Micro maps/highlight panel */}
            <div className="glass-panel rounded-2xl p-6 text-left hidden lg:block">
              <h4 className="font-bold text-gray-900 dark:text-white">Location preference</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Open to on-site opportunities in Jaipur, Hybrid setups, or Full Remote contracts globally.
              </p>
            </div>
          </div>

          {/* Form (Right Column) */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-2xl p-6 sm:p-8 relative h-full">

              <AnimatePresence mode="wait">
                {isSent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center text-center py-12 h-full"
                  >
                    <CheckCircle className="w-16 h-16 text-emerald-500 mb-6 animate-bounce" />
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Message Sent Successfully!</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-sm">
                      Thank you for reaching out, Tikam. I'll get back to you as soon as possible!
                    </p>
                    <button
                      onClick={() => setIsSent(false)}
                      className="mt-6 text-sm font-semibold text-brand-purple dark:text-brand-cyan hover:underline cursor-pointer"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5 h-full text-left"
                    noValidate
                  >
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name" className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-gray-900/50 border text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all ${errors.name
                          ? 'border-rose-500 focus:ring-rose-500/20'
                          : 'border-gray-200 dark:border-gray-800 focus:border-brand-purple dark:focus:border-brand-cyan focus:ring-brand-purple/10 dark:focus:ring-brand-cyan/10'
                          }`}
                        placeholder="John Doe"
                      />
                      {errors.name && <span className="text-xs text-rose-500 mt-0.5">{errors.name}</span>}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-gray-900/50 border text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all ${errors.email
                          ? 'border-rose-500 focus:ring-rose-500/20'
                          : 'border-gray-200 dark:border-gray-800 focus:border-brand-purple dark:focus:border-brand-cyan focus:ring-brand-purple/10 dark:focus:ring-brand-cyan/10'
                          }`}
                        placeholder="john@example.com"
                      />
                      {errors.email && <span className="text-xs text-rose-500 mt-0.5">{errors.email}</span>}
                    </div>

                    {/* Subject */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="subject" className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-gray-900/50 border text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all ${errors.subject
                          ? 'border-rose-500 focus:ring-rose-500/20'
                          : 'border-gray-200 dark:border-gray-800 focus:border-brand-purple dark:focus:border-brand-cyan focus:ring-brand-purple/10 dark:focus:ring-brand-cyan/10'
                          }`}
                        placeholder="Project Collaboration"
                      />
                      {errors.subject && <span className="text-xs text-rose-500 mt-0.5">{errors.subject}</span>}
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5 flex-grow">
                      <label htmlFor="message" className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className={`w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-gray-900/50 border text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all resize-none ${errors.message
                          ? 'border-rose-500 focus:ring-rose-500/20'
                          : 'border-gray-200 dark:border-gray-800 focus:border-brand-purple dark:focus:border-brand-cyan focus:ring-brand-purple/10 dark:focus:ring-brand-cyan/10'
                          }`}
                        placeholder="Hi Tikam, I'd love to chat about..."
                      />
                      {errors.message && <span className="text-xs text-rose-500 mt-0.5">{errors.message}</span>}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="mt-2 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-brand-purple to-brand-cyan text-white font-semibold shadow-md hover:shadow-lg hover:shadow-brand-purple/20 focus:outline-none focus:ring-2 focus:ring-brand-purple/30 disabled:opacity-50 transition-all duration-300 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
