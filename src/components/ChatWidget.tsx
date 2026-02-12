import { useState, useEffect, useRef } from 'react';

const WIDGET_BASE_URL = import.meta.env.VITE_CHAT_WIDGET_URL || 'https://ax-derrick.github.io/axmed-chat-widget/';

function buildWidgetUrl() {
  const params = new URLSearchParams();

  const webhookUrl = import.meta.env.VITE_WEBHOOK_URL;
  if (webhookUrl) {
    params.set('webhookUrl', webhookUrl);
  }

  params.set('primaryColor', '#392AB0');
  params.set('fontFamily', 'Figtree');
  params.set('borderRadius', '12');
  params.set('autoOpen', 'true');
  params.set('showCloseButton', 'false');

  return `${WIDGET_BASE_URL}?${params.toString()}`;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  function toggle() {
    setOpen((v) => !v);
  }

  useEffect(() => {
    const widgetOrigin = new URL(WIDGET_BASE_URL).origin;
    function handleMessage(e: MessageEvent) {
      if (e.origin !== widgetOrigin) return;
      if (e.data?.event === 'close') {
        setOpen(false);
      }
    }
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Listen for custom event to open chat from other components (e.g., Support page)
  useEffect(() => {
    function handleOpenChat() {
      setOpen(true);
    }
    window.addEventListener('axmed:open-chat', handleOpenChat);
    return () => window.removeEventListener('axmed:open-chat', handleOpenChat);
  }, []);

  // Keyboard shortcut: Ctrl+/ to toggle
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.ctrlKey && e.key === '/') {
        e.preventDefault();
        toggle();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Chat iframe — always mounted, CSS controls visibility */}
      <div className={`chat-widget-container ${open ? 'chat-widget-container--open' : 'chat-widget-container--closed'}`}>
        <iframe
          ref={iframeRef}
          src={buildWidgetUrl()}
          title="Axmed Chat"
          className="chat-widget-iframe"
        />
      </div>

      {/* Floating toggle button */}
      <button
        className={`chat-widget-button ${open ? 'chat-widget-button--open' : 'chat-widget-button--pulse'}`}
        onClick={toggle}
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        {open ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>
    </>
  );
}
