export default function ReportCard({ report }) {
  return (
    <div style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
      <p><b>Description:</b> {report.description}</p>
      <p><b>Status:</b> {report.status}</p>
      <p>
        <b>Location:</b> {report.location.lat}, {report.location.lng}
      </p>

      <p><b>Address:</b></p>
      <p>{report.address?.street}</p>
      <p>{report.address?.area}</p>
      <p>{report.address?.city}</p>
      <p>{report.address?.landmark}</p>
      <p>{report.address?.pincode}</p>
    </div>
  );
}
