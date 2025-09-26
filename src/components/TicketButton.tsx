'use client';

interface TicketButtonProps {
    ticketsPage: string;
    soldOut?: boolean;
    backgroundColor: string;
    color: string;
    className?: string;
}

export default function TicketButton({
    ticketsPage,
    soldOut,
    backgroundColor,
    color,
    className = ''
}: TicketButtonProps) {
    return (
        <button
            className={`font-bold text-center ${className}`}
            style={{
                backgroundColor,
                color
            }}
            onClick={() => {
                window.location.href = ticketsPage;
            }}
            disabled={soldOut}
        >
            {soldOut ? 'UTSOLGT' : 'KJØP BILLETTER'}
        </button>
    );
}
