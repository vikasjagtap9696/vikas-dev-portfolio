import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { MessageCircle, X, Send, Bot, User, Loader2, Briefcase, Mail, Code, FolderOpen, RotateCcw, Volume2, VolumeX, Download, Mic, MicOff, Copy, Check, PlayCircle, StopCircle, Tag, ChevronDown, ChevronUp, Sun, Moon, Gauge, ThumbsUp, ThumbsDown, Search, Clock, Sparkles, Pin, PinOff, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "next-themes";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Topic = "general" | "projects" | "services" | "tech" | "contact";

type Reaction = "up" | "down" | null;

type Message = {
  role: "user" | "assistant";
  content: string;
  topic?: Topic;
  reaction?: Reaction;
  timestamp?: number;
  pinned?: boolean;
};

type Language = "en" | "es" | "fr" | "de" | "zh" | "ja" | "hi";

const translations: Record<Language, {
  title: string;
  placeholder: string;
  listening: string;
  quickQuestions: string;
  followUp: string;
  filterByTopic: string;
  search: string;
  searchMessages: string;
  found: string;
  messages: string;
  all: string;
  exportText: string;
  exportJson: string;
  clearChat: string;
  mute: string;
  unmute: string;
  typingSpeed: string;
  instant: string;
  fast: string;
  normal: string;
  slow: string;
  listen: string;
  stop: string;
  helpful: string;
  notHelpful: string;
  pin: string;
  unpin: string;
  pinnedMessages: string;
  language: string;
}> = {
  en: {
    title: "Vikas AI Assistant",
    placeholder: "Ask me anything...",
    listening: "Listening...",
    quickQuestions: "Quick questions:",
    followUp: "Suggested follow-ups:",
    filterByTopic: "Filter by topic",
    search: "Search",
    searchMessages: "Search messages...",
    found: "Found",
    messages: "messages",
    all: "All",
    exportText: "Export as Text",
    exportJson: "Export as JSON",
    clearChat: "Clear chat",
    mute: "Mute notifications",
    unmute: "Enable notifications",
    typingSpeed: "Typing Speed",
    instant: "Instant",
    fast: "Fast",
    normal: "Normal",
    slow: "Slow",
    listen: "Listen",
    stop: "Stop",
    helpful: "Helpful",
    notHelpful: "Not helpful",
    pin: "Pin message",
    unpin: "Unpin message",
    pinnedMessages: "Pinned messages",
    language: "Language",
  },
  es: {
    title: "Asistente IA de Vikas",
    placeholder: "Pregúntame algo...",
    listening: "Escuchando...",
    quickQuestions: "Preguntas rápidas:",
    followUp: "Sugerencias:",
    filterByTopic: "Filtrar por tema",
    search: "Buscar",
    searchMessages: "Buscar mensajes...",
    found: "Encontrados",
    messages: "mensajes",
    all: "Todos",
    exportText: "Exportar como texto",
    exportJson: "Exportar como JSON",
    clearChat: "Limpiar chat",
    mute: "Silenciar",
    unmute: "Activar sonido",
    typingSpeed: "Velocidad de escritura",
    instant: "Instantáneo",
    fast: "Rápido",
    normal: "Normal",
    slow: "Lento",
    listen: "Escuchar",
    stop: "Detener",
    helpful: "Útil",
    notHelpful: "No útil",
    pin: "Fijar mensaje",
    unpin: "Desfijar mensaje",
    pinnedMessages: "Mensajes fijados",
    language: "Idioma",
  },
  fr: {
    title: "Assistant IA Vikas",
    placeholder: "Posez-moi une question...",
    listening: "Écoute en cours...",
    quickQuestions: "Questions rapides:",
    followUp: "Suggestions:",
    filterByTopic: "Filtrer par sujet",
    search: "Rechercher",
    searchMessages: "Rechercher des messages...",
    found: "Trouvé",
    messages: "messages",
    all: "Tous",
    exportText: "Exporter en texte",
    exportJson: "Exporter en JSON",
    clearChat: "Effacer le chat",
    mute: "Désactiver les sons",
    unmute: "Activer les sons",
    typingSpeed: "Vitesse de frappe",
    instant: "Instantané",
    fast: "Rapide",
    normal: "Normal",
    slow: "Lent",
    listen: "Écouter",
    stop: "Arrêter",
    helpful: "Utile",
    notHelpful: "Pas utile",
    pin: "Épingler",
    unpin: "Désépingler",
    pinnedMessages: "Messages épinglés",
    language: "Langue",
  },
  de: {
    title: "Vikas KI-Assistent",
    placeholder: "Frag mich etwas...",
    listening: "Zuhören...",
    quickQuestions: "Schnelle Fragen:",
    followUp: "Vorschläge:",
    filterByTopic: "Nach Thema filtern",
    search: "Suchen",
    searchMessages: "Nachrichten suchen...",
    found: "Gefunden",
    messages: "Nachrichten",
    all: "Alle",
    exportText: "Als Text exportieren",
    exportJson: "Als JSON exportieren",
    clearChat: "Chat löschen",
    mute: "Stumm schalten",
    unmute: "Ton aktivieren",
    typingSpeed: "Schreibgeschwindigkeit",
    instant: "Sofort",
    fast: "Schnell",
    normal: "Normal",
    slow: "Langsam",
    listen: "Anhören",
    stop: "Stoppen",
    helpful: "Hilfreich",
    notHelpful: "Nicht hilfreich",
    pin: "Anpinnen",
    unpin: "Lösen",
    pinnedMessages: "Angeheftete Nachrichten",
    language: "Sprache",
  },
  zh: {
    title: "Vikas AI 助手",
    placeholder: "问我任何问题...",
    listening: "正在聆听...",
    quickQuestions: "快速问题:",
    followUp: "建议的后续问题:",
    filterByTopic: "按主题筛选",
    search: "搜索",
    searchMessages: "搜索消息...",
    found: "找到",
    messages: "条消息",
    all: "全部",
    exportText: "导出为文本",
    exportJson: "导出为JSON",
    clearChat: "清除聊天",
    mute: "静音",
    unmute: "取消静音",
    typingSpeed: "打字速度",
    instant: "即时",
    fast: "快速",
    normal: "正常",
    slow: "慢速",
    listen: "收听",
    stop: "停止",
    helpful: "有帮助",
    notHelpful: "没有帮助",
    pin: "固定消息",
    unpin: "取消固定",
    pinnedMessages: "固定的消息",
    language: "语言",
  },
  ja: {
    title: "Vikas AIアシスタント",
    placeholder: "何でも聞いてください...",
    listening: "聞いています...",
    quickQuestions: "クイック質問:",
    followUp: "おすすめの質問:",
    filterByTopic: "トピックで絞り込む",
    search: "検索",
    searchMessages: "メッセージを検索...",
    found: "見つかりました",
    messages: "件",
    all: "すべて",
    exportText: "テキストでエクスポート",
    exportJson: "JSONでエクスポート",
    clearChat: "チャットをクリア",
    mute: "ミュート",
    unmute: "ミュート解除",
    typingSpeed: "タイピング速度",
    instant: "即時",
    fast: "速い",
    normal: "普通",
    slow: "遅い",
    listen: "聴く",
    stop: "停止",
    helpful: "役立つ",
    notHelpful: "役立たない",
    pin: "ピン留め",
    unpin: "ピン解除",
    pinnedMessages: "ピン留めメッセージ",
    language: "言語",
  },
  hi: {
    title: "Vikas AI सहायक",
    placeholder: "कुछ भी पूछें...",
    listening: "सुन रहा हूं...",
    quickQuestions: "त्वरित प्रश्न:",
    followUp: "सुझाए गए प्रश्न:",
    filterByTopic: "विषय से फ़िल्टर करें",
    search: "खोजें",
    searchMessages: "संदेश खोजें...",
    found: "मिला",
    messages: "संदेश",
    all: "सभी",
    exportText: "टेक्स्ट में निर्यात",
    exportJson: "JSON में निर्यात",
    clearChat: "चैट साफ़ करें",
    mute: "म्यूट",
    unmute: "अनम्यूट",
    typingSpeed: "टाइपिंग गति",
    instant: "तुरंत",
    fast: "तेज़",
    normal: "सामान्य",
    slow: "धीमा",
    listen: "सुनें",
    stop: "रोकें",
    helpful: "उपयोगी",
    notHelpful: "उपयोगी नहीं",
    pin: "पिन करें",
    unpin: "अनपिन करें",
    pinnedMessages: "पिन किए गए संदेश",
    language: "भाषा",
  },
};

const languageNames: Record<Language, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  zh: "中文",
  ja: "日本語",
  hi: "हिन्दी",
};

// Follow-up suggestions based on conversation context
const getFollowUpSuggestions = (lastUserMessage: string, lastAssistantMessage: string): string[] => {
  const lowerUser = lastUserMessage.toLowerCase();
  const lowerAssistant = lastAssistantMessage.toLowerCase();
  
  if (lowerUser.includes("project") || lowerAssistant.includes("project")) {
    return [
      "What technologies were used?",
      "How long did it take to build?",
      "Can I see a demo?",
    ];
  }
  if (lowerUser.includes("service") || lowerAssistant.includes("service")) {
    return [
      "What's your typical timeline?",
      "Do you offer maintenance?",
      "What's your pricing?",
    ];
  }
  if (lowerUser.includes("tech") || lowerAssistant.includes("technology") || lowerAssistant.includes("stack")) {
    return [
      "Which framework do you prefer?",
      "Do you work with AI/ML?",
      "What about mobile development?",
    ];
  }
  if (lowerUser.includes("contact") || lowerAssistant.includes("contact")) {
    return [
      "What's the best way to reach you?",
      "Are you available for freelance?",
      "What's your response time?",
    ];
  }
  // Default suggestions
  return [
    "Tell me about your experience",
    "What makes you different?",
    "Can we schedule a call?",
  ];
};

const CHAT_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/chat`;
const STORAGE_KEY = "vikas-ai-chat-history";

const topicLabels: Record<Topic, { label: string; color: string }> = {
  general: { label: "General", color: "bg-muted text-muted-foreground" },
  projects: { label: "Projects", color: "bg-blue-500/20 text-blue-600 dark:text-blue-400" },
  services: { label: "Services", color: "bg-green-500/20 text-green-600 dark:text-green-400" },
  tech: { label: "Tech Stack", color: "bg-purple-500/20 text-purple-600 dark:text-purple-400" },
  contact: { label: "Contact", color: "bg-orange-500/20 text-orange-600 dark:text-orange-400" },
};

const detectTopic = (message: string): Topic => {
  const lowerMessage = message.toLowerCase();
  if (lowerMessage.includes("project") || lowerMessage.includes("portfolio") || lowerMessage.includes("work")) {
    return "projects";
  }
  if (lowerMessage.includes("service") || lowerMessage.includes("offer") || lowerMessage.includes("hire")) {
    return "services";
  }
  if (lowerMessage.includes("tech") || lowerMessage.includes("stack") || lowerMessage.includes("language") || lowerMessage.includes("framework")) {
    return "tech";
  }
  if (lowerMessage.includes("contact") || lowerMessage.includes("email") || lowerMessage.includes("reach") || lowerMessage.includes("hire")) {
    return "contact";
  }
  return "general";
};

const quickReplies = [
  { label: "View Projects", icon: FolderOpen, message: "Show me your portfolio projects", topic: "projects" as Topic },
  { label: "Services", icon: Briefcase, message: "What services do you offer?", topic: "services" as Topic },
  { label: "Tech Stack", icon: Code, message: "What technologies do you use?", topic: "tech" as Topic },
  { label: "Contact", icon: Mail, message: "How can I contact Vikas for a project?", topic: "contact" as Topic },
];

const createInitialMessage = (): Message => ({
  role: "assistant",
  content: "Hi! I'm Vikas AI Assistant. I can help you understand what kind of project you need, suggest the right technologies, and connect you with Vikas for your development needs. How can I help you today?",
  timestamp: Date.now(),
});

const formatTimestamp = (timestamp?: number): string => {
  if (!timestamp) return "";
  return format(new Date(timestamp), "h:mm a");
};

const TypingIndicator = () => (
  <div className="flex gap-3 justify-start">
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
      <Bot className="h-4 w-4" />
    </div>
    <div className="bg-muted rounded-lg px-4 py-3 flex items-center gap-1">
      <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
      <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
      <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
    </div>
  </div>
);

// Code block with copy button
const CodeBlock = ({ language, children }: { language: string; children: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleCopy}
        className="absolute right-1 top-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 hover:bg-background"
        title="Copy code"
      >
        {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
      </Button>
      <SyntaxHighlighter
        style={oneDark}
        language={language}
        PreTag="div"
        customStyle={{
          margin: "0.5rem 0",
          borderRadius: "0.375rem",
          fontSize: "0.75rem",
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
};

// Generate a notification sound using Web Audio API
const playNotificationSound = () => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  } catch (error) {
    console.log("Could not play notification sound:", error);
  }
};

// Speech Recognition setup
const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

export function AIChatbot() {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.length > 0 ? parsed : [createInitialMessage()];
      }
    } catch (error) {
      console.log("Could not load chat history:", error);
    }
    return [createInitialMessage()];
  });
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingMessageIndex, setSpeakingMessageIndex] = useState<number | null>(null);
  const [topicFilter, setTopicFilter] = useState<Topic | "all">("all");
  const [showTopicFilter, setShowTopicFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(() => {
    try {
      const saved = localStorage.getItem("vikas-ai-typing-speed");
      return saved ? parseInt(saved, 10) : 0; // 0 = instant, higher = slower
    } catch {
      return 0;
    }
  });
  const [soundEnabled, setSoundEnabled] = useState(() => {
    try {
      return localStorage.getItem("vikas-ai-sound") !== "false";
    } catch {
      return true;
    }
  });
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem("vikas-ai-language");
      return (saved as Language) || "en";
    } catch {
      return "en";
    }
  });
  const [showPinnedOnly, setShowPinnedOnly] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  const typingQueueRef = useRef<string[]>([]);
  const isProcessingQueueRef = useRef(false);

  const t = translations[language];

  // Save typing speed preference
  useEffect(() => {
    try {
      localStorage.setItem("vikas-ai-typing-speed", String(typingSpeed));
    } catch (error) {
      console.log("Could not save typing speed:", error);
    }
  }, [typingSpeed]);

  // Save language preference
  useEffect(() => {
    try {
      localStorage.setItem("vikas-ai-language", language);
    } catch (error) {
      console.log("Could not save language:", error);
    }
  }, [language]);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  // Text-to-speech function
  const speakMessage = useCallback((text: string, messageIndex: number) => {
    if (!window.speechSynthesis) {
      toast({
        title: "Text-to-speech not supported",
        description: "Your browser does not support text-to-speech.",
        variant: "destructive",
      });
      return;
    }

    // Stop current speech if playing
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setSpeakingMessageIndex(null);
      return;
    }

    // Clean markdown from text
    const cleanText = text
      .replace(/```[\s\S]*?```/g, "code block")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/\*([^*]+)\*/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/#{1,6}\s/g, "");

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setSpeakingMessageIndex(messageIndex);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setSpeakingMessageIndex(null);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setSpeakingMessageIndex(null);
    };

    speechSynthesisRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [isSpeaking, toast]);

  // Stop speech on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Handle message reactions
  const handleReaction = useCallback((messageIndex: number, reaction: Reaction) => {
    setMessages((prev) => {
      const newMessages = [...prev];
      const currentReaction = newMessages[messageIndex].reaction;
      // Toggle off if clicking same reaction, otherwise set new reaction
      newMessages[messageIndex] = {
        ...newMessages[messageIndex],
        reaction: currentReaction === reaction ? null : reaction,
      };
      return newMessages;
    });
    
    if (reaction === "up") {
      toast({
        title: "Thanks for the feedback!",
        description: "Glad you found this helpful.",
      });
    } else if (reaction === "down") {
      toast({
        title: "Thanks for the feedback!",
        description: "We'll work on improving.",
      });
    }
  }, [toast]);

  // Handle message pinning
  const handlePin = useCallback((messageIndex: number) => {
    setMessages((prev) => {
      const newMessages = [...prev];
      newMessages[messageIndex] = {
        ...newMessages[messageIndex],
        pinned: !newMessages[messageIndex].pinned,
      };
      return newMessages;
    });
    
    const isPinned = !messages[messageIndex]?.pinned;
    toast({
      title: isPinned ? t.pin : t.unpin,
      description: isPinned ? "Message saved for later" : "Message removed from pins",
    });
  }, [messages, toast, t]);

  // Get pinned messages count
  const pinnedCount = messages.filter(m => m.pinned).length;

  // Get topic statistics
  const topicStats = messages.reduce((acc, msg) => {
    if (msg.role === "user" && msg.topic) {
      acc[msg.topic] = (acc[msg.topic] || 0) + 1;
    }
    return acc;
  }, {} as Record<Topic, number>);

  // Filter messages by topic, search query, and pinned status
  const filteredMessages = messages.filter((msg, idx) => {
    // Apply pinned filter first
    if (showPinnedOnly && !msg.pinned) return false;
    
    // Always show initial message unless searching or showing pinned only
    if (idx === 0 && !searchQuery && !showPinnedOnly) return true;
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!msg.content.toLowerCase().includes(query)) {
        return false;
      }
    }
    
    // Apply topic filter
    if (topicFilter !== "all") {
      if (msg.topic === topicFilter) return true;
      // Show assistant responses that follow a message with matching topic
      const prevMsg = messages[idx - 1];
      return prevMsg?.topic === topicFilter && msg.role === "assistant";
    }
    
    return true;
  });

  // Get follow-up suggestions based on last conversation
  const followUpSuggestions = useMemo(() => {
    if (messages.length < 2 || isLoading) return [];
    // Find last assistant and user messages (compatible with older JS targets)
    let lastAssistantIdx = -1;
    let lastUserIdx = -1;
    for (let i = messages.length - 1; i >= 0; i--) {
      if (lastAssistantIdx === -1 && messages[i].role === "assistant") lastAssistantIdx = i;
      if (lastUserIdx === -1 && messages[i].role === "user") lastUserIdx = i;
      if (lastAssistantIdx !== -1 && lastUserIdx !== -1) break;
    }
    if (lastAssistantIdx === -1 || lastUserIdx === -1) return [];
    if (lastAssistantIdx !== messages.length - 1) return []; // Only show after assistant response
    return getFollowUpSuggestions(messages[lastUserIdx].content, messages[lastAssistantIdx].content);
  }, [messages, isLoading]);

  // Initialize speech recognition
  useEffect(() => {
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join("");
        setInput(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
        if (event.error === "not-allowed") {
          toast({
            title: "Microphone access denied",
            description: "Please allow microphone access to use voice input.",
            variant: "destructive",
          });
        }
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [toast]);

  const toggleListening = useCallback(() => {
    if (!SpeechRecognition) {
      toast({
        title: "Voice input not supported",
        description: "Your browser does not support speech recognition.",
        variant: "destructive",
      });
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  }, [isListening, toast]);

  // Clear unread count when chat opens
  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
    }
  }, [isOpen]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (error) {
      console.log("Could not save chat history:", error);
    }
  }, [messages]);

  // Save sound preference
  useEffect(() => {
    try {
      localStorage.setItem("vikas-ai-sound", String(soundEnabled));
    } catch (error) {
      console.log("Could not save sound preference:", error);
    }
  }, [soundEnabled]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape to close chat
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const clearChat = () => {
    setMessages([createInitialMessage()]);
    setInput("");
  };

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => !prev);
  }, []);

  const exportChat = useCallback((format: "text" | "json") => {
    const timestamp = new Date().toISOString().split("T")[0];
    let content: string;
    let filename: string;
    let mimeType: string;

    if (format === "json") {
      content = JSON.stringify({
        exportedAt: new Date().toISOString(),
        messages: messages,
      }, null, 2);
      filename = `vikas-ai-chat-${timestamp}.json`;
      mimeType = "application/json";
    } else {
      content = messages
        .map((m) => `${m.role === "user" ? "You" : "Vikas AI"}: ${m.content}`)
        .join("\n\n---\n\n");
      content = `Chat with Vikas AI Assistant\nExported: ${new Date().toLocaleString()}\n\n${"=".repeat(50)}\n\n${content}`;
      filename = `vikas-ai-chat-${timestamp}.txt`;
      mimeType = "text/plain";
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [messages]);

  const sendMessage = async (messageText?: string, messageTopic?: Topic) => {
    const text = messageText || input.trim();
    if (!text || isLoading) return;

    const topic = messageTopic || detectTopic(text);
    const userMessage: Message = { role: "user", content: text, topic, timestamp: Date.now() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setIsTyping(true);
    setTopicFilter("all"); // Reset filter when sending a new message

    let assistantContent = "";
    const assistantTimestamp = Date.now();

    try {
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Failed to get response");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let displayedContent = "";

      setIsTyping(false);
      setMessages((prev) => [...prev, { role: "assistant", content: "", timestamp: assistantTimestamp }]);

      // Process the queue with typing effect
      const processQueue = async () => {
        if (isProcessingQueueRef.current) return;
        isProcessingQueueRef.current = true;

        while (typingQueueRef.current.length > 0) {
          const char = typingQueueRef.current.shift();
          if (char) {
            displayedContent += char;
            setMessages((prev) => {
              const newMessages = [...prev];
              newMessages[newMessages.length - 1] = {
                role: "assistant",
                content: displayedContent,
                timestamp: assistantTimestamp,
              };
              return newMessages;
            });
            if (typingSpeed > 0) {
              await new Promise(resolve => setTimeout(resolve, typingSpeed));
            }
          }
        }

        isProcessingQueueRef.current = false;
      };

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              if (typingSpeed > 0) {
                // Add to queue for typing effect
                for (const char of content) {
                  typingQueueRef.current.push(char);
                }
                processQueue();
              } else {
                // Instant display
                displayedContent = assistantContent;
                setMessages((prev) => {
                  const newMessages = [...prev];
                  newMessages[newMessages.length - 1] = {
                    role: "assistant",
                    content: assistantContent,
                    timestamp: assistantTimestamp,
                  };
                  return newMessages;
                });
              }
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Finish processing any remaining queue
      while (typingQueueRef.current.length > 0) {
        await processQueue();
        await new Promise(resolve => setTimeout(resolve, 10));
      }

      // Play notification sound and increment unread count when response is complete
      if (soundEnabled) {
        playNotificationSound();
      }
      if (!isOpen) {
        setUnreadCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm sorry, I'm having trouble connecting right now. Please try again or use the contact form to reach Vikas directly.",
        },
      ]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleQuickReply = (message: string, topic: Topic) => {
    sendMessage(message, topic);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Enter to send (without shift)
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
    // Ctrl+Enter or Cmd+Enter to send
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg transition-all hover:scale-105 ${
          isOpen ? "hidden" : "flex"
        }`}
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs font-bold flex items-center justify-center animate-scale-in">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] shadow-2xl border-2 animate-scale-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 bg-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <CardTitle className="text-lg font-semibold">{t.title}</CardTitle>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
                title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
                    title={t.language}
                  >
                    <Globe className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-40" align="end">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground mb-2">{t.language}</p>
                    {(Object.keys(languageNames) as Language[]).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setLanguage(lang)}
                        className={`w-full text-left px-2 py-1 text-sm rounded hover:bg-muted transition-colors ${language === lang ? "bg-muted font-medium" : ""}`}
                      >
                        {languageNames[lang]}
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
                    title={t.typingSpeed}
                  >
                    <Gauge className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56" align="end">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{t.typingSpeed}</span>
                      <span className="text-xs text-muted-foreground">
                        {typingSpeed === 0 ? t.instant : typingSpeed <= 10 ? t.fast : typingSpeed <= 30 ? t.normal : t.slow}
                      </span>
                    </div>
                    <Slider
                      value={[typingSpeed]}
                      onValueChange={(value) => setTypingSpeed(value[0])}
                      max={50}
                      step={5}
                      className="w-full"
                    />
                  </div>
                </PopoverContent>
              </Popover>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSound}
                className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
                title={soundEnabled ? t.mute : t.unmute}
              >
                {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
              {messages.length > 1 && (
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
                        title="Export chat"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => exportChat("text")}>
                        {t.exportText}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => exportChat("json")}>
                        {t.exportJson}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={clearChat}
                    className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
                    title={t.clearChat}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {/* Search and Filter Bar */}
            {messages.length > 2 && (
              <div className="border-b px-4 py-2 space-y-2">
                {/* Search, Filter, and Pin Toggle */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowSearch(!showSearch)}
                    className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Search className="h-3 w-3" />
                    <span>{t.search}</span>
                  </button>
                  <span className="text-muted-foreground/50">|</span>
                  <button
                    onClick={() => setShowTopicFilter(!showTopicFilter)}
                    className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Tag className="h-3 w-3" />
                    <span>{t.filterByTopic}</span>
                    {showTopicFilter ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                  </button>
                  {pinnedCount > 0 && (
                    <>
                      <span className="text-muted-foreground/50">|</span>
                      <button
                        onClick={() => setShowPinnedOnly(!showPinnedOnly)}
                        className={`flex items-center gap-2 text-xs transition-colors ${showPinnedOnly ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"}`}
                      >
                        <Pin className="h-3 w-3" />
                        <span>{t.pinnedMessages} ({pinnedCount})</span>
                      </button>
                    </>
                  )}
                </div>

                {/* Search Input */}
                {showSearch && (
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                    <Input
                      placeholder={t.searchMessages}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-7 pl-7 text-xs"
                    />
                    {searchQuery && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSearchQuery("")}
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-5 w-5"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                )}

                {/* Topic Filter */}
                {showTopicFilter && (
                  <div className="flex flex-wrap gap-1">
                    <Badge
                      variant={topicFilter === "all" ? "default" : "outline"}
                      className="cursor-pointer text-xs"
                      onClick={() => setTopicFilter("all")}
                    >
                      {t.all} ({messages.length - 1})
                    </Badge>
                    {(Object.keys(topicStats) as Topic[]).map((topic) => (
                      <Badge
                        key={topic}
                        variant={topicFilter === topic ? "default" : "outline"}
                        className={`cursor-pointer text-xs ${topicFilter !== topic ? topicLabels[topic].color : ""}`}
                        onClick={() => setTopicFilter(topic)}
                      >
                        {topicLabels[topic].label} ({topicStats[topic]})
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Search Results Count */}
                {searchQuery && (
                  <p className="text-xs text-muted-foreground">
                    {t.found} {filteredMessages.length} {t.messages}
                  </p>
                )}
              </div>
            )}

            <ScrollArea className="h-[350px] p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {filteredMessages.map((message, index) => {
                  const originalIndex = messages.indexOf(message);
                  return (
                    <div
                      key={originalIndex}
                      className={`flex gap-3 animate-fade-in ${
                        message.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {message.role === "assistant" && (
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <Bot className="h-4 w-4" />
                        </div>
                      )}
                      <div className="flex flex-col gap-1 max-w-[80%]">
                        {/* Topic badge and timestamp for user messages */}
                        {message.role === "user" && (
                          <div className="flex items-center justify-end gap-2">
                            {message.topic && (
                              <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 ${topicLabels[message.topic].color}`}>
                                {topicLabels[message.topic].label}
                              </Badge>
                            )}
                            {message.timestamp && (
                              <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                                <Clock className="h-2.5 w-2.5" />
                                {formatTimestamp(message.timestamp)}
                              </span>
                            )}
                          </div>
                        )}
                        {/* Timestamp for assistant messages */}
                        {message.role === "assistant" && message.timestamp && originalIndex > 0 && (
                          <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                            <Clock className="h-2.5 w-2.5" />
                            {formatTimestamp(message.timestamp)}
                          </span>
                        )}
                        <div
                          className={`rounded-lg px-4 py-2 text-sm ${
                            message.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted prose prose-sm prose-neutral dark:prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
                          }`}
                        >
                          {message.role === "assistant" ? (
                            <ReactMarkdown
                              components={{
                                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                                ul: ({ children }) => <ul className="list-disc pl-4 mb-2">{children}</ul>,
                                ol: ({ children }) => <ol className="list-decimal pl-4 mb-2">{children}</ol>,
                                li: ({ children }) => <li className="mb-1">{children}</li>,
                                strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                                code: ({ children, className }) => {
                                  const match = /language-(\w+)/.exec(className || "");
                                  const isInline = !className;
                                  
                                  if (isInline) {
                                    return (
                                      <code className="bg-background/50 px-1 py-0.5 rounded text-xs font-mono">
                                        {children}
                                      </code>
                                    );
                                  }
                                  
                                  return (
                                    <CodeBlock language={match ? match[1] : "text"}>
                                      {String(children).replace(/\n$/, "")}
                                    </CodeBlock>
                                  );
                                },
                                pre: ({ children }) => <>{children}</>,
                                a: ({ href, children }) => (
                                  <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:no-underline">
                                    {children}
                                  </a>
                                ),
                              }}
                            >
                              {message.content}
                            </ReactMarkdown>
                          ) : (
                            message.content
                          )}
                        </div>
                        {message.role === "assistant" && message.content && originalIndex > 0 && (
                          <div className="flex items-center gap-1 self-start flex-wrap">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => speakMessage(message.content, originalIndex)}
                              className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
                            >
                              {speakingMessageIndex === originalIndex ? (
                                <>
                                  <StopCircle className="h-3 w-3 mr-1" />
                                  {t.stop}
                                </>
                              ) : (
                                <>
                                  <PlayCircle className="h-3 w-3 mr-1" />
                                  {t.listen}
                                </>
                              )}
                            </Button>
                            <div className="flex items-center gap-0.5 border-l pl-1 ml-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleReaction(originalIndex, "up")}
                                className={`h-6 w-6 ${message.reaction === "up" ? "text-green-500" : "text-muted-foreground hover:text-foreground"}`}
                                title={t.helpful}
                              >
                                <ThumbsUp className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleReaction(originalIndex, "down")}
                                className={`h-6 w-6 ${message.reaction === "down" ? "text-red-500" : "text-muted-foreground hover:text-foreground"}`}
                                title={t.notHelpful}
                              >
                                <ThumbsDown className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handlePin(originalIndex)}
                                className={`h-6 w-6 ${message.pinned ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
                                title={message.pinned ? t.unpin : t.pin}
                              >
                                {message.pinned ? <PinOff className="h-3 w-3" /> : <Pin className="h-3 w-3" />}
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                      {message.role === "user" && (
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                          <User className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                  );
                })}
                {isTyping && <TypingIndicator />}
              </div>
            </ScrollArea>
            
            {/* Follow-up Suggestions */}
            {followUpSuggestions.length > 0 && messages.length > 2 && !isLoading && (
              <div className="border-t px-4 py-3">
                <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  {t.followUp}
                </p>
                <div className="flex flex-wrap gap-2">
                  {followUpSuggestions.map((suggestion, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      size="sm"
                      onClick={() => sendMessage(suggestion)}
                      className="text-xs h-7"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quick Reply Buttons */}
            {messages.length <= 2 && !isLoading && (
              <div className="border-t px-4 py-3">
                <p className="text-xs text-muted-foreground mb-2">{t.quickQuestions}</p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply) => (
                    <Button
                      key={reply.label}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickReply(reply.message, reply.topic)}
                      className="text-xs h-8"
                    >
                      <reply.icon className="h-3 w-3 mr-1" />
                      {reply.label}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  placeholder={isListening ? t.listening : t.placeholder}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading || isListening}
                  className="flex-1"
                />
                <Button
                  onClick={toggleListening}
                  variant={isListening ? "destructive" : "outline"}
                  size="icon"
                  disabled={isLoading}
                  title={isListening ? "Stop listening" : "Voice input"}
                >
                  {isListening ? (
                    <MicOff className="h-4 w-4" />
                  ) : (
                    <Mic className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || isLoading}
                  size="icon"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
