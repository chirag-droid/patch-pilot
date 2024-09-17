"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Bot, MessageCircle, Send, X } from "lucide-react";
import {
   ChatBubble,
   ChatBubbleAvatar,
   ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { ChatInput } from "@/components/ui/chat/chat-input";
import {
   ExpandableChatHeader,
   ExpandableChatBody,
   ExpandableChatFooter,
   ChatPosition,
   ChatSize,
} from "@/components/ui/chat/expandable-chat";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { AnimatePresence, motion } from "framer-motion";
import { useApiURL } from "@/hooks/use-api-url";
import { cn } from "@/lib/utils";
import Markdown from "react-markdown";

const chatConfig = {
   dimensions: {
      sm: "sm:max-w-sm sm:max-h-[500px]",
      md: "sm:max-w-md sm:max-h-[600px]",
      lg: "sm:max-w-lg sm:max-h-[700px]",
      xl: "sm:max-w-xl sm:max-h-[800px]",
      full: "sm:w-full sm:h-full",
   },
   positions: {
      "bottom-right": "bottom-5 right-5",
      "bottom-left": "bottom-5 left-5",
   },
   chatPositions: {
      "bottom-right": "sm:bottom-[calc(100%+10px)] sm:right-0",
      "bottom-left": "sm:bottom-[calc(100%+10px)] sm:left-0",
   },
   states: {
      open: "pointer-events-auto opacity-100 visible scale-100 translate-y-0",
      closed:
         "pointer-events-none opacity-0 invisible scale-100 sm:translate-y-5",
   },
};

interface ExpandableChatToggleProps
   extends React.ButtonHTMLAttributes<HTMLButtonElement> {
   icon?: React.ReactNode;
   isOpen: boolean;
   toggleChat: () => void;
}

const ExpandableChatToggle: React.FC<ExpandableChatToggleProps> = ({
   className,
   icon,
   isOpen,
   toggleChat,
   ...props
}) => (
   <Button
      variant="default"
      onClick={toggleChat}
      className={cn(
         "w-14 h-14 rounded-full shadow-md flex items-center justify-center hover:shadow-lg hover:shadow-black/30 transition-all duration-300",
         className
      )}
      {...props}
   >
      {isOpen ? (
         <X className="h-6 w-6" />
      ) : (
         icon || <MessageCircle className="h-6 w-6" />
      )}
   </Button>
);

interface ExpandableChatProps extends React.HTMLAttributes<HTMLDivElement> {
   position?: ChatPosition;
   size?: ChatSize;
   icon?: React.ReactNode;
}

const ExpandableChat: React.FC<ExpandableChatProps> = ({
   className,
   position = "bottom-right",
   size = "md",
   icon,
   children,
   ...props
}) => {
   const [isOpen, setIsOpen] = useState(false);
   const chatRef = useRef<HTMLDivElement>(null);

   const toggleChat = () => setIsOpen(!isOpen);

   return (
      <div
         className={cn(
            `fixed ${chatConfig.positions[position]} z-50`,
            className
         )}
         {...props}
      >
         <div
            ref={chatRef}
            className={cn(
               "flex flex-col bg-background border sm:rounded-lg shadow-md overflow-hidden transition-all duration-250 ease-out sm:absolute sm:w-[90vw] sm:h-[80vh] fixed inset-0 w-full h-full sm:inset-auto",
               chatConfig.chatPositions[position],
               chatConfig.dimensions[size],
               isOpen ? chatConfig.states.open : chatConfig.states.closed,
               className
            )}
         >
            {children}
            <Button
               variant="ghost"
               size="icon"
               className="absolute top-2 right-2 sm:hidden"
               onClick={toggleChat}
            >
               <X className="h-4 w-4" />
            </Button>
         </div>
         <ExpandableChatToggle
            icon={icon}
            isOpen={isOpen}
            toggleChat={toggleChat}
         />
      </div>
   );
};

interface Message {
   id: string;
   content: string;
   sender: "user" | "ai";
   timestamp: string;
}

const initialChatSupportMessages: Message[] = [
   {
      id: "1",
      content: "Hello! How can I help you today?",
      sender: "ai",
      timestamp: new Date().toLocaleTimeString(),
   },
];

export function ChatWidget() {
   const { url } = useApiURL();
   console.log({ url });

   const [messages, setMessages] = useState<Message[]>(
      initialChatSupportMessages
   );
   const [inputMessage, setInputMessage] = useState("");

   const messagesContainerRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      if (messagesContainerRef.current) {
         messagesContainerRef.current.scrollTop =
            messagesContainerRef.current.scrollHeight;
      }
   }, [messages]);

   const handleSendMessage = () => {
      if (inputMessage.trim()) {
         const newMessage: Message = {
            id: Date.now().toString(),
            content: inputMessage,
            sender: "user",
            timestamp: new Date().toLocaleTimeString(),
         };
         askAI(inputMessage);
         setMessages((_messages) => [..._messages, newMessage]);
         setInputMessage("");
      }
   };

   const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
         e.preventDefault();
         handleSendMessage();
      }
   };

   const askAI = async (question: string) => {
      const response = await fetch(`${url}/ask`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ question }),
      });

      if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const answer: Message = {
         id: Date.now().toString(),
         content: data.answer,
         sender: "ai",
         timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((_messages) => [..._messages, answer]);
   };

   return (
      <ExpandableChat
         icon={<Bot className="h-6 w-6" />}
         size="lg"
         position="bottom-right"
      >
         <ExpandableChatHeader className="flex-col text-center justify-center">
            <h1 className="text-xl font-semibold">Chat with our AI ✨</h1>
            <p>Ask any question for our AI to answer</p>
         </ExpandableChatHeader>
         <ExpandableChatBody>
            <ChatMessageList
               ref={messagesContainerRef}
               className="dark:bg-muted/40"
            >
               <AnimatePresence>
                  {messages.map((message, index) => {
                     return (
                        <motion.div
                           key={index}
                           layout
                           initial={{ opacity: 0, scale: 1, y: 10, x: 0 }}
                           animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                           exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
                           transition={{
                              opacity: { duration: 0.1 },
                              layout: {
                                 type: "spring",
                                 bounce: 0.3,
                                 duration: index * 0.05 + 0.2,
                              },
                           }}
                           style={{ originX: 0.5, originY: 0.5 }}
                           className="flex flex-col"
                        >
                           <ChatBubble
                              key={message.id}
                              variant={
                                 message.sender === "user" ? "sent" : "received"
                              }
                           >
                              <ChatBubbleAvatar
                                 src={
                                    message.sender === "user"
                                       ? "https://avatars.githubusercontent.com/u/114422072?s=400&u=8a176a310ca29c1578a70b1c33bdeea42bf000b4&v=4"
                                       : ""
                                 }
                                 fallback={
                                    message.sender === "user" ? "US" : "🤖"
                                 }
                              />
                              <ChatBubbleMessage
                                 variant={
                                    message.sender === "user"
                                       ? "sent"
                                       : "received"
                                 }
                              >
                                 <Markdown>{message.content}</Markdown>
                              </ChatBubbleMessage>
                           </ChatBubble>
                        </motion.div>
                     );
                  })}
               </AnimatePresence>
            </ChatMessageList>
         </ExpandableChatBody>
         <ExpandableChatFooter>
            <form
               onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
               }}
               className="flex relative gap-2"
            >
               <ChatInput
                  onKeyDown={onKeyDown}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type a message..."
               />
               <Button
                  disabled={!inputMessage.trim()}
                  type="submit"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 shrink-0"
               >
                  <Send className="size-4" />
               </Button>
            </form>
         </ExpandableChatFooter>
      </ExpandableChat>
   );
}
