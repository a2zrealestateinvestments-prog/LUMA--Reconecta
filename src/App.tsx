import React, { useState, useRef, useEffect } from 'react';

export default function App() {
  const [messages, setMessages] = useState([
    { role: 'bot', text: '¡Hola! Soy Luma. Estoy aquí para acompañarte en tu proceso de reconexión. ¿Cómo te sientes hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // Reemplaza esto con tu llave de Google AI Studio
  const API_KEY = "TU_API_KEY_AQUI"; 

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userMsg }] }]
        })
      });

      const data = await response.json();
      const botText = data.candidates[0].content.parts[0].text;
      setMessages(prev => [...prev, { role: 'bot', text: botText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: 'Lo siento, tuve un problema al conectar. Inténtalo de nuevo.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans">
      {/* Header */}
      <header className="bg-teal-600 text-white p-4 shadow-md text-center">
        <h1 className="text-xl font-bold italic">Luma Reconecta</h1>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${m.role === 'user' ? 'bg-teal-500 text-white' : 'bg-white text-slate-700 border border-slate-200'}`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && <div className="text-slate-400 text-sm italic">Luma está pensando...</div>}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-200">
        <div className="flex gap-2 max-w-4xl mx-auto">
          <input 
            className="flex-1 p-3 border border-slate-300 rounded-full focus:outline-none focus:border-teal-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Escribe aquí tu mensaje..."
          />
          <button 
            onClick={sendMessage}
            className="bg-teal-600 text-white px-6 py-2 rounded-full hover:bg-teal-700 transition-colors"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
