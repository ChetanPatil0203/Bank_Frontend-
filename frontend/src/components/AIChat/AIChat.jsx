import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp, Minus, Paperclip, MoreVertical, Trash2, ThumbsUp, ThumbsDown, ChevronRight } from 'lucide-react';

const GeminiStar = ({ size = 20, id = '' }) => (
  <svg viewBox="0 0 24 24" fill="none" style={{ width: size, height: size, flexShrink: 0, display: 'block' }}>
    <defs>
      <radialGradient id={`rg1${id}`} cx="12" cy="8" r="10" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#D93025" /><stop offset="100%" stopColor="#D93025" stopOpacity="0" /></radialGradient>
      <radialGradient id={`rg2${id}`} cx="16" cy="12" r="10" gradientUnits="userSpaceOnUse"><stop offset="5%" stopColor="#1967D2" /><stop offset="100%" stopColor="#1967D2" stopOpacity="0" /></radialGradient>
      <radialGradient id={`rg3${id}`} cx="8" cy="12" r="10" gradientUnits="userSpaceOnUse"><stop offset="5%" stopColor="#F9AB00" /><stop offset="100%" stopColor="#F9AB00" stopOpacity="0" /></radialGradient>
      <radialGradient id={`rg4${id}`} cx="12" cy="16" r="10" gradientUnits="userSpaceOnUse"><stop offset="5%" stopColor="#188038" /><stop offset="100%" stopColor="#188038" stopOpacity="0" /></radialGradient>
    </defs>
    <path d="M12 0C12 9 15 12 24 12C15 12 12 15 12 24C12 15 9 12 0 12C9 12 12 9 12 0Z" fill={`url(#rg3${id})`} />
    <path d="M12 0C12 9 15 12 24 12C15 12 12 15 12 24C12 15 9 12 0 12C9 12 12 9 12 0Z" fill={`url(#rg1${id})`} />
    <path d="M12 0C12 9 15 12 24 12C15 12 12 15 12 24C12 15 9 12 0 12C9 12 12 9 12 0Z" fill={`url(#rg2${id})`} />
    <path d="M12 0C12 9 15 12 24 12C15 12 12 15 12 24C12 15 9 12 0 12C9 12 12 9 12 0Z" fill={`url(#rg4${id})`} />
  </svg>
);

const formatResponse = (text) => {
  if (!text) return null;
  return text.split('\n').map((line, i) => {
    const t = line.trim();
    if (!t) return <div key={i} style={{ height: 5 }} />;
    if (t.startsWith('**') && t.endsWith('**'))
      return <p key={i} style={{ margin: '10px 0 3px', fontSize: 13, fontWeight: 700, color: '#111827', letterSpacing: '-0.01em' }}>{t.slice(2, -2)}</p>;
    if (t.startsWith('* ') || t.startsWith('- '))
      return (
        <div key={i} style={{ display: 'flex', gap: 7, marginBottom: 3, paddingLeft: 2 }}>
          <span style={{ color: '#7c3aed', fontSize: 9, marginTop: 5, flexShrink: 0 }}>●</span>
          <span style={{ fontSize: 13.5, lineHeight: 1.65, color: '#374151' }}>{t.slice(2)}</span>
        </div>
      );
    return <p key={i} style={{ margin: '0 0 3px', fontSize: 13.5, lineHeight: 1.65, color: '#374151' }}>{line}</p>;
  });
};

