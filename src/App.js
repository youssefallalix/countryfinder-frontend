import React, { useState } from 'react';
import './App.css';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(null);

  const getData = (country) => {
    fetch(`https://crispy-bassoon-p6599vj67qv2r5r6-5000.app.github.dev/shape/${country}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
    })
      .then((res) => {
        console.log(res)
        return res.json()
      })
      .then((resData) => {
        setData(resData)
        console.log(data)
        setError(null)
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      })
  }

  const handleSubmit = (e, reqData) => {
    e.preventDefault()
    setLoading(true);
    getData(reqData)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h6>CoutryFinder</h6>
        <form onSubmit={(e) => handleSubmit(e, formData)}>
          <input onChange={(e) => setFormData(e.target.value)} type='text' />
          <button disabled={loading} type='submit'>
            {loading ? (
              <>Loading</>
            ) : (
              <>Submit</>
            )}
          </button>
        </form>
      </header>
      <MapContainer center={[0, 0]} zoom={2} style={{ height: "90vh" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data !== null && (<GeoJSON key={JSON.stringify(data)} attribution="&copy; credits due..." data={data} />)}
      </MapContainer>
      <div>
      </div>
    </div>
  );
}

export default App;
