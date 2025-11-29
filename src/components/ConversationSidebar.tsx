import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, MessageSquare, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';

interface Conversation {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

interface ConversationSidebarProps {
  currentConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  userId: string;
  onClose?: () => void;
}

export function ConversationSidebar({
  currentConversationId,
  onSelectConversation,
  onNewConversation,
  userId,
  onClose,
}: ConversationSidebarProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchConversations();
  }, [userId]);

  const fetchConversations = async () => {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setConversations(data || []);
    } catch (error) {
      console.error('Error fetching conversations:', error);
      toast.error('Gagal memuat riwayat percakapan');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteConversation = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const { error } = await supabase
        .from('conversations')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setConversations(prev => prev.filter(c => c.id !== id));
      toast.success('Percakapan dihapus');
      
      if (currentConversationId === id) {
        onNewConversation();
      }
    } catch (error) {
      console.error('Error deleting conversation:', error);
      toast.error('Gagal menghapus percakapan');
    }
  };

  return (
    <div className="w-64 border-r border-border bg-background/95 backdrop-blur-md flex flex-col h-screen shadow-xl">
      <div className="p-4 border-b border-border flex items-center justify-between gap-2">
        <Button
          onClick={onNewConversation}
          className="flex-1"
          variant="default"
        >
          <Plus className="mr-2 h-4 w-4" />
          Chat Baru
        </Button>
        {onClose && (
          <Button
            onClick={onClose}
            size="icon"
            variant="ghost"
            className="md:hidden h-9 w-9"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">
              Memuat...
            </div>
          ) : conversations.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Belum ada percakapan
            </div>
          ) : (
            conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => onSelectConversation(conversation.id)}
                className={`
                  group relative flex items-center gap-2 p-3 rounded-lg cursor-pointer
                  transition-all hover:bg-accent
                  ${currentConversationId === conversation.id ? 'bg-accent' : ''}
                `}
              >
                <MessageSquare className="h-4 w-4 flex-shrink-0" />
                <span className="flex-1 truncate text-sm">
                  {conversation.title}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => deleteConversation(conversation.id, e)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
