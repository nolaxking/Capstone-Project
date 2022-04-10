import React, { useState } from "react";
import { useHistory } from "react-router";
import { createTable } from "../../utils/api";
import ErrorAlert from "../../layout/ErrorAlert";

function TablesForm() {
  const his = useHistory();
  const [error,setError]=useState()
  const [form, setForm] = useState({
    table_name: "",
    capacity: 0,
  });
  async function handleCreate(event) {
    event.preventDefault();
    console.log(form)
    try{
      if(form.capacity===0)throw new Error("At least one seat.")
      if(form.table_name.length < 2)throw new Error("Place enter a table name.")
      await createTable(form);
      his.push(`/dashboard`);
    }
    catch(err){setError(err.message)}
   
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
        <div className="form-group">
          <label htmlFor="tname">Table Name</label>
          <input
            name="table_name"
            type="text"
            className="form-control"
            id="tname"
            onChange={handleChange}
            placeholder="Table #1"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="capacity">capacity</label>
          <input

            name="capacity"
            type="number"
            className="form-control"
            id="capacity"
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

export default TablesForm;
