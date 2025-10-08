'use client';

import { TicketInfo } from '@/lib/types';

interface TicketButtonProps {
    ticketInfo: TicketInfo;
    soldOut?: boolean;
    backgroundColor: string;
    color: string;
    className?: string;
}

export default function TicketButton({
    ticketInfo,
    soldOut,
    backgroundColor,
    color,
    className = ''
}: TicketButtonProps) {
    if (soldOut) {
        return (
            <div
                className={`font-bold text-center ${className}`}
                style={{
                    backgroundColor,
                    color
                }}
            >
                UTSOLGT
            </div>
        );
    }

    if (ticketInfo.type === 'text') {
        return (
            <>
                {ticketInfo.text && (
                    <div
                        className={`font-bold text-center ${className}`}
                        style={{
                            backgroundColor,
                            color
                        }}
                    >
                        {ticketInfo.text}
                    </div>
                )}
            </>
        );
    }

    return (
        <button
            className={`font-bold text-center ${className}`}
            style={{
                backgroundColor,
                color
            }}
            onClick={() => {
                window.location.href = ticketInfo.url || '';
            }}
        >
            KJØP BILLETTER
        </button>
    );
}
