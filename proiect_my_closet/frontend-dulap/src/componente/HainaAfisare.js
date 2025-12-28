import React from "react";

function HainaAfisare({ haina }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        backgroundColor: "white",
        width: "200px",
        borderRadius: "10px",
      }}
    >
      {haina.urlPoza ? (
        <img
          src={haina.urlPoza}
          alt="haina"
          style={{ width: "100%", borderRadius: "8px" }}
        />
      ) : (
        <div
          style={{
            height: "100px",
            background: "#eee",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Fără poză
        </div>
      )}

      <h3>{haina.tip}</h3>
      <p>
        {haina.material}, {haina.culoare}, {haina.stil}
      </p>
    </div>
  );
}

export default HainaAfisare;
