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

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  window.location.href = "/";
    };
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
    const total = tickets.length;
    const open = tickets.filter(t => t.status === "Open").length;
    const inProgress = tickets.filter(t => t.status === "In Progress").length;
    const resolved = tickets.filter(t => t.status === "Resolved").length;

  return (
    <div>
    <button onClick={handleLogout}>Logout</button>
      <h2>Admin Panel</h2>
        <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <div><b>Total:</b> {total}</div>
        <div><b>Open:</b> {open}</div>
        <div><b>In Progress:</b> {inProgress}</div>
        <div><b>Resolved:</b> {resolved}</div>
</div>
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