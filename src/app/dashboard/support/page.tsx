"use client";

import { useState } from "react";
import DashboardCard from "@/components/admin/DashboardCard";

// Demo tickets
const demoTickets = [
  {
    id: "1",
    title: "Website not loading",
    status: "open",
    priority: "high",
    created: "2024-01-15",
  },
  {
    id: "2",
    title: "Need help with billing",
    status: "in_progress",
    priority: "normal",
    created: "2024-01-14",
  },
  {
    id: "3",
    title: "Feature request: Dark mode",
    status: "resolved",
    priority: "low",
    created: "2024-01-10",
  },
];

const demoMessages = [
  { id: "1", sender: "Customer", message: "My website isn't loading properly", time: "2:30 PM" },
  { id: "2", sender: "Support", message: "Thanks for reaching out! Can you share a screenshot?", time: "2:35 PM" },
  { id: "3", sender: "Customer", message: "Sure, here it is", time: "2:40 PM" },
];

export default function SupportPage() {
  const [tickets, setTickets] = useState(demoTickets);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const selected = tickets.find((t) => t.id === selectedTicket);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Support Tickets</h1>
        <button className="px-4 py-2 bg-pitch-gold text-black rounded-lg font-semibold hover:bg-yellow-400 transition">
          + New Ticket
        </button>
      </div>

      <div className="flex gap-6 h-[600px]">
        {/* Ticket List */}
        <div className="w-80 flex-shrink-0 bg-pitch-dark rounded-xl p-4 overflow-y-auto">
          <div className="space-y-2">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                onClick={() => setSelectedTicket(ticket.id)}
                className={`p-4 rounded-lg cursor-pointer transition ${
                  selectedTicket === ticket.id
                    ? "bg-pitch-gold/20 border border-pitch-gold"
                    : "bg-pitch-black border border-white/10 hover:border-white/30"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-sm">{ticket.title}</h4>
                  <span
                    className={`px-2 py-0.5 rounded text-xs ${
                      ticket.priority === "high"
                        ? "bg-red-500/20 text-red-500"
                        : ticket.priority === "normal"
                        ? "bg-yellow-500/20 text-yellow-500"
                        : "bg-gray-500/20 text-gray-500"
                    }`}
                  >
                    {ticket.priority}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span
                    className={`px-2 py-0.5 rounded ${
                      ticket.status === "open"
                        ? "bg-green-500/20 text-green-500"
                        : ticket.status === "in_progress"
                        ? "bg-blue-500/20 text-blue-500"
                        : "bg-gray-500/20 text-gray-400"
                    }`}
                  >
                    {ticket.status.replace("_", " ")}
                  </span>
                  <span>{ticket.created}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat View */}
        <div className="flex-1 bg-pitch-dark rounded-xl flex flex-col">
          {selected ? (
            <>
              {/* Header */}
              <div className="p-4 border-b border-white/10">
                <h3 className="font-semibold">{selected.title}</h3>
                <p className="text-sm text-gray-400">Ticket #{selected.id}</p>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {demoMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sender === "Support" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-xl ${
                        msg.sender === "Support"
                          ? "bg-pitch-gold text-black"
                          : "bg-pitch-black"
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                      <p
                        className={`text-xs mt-1 ${
                          msg.sender === "Support"
                            ? "text-black/60"
                            : "text-gray-400"
                        }`}
                      >
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-white/10">
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 bg-pitch-black border border-white/10 p-3 rounded-lg focus:border-pitch-gold focus:outline-none"
                  />
                  <button className="px-6 py-3 bg-pitch-gold text-black rounded-lg font-semibold">
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              Select a ticket to view conversation
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
