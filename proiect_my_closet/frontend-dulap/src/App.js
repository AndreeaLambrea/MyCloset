import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

import Meniu from "./componente/Meniu";
import Dulap from "./componente/Dulap";
import Floare3D from './componente/Floare3D';

import GeneratorOutfit from "./componente/GeneratorOutfit";

function App() {
  const [haine, setHaine] = useState([]);
  const [ecran, setEcran] = useState("meniu");
  const [hainaNoua, setHainaNoua]= useState({
    tip: "",
    culoare: "",
    material: "",
    stil: "",
    poza: null

  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/haine")
      .then((r) => setHaine(r.data))
      .catch((e) => console.error("Eroare server:", e));
  }, []);

  const adaugaHaine = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("tip", hainaNoua.tip);
    formData.append("culoare", hainaNoua.culoare);
    formData.append("material", hainaNoua.material);
    formData.append("stil", hainaNoua.stil);
    formData.append("poza", hainaNoua.poza);

    axios.post("http://localhost:8080/api/haine", formData,{
        headers: {"Content-Type": "multipart/form-data"},
    })

    .then((response)=>{
        setHaine([...haine, response.data]);

        setHainaNoua({tip: "", culoare: "", material: "", stil: "",
        poza: null
        });

        const fileInput = document.getElementById("fileInput");
        if(fileInput)fileInput.value = "";
        setEcran("dulap");
  })
    .catch((error)=> console.error("Eroare la upload", error));
};


  return (
    <div className= "app-container">
      {ecran === "meniu" && (
      <>
        <Floare3D />
      <Meniu setEcran={setEcran} />
      </>
      )}
      {ecran === "dulap" && (
      <Dulap
      haine={haine}
      setEcran={setEcran}
      ecranAdaugare={()=>setEcran("adauga")}
      />
    )}
    {ecran === "generator" &&(
        <GeneratorOutfit haine = {haine} setEcran = {setEcran} />
    )}

    {ecran === "adauga" && (
    <div className  = "fundal-adauga">

    <div className = "container-formular">

        <form onSubmit = {adaugaHaine} className = "form-stil">

        <input type="text" placeholder="Tip" value={hainaNoua.tip} onChange={e => setHainaNoua({...hainaNoua, tip: e.target.value})} required />
        <input type="text" placeholder="Culoare" value={hainaNoua.culoare} onChange={e => setHainaNoua({...hainaNoua, culoare: e.target.value})} required />
        <input type="text" placeholder="Material" value={hainaNoua.material} onChange={e => setHainaNoua({...hainaNoua, material: e.target.value})} required />
        <input type="text" placeholder="Stil" value={hainaNoua.stil} onChange={e => setHainaNoua({...hainaNoua, stil: e.target.value})} required />
        <div className ="upload-container">
            <label className= "file-upload" htmlFor= "file" >
            <div className="text">
                <span style ={{fontSize: "1.1rem", fontWeight: "bold"}}>
                {hainaNoua.poza ? '${hainaNoua.poza.name}': "Aici"}
              </span>
        </div>
            <input
                type="file"
                id="file"
                onChange= {e => setHainaNoua({...hainaNoua, poza: e.target.files[0]})}
                required
             />
            </label>
            <div className="container-butoane-form">
        <button type = "submit" className= "buton-salveaza">
            Salveaza
        </button>
        <button type = "button" onClick={() => setEcran("meniu")}>
            Anuleaza
        </button>
        </div>
        </div>
      </form>
    </div>
  </div>
  )}
 </div>
  );
}

export default App;
