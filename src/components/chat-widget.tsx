"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mic, Image, Paperclip, Send, Sun, Moon } from "lucide-react";

type Message = {
   id: number;
   text: string;
   sender: "user" | "bot";
   type: "text" | "image" | "audio" | "file";
};

type ChatWidgetProps = {
   className?: string;
};

export function ChatWidget(props: ChatWidgetProps) {
   const [messages, setMessages] = useState<Message[]>([]);
   const [inputText, setInputText] = useState("");
   const [isDarkMode, setIsDarkMode] = useState(false);

   const handleSendMessage = async () => {
      if (inputText.trim()) {
         const newMessage: Message = {
            id: Date.now(),
            text: inputText,
            sender: "user",
            type: "text",
         };
         setMessages([...messages, newMessage]);
         setInputText("");

         try {
            const response = await fetch("/api/send_message", {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({ message: inputText }),
            });
            const data = await response.json();
            const botResponse: Message = {
               id: Date.now() + 1,
               text: data.response,
               sender: "bot",
               type: "text",
            };
            setMessages((prevMessages) => [...prevMessages, botResponse]);
         } catch (error) {
            console.error("Error sending message:", error);
         }
      }
   };

   useEffect(() => {
      // Scroll to bottom of chat when new messages are added
      const chatContainer = document.getElementById("chat-container");
      if (chatContainer) {
         chatContainer.scrollTop = chatContainer.scrollHeight;
      }
   }, [messages]);

   return (
      <div
         className={`flex flex-col ${
            isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
         } ${props.className}`}
      >
         <header className="flex justify-between items-center p-4 border-b">
            <h1 className="text-2xl font-bold">Smart Chatbot</h1>
            <div className="flex items-center space-x-2">
               <span>
                  {isDarkMode ? (
                     <Moon className="h-5 w-5" />
                  ) : (
                     <Sun className="h-5 w-5" />
                  )}
               </span>
               <Switch
                  checked={isDarkMode}
                  onCheckedChange={setIsDarkMode}
                  aria-label="Toggle dark mode"
               />
            </div>
         </header>
         <main
            id="chat-container"
            className="flex-1 overflow-y-auto p-4 space-y-4"
         >
            {messages.map((message) => (
               <div
                  key={message.id}
                  className={`flex ${
                     message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
               >
                  <div
                     className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${
                        message.sender === "user"
                           ? "bg-blue-500 text-white"
                           : isDarkMode
                           ? "bg-gray-800"
                           : "bg-white"
                     } shadow-md animate-fade-in`}
                  >
                     {message.sender === "bot" && (
                        <Avatar className="h-8 w-8 mb-2">
                           <AvatarImage src="/bot-avatar.png" alt="Bot" />
                           <AvatarFallback>Bot</AvatarFallback>
                        </Avatar>
                     )}
                     <p>{message.text}</p>
                  </div>
               </div>
            ))}
         </main>
         <footer className="p-4 border-t">
            <div className="flex space-x-2 mb-2">
               <Button size="icon" variant="outline" aria-label="Upload file">
                  <Paperclip className="h-4 w-4" />
               </Button>
               <Button size="icon" variant="outline" aria-label="Upload image">
                  <Image className="h-4 w-4" />
               </Button>
               <Button size="icon" variant="outline" aria-label="Record audio">
                  <Mic className="h-4 w-4" />
               </Button>
            </div>
            <div className="flex space-x-2">
               <Textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                  rows={1}
               />
               <Button onClick={handleSendMessage} aria-label="Send message">
                  <Send className="h-4 w-4" />
               </Button>
            </div>
         </footer>
      </div>
   );
}
