import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");

  const token = localStorage.getItem("token");

  // Fetch tickets
  const fetchTickets = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/tickets", {
        headers: { Authorization: token }
      });
      setTickets(res.data);
    } catch (err) {
      console.log(err);
    }
  };
    // eslint-disable-next-line
    useEffect(() => {
        fetchTickets();
    }, []);

  // Create ticket
  const createTicket = async () => {
    try {
      await axios.post(
        "http://localhost:5001/api/tickets",
        { title, description, priority },
        { headers: { Authorization: token } }
      );

        setTitle("");
        setDescription("");
      fetchTickets(); // refresh list

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>User Dashboard</h2>

      {/* Create Ticket */}
      <div>
        {/* <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} /> */}
        <input value={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
        {/* <input placeholder="Description" onChange={(e) => setDescription(e.target.value)} /> */}
        <input value={description} placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
        <select onChange={(e) => setPriority(e.target.value)}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <button onClick={createTicket}>Create Ticket</button>
      </div>

      {/* Ticket List */}
      <h3>Your Tickets</h3>
      {tickets.map((ticket) => (
        <div key={ticket._id} style={{ border: "1px solid black", margin: "10px" }}>
          <p><b>{ticket.title}</b></p>
          <p>{ticket.description}</p>
          <p>Status: {ticket.status}</p>
          <p>Priority: {ticket.priority}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;