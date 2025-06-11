import { useEffect, useState } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import AttendeeSidebarLayout from "../../components/AttendeeSidebarLayout";

function CertificatesPage() {
  const [certificates, setCertificates] = useState([]);
  const [user, setUser] = useState(null);
  const [visibleCertId, setVisibleCertId] = useState(null);

  const token = localStorage.getItem("userToken");

  useEffect(() => {
    if (token) fetchUserInfo();
  }, []);

  useEffect(() => {
    if (user?._id && token) fetchCompletedEvents(user._id);
  }, [user]);

  const fetchUserInfo = async () => {
    try {
      const res = await axios.get("https://miniproject-1-34zo.onrender.com/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch user info:", err.message);
    }
  };

  const fetchCompletedEvents = async (userId) => {
    try {
      const res = await axios.get("https://miniproject-1-34zo.onrender.com/api/registrations/myevent", {
        params: { userId },
        headers: { Authorization: `Bearer ${token}` },
      });

      const now = new Date();
      const completed = (res.data.registrations || []).filter((reg) => {
        const eventDate = new Date(reg.event.date);
        return eventDate <= now;
      });

      const certData = completed.map((reg) => ({
        id: reg._id,
        event: reg.event.title,
        date: new Date(reg.event.date).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      }));

      setCertificates(certData);
    } catch (err) {
      console.error("Failed to fetch completed events:", err.message);
    }
  };

  const downloadCertificate = (id) => {
    const certElem = document.getElementById(`cert-${id}`);
    if (!certElem) return;
    html2canvas(certElem).then((canvas) => {
      const link = document.createElement("a");
      link.download = `certificate-${id}.png`;
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <AttendeeSidebarLayout>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-3xl font-extrabold mb-4 text-center text-indigo-700">🎓 My Certificates</h1>
        <p className="text-gray-600 mb-6 text-center">
          View and download certificates from completed events.
        </p>

        {certificates.length === 0 ? (
          <p className="text-gray-500 text-center">No certificates available yet.</p>
        ) : (
          <div className="space-y-10">
            {certificates.map((cert) => (
              <div key={cert.id} className="border rounded-lg p-4 shadow-sm bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{cert.event}</h2>
                    <p className="text-sm text-gray-500">Completed on {cert.date}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setVisibleCertId((prev) => (prev === cert.id ? null : cert.id))
                      }
                      className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 text-sm"
                    >
                      {visibleCertId === cert.id ? "Hide Certificate" : "Show Certificate"}
                    </button>
                    <button
                      onClick={() => downloadCertificate(cert.id)}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
                    >
                      Download
                    </button>
                  </div>
                </div>

                {visibleCertId === cert.id && (
                  <div
                    id={`cert-${cert.id}`}
                    className="mt-8 bg-white border-[8px] border-yellow-600 rounded-lg p-8 shadow-xl text-center relative overflow-visible max-w-[700px] mx-auto scale-90"
                  >
                    {/* Inner border */}
                    <div className="absolute inset-0 border border-yellow-500 rounded-lg pointer-events-none" />

                    {/* Event Title */}
                    <h2 className="text-lg font-serif font-semibold text-yellow-700 uppercase tracking-wide mb-1">
                      Tech Event Management
                    </h2>

                    {/* Certificate Title */}
                    <h1 className="text-2xl font-serif font-bold text-gray-900 uppercase tracking-wider mb-4 whitespace-nowrap">
                      Certificate of Participation
                    </h1>

                    {/* Certify Statement */}
                    <p className="text-sm text-gray-700 mb-1">This is to certify that</p>
                    <p className="text-xl font-serif font-semibold text-gray-900 mb-2 underline decoration-yellow-600 decoration-2 underline-offset-2">
                      {user?.name}
                    </p>

                    {/* Event Name */}
                    <p className="text-sm text-gray-700 mb-1">has successfully participated in the event</p>
                    <p className="text-lg font-semibold text-blue-800 mb-4 italic tracking-wide">{cert.event}</p>

                    {/* Date */}
                    <p className="text-xs text-gray-500 mb-4">Date Issued: {cert.date}</p>

                    {/* Signatures */}
                    <div className="flex justify-between items-center mt-6 px-4">
                      <div className="text-left">
                        <p className="border-t border-gray-400 w-32 pt-1 text-xs text-gray-700">
                          Organizer Signature
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="border-t border-gray-400 w-32 pt-1 text-xs text-gray-700">
                          Authority Signature
                        </p>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="absolute bottom-2 left-4 text-[10px] text-gray-400 italic">
                      Powered by Tech Event Management
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AttendeeSidebarLayout>
  );
}

export default CertificatesPage;
