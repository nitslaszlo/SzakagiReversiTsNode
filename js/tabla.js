"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs"); // file-kezelés
/** A táblát leíró osztály (2. feladat) */
class Tabla {
    /**
     * Táblát leíró osztály konstruktora (3. feladat)
     * @constructor
     * @param {string} fájlnév - A forrás fájl neve
     * @param {http.ServerResponse} resp - A response referenciája
     */
    constructor(fájlnév, resp) {
        this.res = resp;
        let sor = 0;
        this.t = []; // inicializálás 1. lépés
        fs.readFileSync(fájlnév).toString().split("\n").forEach(i => {
            this.t[sor] = []; // inicializálás 2. lépés
            for (let j = 0; j < i.length; j++) {
                this.t[sor][j] = i[j].trim();
            }
            sor++;
        });
    }
    /** A tábla megjelenítése (5. feladat) */
    megjelenít() {
        this.t.forEach(i => {
            this.res.write(`    ${i.join("")}<br>`);
        });
    }
    /**
     * Megadott játékos korogjainak vagy az üres mezők megszámlálása (6. feladat)
     * @param {string} karakter - A megszámolandó karakter, , "F", "K" vagy "#"
     */
    megszámol(karakter) {
        let darab = 0;
        this.t.forEach(i => {
            i.forEach(j => {
                if (j === karakter)
                    darab++;
            });
        });
        return darab;
    }
    /**
     * Fordítás meghatározása egy megadott cellán, megadott irányban (7. feladat)
     * @param {string} jatekos - A fordító játékos, "F" vagy "K"
     * @param {int} sor - A játékos cellájának sora
     * @param {int} oszlop - A játékos cellájának oszlopa
     * @param {int} iranySor - A vízszintes irány (-1, 0, 1)
     * @param {int} iranyOszlop - A függőleges irány (-1, 0, 1)
     */
    vanForditas(jatekos, sor, oszlop, iranySor, iranyOszlop) {
        let aktSor = sor + iranySor;
        let aktOszlop = oszlop + iranyOszlop;
        let ellenfel = "K";
        let nincsEllenfel = true;
        if (jatekos === "K")
            ellenfel = "F";
        while (aktSor >= 0 && aktSor < 8 && aktOszlop >= 0 && aktOszlop < 8 &&
            this.t[aktSor][aktOszlop] === ellenfel) {
            aktSor += iranySor;
            aktOszlop += iranyOszlop;
            nincsEllenfel = false;
        }
        if (nincsEllenfel || aktSor < 0 || aktSor > 7 || aktOszlop < 0 || aktOszlop > 7 ||
            this.t[aktSor][aktOszlop] !== jatekos) {
            return false;
        }
        return true;
    }
    /**
     * Szabályos lépés meghatározása (9. feladat)
     * @param {string} jatekos - A vizsgálandó játékos, "F" vagy "K"
     * @param {int} sor - Az üres cella sora
     * @param {int} oszlop - A üres cella oszlopa
     */
    szabalyosLepes(jatekos, sor, oszlop) {
        if (this.t[sor][oszlop] !== "#")
            return false;
        for (let iSor = -1; iSor < 2; iSor++) {
            for (let iOszlop = -1; iOszlop < 2; iOszlop++) {
                if (!(iSor === 0 && iOszlop === 0) &&
                    this.vanForditas(jatekos, sor, oszlop, iSor, iOszlop)) {
                    return true;
                }
            }
        }
        return false;
    }
}
exports.default = Tabla;
//# sourceMappingURL=tabla.js.map