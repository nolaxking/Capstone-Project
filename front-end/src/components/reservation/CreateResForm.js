import React, { useState } from "react";
import { createRes } from "../../utils/api";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../../layout/ErrorAlert";
export default function CreateResForm() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  });
  const [error, setError] = useState();

  const his = useHistory();

  async function handleCreate(event) {
    event.preventDefault();
    console.log(form);
    const date = new Date(`${form.reservation_date} ${form.reservation_time}`);
    const nowDate = new Date();
    const time = Number(form.reservation_time.replace(":", ""));
    console.log(date.getUTCDay(), date);
    console.log(time);
    console.log(nowDate)
    try {
      if (date.getUTCDay() === 3) {
        throw new Error("We are closed on tuesday.");
      }
      if (date.getUTCDate() < nowDate.getUTCDate()) {
        throw new Error("You can only make reservation on a future date.");
      }
      if (time < "1030 " || time > "2130") {
        throw new Error("We are closed ");
      }

      await createRes(form);
      his.push(`/dashboard`);
    } catch (err) {
      console.log(err)
      if(err)setError(err.message)

    }
  }

  function handleChange(event) {
    event.preventDefault();

    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }
  return (
    <>
      <form onSubmit={handleCreate}>
        <div className="card-header ">
          <h2>Make Your Reservation</h2>
        </div>
        <div className="form-group">
          <label htmlFor="fname">First Name:</label>
          <input
            name="first_name"
            type="text"
            className="form-control"
            id="fname"
            onChange={handleChange}
            placeholder="John"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lname">Last Name</label>
          <input
            name="last_name"
            type="text"
            className="form-control"
            id="lname"
            onChange={handleChange}
            placeholder="Doe"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobile_number">Phone Number</label>
          <input
            name="mobile_number"
            type="text"
            className="form-control"
            id="mobile_number"
            onChange={handleChange}
            placeholder="###-###-####"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date">Reservation Date</label>
          <input
            name="reservation_date"
            type="date"
            className="form-control"
            id="date"
            onChange={handleChange}
            placeholder="YYYY-MM-DD"
            pattern="\d{4}-\d{2}-\d{2}"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="time">Reservation Time</label>
          <input
            name="reservation_time"
            type="time"
            className="form-control"
            id="time"
            onChange={handleChange}
            placeholder="HH:MM"
            pattern="[0-9]{2}:[0-9]{2}"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="people">People</label>
          <input
            name="people"
            type="number"
            className="form-control"
            id="people"
            onChange={handleChange}
            placeholder="1"
            required
          />
        </div>
        <div>
          <ErrorAlert error={error} />
        </div>
        <div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleCreate}
          >
            Submit
          </button>

          <button type="button" className="btn btn-danger" onClick={his.goBack}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
