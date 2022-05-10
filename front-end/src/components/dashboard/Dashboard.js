import React, { useEffect, useState } from "react";

import { listReservations, listTables } from "../../utils/api";
import ErrorAlert from "../../layout/ErrorAlert";
import useQuery from "../../utils/useQuery";
import {
 
  today,
  previous,
  next,
  formatDate,
} from "../../utils/date-time";
import ReservationsList from "../reservation/ReservationList";
import TableList from "../tables/TableList";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard() {
  let query = useQuery();

  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tableError, setTableError] = useState(null);
  const [date, setDate] = useState(query.get("date") || today());

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  useEffect(listTable, []);
  useEffect(loadDashboard, [date]);

  
  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  function listTable() {
    const abortController = new AbortController();
    setTableError(null);
    listTables(abortController.signal).then(setTables).catch(setTableError);
    return () => abortController.abort();
  }
 
  return (
    <main className="text-center">
      <h1 className="text-white">Dashboard</h1>

      <h2 className="text-center  mb-3 text-white">{formatDate(date)}</h2>
      <button
        type="button"
        className="btn btn-secondary text-white me-md-2"
        onClick={() => setDate(previous(date))}
      >
        {" "}
        previous{" "}
      </button>
      <button
        type="button"
        className="btn  btn-secondary text-white m-2"
        onClick={() => setDate(today())}
      >
        {" "}
        Today{" "}
      </button>
      <button
        type="button"
        className="btn btn-secondary text-white"
        onClick={() => setDate(next(date))}
      >
        {" "}
        Next{" "}
      </button>

      <label htmlFor="reservation_date" className="form-label m-3 bg-light">
        <input
          className="border-secondary rounded"
          type="date"
          pattern="\d{4}-\d{2}-\d{2}"
          name="reservation_date"
          onChange={handleDateChange}
          value={date}
        />
      </label>

      {reservations.length ? (
        <h3 className="text-white">Reservations</h3>
      ) : (
        <h3 className="text-white">{`No reservations for ${date}`}</h3>
      )}
      <div className="d-flex justify-content-center flex-wrap">
        {reservations.map((reservation) => (
          <ReservationsList
            key={reservation.reservation_id}
            reservation={reservation}
          />
        ))}
      </div>
      <h3 className="text-white">Tables</h3>
      <div className="d-flex justify-content-center flex-wrap">
        {tables.map((table) => (
          <TableList key={table.table_id} table={table} />
        ))}
      </div>

      <ErrorAlert error={reservationsError} />
      <ErrorAlert error={tableError} />
    </main>
  );
}

export default Dashboard;
