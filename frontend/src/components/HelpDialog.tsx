
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";

interface HelpDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpDialog = ({ isOpen, onClose }: HelpDialogProps) => {
  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
      isOpen ? 'animate-scale-in' : 'animate-scale-out'
    }`}>
      <Card className="w-full max-w-4xl bg-[#210004] border-[#210004] shadow-xl animate-scale-in">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white text-2xl">🆘 How Skinalyze Works</CardTitle>
          <Button
            onClick={onClose}
            variant="outline"
            size="sm"
            className="bg-[#F2CCB7] text-[#210004] border-[#F2CCB7] hover:bg-[#F2CCB7]/80 hover:animate-button-hover transition-all duration-300"
          >
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-6 text-lg text-white">
            <p>• Skinalyze helps you identify common skin conditions using the power of Artificial Intelligence.</p>
            <p>• Upload or Capture a clear photo of the affected skin area.</p>
            <p>• Our AI model analyzes the image and classifies it as one of four conditions: Acne, Eczema, Fungal Infection, or Healthy.</p>
            <p>• You'll get a result with a confidence score and personalized suggestions powered by AI.</p>
            <p>• You can also ask questions like "Is eczema contagious?" using the built-in AI chat assistant.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HelpDialog;
