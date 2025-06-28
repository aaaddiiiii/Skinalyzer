import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Upload, ArrowLeft, Loader2, Camera, MessageCircle, Send, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { toast } from "@/hooks/use-toast";
import Credit from "@/components/Credit";
import HelpDialog from "@/components/HelpDialog";

const Scanner = () => {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'ai', message: string }>>([]);
  const [chatInput, setChatInput] = useState("");
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.type.startsWith('image/')) {
      setUploadedFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
      setAnalysisResult(null);
      toast({
        title: "Image uploaded successfully!",
        description: "Ready for analysis.",
      });
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    multiple: false
  });

  const handleAnalyze = async () => {
    if (!uploadedFile) {
      toast({
        title: "No image uploaded",
        description: "Please upload an image first.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append("image", uploadedFile);

      const response = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      setAnalysisResult(data);

      toast({
        title: "Analysis Complete!",
        description: `Detected: ${data.disease} with ${data.confidence}% confidence`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

const handleSendMessage = async () => {
  if (!chatInput.trim()) return;

  const userMessage = chatInput;
  setChatMessages((prev) => [...prev, { role: 'user', message: userMessage }]);
  setChatInput("");

  try {
    const response = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await response.json();
    const aiReply = data.reply;

    setChatMessages((prev) => [...prev, { role: 'ai', message: aiReply }]);
  } catch (error) {
    setChatMessages((prev) => [
      ...prev,
      { role: 'ai', message: "Sorry, there was an error processing your question." },
    ]);
  }
};

const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    handleSendMessage();
  }
};


  return (
    <div className="min-h-screen bg-cream flex flex-col justify-between">
      <div className="flex-grow">
        <header className="p-6 flex items-center justify-between">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="bg-white/80 border-[#210004]/20 text-[#210004] hover:bg-[#210004]/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-2xl font-bold text-[#210004]">SKINALYZER</h1>
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

        <div className="container mx-auto px-6 pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="bg-white/80 backdrop-blur-sm border-[#210004]/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-[#210004] text-xl">Upload Skin Image</CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300 cursor-pointer ${
                      isDragActive
                        ? 'border-[#210004] bg-[#210004]/10'
                        : 'border-[#210004]/50 hover:border-[#210004] hover:bg-[#210004]/5'
                    }`}
                  >
                    <input {...getInputProps()} />
                    <div className="space-y-4">
                      {uploadedFile && !analysisResult ? (
                        <>
                          <Camera className="w-16 h-16 text-[#210004] mx-auto" />
                          <p className="text-[#210004] font-medium">{uploadedFile.name}</p>
                          <p className="text-[#210004]/70 text-sm">Image ready for analysis</p>
                          {imagePreviewUrl && (
                            <div className="mt-4">
                              <img
                                src={imagePreviewUrl}
                                alt="Preview"
                                className="max-w-xs mx-auto rounded-lg shadow border border-[#210004]/30"
                              />
                            </div>
                          )}
                        </>
                      ) : !uploadedFile ? (
                        <>
                          <Upload className="w-16 h-16 text-[#210004] mx-auto animate-bounce" />
                          <div>
                            <p className="text-[#210004] font-medium text-lg">
                              {isDragActive ? 'Drop the image here...' : 'Drag & drop an image here'}
                            </p>
                            <p className="text-[#210004]/70 mt-2">or click to select from your device</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <Upload className="w-16 h-16 text-[#210004] mx-auto animate-bounce" />
                          <div>
                            <p className="text-[#210004] font-medium text-lg">
                              Drag & drop an image here
                            </p>
                            <p className="text-[#210004]/70 mt-2">or click to select from your device</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <Button
                    onClick={handleAnalyze}
                    disabled={!uploadedFile || isAnalyzing}
                    className="w-full mt-6 bg-[#210004] hover:bg-[#210004]/80 text-white py-6 text-lg font-semibold rounded-full shadow-xl hover:shadow-[#210004]/25 transition-all duration-300 hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      'Analyze Image'
                    )}
                  </Button>
                </CardContent>
              </Card>

              {analysisResult && (
                <Card className="bg-white/80 backdrop-blur-sm border-[#210004]/20 shadow-xl mt-6 animate-fade-in">
                  <CardHeader>
                    <CardTitle className="text-[#210004] text-xl">Analysis Results</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center">
                      <h2 className="text-4xl font-bold text-[#210004] mb-2">{analysisResult.disease}</h2>
                      <p className="text-xl text-[#210004]/70">Confidence: {analysisResult.confidence}%</p>
                    </div>

                    {imagePreviewUrl && (
                      <img
                        src={imagePreviewUrl}
                        alt="Uploaded"
                        className="max-w-xs mx-auto mb-4 rounded-lg border shadow"
                      />
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(analysisResult.probabilities).map(([condition, probability]) => (
                        <div key={condition} className="bg-[#210004]/10 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-[#210004] font-medium">{condition}</span>
                            <span className="text-[#210004]/70">{Number(probability)}%</span>
                          </div>
                          <div className="w-full bg-[#210004]/20 rounded-full h-2">
                            <div
                              className="bg-[#210004] h-2 rounded-full transition-all duration-500"
                              style={{ width: `${Number(probability)}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="space-y-6">
              {analysisResult && (
                <Card className="bg-white/80 backdrop-blur-sm border-[#210004]/20 shadow-xl animate-fade-in">
                  <CardHeader>
                    <CardTitle className="text-[#210004] text-lg">💡 AI Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#210004]/70 leading-relaxed">{analysisResult.tips}</p>
                  </CardContent>
                </Card>
              )}

              <Card className="bg-white/80 backdrop-blur-sm border-[#210004]/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-[#210004] text-lg flex items-center">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Chat with AI
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mb-4 max-h-[400px] overflow-y-auto pr-1">
                    {chatMessages.length === 0 ? (
                      <p className="text-[#210004]/70 text-sm italic text-center py-4">
                        Ask questions like "Can eczema spread?" or "Is fungal infection dangerous?"
                      </p>
                    ) : (
                      chatMessages.map((msg, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg ${
                            msg.role === 'user'
                              ? 'bg-[#210004]/10 ml-4 text-[#210004]'
                              : 'bg-[#210004] mr-4 text-white'
                          }`}
                        >
                          {msg.message}
                        </div>
                      ))
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Textarea
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask a question..."
                      className="flex-1 border-[#210004]/30 focus:border-[#210004]"
                      rows={2}
                    />

                    <Button
                      onClick={handleSendMessage}
                      disabled={!chatInput.trim()}
                      className="bg-[#210004] hover:bg-[#210004]/80 text-white"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Credit />
      <HelpDialog isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </div>
  );
};

export default Scanner;
