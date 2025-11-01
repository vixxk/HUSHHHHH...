import React, { useState } from "react";
import HeroSection from "../components/landing/HeroSection";
import FeatureCards from "../components/landing/FeatureCards";
import HowItWorks from "../components/landing/HowItWorks";
import CTA from "../components/landing/CTA";
import CreateRoomModal from "../components/modals/CreateRoomModal";
import JoinRoomModal from "../components/modals/JoinRoomModal";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const LandingPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);

  const handleCreateClick = () => setShowCreateModal(true);
  const handleJoinClick = () => setShowJoinModal(true);
  const handleCloseCreate = () => setShowCreateModal(false);
  const handleCloseJoin = () => setShowJoinModal(false);

  return (
    <div className="w-full min-h-screen bg-white overflow-x-hidden">
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
