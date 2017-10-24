"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url = require("url"); // űrlapokhoz, input kiolvasás
const fs = require("fs"); // file-kezelés
const tabla_1 = require("./tabla");
class Content {
    Content(req, res) {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<pre style='font-family: Courier'>");
        res.write("<form style='font-size:16px;'>");
        // Nem a feladat része, teszteléshez készült az input:
        const query = url.parse(req.url, true).query; // user input
        const p1 = query.p1 === undefined ? "F;4;1;0;1" : query.p1;
        const p2 = query.p2 === undefined ? "K;1;3" : query.p2;
        // 4. feladat: osztálypéldány (objektum) létrehozása
        const obj = new tabla_1.Tabla("allas.txt", res);
        res.write("<p>5. feladat: A betöltött tábla XYZ</p>");
        obj.Megjelenít();
        res.write("<p>6. feladat: Összegzés</p>");
        res.write(`    Kék korongok száma: ${obj.Megszámol("K")}<br>`);
        res.write(`    Fehér korongok száma: ${obj.Megszámol("F")}<br>`);
        res.write(`    Üres mezők száma: ${obj.Megszámol("#")}<br>`);
        // Az input nem a feladat része!
        res.write("<p>8. feladat: [jatekos, sor, oszlop, iranySor, iranyOszlop] = " +
            "<input type='text' name='p1' style='font-family:Courier;' " +
            `value='${p1}'></p>`);
        const m1 = p1.split(";");
        res.write(`<p>    ${obj.VanForditas(m1[0], parseInt(m1[1]), parseInt(m1[2]), parseInt(m1[3]), parseInt(m1[4])) ? "Van" : "Nics"} fordítás!</p>`);
        // Az input nem a feladat része!
        res.write("<p>9. feladat: [jatekos, sor, oszlop] = " +
            "<input type='text' name='p2' style='font-family:Courier;' " +
            `value='${p2}'></p>`);
        const m2 = p2.split(";");
        res.write(`<p>    ${obj.SzabalyosLepes(m2[0], parseInt(m2[1]), parseInt(m2[2])) ?
            "Szabályos" : "Nem szabályos"} lépés!</p>`);
        res.write("<input type='submit' value='Frissítés'></form>");
        // Nem a feladat része :
        res.write("<p><b>allas.txt fájl::</b></p>");
        fs.readFileSync("allas.txt").toString().split("\n\r").forEach(i => {
            res.write(`${i}<br>`);
        });
        res.write("</pre>");
        res.end();
    }
}
exports.Content = Content;
//# sourceMappingURL=content.js.map