"use client";
import { LayoutTextFlip } from "../src/components/ui/layout-text-flip.jsx";
import { motion } from "motion/react";
import { ContainerScroll } from "../src/components/ui/container-scroll-animation.jsx";
import RoomCard from "../src/components/usage/RoomCard.jsx";
import DemoCards from "../src/components/usage/demoCards.jsx";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../src/components/ui/accordion.jsx";
import { useRef } from "react";

function App() {
  // Ref for Demo Section
  const demoRef = useRef(null);

  const scrollToDemo = () => {
    demoRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-800 text-gray-100 flex flex-col items-center justify-start overflow-x-hidden">
      {/* Professional Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mt-16 mb-8 text-center"
      >
        <h1 className="text-6xl md:text-7xl font-black tracking-wider bg-gradient-to-r from-gray-300 via-yellow-100  bg-clip-text text-transparent">
          HUSHHH..
        </h1>
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-4xl mt-2"
        >
          🤫
        </motion.div>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto mt-4"></div>
      </motion.div>

      {/* Enhanced Animated tagline */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="relative mx-4 mb-6 flex flex-col items-center justify-center gap-6 text-center max-w-4xl"
      >
        <div className="text-2xl md:text-3xl font-light">
          <LayoutTextFlip
            words={[
              "Chat Anonymously",
              "Share Files Securely",
              "Private Conversations",
              "Protected Rooms",
              "Instant Access",
            ]}
          />
        </div>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-lg text-gray-400 max-w-2xl leading-relaxed"
        >
          Experience anonymous chatting and secure file sharing with{" "}
          <span className="font-semibold text-white bg-gradient-to-r from-gray-700 to-gray-600 px-2 py-1 rounded">
            HUSHHH
          </span>
          <br></br> No registration required, complete privacy guaranteed.
        </motion.p>
      </motion.div>

      {/* RoomCard Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="mt-16 mb-6"
      >
        <RoomCard />
      </motion.div>

      {/* Show Demo Button just below RoomCard */}
      <motion.button
        onClick={scrollToDemo}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="mb-16 px-8 py-3 rounded-xl bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 hover:from-gray-600 hover:to-gray-400 text-white font-semibold shadow-lg hover:shadow-gray-700/50 transition-all duration-300"
      >
        Show Demo 
      </motion.button>

      {/* Demo Section */}
      <motion.div 
        ref={demoRef}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="mt-8 mb-24 w-full px-4"
      >
        <DemoCards />
      </motion.div>

      {/* Enhanced Scroll Section */}
      <div className="w-full mt-12 mb-0">
        <ContainerScroll
          titleComponent={
            <div className="text-center mb-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                Explore the Codebase
              </h1>
              <span className="text-2xl md:text-3xl font-light text-gray-300 block">
                Click to Reveal Source Code
              </span>
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gray-500 to-transparent mx-auto mt-4"></div>
            </div>
          }
        >
          <div className="flex flex-col items-center justify-center h-full p-4">
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="absolute -inset-1 bg-gradient-to-r from-gray-600 to-gray-400 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <a
                href="https://github.com/vixxk/HUSHHHHH..." 
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-full h-full"
              >
                <img
                  src={`/github.png`}
                  alt="GitHub Repository"
                  className="relative w-full h-full object-cover rounded-xl shadow-2xl"
                  draggable={false}
                />
              </a>
            </div>
          </div>
        </ContainerScroll>
      </div>

      {/* FAQs Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="mt-8 mb-20 w-full max-w-3xl px-6"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gray-500 to-transparent mx-auto"></div>
        </div>
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="q1" className="border-gray-700">
              <AccordionTrigger className="text-lg font-medium hover:text-white transition-colors">
                Is HUSHHH really anonymous?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 leading-relaxed pt-2">
                Yes ✅ We don't store usernames or personal data. Your chat identity is temporary and completely private. All communications are end-to-end secured.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2" className="border-gray-700">
              <AccordionTrigger className="text-lg font-medium hover:text-white transition-colors">
                Can I share files securely?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 leading-relaxed pt-2">
                Absolutely 🔒 Files are shared inside encrypted rooms with optional password protection. All transfers are secured and automatically deleted after room expiration.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3" className="border-gray-700">
              <AccordionTrigger className="text-lg font-medium hover:text-white transition-colors">
                How long do rooms stay active?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 leading-relaxed pt-2">
                Rooms automatically delete after 1 hour of inactivity to maintain privacy. You can also manually delete rooms at any time for immediate cleanup.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q4" className="border-gray-700">
              <AccordionTrigger className="text-lg font-medium hover:text-white transition-colors">
                Do I need to sign up?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 leading-relaxed pt-2">
                Nope 🚫 Just create or join a room instantly. No signup, no email verification, no personal information required. Start chatting in seconds.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </motion.div>

      {/* Footer */}
      <div className="w-full border-t border-gray-800 mt-12">
        <div className="max-w-4xl mx-auto py-8 px-6 text-center">
          <p className="text-gray-500 text-sm">
            Built with privacy in mind. No tracking, no data collection, just secure communication.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
