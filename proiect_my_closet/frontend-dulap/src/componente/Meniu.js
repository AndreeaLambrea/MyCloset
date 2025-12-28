import React from "react";
import "./Meniu.css";

function Meniu({ setEcran }) {
  return (
    <div className="meniu-background">
      <h1 className="meniu-titlu">Stay chic</h1>

      <div className="meniu-butoane">
        <button className="buton-chic" onClick={() => setEcran("dulap")}>
          Vizualizare haine
        </button>

        <button className="buton-chic" onClick={() => setEcran("adauga")}>
          Adaugare haine
        </button>

        <button className="buton-chic" onClick={() => setEcran("generator")}>
          Creare outfit
        </button>
      </div>
    </div>
  );
}

export default Meniu;
