import { useState, useCallback, useEffect } from 'react';
import { useConversation } from '@11labs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, MicOff, Phone, PhoneOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const VoiceReceptionist = () => {
  const { toast } = useToast();
  const [isConnecting, setIsConnecting] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const conversation = useConversation({
    onConnect: () => {
      console.log('Connected to voice receptionist');
      toast({
        title: "Terhubung",
        description: "Voice receptionist siap menerima panggilan Anda",
      });
    },
    onDisconnect: () => {
      console.log('Disconnected from voice receptionist');
      setConversationId(null);
      toast({
        title: "Terputus",
        description: "Percakapan telah berakhir",
      });
    },
    onMessage: (message) => {
      console.log('Message received:', message);
    },
    onError: (error) => {
      console.error('Conversation error:', error);
      toast({
        title: "Error",
        description: "Terjadi kesalahan dalam percakapan",
        variant: "destructive",
      });
    },
  });

  const startConversation = async () => {
    try {
      setIsConnecting(true);
      
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // Get signed URL from our edge function
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/get-elevenlabs-token`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to get signed URL');
      }

      const data = await response.json();
      
      if (!data.signed_url) {
        throw new Error('No signed URL received');
      }

      // Start the conversation
      const id = await conversation.startSession({
        signedUrl: data.signed_url,
      });

      setConversationId(id);
      toast({
        title: "Memulai Percakapan",
        description: "Silakan bicara dengan voice receptionist",
      });
    } catch (error) {
      console.error('Error starting conversation:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Gagal memulai percakapan',
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const endConversation = async () => {
    try {
      await conversation.endSession();
      setConversationId(null);
    } catch (error) {
      console.error('Error ending conversation:', error);
    }
  };

  const toggleMute = async () => {
    try {
      await conversation.setVolume({ 
        volume: conversation.isSpeaking ? 0 : 1 
      });
    } catch (error) {
      console.error('Error toggling mute:', error);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl bg-black/50 backdrop-blur-sm border-white/10">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Voice Receptionist
          </CardTitle>
          <CardDescription className="text-gray-300 text-lg">
            Resepsionis virtual AI yang siap membantu 24/7
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Status Display */}
          <div className="text-center space-y-4">
            <div className={`mx-auto w-32 h-32 rounded-full flex items-center justify-center transition-all ${
              conversation.status === 'connected' 
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 animate-pulse' 
                : 'bg-gradient-to-r from-gray-600 to-gray-700'
            }`}>
              {conversation.status === 'connected' ? (
                <Phone className="w-16 h-16 text-white" />
              ) : (
                <PhoneOff className="w-16 h-16 text-gray-300" />
              )}
            </div>

            <div className="space-y-2">
              <p className="text-xl font-semibold text-white">
                {conversation.status === 'connected' 
                  ? 'Terhubung' 
                  : 'Tidak Terhubung'}
              </p>
              {conversation.isSpeaking && (
                <p className="text-purple-400 animate-pulse">
                  AI sedang berbicara...
                </p>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col gap-4">
            {conversation.status === 'disconnected' ? (
              <Button
                onClick={startConversation}
                disabled={isConnecting}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-lg"
              >
                {isConnecting ? (
                  <>
                    <div className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                    Menghubungkan...
                  </>
                ) : (
                  <>
                    <Phone className="mr-2 h-5 w-5" />
                    Mulai Percakapan
                  </>
                )}
              </Button>
            ) : (
              <>
                <Button
                  onClick={toggleMute}
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10"
                >
                  {conversation.isSpeaking ? (
                    <>
                      <MicOff className="mr-2 h-5 w-5" />
                      Mute
                    </>
                  ) : (
                    <>
                      <Mic className="mr-2 h-5 w-5" />
                      Unmute
                    </>
                  )}
                </Button>
                <Button
                  onClick={endConversation}
                  variant="destructive"
                  className="w-full py-6 text-lg"
                >
                  <PhoneOff className="mr-2 h-5 w-5" />
                  Akhiri Percakapan
                </Button>
              </>
            )}
          </div>

          {/* Features List */}
          <div className="mt-8 p-6 bg-white/5 rounded-lg border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Fitur Voice Receptionist:</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                <span>Menjawab pertanyaan tentang layanan</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                <span>Memberikan informasi harga dan paket</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                <span>Mengarahkan ke layanan yang tepat</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                <span>Tersedia 24/7 tanpa henti</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default VoiceReceptionist;
