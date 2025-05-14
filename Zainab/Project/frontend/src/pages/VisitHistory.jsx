import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function VisitHistory() {
    const { id } = useParams();
    const [visits, setVisits] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get(http://localhost:8000/patients/${id}/visits, {
            headers: { Authorization: Bearer ${ token } },
    }).then(res => setVisits(res.data));
  }, [id]);

return (
    <div className="p-4 max-w-2xl mx-auto">
        <h2 className="text-xl mb-4">Visit History</h2>
        {visits.length === 0 ? (
            <p>No past visits available.</p>
        ) : (
            visits.map(visit => (
                <div key={visit.id} className="border rounded mb-4 p-3">
                    <div className="text-sm text-gray-500 mb-1">{new Date(visit.created_at).toLocaleString()}</div>
                    <div className="font-semibold">Summary:</div>
                    <p>{visit.summary}</p>
                    <div className="font-semibold mt-2">Note:</div>
                    <pre className="bg-gray-100 p-2 rounded whitespace-pre-wrap">{visit.note}</pre>
                </div>
            ))
        )}
    </div>
);
}

export default VisitHistory;