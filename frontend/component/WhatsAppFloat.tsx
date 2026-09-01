'use client';
import { useState, useEffect, useRef } from 'react';

export default function WhatsAppFloat() {
    const [open, setOpen] = useState(false);
    const autoCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const intervalTimer = useRef<ReturnType<typeof setInterval> | null>(null);

    const waNumber = '8801786546949';
    const waMessage = encodeURIComponent('Hello! I visited your website and would like to know more. Could you please assist me?');
    const waLink = `https://wa.me/${waNumber}?text=${waMessage}`;

    const openPopup = () => {
        setOpen(true);
        // Auto close after 5 seconds
        if (autoCloseTimer.current) clearTimeout(autoCloseTimer.current);
        autoCloseTimer.current = setTimeout(() => {
            setOpen(false);
        }, 5000);
    };

    useEffect(() => {
        // First time auto open after 3 seconds
        const firstOpen = setTimeout(() => {
            openPopup();
        }, 3000);

        // Every 1 minute auto open
        intervalTimer.current = setInterval(() => {
            setOpen(prev => {
                if (!prev) {
                    if (autoCloseTimer.current) clearTimeout(autoCloseTimer.current);
                    autoCloseTimer.current = setTimeout(() => {
                        setOpen(false);
                    }, 5000);
                    return true;
                }
                return prev;
            });
        }, 60000);

        return () => {
            clearTimeout(firstOpen);
            if (intervalTimer.current) clearInterval(intervalTimer.current);
            if (autoCloseTimer.current) clearTimeout(autoCloseTimer.current);
        };
    }, []);

    const handleButtonClick = () => {
        if (autoCloseTimer.current) clearTimeout(autoCloseTimer.current);
        setOpen(prev => !prev);
    };

    return (
        <div className="fixed bottom-6 right-6 z-9999 flex flex-col items-end gap-3">
            {/* Chat Bubble */}
            {open && (
                <div className="w-72 bg-white rounded-2xl rounded-br-sm shadow-xl p-4">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 btn-color rounded-full flex items-center justify-center text-white text-lg">
                            💬
                        </div>
                        <div>
                            <p className="font-semibold text-gray-800 text-sm">Support Team</p>
                            <p className="text-green-500 text-xs">● Online</p>
                        </div>
                    </div>

                    {/* Message */}
                    <p className="text-gray-600 text-sm mb-4">
                        Hi there! 👋 How can we help you today?
                    </p>

                    {/* CTA Button */}
                    <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block btn-color text-white text-center py-2.5 rounded-lg font-medium text-sm transition-colors"
                    >
                        Chat on WhatsApp
                    </a>
                </div>
            )}

            {/* Float Button */}
            <button
                onClick={handleButtonClick}
                aria-label="Chat on WhatsApp"
                className="w-14 h-14 bg-[#25D366] hover:scale-110 rounded-full flex items-center justify-center shadow-lg transition-transform duration-200"
            >
                <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.244 1.606 6.109L0 24l6.063-1.572A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.797 9.797 0 01-5.034-1.388l-.36-.214-3.733.968.993-3.62-.235-.372A9.795 9.795 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
                </svg>
            </button>
        </div>
    );
}