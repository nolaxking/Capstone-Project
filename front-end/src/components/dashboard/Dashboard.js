import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { listReservations } from "../../utils/api";
import ErrorAlert from "../../layout/ErrorAlert";
import useQuery from "../../utils/useQuery";
import { formatAsDate, today,previous,next } from "../../utils/date-time";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard() {
  let query = useQuery();

  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [date, setDate] = useState(query.get("date") || today());

  const { search } = useLocation();

  useEffect(loadDashboard, [date]);
console.log(date)
  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h2 className="mb-0">{formatAsDate(date)}</h2>
        <button onClick={()=>setDate(previous(date))}> previous  </button>
        <button onClick={()=> setDate(today())}> Today  </button>
        <button onClick={()=>setDate(next(date))}> Next </button>
      </div>
      
      <ErrorAlert error={reservationsError} />
      {JSON.stringify(reservations)}
    </main>
  );
}

export default Dashboard;