const suggestions = [
  { emoji: '🏦', label: 'Products & Services', text: 'Learn about Payzen Bank products' },
  { emoji: '🛠️', label: 'Technical Support', text: 'I need technical support' },
  { emoji: '💳', label: 'Account & Billing', text: 'Account and billing issue' },
];

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const fileRef = useRef(null);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isTyping]);
  useEffect(() => { if (isOpen) setTimeout(() => inputRef.current?.focus(), 320); }, [isOpen]);
  useEffect(() => {
    const h = (e) => { if (menuOpen && !e.target.closest('.pz-menu')) setMenuOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [menuOpen]);

  const send = async (text = input) => {
    if (!text.trim()) return;
    setMessages(p => [...p, { id: Date.now(), text, sender: 'user' }]);
    setInput('');
    setIsTyping(true);
    try {
      const history = messages.map(m => ({ role: m.sender === 'user' ? 'user' : 'model', parts: [{ text: m.text }] }));
      const res = await fetch('http://127.0.0.1:5000/api/v1/ai/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setMessages(p => [...p, { id: Date.now() + 1, text: data.response, sender: 'bot', feedback: true }]);
    } catch {
      setMessages(p => [...p, { id: Date.now() + 1, text: "I'm having trouble connecting. Please ensure the backend is running.", sender: 'bot', feedback: false }]);
    } finally { setIsTyping(false); }
  };

  const onFeedback = (id) => {
    setMessages(p => p.map(m => m.id === id ? { ...m, feedback: false } : m));
    setIsTyping(true);
    setTimeout(() => {
      setMessages(p => [...p, { id: Date.now(), text: 'Thank you for your feedback! It helps me improve.', sender: 'bot', feedback: false }]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif' }}>
      <style>{`
        .pz-body::-webkit-scrollbar{width:3px}
        .pz-body::-webkit-scrollbar-track{background:transparent}
        .pz-body::-webkit-scrollbar-thumb{background:#e0e0e0;border-radius:10px}
        @keyframes pzBounce{0%,80%,100%{transform:translateY(0);opacity:.4}40%{transform:translateY(-6px);opacity:1}}
        @keyframes pzFadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pzSlideIn{from{opacity:0;transform:scale(0.9) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}
        .pz-card{animation:pzFadeUp .22s ease forwards}
        .pz-panel{animation:pzSlideIn .28s cubic-bezier(.34,1.3,.64,1) forwards}
        .pz-sug{transition:all .15s ease;cursor:pointer;border:1px solid #ede9fe;background:#fff;border-radius:13px;padding:11px 13px;display:flex;align-items:center;gap:11px;text-align:left;width:100%;box-sizing:border-box}
        .pz-sug:hover{border-color:#c4b5fd;background:#faf8ff;transform:translateY(-1px);box-shadow:0 4px 14px rgba(124,58,237,.1)}
        .pz-sug:active{transform:scale(.99)}
        .pz-fab{transition:all .2s ease;outline:none}
        .pz-fab:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(109,40,217,.48)!important}
        .pz-fab:active{transform:scale(.97)}
        .pz-ibtn{transition:background .12s;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;border-radius:8px}
        .pz-ibtn:hover{background:rgba(255,255,255,.22)!important}
        .pz-send{outline:none}
        .pz-send:active{transform:scale(.94)}
        .pz-fbtn{transition:all .15s;cursor:pointer;display:flex;align-items:center;justify-content:center}
        .pz-fbtn:hover{border-color:#c4b5fd !important;background:#f5f3ff !important}
        .pz-drop{border:none;background:transparent;cursor:pointer;border-radius:8px;padding:8px 12px;width:100%;text-align:left;display:flex;align-items:center;gap:8px;font-size:13px;font-weight:600;transition:background .12s;box-sizing:border-box}
        .pz-drop:hover{background:#fef2f2}
        .pz-attach{transition:opacity .15s}
        .pz-attach:hover{opacity:1 !important}
      `}</style>

      <input type="file" ref={fileRef} style={{ display: 'none' }} />

      {/* FAB */}
      <button
        className="pz-fab"
        onClick={() => setIsOpen(o => !o)}
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
          display: 'flex', alignItems: 'center', gap: 9,
          padding: '11px 20px 11px 15px',
          background: 'linear-gradient(145deg, #7c3aed 0%, #6d28d9 100%)',
          border: 'none', borderRadius: 50, cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(109,40,217,.38), 0 1px 4px rgba(0,0,0,.1)',
          color: '#fff',
        }}
      >
        <GeminiStar size={19} id="fab" />
        <span style={{ fontSize: 13.5, fontWeight: 600, letterSpacing: '-0.02em' }}>
          {isOpen ? 'Close Chat' : 'AI Assistant'}
        </span>
      </button>

      {/* Panel */}
      {isOpen && (
        <div
          className="pz-panel"
          style={{
            position: 'fixed', bottom: 80, right: 24, zIndex: 9998,
            width: 385,
            background: '#ffffff',
            borderRadius: 20,
            boxShadow: '0 20px 60px rgba(0,0,0,.15), 0 4px 16px rgba(0,0,0,.08), 0 0 0 1px rgba(0,0,0,.055)',
            display: 'flex', flexDirection: 'column', overflow: 'hidden',
            maxHeight: 'calc(100vh - 110px)',
          }}
        >
          {/* ── Header ── */}
          <div style={{
            background: 'linear-gradient(140deg, #7c3aed 0%, #6d28d9 55%, #5b21b6 100%)',
            padding: '15px 13px 13px',
            flexShrink: 0,
          }}>
            {/* Title row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 11 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: 'rgba(255,255,255,.16)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '1px solid rgba(255,255,255,.18)',
                }}>
                  <GeminiStar size={19} id="hdr" />
                </div>
                <div>
                  <div style={{ fontSize: 14.5, fontWeight: 700, color: '#fff', letterSpacing: '-0.025em', lineHeight: 1.25 }}>Ask Payzen Bank</div>
                  <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,.58)', marginTop: 1 }}>Powered by AI · Always here to help</div>
                </div>
              </div>

              {/* Controls */}
              <div style={{ display: 'flex', gap: 3, position: 'relative' }}>
                <button className="pz-ibtn" style={{ width: 29, height: 29, background: 'rgba(255,255,255,.12)', color: '#fff' }} onClick={() => setMenuOpen(o => !o)}>
                  <MoreVertical size={14} />
                </button>
                <button className="pz-ibtn" style={{ width: 29, height: 29, background: 'rgba(255,255,255,.12)', color: '#fff' }} onClick={() => setIsOpen(false)}>
                  <Minus size={14} strokeWidth={2.5} />
                </button>
                {menuOpen && (
                  <div className="pz-menu" style={{
                    position: 'absolute', top: 33, right: 0,
                    background: '#fff', borderRadius: 11,
                    boxShadow: '0 8px 28px rgba(0,0,0,.12), 0 0 0 1px rgba(0,0,0,.06)',
                    padding: 4, minWidth: 170, zIndex: 10,
                  }}>
                    <button
                      className="pz-drop"
                      style={{ color: messages.length === 0 ? '#d1d5db' : '#dc2626' }}
                      onClick={() => { setMessages([]); setMenuOpen(false); }}
                      disabled={messages.length === 0}
                    >
                      <Trash2 size={13} /> Clear conversation
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Input bar */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 5,
              background: 'rgba(255,255,255,.13)',
              border: '1px solid rgba(255,255,255,.17)',
              borderRadius: 12, padding: '7px 6px 7px 12px',
            }}>
              <input
                ref={inputRef}
                type="text"
                placeholder="Type your question..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), send())}
                style={{
                  flex: 1, background: 'transparent', border: 'none', outline: 'none',
                  fontSize: 13.5, color: '#fff', fontWeight: 500, minWidth: 0,
                }}
              />
              <button
                className="pz-attach"
                onClick={() => fileRef.current?.click()}
                style={{
                  width: 27, height: 27, background: 'transparent', border: 'none',
                  cursor: 'pointer', color: 'rgba(255,255,255,.5)', borderRadius: 7,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  opacity: 0.75, flexShrink: 0,
                }}
              >
                <Paperclip size={13} />
              </button>
              <button
                className="pz-send"
                onClick={() => send()}
                disabled={!input.trim()}
                style={{
                  width: 31, height: 31, borderRadius: 8, border: 'none',
                  cursor: input.trim() ? 'pointer' : 'default',
                  background: input.trim() ? '#fff' : 'rgba(255,255,255,.18)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, transition: 'all .18s',
                }}
              >
                <ArrowUp size={14} color={input.trim() ? '#7c3aed' : 'rgba(255,255,255,.3)'} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* ── Body ── */}
          <div
            className="pz-body"
            style={{
              flex: 1, overflowY: 'auto',
              background: '#f7f7fb',
              padding: '16px 13px 14px',
              minHeight: 0,
            }}
          >
            {messages.length === 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Greeting */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <GeminiStar size={24} id="greet" />
                  <div>
                    <p style={{ margin: '0 0 4px', fontSize: 17, fontWeight: 700, color: '#111827', letterSpacing: '-0.03em' }}>Hello! I'm Payzen AI</p>
                    <p style={{ margin: 0, fontSize: 13, color: '#6b7280', lineHeight: 1.55 }}>I can help with banking queries, account setup, and more. Choose a topic or ask anything below.</p>
                  </div>
                </div>

                {/* Suggestion cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {suggestions.map((s, i) => (
                    <button key={i} className="pz-sug" onClick={() => send(s.text)}>
                      <div style={{
                        width: 36, height: 36, borderRadius: 9, flexShrink: 0,
                        background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)',
                        border: '1px solid #ddd6fe',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 16,
                      }}>{s.emoji}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 11, color: '#7c3aed', fontWeight: 600, marginBottom: 2, letterSpacing: '0.01em' }}>{s.label}</div>
                        <div style={{ fontSize: 13, color: '#374151', fontWeight: 500, lineHeight: 1.35 }}>{s.text}</div>
                      </div>
                      <ChevronRight size={13} color="#c4b5fd" style={{ flexShrink: 0 }} />
                    </button>
                  ))}
                </div>

                <p style={{ margin: 0, textAlign: 'center', fontSize: 11, color: '#9ca3af' }}>
                  Available 24/7 · Instant responses
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    className="pz-card"
                    style={{
                      display: 'flex',
                      justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                      alignItems: 'flex-end', gap: 8,
                    }}
                  >
                    {msg.sender === 'bot' && (
                      <div style={{
                        width: 27, height: 27, borderRadius: 8, flexShrink: 0,
                        background: '#fff', border: '1px solid #ede9fe',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 1px 4px rgba(124,58,237,.1)',
                        marginBottom: 1,
                      }}>
                        <GeminiStar size={14} id={`m${msg.id}`} />
                      </div>
                    )}
                    <div style={{ maxWidth: '79%' }}>
                      {msg.sender === 'user' ? (
                        <div style={{
                          padding: '9px 13px',
                          background: 'linear-gradient(140deg, #7c3aed, #6d28d9)',
                          borderRadius: '15px 15px 4px 15px',
                          fontSize: 13.5, lineHeight: 1.6, color: '#fff', fontWeight: 500,
                          boxShadow: '0 2px 8px rgba(109,40,217,.26)',
                          wordBreak: 'break-word',
                        }}>{msg.text}</div>
                      ) : (
                        <div style={{
                          background: '#fff',
                          borderRadius: '4px 15px 15px 15px',
                          padding: '10px 12px',
                          border: '1px solid #ede9fe',
                          boxShadow: '0 1px 4px rgba(0,0,0,.05)',
                          wordBreak: 'break-word',
                        }}>
                          {formatResponse(msg.text)}
                          {msg.feedback && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, paddingTop: 8, borderTop: '1px solid #f3f4f6' }}>
                              <span style={{ fontSize: 11, color: '#9ca3af', flex: 1 }}>Was this helpful?</span>
                              <button
                                className="pz-fbtn"
                                style={{ width: 27, height: 27, border: '1px solid #e5e7eb', borderRadius: 7, background: '#fafafa' }}
                                onClick={() => onFeedback(msg.id)}
                              ><ThumbsUp size={11} color="#7c3aed" /></button>
                              <button
                                className="pz-fbtn"
                                style={{ width: 27, height: 27, border: '1px solid #e5e7eb', borderRadius: 7, background: '#fafafa' }}
                                onClick={() => onFeedback(msg.id)}
                              ><ThumbsDown size={11} color="#9ca3af" /></button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="pz-card" style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
                    <div style={{
                      width: 27, height: 27, borderRadius: 8, flexShrink: 0,
                      background: '#fff', border: '1px solid #ede9fe',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 1px 4px rgba(124,58,237,.1)',
                    }}>
                      <GeminiStar size={14} id="typing" />
                    </div>
                    <div style={{
                      background: '#fff', borderRadius: '4px 15px 15px 15px',
                      padding: '11px 15px', border: '1px solid #ede9fe',
                      display: 'flex', alignItems: 'center', gap: 5,
                      boxShadow: '0 1px 4px rgba(0,0,0,.05)',
                    }}>
                      {[0, 180, 360].map((d, i) => (
                        <div key={i} style={{
                          width: 6, height: 6, borderRadius: '50%',
                          background: '#7c3aed',
                          animation: `pzBounce 1s ${d}ms infinite ease-in-out`,
                        }} />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>
            )}
          </div>

          {/* ── Footer ── */}
          <div style={{
            padding: '8px 14px',
            background: '#fff',
            borderTop: '1px solid #f0eeff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
            flexShrink: 0,
          }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#10b981', flexShrink: 0 }} />
            <span style={{ fontSize: 10.5, color: '#9ca3af', letterSpacing: '0.005em' }}>
              Never share your PIN or password · Payzen Bank AI
            </span>
          </div>
        </div>
      )}
    </div>
  );
}