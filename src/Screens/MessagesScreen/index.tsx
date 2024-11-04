"use client";

import { useEffect, useRef, useState } from "react";
import {
  Plane,
  ArrowLeft,
  Send,
  Menu,
  Smile,
  Paperclip,
  FileDown,
  Search,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import one from "../../../public/images/1.jpg";
import two from "../../../public/images/2.jpg";
import three from "../../../public/images/3.jpg";
import four from "../../../public/images/4.jpg";
import five from "../../../public/images/5.jpg";
import Image from "next/image";
import { Input } from "@/components/ui/input";

interface Chat {
  id: number;
  name: string;
  avatar: string;
  last: string;
}

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  attachments?: { name: string; type: string; url: string }[];
}

export default function MessagesScreen() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const [selectedChat, setSelectedChat] = useState<number>(1);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [attachments, setAttachments] = useState<FileList | null>(null);

  const chats: Chat[] = [
    {
      id: 1,
      name: "Alice Johnson",
      avatar: one.src,
      last: "Hey there! How's it going?",
    },
    {
      id: 2,
      name: "Bob Smith",
      avatar: two.src,
      last: "Can we meet tomorrow?",
    },
    {
      id: 3,
      name: "Charlie Brown",
      avatar: three.src,
      last: "Thanks for your help!",
    },
    {
      id: 4,
      name: "Diana Prince",
      avatar: "",
      last: "I'll send the files soon.",
    },
    {
      id: 5,
      name: "Ethan Hunt",
      avatar: four.src,
      last: "Mission accomplished!",
    },
  ];

  const [userMessages, setUserMessages] = useState<Record<number, Message[]>>({
    1: [
      {
        id: 1,
        sender: "Alice Johnson",
        content: "Hey there! How's it going?",
        timestamp: "10:30 AM",
      },
    ],
    2: [
      {
        id: 1,
        sender: "Bob Smith",
        content: "Can we meet tomorrow?",
        timestamp: "09:00 AM",
      },
    ],
    3: [
      {
        id: 1,
        sender: "Charlie Brown",
        content: "Thanks for your help!",
        timestamp: "Yesterday",
      },
    ],
    4: [
      {
        id: 1,
        sender: "Diana Prince",
        content: "I'll send the files soon.",
        timestamp: "2 days ago",
      },
    ],
    5: [
      {
        id: 1,
        sender: "Ethan Hunt",
        content: "Mission accomplished!",
        timestamp: "Last week",
      },
    ],
  });

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setInputMessage((prevMessage) => prevMessage + emojiData.emoji);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAttachments(event.target.files);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputMessage, attachments);
    setInputMessage("");
    setAttachments(null);
    scrollToBottom();
  };

  const handleSendMessage = (content: string, attachment: FileList | null) => {
    if ((!content.trim() && !attachment) || selectedChat === null) return;

    const newMessage: Message = {
      id: Date.now(),
      sender: "You",
      content,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      attachments: attachment
        ? Array.from(attachment).map((file) => ({
            name: file.name,
            type: file.type,
            url: URL.createObjectURL(file),
          }))
        : [],
    };

    setUserMessages((prevMessages) => ({
      ...prevMessages,
      [selectedChat]: [...(prevMessages[selectedChat] || []), newMessage],
    }));
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [userMessages[selectedChat]]);

  const ChatList = () => (
    <ScrollArea className="h-[calc(100vh-56px)]">
      {chats.map((chat, index) => (
        <div
          key={chat.id}
          className={`flex items-center p-4 cursor-pointer transition-colors duration-200 ${
            selectedChat === chat.id
              ? "bg-primaryColor text-white"
              : "hover:bg-gray-50"
          }`}
          onClick={() => setSelectedChat(chat.id)}
        >
          <div className="size-10 mr-3 rounded-full">
            <Image
              className="rounded-full"
              src={chat.avatar || "https://www.gravatar.com/avatar/?d=mp"}
              alt="profilePic"
              width={35}
              height={35}
            />
          </div>
          <div>
            <h3 className="font-medium text-sm">{chat.name}</h3>
            <p className="text-xs mt-[2px] font-light opacity-60">
              {chat.last}
            </p>
          </div>
        </div>
      ))}
    </ScrollArea>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-y-hidden">
      <header className="fixed top-0 left-0 right-0 flex items-center justify-between p-4 bg-white border-b border-gray-200 z-10">
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <div className="py-4">
                <h2 className="text-lg font-semibold mb-4">Chats</h2>
                <ChatList />
              </div>
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-2">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-[#008080] text-white">
              <Plane className="size-5" />
            </div>
            <span className="text-lg tracking-tight font-semibold text-[#008080]">
              ShipAve
            </span>
          </div>
        </div>
        <Button
          onClick={() => router.push("/dashboard")}
          variant="ghost"
          size="sm"
          className="text-gray-600 hover:bg-primaryColor hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Dashboard
        </Button>
      </header>

      <div className="flex flex-1 mt-14 pt-4 ">
        <div className="hidden md:block w-1/3 max-w-xs bg-white border-r border-gray-200 pt-5">
          <div className="flex items-center px-2 mx-5 mb-5 bg-[#F2F0EF] rounded-lg shadow-md">
            <Search className="size-5 text-black" />
            <Input
              className="bg-transparent focus-visible:ring-0 text-black font-medium w-full outline-none border-none"
              type="text"
              placeholder="Search"
            />
          </div>
          <ChatList />
        </div>

        <div className="flex-1 flex flex-col">
          <div
            ref={scrollRef}
            className="flex-1 p-4 overflow-y-scroll h-full bg-stone-100"
          >
            {(userMessages[selectedChat] || []).map((message) => (
              <div
                key={message.id}
                className={`flex flex-col mb-4 ${message.sender === "You" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`relative max-w-[70%] ${
                    message.attachments && message.attachments.length > 0
                      ? "p-3"
                      : "p-3"
                  } rounded-lg ${
                    message.sender === "You"
                      ? "bg-teal-600 text-gray-50 self-end rounded-bl-xl rounded-tl-xl"
                      : "bg-white border border-gray-200 rounded-br-xl rounded-tr-xl"
                  }`}
                  style={{ marginBottom: "0.5rem", paddingBottom: "1rem" }}
                >
                  <p>{message.content}</p>
                  {message.attachments && message.attachments.length > 0 && (
                    <div className="mt-2">
                      {message.attachments.map((attachment, index) => (
                        <div
                          key={index}
                          className="group relative overflow-hidden rounded-lg bg-teal-700 shadow transition-all hover:shadow-md cursor-pointer"
                        >
                          <a
                            href={attachment.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                            aria-label={`Download ${attachment.name}`}
                          >
                            <div className="flex items-center p-2">
                              {attachment.type.startsWith("image/") ? (
                                <div className="relative w-24 h-16 mr-3 flex-shrink-0">
                                  <Image
                                    src={attachment.url}
                                    alt={attachment.name}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded"
                                  />
                                </div>
                              ) : (
                                <div className="w-24 h-16 mr-3 flex-shrink-0 bg-gray-200 rounded flex items-center justify-center">
                                  <FileText className="h-8 w-8 text-gray-500" />
                                </div>
                              )}
                              <div className="flex-grow min-w-10">
                                <p className="text-sm font-medium truncate text-white">
                                  {attachment.name}
                                </p>
                                <p className="text-xs text-gray-300">
                                  {attachment.type.startsWith("image/")
                                    ? "Image"
                                    : "Document"}
                                </p>
                              </div>
                              <a
                                href={attachment.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                download
                                className="ml-2 p-2 text-gray-300 group-hover:text-gray-400 transition-colors"
                                aria-label={`Download ${attachment.name}`}
                              >
                                <FileDown className="h-5 w-5" />
                              </a>
                            </div>
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-400">{message.timestamp}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center px-4 py-3 bg-white border-t border-gray-200">
            {showEmojiPicker && (
              <div className="absolute bottom-16 z-10">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
            <Button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              type="button"
              variant="ghost"
              size="icon"
              className="mr-2"
            >
              <Smile className="h-5 w-5" />
            </Button>
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder="Type a message..."
              className="flex-1 bg-stone-100"
            />
            <Button variant="ghost" size="icon" className="mr-2">
              <Paperclip className="h-5 w-5" />
              <Input
                type="file"
                onChange={handleFileChange}
                multiple
                className="absolute opacity-0 h-5 w-5"
              />
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit}
              className="bg-[#008080] hover:bg-[#0A7070] text-white shadow-md"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
