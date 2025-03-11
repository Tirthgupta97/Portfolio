import { Github, Linkedin, Mail, Download, ChevronDown, ExternalLink, Facebook, Instagram, Twitter } from 'lucide-react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { useState, useEffect } from 'react';

// Add these constants after imports and before interfaces
const SOCIAL_LINKS = {
  GITHUB: 'https://github.com/tirthgupta97',
  LINKEDIN: 'https://www.linkedin.com/in/tirthgupta97',
  TWITTER: 'https://twitter.com/tirth_gupta',
  INSTAGRAM: 'https://www.instagram.com/i_be_my5elf',
  FACEBOOK: 'https://www.facebook.com/share/16AXKbKNdD/',
  EMAIL: 'mailto:tirthgupta97@gmail.com'
} as const;

const RESUME_URL = '/resume.pdf';
const PROFILE_IMAGE = '/images/profile.jpg';

interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
}

interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string;
}

interface BlogPost {
  title: string;
  date: string;
  preview: string;
  link: string;
}

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

// Add this component at the top of your file
const FloatingDots = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden">
    {[...Array(30)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 rounded-full"
        style={{
          background: `hsla(${Math.random() * 360}, 70%, 70%, 0.2)`,
        }}
        animate={{
          x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
          y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: Math.random() * 10 + 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

// Add this new component before your App component
const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Height of fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.span 
            className="text-xl font-bold cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('hero')}
          >
            Tirth Gupta
          </motion.span>
          <div className="hidden md:flex space-x-8">
            {[
              ['About', 'about'],
              ['Projects', 'projects'],
              ['Experience', 'experience'],
              ['Blog', 'blog'],
              ['Education', 'education'],
              ['Skills', 'skills'],
              ['Contact', 'contact']
            ].map(([name, id]) => (
              <motion.button
                key={id}
                onClick={() => scrollToSection(id)}
                className="text-gray-300 hover:text-primary-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {name}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

function App() {
  const projects: Project[] = [
    {
      title: "Personality Prediction Using CV",
      description: "A machine learning model to predict personality traits based on candidate CVs for HR departments",
      tech: ["Python", "TensorFlow", "scikit-learn", "Pandas", "Jupyter Notebook"],
      github: "https://github.com/Tirthgupta97/personality-prediction",
      live: "https://personality-prediction-demo.com"
    },
    {
      title: "Heart Disease Prediction",
      description: "ML model using various algorithms to classify patients at risk of heart disease with 87% F1-Score",
      tech: ["Python", "scikit-learn", "Streamlit", "Pandas", "Matplotlib"],
      github: "https://github.com/Tirthgupta97/heart-disease-prediction",
      live: "https://heart-disease-prediction-demo.com"
    },
    {
      title: "Diabetes Prediction",
      description: "Predictive model using logistic regression, SVM, and gradient boosting based on health metrics",
      tech: ["Python", "scikit-learn", "Seaborn", "Pandas", "NumPy"],
      github: "https://github.com/Tirthgupta97/diabetes-prediction",
      live: "https://diabetes-prediction-demo.com"
    },
    {
      title: "SMS Spam Detection",
      description: "NLP-based model to analyze and classify text messages as spam or legitimate",
      tech: ["Python", "NLP", "scikit-learn", "Pandas", "Matplotlib"],
      github: "https://github.com/Tirthgupta97/sms-spam-detection",
      live: "https://sms-spam-detection-demo.com"
    },
    {
      title: "Movie Recommendation System",
      description: "Personalized movie recommendations using collaborative filtering, content-based filtering and hybrid models",
      tech: ["Python", "TensorFlow", "Pandas", "NumPy", "Surprise"],
      github: "https://github.com/Tirthgupta97/movie-recommendation",
      live: "https://movie-recommendation-demo.com"
    }
  ];

  const experience: Experience[] = [
    {
      company: "Tecnovolt Software Pvt Ltd",
      position: "Project Intern",
      duration: "Jun - Jul 2024",
      description: "Implemented data normalization and feature engineering techniques to improve model performance. Received positive feedback from supervisors and team members for technical skills and collaborative approach."
    },
    {
      company: "InternPe",
      position: "AI/ML Intern",
      duration: "Feb - Mar 2024",
      description: "Utilized algorithms such as linear regression, logistic regression, decision trees, random forests, and deep learning models. Assisted in user testing and feedback loops to improve the AI/ML models based on user interaction."
    },
    {
      company: "Acentz Technologies",
      position: "Software Development Trainee",
      duration: "Jul - Aug 2023",
      description: "Preprocessed data using Pandas, NumPy & Scikit-learn, achieving a 95% reduction in data cleaning time and a 2% improvement in model training efficiency. Created a project on 'Heart Disease Prediction' with 87% F1-Score."
    }
  ];

  const blogPosts: BlogPost[] = [
    {
      title: "The Impact of AI in Healthcare Diagnostics",
      date: "March 1, 2024",
      preview: "Exploring how machine learning models are transforming early disease detection and patient outcomes...",
      link: "/blog/ai-healthcare"
    },
    {
      title: "Feature Engineering Techniques for Machine Learning",
      date: "February 15, 2024",
      preview: "A deep dive into effective feature engineering methods that can significantly improve model performance...",
      link: "/blog/feature-engineering"
    },
    {
      title: "From Data to Insights: Building Effective Recommendation Systems",
      date: "February 1, 2024",
      preview: "Discussing collaborative filtering, content-based approaches, and hybrid models for recommendation engines...",
      link: "/blog/recommendation-systems"
    }
  ];

  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  // Add this at the top of your App component
  const { scrollYProgress } = useScroll();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.pageYOffset;
      setScrollProgress(currentScroll / totalScroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Add this cursor effect (add to App component)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Remove unused useInView hook since it's not being used

  // Modify your handleSubmit function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'tirthgupta97@gmail.com',
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <AnimatePresence>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white relative px-6 md:px-12 lg:px-24 xl:px-32 2xl:px-48">
        {/* Enhanced scroll progress indicator */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-primary-400 to-primary-600 z-50 origin-left"
          style={{ 
            scaleX: scrollYProgress,
            background: `linear-gradient(90deg, 
              var(--tw-gradient-from) 0%, 
              var(--tw-gradient-via) 50%, 
              var(--tw-gradient-to) 100%)`
          }}
        />

        {/* Background Pattern Overlay */}
        <div 
          className="absolute inset-0 w-full h-full z-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Add the component right after the background pattern */}
        <FloatingDots />
        <NavBar /> {/* Add this line */}

        {/* Hero Section */}
        <div id="hero" className="min-h-screen flex flex-col justify-center items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-7xl"
          >
            {/* Add Profile Image */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotateZ: [0, 2, -2, 0]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <img 
                  src={PROFILE_IMAGE}
                  alt="Tirth Gupta"
                  className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full mx-auto border-4 border-primary-500 shadow-lg"
                  style={{ objectFit: 'cover' }}
                />
                <div className="absolute -inset-0.5 rounded-full bg-primary-500 opacity-20 blur-md -z-10" />
              </motion.div>
            </motion.div>

            <h1 className="text-6xl font-bold mb-6">Tirth Gupta</h1>
            <p className="text-2xl text-gray-300 mb-12">AI & Machine Learning Student</p>
            
            <div className="flex gap-6 justify-center mb-8">
              <motion.a
                href={SOCIAL_LINKS.GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={24} />
              </motion.a>
              <motion.a
                href={SOCIAL_LINKS.LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin size={24} />
              </motion.a>
              <motion.a
                href={SOCIAL_LINKS.TWITTER}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Twitter size={24} />
              </motion.a>
              <motion.a
                href={SOCIAL_LINKS.INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram size={24} />
              </motion.a>
              <motion.a
                href={SOCIAL_LINKS.FACEBOOK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Facebook size={24} />
              </motion.a>
              <motion.a
                href={SOCIAL_LINKS.EMAIL}
                className="text-gray-400 hover:text-primary-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={24} />
              </motion.a>
            </div>

            {/* Enhanced Resume Download Button */}
            <motion.button 
              onClick={() => {
                const link = document.createElement('a');
                link.href = RESUME_URL;
                link.download = 'TirthGupta_Resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 mx-auto transition-all shadow-lg"
            >
              <Download size={20} />
              Download Resume
            </motion.button>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8"
          >
            <ChevronDown size={32} className="text-gray-400" />
          </motion.div>
        </div>

        {/* Add this right after the opening body div */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-primary-500 z-50 origin-left"
          style={{ scaleX: scrollProgress }}
        />

        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: {
              duration: 0.8,
              staggerChildren: 0.2
            }
          }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <section id="about" className="py-24 px-8 max-w-[1600px] mx-auto backdrop-blur-sm bg-gray-800/30 rounded-xl border border-gray-700/50 my-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold mb-16 text-center">About Me</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                I am a passionate student of Artificial Intelligence and Machine Learning at SNS College Of Technology in Coimbatore with a CGPA of 8.4. My goal is to continue learning and developing skills to contribute to innovative efforts and push the boundaries of technology.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                I aim to bring about substantial change and excellence in the Data Science industry by collaborating with talented individuals and taking on new challenges. I strive to be a strong, competent leader who can adapt to new conditions while continuing to learn and develop.
              </p>
            </motion.div>
          </section>
        </motion.div>

        {/* Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: {
              duration: 0.8,
              staggerChildren: 0.2
            }
          }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <section id="projects" className="py-24 px-8 max-w-[1600px] mx-auto backdrop-blur-sm bg-gray-800/30 rounded-xl border border-gray-700/50 my-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold mb-16 text-center">Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 xl:gap-10">
                {projects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ 
                      y: -5,
                      transition: { duration: 0.2 }
                    }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 md:p-6 border border-gray-700/50 hover:border-primary-500/50 shadow-lg hover:shadow-primary-500/10 transition-all h-full"
                  >
                    <motion.div
                      whileHover={{ 
                        scale: 1.05,
                        rotateY: 5,
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 15
                      }}
                    >
                      <h3 className="text-2xl font-semibold mb-4">{project.title}</h3>
                      <p className="text-lg text-gray-400 mb-6">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech, i) => (
                          <span key={i} className="bg-primary-500/20 text-primary-300 px-2 py-1 rounded-md text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-4">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <Github size={20} />
                        </a>
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <ExternalLink size={20} />
                        </a>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>
        </motion.div>

        {/* Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: {
              duration: 0.8,
              staggerChildren: 0.2
            }
          }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <section id="experience" className="py-24 px-8 max-w-[1600px] mx-auto backdrop-blur-sm bg-gray-800/30 rounded-xl border border-gray-700/50 my-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold mb-16 text-center">Experience</h2>
              <div className="space-y-8 md:space-y-12 px-2 md:px-8 lg:px-16">
                {experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    whileHover={{
                      scale: 1.02,
                      x: 10,
                      transition: { duration: 0.2 }
                    }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative pl-6 md:pl-8 border-l-2 border-primary-500"
                  >
                    <div className="absolute w-4 h-4 bg-primary-500 rounded-full -left-[9px] top-0" />
                    <h3 className="text-2xl font-semibold">{exp.position}</h3>
                    <p className="text-lg text-primary-400 mb-2">{exp.company}</p>
                    <p className="text-lg text-gray-400 mb-3">{exp.duration}</p>
                    <p className="text-lg text-gray-300">{exp.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>
        </motion.div>

        {/* Blog Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: {
              duration: 0.8,
              staggerChildren: 0.2
            }
          }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <section id="blog" className="py-24 px-8 max-w-[1600px] mx-auto backdrop-blur-sm bg-gray-800/30 rounded-xl border border-gray-700/50 my-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold mb-16 text-center">Blog</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
                {blogPosts.map((post, index) => (
                  <motion.article
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors cursor-pointer"
                    onClick={() => window.location.href = post.link}
                  >
                    <h3 className="text-2xl font-semibold mb-4">{post.title}</h3>
                    <p className="text-lg text-primary-400 mb-6">{post.date}</p>
                    <p className="text-lg text-gray-300">{post.preview}</p>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          </section>
        </motion.div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: {
              duration: 0.8,
              staggerChildren: 0.2
            }
          }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <section id="education" className="py-24 px-8 max-w-[1600px] mx-auto backdrop-blur-sm bg-gray-800/30 rounded-xl border border-gray-700/50 my-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold mb-16 text-center">Education</h2>
              <div className="relative pl-8 border-l-2 border-primary-500">
                <div className="absolute w-4 h-4 bg-primary-500 rounded-full -left-[9px] top-0" />
                <h3 className="text-2xl font-semibold">Bachelor of Technology</h3>
                <p className="text-lg text-primary-400 mb-2">SNS College Of Technology, Coimbatore</p>
                <p className="text-lg text-gray-400 mb-3">2021 - 2025</p>
                <p className="text-lg text-gray-300 mb-2">Major in Artificial Intelligence and Machine Learning</p>
                <p className="text-lg text-gray-300 mb-2">Cumulative GPA: 8.4</p>
                <p className="text-lg text-gray-300">Coursework: Artificial Intelligence, Machine Learning, Operating System, Data Structure and Analysis of Algorithms, DBMS</p>
              </div>
            </motion.div>
          </section>
        </motion.div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: {
              duration: 0.8,
              staggerChildren: 0.2
            }
          }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <section className="py-24 px-8 max-w-[1600px] mx-auto backdrop-blur-sm bg-gray-800/30 rounded-xl border border-gray-700/50 my-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold mb-16 text-center">Certificates & Achievements</h2>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <div className="mr-3 text-primary-500 mt-1">•</div>
                  <div>Introduction To Industry 4.0 And Industrial Internet Of Things – Elite + Silver (NPTEL)</div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 text-primary-500 mt-1">•</div>
                  <div>Journal Published in International Journal of Advance Research in Computer and Communication Engineering (IJARCCE)</div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 text-primary-500 mt-1">•</div>
                  <div>All Rounder Performer Winner (Silver) of 2022 – 2023</div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 text-primary-500 mt-1">•</div>
                  <div>Completed projects for Tata, Accenture, Cognizant, BCG X and JP Morgan Chase and Co.</div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 text-primary-500 mt-1">•</div>
                  <div>Won 2+ Coding and Ideathon in National Technical Symposium</div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 text-primary-500 mt-1">•</div>
                  <div>Completed 5+ MOOC Courses in various online learning platforms</div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 text-primary-500 mt-1">•</div>
                  <div>Conducted 3+ Design Thinking Bootcamp for School Students</div>
                </li>
              </ul>
            </motion.div>
          </section>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: {
              duration: 0.8,
              staggerChildren: 0.2
            }
          }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <section id="skills" className="py-24 px-8 max-w-[1600px] mx-auto backdrop-blur-sm bg-gray-800/30 rounded-xl border border-gray-700/50 my-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold mb-16 text-center">Skills</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-center p-8 bg-gray-800/30 rounded-lg hover:bg-primary-500/10 transition-all duration-300"
                >
                  <h3 className="text-2xl font-semibold mb-6">Technical</h3>
                  <ul className="text-lg text-gray-300 space-y-3">
                    <li>Python</li>
                    <li>Machine Learning</li>
                    <li>Data Science</li>
                    <li>MS Office</li>
                    <li>MySQL</li>
                    <li>HTML</li>
                    <li>Figma</li>
                  </ul>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-center p-8 bg-gray-800/30 rounded-lg hover:bg-primary-500/10 transition-all duration-300"
                >
                  <h3 className="text-2xl font-semibold mb-6">Soft Skills</h3>
                  <ul className="text-lg text-gray-300 space-y-3">
                    <li>Leadership</li>
                    <li>Communication</li>
                    <li>Problem Solving</li>
                    <li>Critical Thinking</li>
                    <li>Detail-Oriented</li>
                    <li>Time Management</li>
                  </ul>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-center p-8 bg-gray-800/30 rounded-lg hover:bg-primary-500/10 transition-all duration-300"
                >
                  <h3 className="text-2xl font-semibold mb-6">Languages</h3>
                  <ul className="text-lg text-gray-300 space-y-3">
                    <li>English (Read/Write/Speak)</li>
                    <li>Hindi (Read/Write/Speak)</li>
                    <li>Tamil (Speak)</li>
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          </section>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: {
              duration: 0.8,
              staggerChildren: 0.2
            }
          }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <section id="contact" className="py-24 px-8 max-w-[1600px] mx-auto backdrop-blur-sm bg-gray-800/30 rounded-xl border border-gray-700/50 my-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold mb-16 text-center">Leave a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl mx-auto px-4 md:px-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="name" className="text-lg font-medium text-gray-300 mb-2">
                      Name
                    </label>
                    <motion.input
                      whileFocus={{ 
                        scale: 1.02,
                        boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)"
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25
                      }}
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-6 py-4 text-lg bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-lg font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <motion.input
                      whileFocus={{ 
                        scale: 1.02,
                        boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)"
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25
                      }}
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-6 py-4 text-lg bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="text-lg font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <motion.textarea
                    whileFocus={{ 
                      scale: 1.02,
                      boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)"
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 25
                    }}
                    id="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-6 py-4 text-lg bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>

                {submitStatus === 'success' && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-400 text-center"
                  >
                    Message sent successfully!
                  </motion.p>
                )}
                
                {submitStatus === 'error' && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-center"
                  >
                    Failed to send message. Please try again.
                  </motion.p>
                )}
              </form>
            </motion.div>
          </section>
        </motion.div>

        {/* Footer */}
        <footer className="relative py-12 md:py-16 px-8 border-t border-gray-800 z-10 bg-gray-900">
          <div className="max-w-7xl mx-auto text-center relative">
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              <motion.a
                href={SOCIAL_LINKS.GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors relative z-20"
                whileHover={{ 
                  scale: 1.2,
                  rotate: [0, -10, 10, 0],
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.9 }}
              >
                <Github size={24} />
              </motion.a>
              <motion.a
                href={SOCIAL_LINKS.LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors relative z-20"
                whileHover={{ 
                  scale: 1.2,
                  rotate: [0, -10, 10, 0],
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin size={24} />
              </motion.a>
              <motion.a
                href={SOCIAL_LINKS.TWITTER}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors relative z-20"
                whileHover={{ 
                  scale: 1.2,
                  rotate: [0, -10, 10, 0],
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.9 }}
              >
                <Twitter size={24} />
              </motion.a>
              <motion.a
                href={SOCIAL_LINKS.INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors relative z-20"
                whileHover={{ 
                  scale: 1.2,
                  rotate: [0, -10, 10, 0],
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.9 }}
              >
                <Instagram size={24} />
              </motion.a>
              <motion.a
                href={SOCIAL_LINKS.FACEBOOK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors relative z-20"
                whileHover={{ 
                  scale: 1.2,
                  rotate: [0, -10, 10, 0],
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.9 }}
              >
                <Facebook size={24} />
              </motion.a>
              <motion.a
                href={SOCIAL_LINKS.EMAIL}
                className="text-gray-400 hover:text-primary-400 transition-colors relative z-20"
                whileHover={{ 
                  scale: 1.2,
                  rotate: [0, -10, 10, 0],
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail size={24} />
              </motion.a>
            </div>
            <p className="text-gray-400 text-sm md:text-base relative z-20">
              © {new Date().getFullYear()} Tirth Gupta. All rights reserved.
            </p>
          </div>
        </footer>

        {/* Add this after your main div */}
        <motion.div
          className="fixed w-6 h-6 rounded-full pointer-events-none z-50 mix-blend-difference"
          animate={{
            x: mousePosition.x - 12,
            y: mousePosition.y - 12,
            scale: 1,
            backgroundColor: '#fff'
          }}
          transition={{ type: "spring", stiffness: 500, damping: 25 }}
        />
      </div>
    </AnimatePresence>
  );
}

export default App;