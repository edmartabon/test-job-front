"use client";

import { Message } from "@/lib/types";

interface MessageListProps {
  messages: Message[];
}

export const MessageList = ({ messages }: MessageListProps) => {
  if (!messages.length) {
    return (
      <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
        No messages yet. Start the conversation below.
      </p>
    );
  }

  const sortedMessages = [...messages].sort(
    (a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return (
    <div className="space-y-3">
      {sortedMessages.map((message) => {
        const isCustomer = message.senderType === "customer";
        const alignment = isCustomer ? "items-end" : "items-start";
        const bubbleClasses = isCustomer
          ? "bg-indigo-600 text-white rounded-2xl rounded-br-sm"
          : "bg-slate-100 text-slate-900 rounded-2xl rounded-bl-sm";

        return (
          <div key={message.id} className={`flex flex-col ${alignment}`}>
            <div
              className={`max-w-[75%] px-4 py-2 text-sm shadow-sm ${bubbleClasses}`}
            >
              {message.text}
            </div>
            <span className="mt-1 text-xs text-slate-400">
              {new Date(message.createdAt).toLocaleString()}
            </span>
          </div>
        );
      })}
    </div>
  );
};
