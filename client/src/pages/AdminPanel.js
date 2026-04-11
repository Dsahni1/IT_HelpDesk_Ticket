import { useEffect, useState } from "react";
import axios from "axios";

function AdminPanel() {
  const [tickets, setTickets] = useState([]);
  const token = localStorage.getItem("token");

  const fetchAllTickets = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/tickets/all", {
        headers: { Authorization: token }
      });
      setTickets(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllTickets();
  }, []);

  // Update status
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5001/api/tickets/${id}`,
        { status },
        { headers: { Authorization: token } }
      );

      fetchAllTickets();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>

      {tickets.map((ticket) => (
        <div key={ticket._id} style={{ border: "1px solid black", margin: "10px" }}>
          <p><b>{ticket.title}</b></p>
          <p>{ticket.description}</p>
          <p>Status: {ticket.status}</p>
          <p>Priority: {ticket.priority}</p>
          <p>User: {ticket.createdBy?.email}</p>

          {/* Update buttons */}
          <button onClick={() => updateStatus(ticket._id, "In Progress")}>
            In Progress
          </button>

          <button onClick={() => updateStatus(ticket._id, "Resolved")}>
            Resolved
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminPanel;