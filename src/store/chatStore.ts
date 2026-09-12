import { create } from 'zustand';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
}

interface ChatStore {
  isOpen: boolean;
  messages: Message[];
  toggleChat: () => void;
  addMessage: (text: string, isBot: boolean) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  isOpen: false,
  messages: [
    { id: '1', text: 'Hi! How can I help you today?', isBot: true }
  ],
  toggleChat: () => set((state) => ({ isOpen: !state.isOpen })),
  addMessage: (text, isBot) => set((state) => ({
    messages: [...state.messages, { id: Date.now().toString(), text, isBot }]
  }))
}));
