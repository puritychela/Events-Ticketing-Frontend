// import React from 'react';
import type { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';
import { useGetMyTicketsQuery } from '../features/api/ticketsApi';

const ViewTickets = () => {
  const { data: tickets, isLoading, error } = useGetMyTicketsQuery("");

  if (isLoading) return <p>Loading tickets...</p>;
  if (error) return <p>Error loading tickets</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Tickets</h2>
      {tickets?.length === 0 ? (
        <p>No tickets found.</p>
      ) : (
        <ul className="space-y-4">
          {tickets.map((ticket: { ticketId: Key | null | undefined; eventId: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; paymentStatus: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; issuedAt: string | number | Date; }) => (
            <li key={ticket.ticketId} className="border p-4 rounded shadow">
              <p><strong>Event:</strong> {ticket.eventId}</p>
              <p><strong>Status:</strong> {ticket.paymentStatus}</p>
              <p><strong>Issued At:</strong> {new Date(ticket.issuedAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewTickets;

