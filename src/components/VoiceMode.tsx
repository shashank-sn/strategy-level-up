import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Volume2, VolumeX, Settings } from "lucide-react";
import { useConversation } from "@11labs/react";

interface VoiceModeProps {
  questionText: string;
  onVoiceResponse: (response: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const VoiceMode = ({ 
  questionText, 
  onVoiceResponse, 
  placeholder = "Speak your answer or type here...",
  disabled = false 
}: VoiceModeProps) => {
  const [isVoiceModeActive, setIsVoiceModeActive] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [transcriptText, setTranscriptText] = useState("");
  const [isListening, setIsListening] = useState(false);

  // Check for saved API key
  useEffect(() => {
    const savedKey = localStorage.getItem('elevenlabs_api_key');
    if (savedKey) {
      setApiKey(savedKey);
    } else {
      setShowApiKeyInput(true);
    }
  }, []);

  const conversation = useConversation({
    onConnect: () => {
      console.log("Voice mode connected");
      setIsListening(true);
    },
    onDisconnect: () => {
      console.log("Voice mode disconnected");
      setIsListening(false);
      setIsVoiceModeActive(false);
    },
    onMessage: (message) => {
      // Handle transcription from ElevenLabs
      if (message.message && typeof message.message === 'string') {
        setTranscriptText(message.message);
        onVoiceResponse(message.message);
      }
    },
    onError: (error) => {
      console.error("Voice mode error:", error);
      setIsListening(false);
      setIsVoiceModeActive(false);
    }
  });

  const saveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('elevenlabs_api_key', apiKey.trim());
      setShowApiKeyInput(false);
    }
  };

  const startVoiceMode = async () => {
    if (!apiKey) {
      setShowApiKeyInput(true);
      return;
    }

    try {
      // Request microphone access
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // For now, fallback to browser speech recognition
      // In a real implementation, you would integrate with ElevenLabs API
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        startBrowserSpeechRecognition();
      } else {
        throw new Error('Speech recognition not supported');
      }
      
      setIsVoiceModeActive(true);
    } catch (error) {
      console.error("Failed to start voice mode:", error);
      // Fallback to browser speech recognition if available
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        startBrowserSpeechRecognition();
      }
    }
  };

  const startBrowserSpeechRecognition = () => {
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setIsVoiceModeActive(true);
      };

      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          }
        }
        
        if (finalTranscript) {
          setTranscriptText(finalTranscript);
          onVoiceResponse(finalTranscript);
          recognition.stop();
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setIsVoiceModeActive(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        setIsVoiceModeActive(false);
      };

      recognition.start();
    }
  };

  const stopVoiceMode = async () => {
    if (conversation.status === 'connected') {
      await conversation.endSession();
    }
    setIsVoiceModeActive(false);
    setIsListening(false);
  };

  if (showApiKeyInput) {
    return (
      <Card className="border-2 border-dashed border-primary/20">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Settings className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium mb-2">Enable Voice Mode</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Enter your ElevenLabs API key to use voice input for this question
              </p>
            </div>
            <div className="max-w-sm mx-auto space-y-3">
              <Input
                type="password"
                placeholder="ElevenLabs API Key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && saveApiKey()}
              />
              <div className="flex gap-2">
                <Button onClick={saveApiKey} className="flex-1">
                  Save & Enable Voice
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowApiKeyInput(false)}
                >
                  Skip
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Get your API key from{" "}
              <a 
                href="https://elevenlabs.io" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                ElevenLabs.io
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Voice Mode Controls */}
      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            isVoiceModeActive ? 'bg-primary text-primary-foreground' : 'bg-muted'
          }`}>
            {isListening ? (
              <Mic className="w-4 h-4 animate-pulse" />
            ) : (
              <MicOff className="w-4 h-4" />
            )}
          </div>
          <div>
            <p className="text-sm font-medium">
              {isVoiceModeActive ? 'Voice Mode Active' : 'Voice Mode Available'}
            </p>
            <p className="text-xs text-muted-foreground">
              {isListening ? 'Listening...' : 'Click to start speaking'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {apiKey && (
            <Badge variant="secondary" className="text-xs">
              ElevenLabs Connected
            </Badge>
          )}
          
          {!isVoiceModeActive ? (
            <Button
              size="sm"
              onClick={startVoiceMode}
              disabled={disabled}
              className="flex items-center gap-2"
            >
              <Mic className="w-3 h-3" />
              Start Voice
            </Button>
          ) : (
            <Button
              size="sm"
              variant="destructive"
              onClick={stopVoiceMode}
              className="flex items-center gap-2"
            >
              <MicOff className="w-3 h-3" />
              Stop
            </Button>
          )}

          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowApiKeyInput(true)}
          >
            <Settings className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Transcript Display */}
      {transcriptText && (
        <Card className="border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Volume2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium mb-1">Voice Input Detected:</p>
                <p className="text-sm bg-muted/50 p-2 rounded italic">
                  "{transcriptText}"
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Fallback Notice */}
      {!apiKey && !('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-orange-700">
              <VolumeX className="w-4 h-4" />
              <p className="text-sm">
                Voice input not available in this browser. Please add your ElevenLabs API key for the best experience.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};