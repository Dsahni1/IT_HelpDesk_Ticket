// import { useEffect, useState } from "react";
// import axios from "axios";


// function AdminPanel() {
//   const [tickets, setTickets] = useState([]);
//   const token = localStorage.getItem("token");

// //   useEffect(()=>{
//   const fetchAllTickets = async () => {
//     try {
//       const res = await axios.get("https://it-helpdesk-ticket-backend.onrender.com/api/tickets/all", {
//         headers: { Authorization: token }
//       });
//       setTickets(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(()=>{
//     fetchAllTickets();
//   }, [token]);

//   const handleLogout = () => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("role");
//   window.location.href = "/";
//     };
//   // Update status
//   const updateStatus = async (id, status) => {
//     try {
//       await axios.put(
//         `https://it-helpdesk-ticket-backend.onrender.com/api/tickets/${id}`,
//         { status },
//         { headers: { Authorization: token } }
//       );

//       fetchAllTickets();
//     } catch (err) {
//       console.log(err);
//     }
//   };
//     const total = tickets.length;
//     const open = tickets.filter(t => t.status === "Open").length;
//     const inProgress = tickets.filter(t => t.status === "In Progress").length;
//     const resolved = tickets.filter(t => t.status === "Resolved").length;

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial" }}>
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//             <h2>Admin Panel</h2>
//             <button onClick={handleLogout}>Logout</button>
//         </div>    

//         <div style={{display: "flex", gap: "20px", margin: "20px 0"}}>
//         <div style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
//             <b>Total:</b> {total}
//         </div>
//         <div style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
//             <b>Open:</b> {open}
//         </div>
//         <div style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
//             <b>In Progress:</b> {inProgress}
//         </div>
//         <div style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
//             <b>Resolved:</b> {resolved}
//         </div>
//     </div>
    
//       {tickets.map((ticket) => (

//         <div key={ticket._id} style={{border: "1px solid #ccc",borderRadius: "10px",padding: "15px",marginBottom: "10px",boxShadow: "0 2px 5px rgba(0,0,0,0.1)"}}>
//           <p><b>{ticket.title}</b></p>
//           <p>{ticket.description}</p>
//           <p style={{color:ticket.status === "Resolved" ? "green" :ticket.status === "In Progress" ? "orange" :"red"}}>Status: {ticket.status}</p>
//           <p>Priority: {ticket.priority}</p>
//           <p>User: {ticket.createdBy?.email}</p>

//           {/* Update buttons */}
//           {/* <button onClick={() => updateStatus(ticket._id, "In Progress")}> */}
//           <button style={{ marginRight: "10px" }} onClick={() => updateStatus(ticket._id, "In Progress")}>
//             In Progress
//           </button>

//           <button onClick={() => updateStatus(ticket._id, "Resolved")}>
//             Resolved
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }


// export default AdminPanel;

import { useEffect, useState, useCallback } from "react";
import axios from "axios";

function AdminPanel() {
  const [tickets, setTickets] = useState([]);
  const token = localStorage.getItem("token");

  const fetchAllTickets = useCallback(async () => {
    try {
      const res = await axios.get("https://it-helpdesk-ticket-backend.onrender.com/api/tickets/all", {
        headers: { Authorization: token }
      });
      setTickets(res.data);
    } catch (err) {
      console.log(err);
    }
  }, [token]); // token is the dependency of this function

  useEffect(() => {
    fetchAllTickets();
  }, [fetchAllTickets]); // now fetchAllTickets is stable, safe to include

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `https://it-helpdesk-ticket-backend.onrender.com/api/tickets/${id}`,
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
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Admin Panel</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div style={{ display: "flex", gap: "20px", margin: "20px 0" }}>
        <div style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
          <b>Total:</b> {total}
        </div>
        <div style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
          <b>Open:</b> {open}
        </div>
        <div style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
          <b>In Progress:</b> {inProgress}
        </div>
        <div style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
          <b>Resolved:</b> {resolved}
        </div>
      </div>

      {tickets.map((ticket) => (
        <div key={ticket._id} style={{ border: "1px solid #ccc", borderRadius: "10px", padding: "15px", marginBottom: "10px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
          <p><b>{ticket.title}</b></p>
          <p>{ticket.description}</p>
          <p style={{ color: ticket.status === "Resolved" ? "green" : ticket.status === "In Progress" ? "orange" : "red" }}>
            Status: {ticket.status}
          </p>
          <p>Priority: {ticket.priority}</p>
          <p>User: {ticket.createdBy?.email}</p>
          <button style={{ marginRight: "10px" }} onClick={() => updateStatus(ticket._id, "In Progress")}>
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