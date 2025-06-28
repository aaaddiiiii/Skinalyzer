
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Credit from "@/components/Credit";
import HelpDialog from "@/components/HelpDialog";

const Index = () => {
  const navigate = useNavigate();
  const [logoHover, setLogoHover] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Header with Help Button */}
      <header className="w-full p-6 flex justify-end">
        <Button 
          onClick={() => setIsHelpOpen(true)}
          variant="outline" 
          size="sm"
          className="bg-[#210004] text-white border-[#210004] hover:bg-[#210004]/80 hover:animate-button-hover transition-all duration-300"
        >
          <HelpCircle className="w-4 h-4 mr-2" />
          HELP
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo */}
          <div 
            className="mb-8"
            onMouseEnter={() => setLogoHover(true)}
            onMouseLeave={() => setLogoHover(false)}
          >
            <h1 
              className={`text-6xl md:text-8xl font-bold text-[#210004] transition-all duration-500 ${
                logoHover ? 'scale-105' : ''
              }`}
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              SKINALYZER
            </h1>
            <div className={`h-1 maroon-gradient-line mx-auto mt-4 transition-all duration-500 ${
              logoHover ? 'w-64' : 'w-48'
            }`}></div>
          </div>

          {/* Tagline */}
          <p className="text-2xl md:text-3xl text-[#210004] mb-12 font-light leading-relaxed">
            "Scan. Spot. Solve. Your skin, analyzed by AI."
          </p>

          {/* CTA Button */}
          <Button
            onClick={() => navigate('/scanner')}
            size="lg"
            className="bg-[#210004] hover:bg-[#210004]/80 text-white px-12 py-6 text-xl font-semibold rounded-full shadow-2xl hover:shadow-[#210004]/25 transition-all duration-300 hover:scale-105 transform"
          >
            Get Started
          </Button>

          {/* Decorative Elements */}
          <div className="mt-16 flex justify-center space-x-8 opacity-60">
            <div className="w-2 h-2 bg-[#210004] rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-[#210004] rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="w-2 h-2 bg-[#210004] rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </main>

      {/* Credit Section */}
      <Credit />

      {/* Help Dialog */}
      <HelpDialog isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </div>
  );
};

export default Index;
