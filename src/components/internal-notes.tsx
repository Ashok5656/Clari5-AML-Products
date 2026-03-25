import { useState, useEffect } from "react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription,
  SheetTrigger
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Textarea } from "./ui/textarea";
import { 
  StickyNote, 
  Plus, 
  Trash2, 
  Save,
  CheckCircle,
  Circle
} from "lucide-react";
import { cn } from "./ui/utils";

interface NoteItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

interface InternalNotesProps {
  username?: string;
}

export function InternalNotes({ username = "default", trigger }: InternalNotesProps & { trigger?: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<NoteItem[]>([]);
  const [newItemText, setNewItemText] = useState("");
  const [activeTab, setActiveTab] = useState<"todo" | "scratchpad">("todo");
  const [scratchpadText, setScratchpadText] = useState("");

  useEffect(() => {
    // Load data
    const savedItems = localStorage.getItem(`internal_notes_items_${username}`);
    if (savedItems) {
      try {
        setItems(JSON.parse(savedItems));
      } catch (e) {
        console.error("Failed to parse notes items", e);
      }
    }

    const savedScratchpad = localStorage.getItem(`internal_notes_scratchpad_${username}`);
    if (savedScratchpad) {
      setScratchpadText(savedScratchpad);
    }
  }, [username]);

  const saveItems = (newItems: NoteItem[]) => {
    setItems(newItems);
    localStorage.setItem(`internal_notes_items_${username}`, JSON.stringify(newItems));
  };

  const saveScratchpad = (text: string) => {
    setScratchpadText(text);
    localStorage.setItem(`internal_notes_scratchpad_${username}`, text);
  };

  const addItem = () => {
    if (!newItemText.trim()) return;
    const newItem: NoteItem = {
      id: Date.now().toString(),
      text: newItemText,
      completed: false,
      createdAt: new Date().toISOString()
    };
    saveItems([newItem, ...items]);
    setNewItemText("");
  };

  const toggleItem = (id: string) => {
    const newItems = items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    saveItems(newItems);
  };

  const deleteItem = (id: string) => {
    const newItems = items.filter(item => item.id !== id);
    saveItems(newItems);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addItem();
    }
  };

  const activeItemsCount = items.filter(i => !i.completed).length;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {trigger || (
          <Button 
            size="lg" 
            className="fixed bottom-6 right-6 z-[100] h-14 w-14 rounded-full shadow-lg bg-[#2A53A0] hover:bg-[#1f3d7a] text-white p-0 relative group transition-all duration-300 hover:scale-105"
          >
            <StickyNote className="h-6 w-6" />
            {activeItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white border-2 border-white">
                {activeItemsCount}
              </span>
            )}
            <span className="sr-only">Internal Notes</span>
            
            {/* Tooltip on hover */}
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Internal Notes
            </div>
          </Button>
        )}
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] sm:w-[450px] p-0 flex flex-col">
          <SheetHeader className="p-6 border-b bg-gray-50/50">
            <SheetTitle className="flex items-center gap-2 text-[#2A53A0]">
              <StickyNote className="h-5 w-5" />
              Internal Notes
            </SheetTitle>
            <SheetDescription>
              Personal workspace for {username}. <br/>
              Changes are saved automatically.
            </SheetDescription>
            
            <div className="flex gap-2 mt-4 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab("todo")}
                className={cn(
                  "flex-1 py-1.5 text-sm font-medium rounded-md transition-colors",
                  activeTab === "todo" 
                    ? "bg-white text-[#2A53A0] shadow-sm" 
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                To-Do List
              </button>
              <button
                onClick={() => setActiveTab("scratchpad")}
                className={cn(
                  "flex-1 py-1.5 text-sm font-medium rounded-md transition-colors",
                  activeTab === "scratchpad" 
                    ? "bg-white text-[#2A53A0] shadow-sm" 
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                Scratchpad
              </button>
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-hidden flex flex-col relative bg-white">
            {activeTab === "todo" ? (
              <div className="flex flex-col h-full">
                <div className="p-4 border-b bg-white">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a new task..."
                      value={newItemText}
                      onChange={(e) => setNewItemText(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-1"
                    />
                    <Button onClick={addItem} size="icon" className="bg-[#2A53A0] hover:bg-[#1f3d7a]">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <ScrollArea className="flex-1 p-4">
                  {items.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-8 text-gray-400">
                      <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle className="h-8 w-8 text-gray-300" />
                      </div>
                      <p className="text-sm">No tasks yet.</p>
                      <p className="text-xs mt-1">Add items to keep track of your work.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div 
                          key={item.id} 
                          className={cn(
                            "group flex items-start gap-3 p-3 rounded-lg border transition-all hover:shadow-sm bg-white",
                            item.completed ? "border-gray-100 bg-gray-50/50" : "border-gray-200"
                          )}
                        >
                          <button 
                            onClick={() => toggleItem(item.id)}
                            className={cn(
                              "mt-0.5 flex-shrink-0 text-gray-400 hover:text-[#2A53A0] transition-colors",
                              item.completed && "text-green-500 hover:text-green-600"
                            )}
                          >
                            {item.completed ? (
                              <CheckCircle className="h-5 w-5" />
                            ) : (
                              <Circle className="h-5 w-5" />
                            )}
                          </button>
                          
                          <div className="flex-1 min-w-0">
                            <p className={cn(
                              "text-sm break-words leading-relaxed transition-all",
                              item.completed ? "text-gray-400 line-through" : "text-gray-700"
                            )}>
                              {item.text}
                            </p>
                            <p className="text-[10px] text-gray-400 mt-1">
                              {new Date(item.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          
                          <button
                            onClick={() => deleteItem(item.id)}
                            className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </div>
            ) : (
              <div className="flex flex-col h-full p-4">
                 <Textarea
                   value={scratchpadText}
                   onChange={(e) => saveScratchpad(e.target.value)}
                   placeholder="Type your notes here..."
                   className="flex-1 resize-none border-gray-200 focus:border-[#2A53A0] text-sm leading-relaxed p-4"
                 />
                 <div className="mt-2 flex justify-end">
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Save className="h-3 w-3" />
                      Saved locally
                    </span>
                 </div>
              </div>
            )}
          </div>
      </SheetContent>
    </Sheet>
  );
}
