import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../useFetch";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading } = useFetch(`http://localhost:3000/events/${id}`);

  if (loading) return <p className="p-3">Loading...</p>;
  if (!data) return <p className="p-3">Event not found.</p>;

  return (
    <div className="container py-4">
      <button className="btn btn-secondary mb-3" onClick={() => navigate("/")}>
        Back
      </button>

      <div className="row">
        <div className="col-md-8">
          <h2>{data.title}</h2>
          <p className="text-muted">
            Hosted By:
            <br />
            <strong>{data.hostedBy}</strong>
          </p>
          <img
            src={data.image}
            alt={data.title}
            className="img-fluid rounded mb-4 w-100"
            style={{ maxHeight: "350px", objectFit: "cover" }}
          />
          <h5>Details:</h5>
          <p>{data.description}</p>

          <h5 className="mt-4">Additional Information:</h5>
          <p>
            <strong>Dress Code:</strong> {data.dressCode}
          </p>
          <p>
            <strong>Age Restrictions:</strong> {data.ageRestriction}
          </p>

          <h5 className="mt-3">Event Tags:</h5>
          <div className="d-flex gap-2 flex-wrap">
            {data.tags?.map((tag, i) => (
              <span key={i} className="badge bg-danger p-2">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 mb-4">
            <p className="mb-2">
              {data.date} at {data.time} to
              <br />
              {data.date} at 12:00:00 PM
            </p>
            <p className="mb-2">
              {data.venue}
              <br />
              {data.address}
            </p>
            {data.price > 0 && <p className="mb-0">₹ {data.price}</p>}
          </div>

          {data.speakers?.length > 0 && (
            <>
              <h5>Speakers: ({data.speakers.length})</h5>
              <div className="d-flex gap-3 flex-wrap">
                {data.speakers.map((s, i) => (
                  <div
                    key={i}
                    className="card p-3 text-center"
                    style={{ width: "120px" }}
                  >
                    <img
                      src={s.image}
                      alt={s.name}
                      className="rounded-circle mb-2 mx-auto d-block"
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                      }}
                    />
                    <p className="mb-0 fw-bold small">{s.name}</p>
                    <p className="small text-muted mb-0">{s.role}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="text-center mt-4">
            <button className="btn btn-danger px-5">RSVP</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
