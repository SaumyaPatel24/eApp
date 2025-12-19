import { useState } from "react";
import ProductChat from "./ProductChat";
import chatIcon from "../assets/images/chatIcon.svg"; 

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-2 w-80 max-w-xs rounded-xl bg-zinc-900 p-4 shadow-lg ring-1 ring-zinc-700">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-white font-semibold">Product Chat</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-red-400 font-bold"
            >
              ✕
            </button>
          </div>
          <ProductChat />
        </div>
      )}

      
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="h-12 w-12 rounded-full bg-orange-500 flex items-center justify-center shadow-lg hover:bg-orange-400"
      >
        <img src={chatIcon} alt="Chat" className="h-6 w-6" />
      </button>
    </div>
  );
}
