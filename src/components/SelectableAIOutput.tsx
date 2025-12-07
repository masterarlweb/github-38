import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Calendar, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface SelectableAIOutputProps {
  content: string;
  onClose: () => void;
}

interface TextBlock {
  id: number;
  text: string;
  selected: boolean;
}

const SelectableAIOutput = ({ content, onClose }: SelectableAIOutputProps) => {
  const navigate = useNavigate();
  
  // Parse content into blocks (paragraphs, list items, etc.)
  const parseContentToBlocks = (text: string): TextBlock[] => {
    const lines = text.split('\n').filter(line => line.trim());
    return lines.map((line, index) => ({
      id: index,
      text: line.trim(),
      selected: false
    }));
  };

  const [blocks, setBlocks] = useState<TextBlock[]>(parseContentToBlocks(content));
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleBlock = (id: number) => {
    setBlocks(prev => prev.map(block => 
      block.id === id ? { ...block, selected: !block.selected } : block
    ));
  };

  const selectAll = () => {
    setBlocks(prev => prev.map(block => ({ ...block, selected: true })));
  };

  const deselectAll = () => {
    setBlocks(prev => prev.map(block => ({ ...block, selected: false })));
  };

  const getSelectedText = () => {
    return blocks.filter(b => b.selected).map(b => b.text).join('\n\n');
  };

  const selectedCount = blocks.filter(b => b.selected).length;

  const handleSendToScheduler = () => {
    const selectedText = getSelectedText();
    if (!selectedText) {
      toast.error('Pilih minimal satu bagian teks');
      return;
    }

    // Extract hashtags from selected text
    const hashtagMatch = selectedText.match(/#\w+/g);
    
    navigate('/scheduler', {
      state: {
        aiData: {
          topic: selectedText.substring(0, 100),
          caption: selectedText,
          hashtags: hashtagMatch || [],
        },
        autoOpenForm: true
      }
    });
    
    toast.success(`${selectedCount} bagian teks dikirim ke Scheduler`);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="w-full max-w-2xl max-h-[80vh] bg-background border border-border rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
          <div>
            <h3 className="font-semibold text-foreground">Pilih Teks untuk Scheduler</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Klik bagian yang ingin dikirim • {selectedCount} dari {blocks.length} dipilih
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-muted/20">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={selectAll}
            className="text-xs h-7"
          >
            Pilih Semua
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={deselectAll}
            className="text-xs h-7"
          >
            Batal Pilih
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-auto text-xs h-7"
          >
            {isExpanded ? <ChevronUp className="h-3 w-3 mr-1" /> : <ChevronDown className="h-3 w-3 mr-1" />}
            {isExpanded ? 'Ciutkan' : 'Perluas'}
          </Button>
        </div>

        {/* Content Blocks */}
        <div className="overflow-y-auto max-h-[50vh] p-4 space-y-2">
          <AnimatePresence>
            {blocks.map((block) => (
              <motion.div
                key={block.id}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: block.id * 0.02 }}
                onClick={() => toggleBlock(block.id)}
                className={cn(
                  "p-3 rounded-xl cursor-pointer transition-all duration-200 border-2",
                  "hover:shadow-md",
                  block.selected 
                    ? "bg-primary/10 border-primary/50 shadow-sm" 
                    : "bg-muted/30 border-transparent hover:border-muted-foreground/20"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all",
                    block.selected 
                      ? "bg-primary border-primary" 
                      : "border-muted-foreground/30"
                  )}>
                    {block.selected && <Check className="w-3 h-3 text-primary-foreground" />}
                  </div>
                  <p className={cn(
                    "text-sm leading-relaxed transition-colors",
                    isExpanded ? "" : "line-clamp-2",
                    block.selected ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {block.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-border bg-muted/30">
          <p className="text-xs text-muted-foreground">
            {selectedCount > 0 
              ? `${getSelectedText().length} karakter dipilih`
              : 'Belum ada yang dipilih'}
          </p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Batal
            </Button>
            <Button 
              onClick={handleSendToScheduler}
              disabled={selectedCount === 0}
              className="gap-2"
            >
              <Calendar className="w-4 h-4" />
              Kirim ke Scheduler
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SelectableAIOutput;
