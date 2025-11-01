import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black text-white border-t-8 border-black">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-8 lg:mb-12">
          {/* Brand */}
          <div className="md:col-span-2 lg:col-span-1 space-y-4 lg:space-y-6">
            <div className="flex items-center space-x-2 lg:space-x-3">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white flex items-center justify-center rotate-12 border-4 border-white">
                <span className="text-2xl lg:text-3xl">💬</span>
              </div>
              <span className="text-2xl lg:text-4xl font-black tracking-tighter">
                HUSHHHH...
              </span>
            </div>
            <p className="text-sm lg:text-lg font-bold leading-relaxed max-w-md">
              Real-time communication made{" "}
              <span className="bg-yellow-300 text-black px-2 py-1">SIMPLE</span>{" "}
              and secure.
            </p>
          </div>

          {/* Product Links */}
          <div className="space-y-3 lg:space-y-4">
            <h4 className="text-base lg:text-xl font-black tracking-wider uppercase border-b-4 border-white inline-block pb-2">
              PRODUCT
            </h4>
            <ul className="space-y-2 lg:space-y-3">
              <li>
                <a href="#features" className="font-bold text-sm lg:text-base hover:underline hover:decoration-4 decoration-yellow-300 transition-all">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="font-bold text-sm lg:text-base hover:underline hover:decoration-4 decoration-yellow-300 transition-all">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#pricing" className="font-bold text-sm lg:text-base hover:underline hover:decoration-4 decoration-yellow-300 transition-all">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3 lg:space-y-4">
            <h4 className="text-base lg:text-xl font-black tracking-wider uppercase border-b-4 border-white inline-block pb-2">
              LEGAL
            </h4>
            <ul className="space-y-2 lg:space-y-3">
              {["Privacy", "Terms", "Cookies"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="font-bold text-sm lg:text-base hover:underline hover:decoration-4 decoration-yellow-300 transition-all"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t-4 border-white pt-6 lg:pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs lg:text-sm font-black tracking-wider uppercase text-center md:text-left">
            © {currentYear} HUSHHHH... ALL RIGHTS RESERVED.
          </p>

          {/* GitHub Button */}
          <a
            href="https://github.com/vixxk/HUSHHHHH..."
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 lg:px-4 py-2 lg:py-3 bg-white text-black font-black text-xs lg:text-sm border-4 border-white hover:bg-black hover:text-white hover:border-white transition-all"
          >
            GITHUB
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
