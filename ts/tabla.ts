import * as http from "http";
import * as fs from "fs"; // file-kezelés

/** A táblát leíró osztály (2. feladat) */
export class Tabla {
      private t: string[][]; // 2. feladat - mátrix az állás tárolásához
      private res: http.ServerResponse;

      /**
       * Táblát leíró osztály konstruktora (3. feladat)
       * @constructor
       * @param {string} fájlnév - A forrás fájl neve
       * @param {http.ServerResponse} resp - A response referenciája
       */
      constructor(fájlnév: string, resp: http.ServerResponse) {
            this.res = resp;
            let sor: number = 0;
            this.t = []; // inicializálás 1. lépés
            fs.readFileSync(fájlnév).toString().split("\r\n").forEach(i => {
                  this.t[sor] = []; // inicializálás 2. lépés
                  for (let j: number = 0; j < i.length; j++) {
                        this.t[sor][j] = i[j];
                  }
                  sor++;
            });
      }

      /** A tábla megjelenítése (5. feladat) */
      public Megjelenít(): void {
            this.t.forEach(i => {
                  this.res.write(`    ${i.join("")}<br>`);
            });
      }

      /**
       * Megadott játékos korogjainak vagy az üres mezők megszámlálása (6. feladat)
       * @param {string} karakter - A megszámolandó karakter, , "F", "K" vagy "#"
       */
      public Megszámol(karakter: string): number {
            let darab: number = 0;
            this.t.forEach(i => {
                  i.forEach(j => {
                        if (j === karakter) darab++;
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
      public VanForditas(jatekos: string, sor: number, oszlop: number, iranySor: number, iranyOszlop: number): boolean {
            let aktSor: number = sor + iranySor;
            let aktOszlop: number = oszlop + iranyOszlop;
            let ellenfel: string = "K";
            let nincsEllenfel: boolean = true;
            if (jatekos === "K") ellenfel = "F";

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
      public SzabalyosLepes(jatekos: string, sor: number, oszlop: number): boolean {
            if (this.t[sor][oszlop] !== "#") return false;
            for (let iSor: number = -1; iSor < 2; iSor++) {
                  for (let iOszlop: number = -1; iOszlop < 2; iOszlop++) {
                        if (!(iSor === 0 && iOszlop === 0) &&
                              this.VanForditas(jatekos, sor, oszlop, iSor, iOszlop)) {
                              return true;
                        }
                  }
            }
            return false;
      }
}