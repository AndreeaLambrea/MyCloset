import React from "react";
import "./Dulap.css";
import HainaAfisare from "./HainaAfisare";

function Dulap({ haine, setEcran }) {
  return (
    <div className="dulap-container">

      <button className="buton-chic" onClick={() => setEcran("meniu")}>
        Înapoi la meniu
      </button>



      <h2 className="dulap-titlu">Hainele:</h2>

      <div className="dulap-galerie">
        {haine.length === 0 ? (
          <p className="dulap-empty">Nu sunt haine</p>
        ) : (
          haine.map((haina, index) => (
            <HainaAfisare haina={haina} key={index} />
          ))
        )}
      </div>
    </div>
  );
}

export default Dulap;
