import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/users')
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  }, [])

  const handleDelete = (id) => {
    const confirm = window.confirm("Would you like to Delete?");
    if (confirm) {
      axios.delete('http://localhost:3001/users/' + id)
        .then(res => {
          window.location.reload();
        })
        .catch(err => console.log(err));
    }
  }

  return (
    <div className='d-flex flex-column justify-content-center align-items-center bg-light vh-100'>
      <h1>List of Users</h1>
      <div className='w-75 rounded bg-white border shadow p-4'>
        <div className='d-flex justify-content-end'>
          <Link to="/create" className='btn btn-sm btn-success me-2'>Add +</Link>
        </div>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>ID</th>
              <th>name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((v, i) => (
                <tr key={i}>
                  <td>{v.id}</td>
                  <td>{v.name}</td>
                  <td>{v.email}</td>
                  <td>{v.phone}</td>
                  <td>
                    <Link to={`/read/${v.id}`} className='btn btn-sm btn-info me-2'>Read</Link>
                    <Link to={`/update/${v.id}`} className='btn btn-sm btn-primary me-2'>Edit</Link>
                    <button onClick={e => handleDelete(v.id)} className='btn btn-sm btn-danger'>Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home;
