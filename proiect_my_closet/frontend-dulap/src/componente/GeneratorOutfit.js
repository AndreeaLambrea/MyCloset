import React, {useState} from "react";
import "./GeneratorOutfit.css";
import HainaAfisare from "./HainaAfisare";

const REGULI_CROMATICE = {
"alb": ["negru", "alb", "gri", "roz", "crem", "bej", "rosu"],
"negru": ["orice"],
"roz": ["alb", "gri", "negru", "albastru"],
"albastru": ["alb", "negru", "gri"],
"rosu": ["negru", "alb", "Gri", "albastru", "rosu"],
"verde": ["verde", "negru", "alb", "gri", "maro"],
"crem": ["negru", "gri", "alb","crem", "roz","albastru"],
"maro": ["negru", "gri", "alb", "maro", "albastru"],
"universal": ["negru", "alb"]
};

function GeneratorOutfit({haine, setEcran}){
    const [pas, setPas]= useState(0);
    const [stilAles, setStilAles]= useState("");
    const [outfit, setOutfit] = useState(null);

    const normalizeazaCuloare = (culoareRaw) => {
        if(!culoareRaw) return "universal";
        const c = culoareRaw.toLowerCase().trim();
        const cheieGasita = Object.keys(REGULI_CROMATICE).find(key => c.includes(key));
        return cheieGasita || "universal";
    };

    const verificaCompatibilitate = (culoareBaza, culoareNoua) => {
        const baza = culoareBaza ? culoareBaza.toLowerCase().trim(): "universal";
        const noua = culoareNoua ? culoareNoua.toLowerCase().trim(): "universal";

        if(baza === "universal" || noua === "universal") return true;

        const permise = REGULI_CROMATICE[baza] || REGULI_CROMATICE["universal"];
        if (permise[0] === "orice") return true;
        return permise.includes(noua);
    };

    const pickRandom = (arr) => arr.length > 0 ? arr[Math.floor(Math.random()* arr.length)] : null;

    const genereazaOutfit = (stil) => {

        const haineStil = haine.filter (h=>
         h.stil &&( h.stil.toLowerCase().includes(stil) || h.stil.toLowerCase() === "universal")
         );
        const topuri = haineStil.filter(h =>
        ["top", "bluza", "tricou", "camasa"].some(t => h.tip?.toLowerCase().includes(t))
        );
        const topAles = pickRandom(topuri);


        if(!topAles){
            alert("nu am suficiente haine");
            return;
        }

        const pantaloniCandidati = haineStil.filter(h =>
        ["pantaloni", "fusta", "blugi", "colanti", "shorts"].some(t => h.tip?.toLowerCase().includes(t)) &&
        verificaCompatibilitate(topAles.culoare, h.culoare)
        );


        const bottomAles = pickRandom(pantaloniCandidati);

        const geciCandidate = haineStil.filter (h=>
          ["geaca", "palton", "vesta", "sacou", "trench"].some(t => h.tip?.toLowerCase().includes(t)) &&
           verificaCompatibilitate(topAles.culoare, h.culoare)
        );

        const geacaAleasa = pickRandom(geciCandidate);

        const accesoriiCandidate = haineStil.filter (h=>
           ["accesoriu", "geanta", "fular", "sapca"].some(t => h.tip?.toLowerCase().includes(t)) &&
            verificaCompatibilitate(topAles.culoare, h.culoare)
        );

        const accesoriuAles = pickRandom(accesoriiCandidate);

        let culoareReferintaShoes = topAles.culoare;

        if(geacaAleasa){
            culoareReferintaShoes = geacaAleasa.culoare;
        }else if (accesoriuAles){
            culoareReferintaShoes = accesoriuAles.culoare;
        }

        const pantofiCandidati = haineStil.filter (h=>
           ["incaltaminte", "pantofi", "adidasi", "cizme", "tenisi"].some(t => h.tip?.toLowerCase().includes(t)) &&
           verificaCompatibilitate(culoareReferintaShoes, h.culoare)
        );

        const shoesAles = pickRandom(pantofiCandidati);

        setOutfit({
            geaca: geacaAleasa,
            top: topAles,
            bottom: bottomAles,
            accesoriu: accesoriuAles,
            shoes: shoesAles
        });
        setPas(1);
    };

    const onStilSelectat = (stil ) => {
        setStilAles(stil);
        genereazaOutfit(stil);
    };

    return (
        <div className = "generator-container">
            <div className="nav-header">
                <button className = "buton-chic" onClick= {() => setEcran("meniu")}> Meniu </button>
                {pas === 1 && <button className = "buton-chic" onClick = {() => setPas(0)}> Resetare </button>}
            </div>

            {pas === 0 ? (
                <div className= "intrebare-wrapper">
                    <h2>Pentru ce eveniment? </h2>
                    <div className = "optiuni-grid">
                        <button className = "btn-selectie" onClick ={() =>onStilSelectat("casual")} >Casual </button>
                        <button className = "btn-selectie" onClick ={() =>onStilSelectat("elegant")} >Elegant </button>
                        <button className = "btn-selectie" onClick ={() =>onStilSelectat("sport")} >Sport </button>
                    </div>
                </div>
            ) : (
                <div className = "rezultat-wrapper">
                    <h2> Outfit {stilAles.charAt(0).toUpperCase() + stilAles.slice(1)}</h2>

                    <div className = "rezultat-outfit">

                    {outfit.geaca && (
                        <div className = "piesa-individuala">
                            <span className= "eticheta-piesa">Geaca </span>
                            <HainaAfisare haina = {outfit.geaca} />
                        </div>
                    )}

                    {outfit.top && (
                         <div className = "piesa-individuala">
                             <span className= "eticheta-piesa">Top </span>
                             <HainaAfisare haina = {outfit.top} />
                         </div>
                    )}

                    {outfit.bottom ? (
                         <div className = "piesa-individuala">
                             <span className= "eticheta-piesa">Pantaloni </span>
                             <HainaAfisare haina = {outfit.bottom} />
                         </div>
                        ): <p>Lipsa pantaloni asortati </p>
                    }

                    {outfit.shoes ? (
                         <div className = "piesa-individuala">
                             <span className= "eticheta-piesa">Papuci </span>
                             <HainaAfisare haina = {outfit.shoes} />
                         </div>
                        ): <p>Lipsa papuci asortati </p>
                    }

                    {outfit.accesoriu && (
                         <div className = "piesa-individuala">
                             <span className= "eticheta-piesa">Accesoriu </span>
                             <HainaAfisare haina = {outfit.accesoriu} />
                         </div>
                        )}
                    </div>

                <div className = "footer-actions">
                    <button className = "buton-chic" onClick ={() => genereazaOutfit(stilAles)} >
                        Alta combinatie
                    </button>
                </div>
            </div>
        )}
    </div>
);
}

export default GeneratorOutfit;
