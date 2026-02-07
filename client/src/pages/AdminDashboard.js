import { useEffect, useState } from "react";
import api from "../utils/axios";
import LogoutButton from "../components/LogoutButton";

export default function AdminDashboard() {
  const [reports, setReports] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchReports = async () => {
    const res = await api.get("/report");
    setReports(res.data);
  };
  const fetchVolunteers = async () => {
    const res = await api.get("/user/volunteers");
    setVolunteers(res.data);
  };

  useEffect(() => {
    Promise.all([fetchReports(), fetchVolunteers()])
      .finally(() => setLoading(false));
  }, []);
  const updateStatus = async (id, status) => {
    await api.patch(`/report/${id}`, { status });
    fetchReports();
  };
  const assignVolunteer = async (reportId, volunteerId) => {
    await api.patch(`/report/${reportId}/assign`, { volunteerId });
    fetchReports();
  };

  if (loading) return <h2>Loading reports...</h2>;

  return (
    <div>
      <LogoutButton />
      <h2>Admin Dashboard – All Reports</h2>

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

          <p><b>Address:</b></p>
          <p>
            {report.address?.street}, {report.address?.area}, {report.address?.city}<br />
            Landmark: {report.address?.landmark}<br />
            Pincode: {report.address?.pincode}
          </p>

          <p>
            <b>Location:</b> {report.location.lat}, {report.location.lng}
          </p>
          <label><b>Update Status:</b></label><br />
          <select
            value={report.status}
            onChange={(e) => updateStatus(report._id, e.target.value)}
          >
            <option value="PENDING">PENDING</option>
            <option value="VERIFIED">VERIFIED</option>
            <option value="TEAM_ASSIGNED">TEAM_ASSIGNED</option>
            <option value="RESOLVED">RESOLVED</option>
            <option value="REJECTED">REJECTED</option>
          </select>

          <br /><br />
          <label><b>Assign Volunteer:</b></label><br />
          <select
            onChange={(e) => assignVolunteer(report._id, e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>Select Volunteer</option>
            {volunteers.map((v) => (
              <option key={v._id} value={v._id}>
                {v.name} ({v.city})
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}
