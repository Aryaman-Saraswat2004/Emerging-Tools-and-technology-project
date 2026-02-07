import { useEffect, useState } from "react";
import api from "../utils/axios";
import LogoutButton from "../components/LogoutButton";

export default function VolunteerDashboard() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const res = await api.get("/report");
      setReports(res.data);
    } catch (err) {
      alert("Failed to fetch assigned reports");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/report/${id}`, { status });
      fetchReports();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  if (loading) return <h2>Loading assigned reports...</h2>;

  return (
    <div>
      <LogoutButton />
      <h2>Volunteer Dashboard – Assigned Reports</h2>

      {reports.length === 0 && <p>No reports assigned to you.</p>}

      {reports.map((report) => (
        <div
          key={report._id}
          style={{
            border: "1px solid #ccc",
            margin: "15px 0",
            padding: "15px",
          }}
        >
          <p><b>Description:</b> {report.description}</p>
          <p><b>Status:</b> {report.status}</p>

          <p><b>Reported By:</b></p>
          <p>
            {report.createdBy?.name} <br />
            {report.createdBy?.email} <br />
            {report.createdBy?.city}
          </p>

          <p>
            <b>Location:</b> {report.location.lat}, {report.location.lng}
          </p>

          <label><b>Update Status:</b></label>
          <br />

          <select
            value={report.status}
            onChange={(e) => updateStatus(report._id, e.target.value)}
          >
            <option value="TEAM_ASSIGNED">TEAM_ASSIGNED</option>
            <option value="RESOLVED">RESOLVED</option>
          </select>
        </div>
      ))}
    </div>
  );
}
