import { useState, useEffect } from "react";
import api from "../utils/axios";
import MapPicker from "../components/MapPicker";
import ReportCard from "../components/ReportCard";

export default function UserDashboard() {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState(null);
  const [reports, setReports] = useState([]);

  const [address, setAddress] = useState({
    street: "",
    area: "",
    city: "",
    landmark: "",
    pincode: "",
  });

  const fetchReports = async () => {
    const res = await api.get("/report");
    setReports(res.data);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleSubmit = async () => {
    if (!location) return alert("Select location on map");

    await api.post("/report", {
      image: "test.jpg",
      description,
      lat: location.lat,
      lng: location.lng,
      address,
    });

    setDescription("");
    setAddress({
      street: "",
      area: "",
      city: "",
      landmark: "",
      pincode: "",
    });

    fetchReports();
  };

  return (
    <div>
      <h2>Create Report</h2>

      <input
        placeholder="Describe the issue"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <h3>Address Details</h3>

      <input
        placeholder="Street / House No"
        onChange={(e) =>
          setAddress({ ...address, street: e.target.value })
        }
      />

      <input
        placeholder="Area"
        onChange={(e) =>
          setAddress({ ...address, area: e.target.value })
        }
      />

      <input
        placeholder="City"
        onChange={(e) =>
          setAddress({ ...address, city: e.target.value })
        }
      />

      <input
        placeholder="Landmark"
        onChange={(e) =>
          setAddress({ ...address, landmark: e.target.value })
        }
      />

      <input
        placeholder="Pincode"
        onChange={(e) =>
          setAddress({ ...address, pincode: e.target.value })
        }
      />

      <MapPicker setLocation={setLocation} />

      <button onClick={handleSubmit}>Submit Report</button>

      <h2>My Reports</h2>
      {reports.map((r) => (
        <ReportCard key={r._id} report={r} />
      ))}
    </div>
  );
}
