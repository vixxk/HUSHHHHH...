import React, { useState } from "react";
import HeroSection from "../components/landing/HeroSection";
import FeatureCards from "../components/landing/FeatureCards";
import HowItWorks from "../components/landing/HowItWorks";
import CTA from "../components/landing/CTA";
import CreateRoomModal from "../components/modals/CreateRoomModal";
import JoinRoomModal from "../components/modals/JoinRoomModal";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { useTheme } from "../context/ThemeContext";

const LandingPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const { theme } = useTheme();

  const handleCreateClick = () => setShowCreateModal(true);
  const handleJoinClick = () => setShowJoinModal(true);
  const handleCloseCreate = () => setShowCreateModal(false);
  const handleCloseJoin = () => setShowJoinModal(false);

  return (
    <div className={`w-full min-h-screen overflow-x-hidden transition-colors duration-500 ease-in-out relative ${theme === 'dark' ? 'bg-[#09090B]' : 'bg-gray-50'}`}>

      {/* Global Background Elements (Light Mode Only) */}
      {/* Global Background Elements (Both Themes) - Absolute Positioning to scroll with page */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none h-full w-full">
        {/* Dot Pattern */}
        <div className={`absolute inset-0 [background-size:32px_32px] ${theme === 'dark'
          ? 'bg-[radial-gradient(#27272A_1px,transparent_1px)] opacity-40'
          : 'bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] opacity-70'}`}>
        </div>
      </div>
      <Navbar onCreateClick={handleCreateClick} onJoinClick={handleJoinClick} />

      <main className="w-full">
        <HeroSection
          onCreateClick={handleCreateClick}
          onJoinClick={handleJoinClick}
        />
        <div id="features">
          <FeatureCards />
        </div>
        <div id="how-it-works">
          <HowItWorks />
        </div>
        <div id="pricing">
          <CTA
            onCreateClick={handleCreateClick}
            onJoinClick={handleJoinClick}
          />
        </div>
      </main>

      <Footer />

      {showCreateModal && (
        <CreateRoomModal isOpen={showCreateModal} onClose={handleCloseCreate} />
      )}

      {showJoinModal && (
        <JoinRoomModal
          isOpen={showJoinModal}
          onClose={handleCloseJoin}
          onOpenCreate={handleCreateClick}
        />
      )}
    </div>
  );
};

export default LandingPage;
