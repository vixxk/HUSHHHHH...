"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "motion/react";

export const ContainerScroll = ({ titleComponent, children }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20 mb-0"
      ref={containerRef}
    >
      <div
        className="w-full relative md:py-40 mb-0"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="max-w-5xl mx-auto text-center mb-0"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({ rotate, scale, children }) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #00000080, 0 9px 20px #00000070, 0 37px 37px #00000060, 0 84px 50px #00000040, 0 149px 60px #00000020, 0 233px 65px #00000010",
      }}
      className="max-w-5xl mx-auto h-[30rem] md:h-[40rem] w-full border-2 border-gray-600/50 p-2 md:p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-[30px] shadow-2xl mb-0"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-700/50 md:rounded-2xl md:p-4 mb-0">
        {children}
      </div>
    </motion.div>
  );
};
