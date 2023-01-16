import { useEffect, useState } from "react";
import "./App.css";

function App() {
  //Provinces and locations in state
  const [province, setProvince] = useState([]);
  const [provinceId, setProvinceId] = useState("");
  const [stateId, setStateId] = useState("");
  const [state, setState] = useState([]);
  const [location, setLocation] = useState([]);
  //Fetching the data
  useEffect(() => {
    const getProvince = async () => {
      const resProvince = await fetch(
        "https://apis.datos.gob.ar/georef/api/provincias"
      );
      const res = await resProvince.json();
      setProvince(res.provincias);
    };
    getProvince();
  }, []);
  const handleProvince = (e) => {
    const selectedProvince = e.target.value;
    const p = province.find((p) => p.nombre === selectedProvince);
    setProvinceId(p.id);
  };
  const handleState = (e) => {
    const selectedState = e.target.value;
    const p = state.find((p) => p.nombre === selectedState);
    setStateId(p.id);
  };
  useEffect(() => {
    if (provinceId.length > 1) {
      const getState = async () => {
        const resState = await fetch(
          `https://apis.datos.gob.ar/georef/api/departamentos?provincia=${provinceId}&campos=id,nombre&max=700`
        );
        const res = await resState.json();
        setState(res.departamentos);
      };
      getState();
    }
  }, [provinceId]);
  useEffect(() => {
    if (stateId.length > 1) {
      const getLocation = async () => {
        const resLocation = await fetch(
          `https://apis.datos.gob.ar/georef/api/localidades-censales?provincia=${provinceId}&departamento=${stateId}&max=1000`
        );
        const res = await resLocation.json();
        setLocation(res.localidades_censales);
      };
      getLocation();
    }
  }, [stateId]);
  //Log data
  //console.log(province);
  //console.log(provinceId);
  //console.log(location);
  //console.log(state);
  return (
    <div className="">
      <form className="form">
        <select name="country" id="country">
          <option value="argetina">Argentina</option>
        </select>
        <select name="province" id="province" onChange={handleProvince} >
          <option value="">Seleccione una Provincia</option>
          {province.map((prov) => (
            <option value={prov?.nombre} key={prov.id}>
              {prov?.nombre}
            </option>
          ))}
        </select>
        <select name="state" id="state" onChange={handleState} disabled={provinceId ? false : true}>
          <option value="">Seleccione una Departamento</option>
          {state.map((sta) => (
            <option value={sta?.nombre} key={sta.id}>
              {sta?.nombre}
            </option>
          ))}
        </select>
        <select name="location" id="location" disabled={stateId ? false : true}>
          <option value="">Seleccione una Localidad</option>
          {location.map((loc) => (
            <option value={loc?.nombre} key={loc.id}>
              {loc?.nombre}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
}

export default App;
