
import { Button } from "@/components/ui/button";
import { Instagram, Linkedin } from "lucide-react";

const Credit = () => {
  return (
    <footer className="bg-[#210004] border-t border-[#210004] py-6 mt-8">
      <div className="container mx-auto px-6 text-center">
        <p className="text-white font-medium mb-4">Made with love by Aadi &lt;3</p>
        <div className="flex justify-center space-x-4">
          <Button
            onClick={() => window.open('https://instagram.com/aaaddiiiii___', '_blank')}
            variant="outline"
            size="sm"
            className="bg-[#F2CCB7] text-[#210004] border-[#F2CCB7] hover:bg-[#F2CCB7]/80 hover:animate-button-hover transition-all duration-300"
          >
            <Instagram className="w-4 h-4 mr-2" />
            Instagram
          </Button>
          <Button
            onClick={() => window.open('https://linkedin.com/in/aaaddiiiii', '_blank')}
            variant="outline"
            size="sm"
            className="bg-[#F2CCB7] text-[#210004] border-[#F2CCB7] hover:bg-[#F2CCB7]/80 hover:animate-button-hover transition-all duration-300"
          >
            <Linkedin className="w-4 h-4 mr-2" />
            LinkedIn
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Credit;
