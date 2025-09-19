import { DraggableCardBody, DraggableCardContainer } from "../ui/draggable-card.jsx"
import { motion } from "motion/react"

export default function DemoCards() {
  const features = [
    {
      title: "Create Public Rooms",
      description: "Set up open rooms for community discussions",
      icon: "🌐",
      color: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
      items: [
        {
          title: "Open Community Chat",
          image: "/modern-meeting-room-with-glass-walls.jpg",
          className: "absolute top-0 left-0 rotate-[-2deg] z-30",
        },
        {
          title: "Public Workspace",
          image: "/open-office-space-with-collaborative-areas.jpg",
          className: "absolute top-2 left-1 rotate-[-1deg] z-20",
        },
        {
          title: "Shared Environment",
          image: "/public-workspace-with-shared-facilities.jpg",
          className: "absolute top-4 left-2 rotate-[0deg] z-10",
        },
      ]
    },
    {
      title: "Create Private Rooms",
      description: "Secure encrypted rooms for confidential chats",
      icon: "🔒",
      color: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30",
      items: [
        {
          title: "Secure Private Chat",
          image: "/private-office-with-closed-door.jpg",
          className: "absolute top-0 left-0 rotate-[-2deg] z-40",
        },
        {
          title: "Executive Privacy",
          image: "/executive-office-with-privacy-glass.jpg",
          className: "absolute top-2 left-1 rotate-[-1deg] z-30",
        },
        {
          title: "Confidential Meetings",
          image: "/confidential-meeting-room-with-soundproofing.jpg",
          className: "absolute top-4 left-2 rotate-[0deg] z-20",
        },
        {
          title: "Access Controlled",
          image: "/secure-workspace-with-access-control.jpg",
          className: "absolute top-6 left-3 rotate-[1deg] z-10",
        },
      ]
    },
    {
      title: "Join Any Room",
      description: "Seamlessly connect to existing conversations",
      icon: "🚪",
      color: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30",
      items: [
        {
          title: "Join Conference",
          image: "/people-entering-a-conference-room.jpg",
          className: "absolute top-0 left-0 rotate-[-2deg] z-30",
        },
        {
          title: "Team Collaboration",
          image: "/team-members-joining-a-meeting-space.jpg",
          className: "absolute top-2 left-1 rotate-[-1deg] z-20",
        },
        {
          title: "Quick Access",
          image: "/collaborative-workspace.png",
          className: "absolute top-4 left-2 rotate-[0deg] z-10",
        },
      ]
    }
  ]

  return (
    <div className="w-full max-w-7xl mx-auto px-4">

      {/* Interactive Demo Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="relative"
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-2">Interactive Demo</h3>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gray-500 to-transparent mx-auto mt-4"></div>
        </div>

        <DraggableCardContainer className="relative flex flex-col min-h-[600px] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900/50 to-black/50 rounded-3xl border border-gray-700/30 backdrop-blur-sm py-8">
          <div className="flex flex-wrap items-start justify-center gap-8 lg:gap-16">
            {features.map((feature, featureIndex) => (
              <div key={featureIndex} className="relative">
                {/* Feature Label */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-50">
                  <div className={`bg-gradient-to-r ${feature.color} backdrop-blur-sm rounded-full px-4 py-2 border ${feature.borderColor}`}>
                    <span className="text-xs font-medium text-white flex items-center gap-1">
                      {feature.icon} {feature.title}
                    </span>
                  </div>
                </div>

                {/* Cards Container */}
                <div className="relative w-72 h-80">
                  {feature.items.map((item, index) => (
                    <DraggableCardBody 
                      key={`${featureIndex}-${index}`} 
                      className={`${item.className} w-64 h-72 bg-gray-800/80 backdrop-blur-sm border-gray-600/50 hover:bg-gray-700/80 transition-colors duration-300`}
                    >
                      <div className="flex flex-col h-full">
                        <div className="flex-1 flex items-center justify-center p-4">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            className="w-full h-40 object-cover rounded-lg border border-gray-600/50 shadow-lg"
                          />
                        </div>
                        <div className="p-4 bg-gray-900/50 rounded-b-lg">
                          <h4 className="text-center text-sm font-medium text-gray-200">
                            {item.title}
                          </h4>
                          <div className="flex justify-center mt-2">
                            <span className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded-full">
                              Drag me!
                            </span>
                          </div>
                        </div>
                      </div>
                    </DraggableCardBody>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Background decoration */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
          
          {/* Floating elements */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 right-10 w-4 h-4 bg-blue-500/30 rounded-full blur-sm"
          ></motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-10 left-10 w-6 h-6 bg-purple-500/20 rounded-full blur-sm"
          ></motion.div>
        </DraggableCardContainer>

        {/* Instructions */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm rounded-full px-6 py-3 border border-gray-700/50">
            <span className="text-sm text-gray-300">💡 Tip: </span>
            <span className="text-sm text-gray-400">Cards have realistic physics - throw them around!</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}