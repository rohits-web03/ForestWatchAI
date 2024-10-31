import { Button } from "@/components/ui/button";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Home = () => {
  const navItems = [
    { name: "Home", link: "/" },
    { name: "Dashboard", link: "/dashboard" }
  ];

  const features = [
    { title: "Wildlife & Poacher Detection", description: "Detects poachers and animals in images, enabling quick response to potential threats." },
    { title: "Forest Fire Prediction", description: "Uses sensor data to predict forest fire risks, helping prevent catastrophic fires." },
    { title: "Flood Prediction", description: "Predicts possible floods based on environmental data, allowing for timely action." },
    { title: "Automated Alert Notifications", description: "Sends real-time alerts to authorities for immediate action when threats are detected." },
  ];

  // Ref and InView hook for triggering animations on scroll
  const featuresRef = useRef(null);
  const isInView = useInView(featuresRef, { margin: "0px 0px -100px 0px" });

  return (
    <div className='w-full min-h-screen bg-gradient-to-br from-stone-900 via-lime-900 to-green-800'>
      <FloatingNav navItems={navItems} />
      
      {/* Hero Section */}
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <motion.div 
          className="w-[90%] md:w-[75%] flex flex-col justify-center items-center gap-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl md:text-4xl font-bold text-white">Empowering Forest Conservation through AI</h3>
          <p className="text-xl md:text-2xl font-semibold text-neutral-200">ForestWatchAI brings intelligent monitoring and timely alerts to safeguard our forests.</p>
          <Button variant='outline' asChild>
            <Link to='/register'>Get Started</Link>
          </Button>
        </motion.div>
      </div>
      
      {/* Features Section */}
      <div ref={featuresRef} className="w-full py-20 flex flex-col items-center gap-8">
        {/* Section Heading */}
        <motion.h2
          className="text-3xl md:text-4xl font-semibold text-white mb-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          Key Features
        </motion.h2>
        
        {/* Features Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-[90%] md:max-w-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="backdrop-blur-lg bg-white/10 rounded-lg p-6 text-center shadow-lg border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.2, duration: 0.6 }}
            >
              <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
              <p className="text-neutral-200">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
