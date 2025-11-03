import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import Autoplay from "embla-carousel-autoplay";
import companies from "../data/companies.json";
import faqs from "../data/faq.json";
import testimonials from "../data/testimonials.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const LandingPage = () => {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  // Add the missing containerVariants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  // Refs for scroll-triggered animations
  const heroRef = useRef(null);
  const companiesRef = useRef(null);
  const featuresRef = useRef(null);
  const howItWorksRef = useRef(null);
  const testimonialsRef = useRef(null);
  const statsRef = useRef(null);
  const ctaRef = useRef(null);
  const faqRef = useRef(null);

  // InView hooks
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const companiesInView = useInView(companiesRef, { once: true, margin: "-100px" });
  const featuresInView = useInView(featuresRef, { once: true, margin: "-100px" });
  const howItWorksInView = useInView(howItWorksRef, { once: true, margin: "-100px" });
  const testimonialsInView = useInView(testimonialsRef, { once: true, margin: "-100px" });
  const statsInView = useInView(statsRef, { once: false, margin: "-100px" }); // Changed to false for repeated animations
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });
  const faqInView = useInView(faqRef, { once: true, margin: "-100px" });

  // Stats counter state
  const [statsCount, setStatsCount] = useState({
    jobs: 0,
    users: 0,
    success: 0,
    support: 0,
    companies: 0
  });

  // Stats target values
  const statsTarget = {
    jobs: 1000,
    users: 500,
    success: 95,
    companies: 100
  };

  // Animate stats when in view
  useEffect(() => {
    if (statsInView) {
      // Reset stats to zero before starting animation
      setStatsCount({
        jobs: 0,
        users: 0,
        success: 0,
        companies: 0
      });
      
      const duration = 3000; // Increased to 3 seconds for slower animation
      const steps = 50;
      const stepDuration = duration / steps;
      
      const timers = Object.keys(statsTarget).map((key, index) => {
        // Only animate the first 4 stats (remove support stat)
        if (key === 'support') return null;
        
        return setTimeout(() => {
          const increment = statsTarget[key] / steps;
          let current = 0;
          
          const interval = setInterval(() => {
            current += increment;
            if (current >= statsTarget[key]) {
              current = statsTarget[key];
              clearInterval(interval);
            }
            setStatsCount(prev => ({ ...prev, [key]: Math.floor(current) }));
          }, stepDuration);
        }, index * 300); // Increased stagger delay to 300ms
      }).filter(timer => timer !== null); // Remove null values
      
      return () => timers.forEach(timer => clearTimeout(timer));
    }
  }, [statsInView]);

  return (
    <main className="flex flex-col gap-20 sm:gap-20 py-8 sm:py-4">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-blue-500/10"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 100 + 20}px`,
                height: `${Math.random() * 100 + 20}px`,
              }}
              animate={heroInView ? {
                x: [0, (Math.random() - 0.5) * 100],
                y: [0, (Math.random() - 0.5) * 100],
              } : {}}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10">
          {/* Content Section */}
          <div className="px-8 sm:px-16 py-16 text-center">
            <motion.h1 
              className="font-extrabold text-5xl sm:text-6xl lg:text-7xl tracking-tight text-white mb-6"
              variants={fadeInUp}
            >
              Find Your Dream Career Opportunity

            </motion.h1>
            
            <motion.p 
              className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-10"
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
            >Connect with top employers and discover opportunities that match your skills. Our AI platform makes finding the perfect job or candidate easy.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeInUp}
              transition={{ delay: 0.4 }}
            >
              <Link to={"/jobs"}>
                <Button 
                  variant="default" 
                  size="lg" 
                  className="px-10 py-4 text-lg font-semibold shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white text-black hover:bg-gray-100 border border-white min-w-[80px]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Find Jobs
                </Button>
              </Link>
              <Link to={"/post-job"}>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="px-10 py-4 text-lg font-semibold shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-transparent text-white border border-white hover:bg-white/10 min-w-[80px]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Post a Job
                </Button>
              </Link>
            </motion.div>
          </div>
          
          {/* Image Section with Tilt Animation */}
          <motion.div 
            className="px-4 sm:px-8 pb-8"
            variants={fadeInUp}
            transition={{ delay: 0.6 }}
          >
            <motion.div 
              className="tilt-animation relative rounded-2xl overflow-hidden border border-gray-700 shadow-2xl mx-auto max-w-6xl"
              whileHover={{ 
                rotateX: 5, 
                rotateY: 5,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              <img 
                src="/banner.jpeg" 
                alt="Job Portal Dashboard" 
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Companies Carousel */}
      <motion.section
        ref={companiesRef}
        className="max-w-6xl mx-auto px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={companiesInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.h2 
          className="text-2xl font-bold text-center mb-10 text-gray-300"
          initial={{ opacity: 0 }}
          animate={companiesInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          Trusted by top companies
        </motion.h2>
        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="flex gap-10 items-center py-6">
            {companies.map(({ name, id, path }) => (
              <CarouselItem key={id} className="basis-1/3 sm:basis-1/4 md:basis-1/6">
                <motion.div
                  whileHover={{ scale: 1.15, y: -10 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={companiesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: id * 0.1 }}
                >
                  <div className="p-4 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
                    <img
                      src={path}
                      alt={name}
                      className="h-10 sm:h-12 object-contain"
                    />
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </motion.section>

      {/* Features Section */}
      <motion.section
        ref={featuresRef}
        className="max-w-6xl mx-auto px-4 py-16"
        initial="hidden"
        animate={featuresInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Powerful Features</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Everything you need to find, attract, and hire the best talent or land your dream job.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              ),
              title: "Smart Matching",
              description: "AI-powered job recommendations that match your skills and preferences perfectly."
            },
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: "Easy Application",
              description: "Apply to jobs with just one click using your pre-filled profile and resume."
            },
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              ),
              title: "Instant Notifications",
              description: "Get real-time updates on job applications and new opportunities."
            },
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              ),
              title: "Profile Builder",
              description: "Create a professional profile that showcases your skills and experience."
            },
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              ),
              title: "Analytics Dashboard",
              description: "Track your job search progress with detailed analytics and insights."
            },
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              ),
              title: "Team Collaboration",
              description: "Work seamlessly with recruiters and hiring managers throughout the process."
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                transition: { duration: 0.3 }
              }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 group"
            >
              <div className="flex items-center mb-4">
                <motion.div 
                  className="bg-gray-900/50 p-2 rounded-lg mr-4 group-hover:bg-cyan-900/20 transition-all duration-300"
                  whileHover={{ 
                    rotate: [0, 10, -10, 0],
                    transition: { duration: 0.5 }
                  }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-white">{feature.title}</h3>
              </div>
              <p className="text-gray-400 ml-12">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        ref={statsRef}
        className="w-full py-8"
        initial={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: statsCount.jobs, label: "Jobs Available", border: "border-cyan-500/30", suffix: "+" },
              { value: statsCount.users, label: "Active Users", border: "border-green-500/30", suffix: "+" },
              { value: statsCount.success, label: "Success Rate", border: "border-purple-500/30", suffix: "%" },
              { value: statsCount.companies, label: "Companies", border: "border-yellow-500/30", suffix: "+" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-2xl bg-transparent border ${stat.border} text-center backdrop-blur-sm`}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="text-3xl font-bold text-white mb-2"
                  animate={{ 
                    textShadow: statsInView ? "0 0 8px rgba(255, 255, 255, 0.5)" : "none"
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {stat.value}{stat.suffix}
                </motion.div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        ref={testimonialsRef}
        className="max-w-6xl mx-auto px-4 py-16"
        initial="hidden"
        animate={testimonialsInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">What Our Users Says</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what job seekers have say about their experience.
          </p>
        </motion.div>
        
        <InfiniteMovingCards
          items={testimonials}
          direction="left"
          speed="slow"
          className="py-8"
        />
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        ref={faqRef}
        className="max-w-6xl mx-auto px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={faqInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
          initial={{ opacity: 0 }}
          animate={faqInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          Frequently Asked Questions
        </motion.h2>
        <Accordion type="multiple" className="w-full">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={faqInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1 }}
            >
              <AccordionItem value={`item-${index + 1}`}>
                <AccordionTrigger className="text-left text-lg font-medium">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-300">{faq.answer}</AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        ref={ctaRef}
        className="max-w-4xl mx-auto px-4 text-center py-16"
        initial={{ opacity: 0, y: 30 }}
        animate={ctaInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900/30 to-purple-900/30 p-12 border border-gray-700 backdrop-blur-sm">
          {/* Animated background elements */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-pulse"></div>
          
          <div className="relative z-10">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              Ready to Transform Your Career?
            </motion.h2>
            <motion.p 
              className="text-gray-300 max-w-2xl mx-auto mb-8 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              Join thousands of professionals who found their dream job or perfect candidate through our platform.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              <Link to={"/jobs"}>
                <Button 
                  variant="default" 
                  size="lg" 
                  className="px-10 py-4 text-lg font-semibold shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white text-black hover:bg-gray-100 border border-white min-w-[80px]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Find Jobs Now
                </Button>
              </Link>
              <Link to={"/post-job"}>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="px-10 py-4 text-lg font-semibold shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-transparent text-white border border-white hover:bg-white/10 min-w-[80px]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Post a Job
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

    </main>
  );
};

export default LandingPage;