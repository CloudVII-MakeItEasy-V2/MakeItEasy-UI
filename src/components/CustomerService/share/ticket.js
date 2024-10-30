import React, { useState } from 'react';
import axios from 'axios';
import "./ticket.css";

function TicketPage() {
  const [ticketId, setTicketId] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [issue, setIssue] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleUpdateTicket = async () => {
    if (!ticketId || !customerId) {
      setError('Customer ID and Ticket ID are required');
      alert('Customer ID and Ticket ID are required'); // Alert for input validation
      return;
    }
    try {
      const response = await axios.put(`https://makeiteasy-440104.ue.r.appspot.com/customer/${customerId}/support_tickets/${ticketId}`, {
        issue,
        status
      });
      setMessage(response.data.message);
      console.log(status);
      setError('');
      console.log(response.data);
      alert(response.data.message); // Alert for successful update
    } catch (err) {
      const errorMessage = err.response ? err.response.data.error : 'Failed to update ticket';
      setMessage('');
      setError(errorMessage);
      alert(errorMessage); // Alert for error
    }
  };

  return (
    <div className="ticket-container">
      <h1>Ticket Page</h1>
      <div>
        <label>Customer ID:</label>
        <input
          type="text"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        />
        <label>Ticket ID:</label>
        <input
          type="text"
          value={ticketId}
          onChange={(e) => setTicketId(e.target.value)}
        />
        <label>Issue:</label>
        <input
          type="text"
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
        />
        <label>Status:</label>
        <input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <button onClick={handleUpdateTicket}>Update Ticket</button>
      </div>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
      <p>You can raise or track a ticket here.</p>
    </div>
  );
}

export default TicketPage;