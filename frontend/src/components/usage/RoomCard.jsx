import { CometCard } from "../ui/comet-card.jsx";

export default function RoomCard() {
  return (
    <div className="flex flex-col items-center gap-6">
      <CometCard>
        <div
          className="flex w-80 cursor-pointer flex-col items-stretch rounded-[16px] border-0 bg-[#1F2121] p-6"
          style={{
            transformStyle: "preserve-3d",
            transform: "none",
            opacity: 1,
          }}
        >
          <div className="flex flex-col gap-3">
            <button className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-3 font-medium text-white transition-all duration-300 hover:from-purple-700 hover:to-blue-700 hover:shadow-lg hover:shadow-purple-500/25">
              Create A Room
            </button>
            <button className="w-full rounded-lg border border-gray-600 bg-gray-800/50 px-4 py-3 font-medium text-gray-200 transition-all duration-300 hover:bg-gray-700/50 hover:border-gray-500 hover:text-white">
              Join A Room
            </button>
          </div>
        </div>
      </CometCard>
    </div>
  )
}
