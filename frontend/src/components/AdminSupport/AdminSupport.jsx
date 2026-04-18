import { useState, useEffect } from "react";
import {
  Search, Filter, MessageSquare, Clock, User,
  CheckCircle2, AlertCircle, Send, ArrowLeft,
  ChevronRight, MoreVertical, RefreshCw
} from "lucide-react";
import { adminGetTickets, getTicketDetails, addTicketMessage, adminUpdateTicketStatus } from "../../utils/apiServices";

const PRIORITY_COLORS = {
  critical: "text-red-600 bg-red-100",
  high: "text-orange-600 bg-orange-100",
  medium: "text-blue-600 bg-blue-100",
  low: "text-emerald-600 bg-emerald-100",
};

const STATUS_COLORS = {
  open: "text-amber-700 bg-amber-100",
  "in-progress": "text-blue-700 bg-blue-100",
  resolved: "text-emerald-700 bg-emerald-100",
  closed: "text-gray-600 bg-gray-100",
};

export default function AdminSupport() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [ticketDetails, setTicketDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [filter, setFilter] = useState("");

  const fetchTickets = async () => {
    setLoading(true);
    const res = await adminGetTickets(filter);
    if (res.ok) {
      setTickets(res.data.tickets);
    }
    setLoading(false);
  };

  const fetchDetails = async (id) => {
    setDetailsLoading(true);
    const res = await getTicketDetails(id);
    if (res.ok) {
      setTicketDetails(res.data.data);
      setSelectedTicketId(id);
    }
    setDetailsLoading(false);
  };

  const handleSendReply = async () => {
    if (!replyMessage.trim()) return;
    const res = await addTicketMessage(selectedTicketId, replyMessage);
    if (res.ok) {
      setReplyMessage("");
      fetchDetails(selectedTicketId);
      fetchTickets(); // Refresh list to update status if needed
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [filter]);

  const handleStatusChange = async (id, status) => {
    const res = await adminUpdateTicketStatus(id, status);
    if (res.ok) {
      if (selectedTicketId === id) fetchDetails(id);
      fetchTickets();
    }
  };

  if (selectedTicketId && ticketDetails) {
    return (
      <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* HEADER */}
        <div className="px-4 py-3 border-b flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button onClick={() => setSelectedTicketId(null)} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500">
              <ArrowLeft size={18} />
            </button>
            <div>
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                {ticketDetails.ticket_number}
                <span className={`text-[10px] uppercase px-2 py-0.5 rounded-full font-bold ${STATUS_COLORS[ticketDetails.status]}`}>
                  {ticketDetails.status}
                </span>
              </h3>
              <p className="text-[11px] text-slate-500">{ticketDetails.subject}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <select 
              value={ticketDetails.status}
              onChange={(e) => handleStatusChange(ticketDetails.id, e.target.value)}
              className="text-[11px] font-bold bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 outline-none"
            >
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        {/* CHAT AREA */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
          {/* USER ORIGINAL MESSAGE */}
          <div className="flex flex-col items-start max-w-[85%]">
             <div className="bg-white border text-slate-800 p-3 rounded-2xl rounded-tl-none shadow-sm text-xs leading-relaxed">
                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-dashed">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                        <User size={12} className="text-blue-600" />
                    </div>
                    <span className="font-bold text-blue-900">{ticketDetails.full_name}</span>
                </div>
                {ticketDetails.description}
             </div>
             <span className="text-[10px] text-slate-400 mt-1 ml-1">
                {new Date(ticketDetails.created_at).toLocaleString()}
             </span>
          </div>

          {/* MESSAGES */}
          {ticketDetails.messages.map((m, idx) => (
            <div key={idx} className={`flex flex-col ${m.sender_role === 'admin' ? 'items-end' : 'items-start'} max-w-[85%] ${m.sender_role === 'admin' ? 'ml-auto' : ''}`}>
               <div className={`p-3 rounded-2xl shadow-sm text-xs leading-relaxed ${
                 m.sender_role === 'admin' 
                 ? "bg-gradient-to-br from-blue-700 to-blue-900 text-white rounded-tr-none" 
                 : "bg-white border text-slate-800 rounded-tl-none"
               }`}>
                  {m.message}
               </div>
               <span className="text-[10px] text-slate-400 mt-1 mx-1">
                  {m.sender_role === 'admin' ? 'Admin' : ticketDetails.full_name} • {new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
               </span>
            </div>
          ))}
        </div>

        {/* INPUT */}
        <div className="p-3 border-t bg-white">
          <div className="relative flex items-center">
            <input 
              type="text" 
              placeholder="Type your reply here..."
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendReply()}
              className="w-full bg-slate-100 border-none rounded-xl py-3 pl-4 pr-12 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button 
                onClick={handleSendReply}
                disabled={!replyMessage.trim()}
                className="absolute right-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-800">Help & Support</h2>
          <p className="text-xs sm:text-[13px] text-slate-500">Manage user complaints and inquiries</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search tickets..."
              className="bg-white border border-slate-200 rounded-xl py-2 pl-9 pr-4 text-xs w-full sm:w-48 focus:border-blue-500 outline-none"
            />
          </div>
          <button 
            onClick={fetchTickets}
            className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 gap-3 bg-white rounded-2xl border">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-medium">Fetching tickets...</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[600px]">
              <thead>
                <tr>
                  {["Ticket Info", "Customer", "Category", "Status", "Priority", "Action"].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-white uppercase bg-gradient-to-r from-blue-900 via-blue-800 to-blue-950">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tickets.map((t) => (
                  <tr key={t.id} className="border-b border-slate-100 hover:bg-blue-50/40 transition-colors cursor-pointer" onClick={() => fetchDetails(t.id)}>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-blue-900">{t.ticket_number}</span>
                        <span className="text-[11px] text-slate-500 line-clamp-1">{t.subject}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-700">{t.full_name}</td>
                    <td className="px-4 py-3 text-xs text-slate-500">{t.issue_type}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${STATUS_COLORS[t.status]}`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${PRIORITY_COLORS[t.priority]}`}>
                        {t.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="p-1.5 hover:bg-blue-100 rounded-lg text-blue-600">
                        <ChevronRight size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
                {tickets.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-10 text-slate-400">No support tickets found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
