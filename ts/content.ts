import * as fs from "fs"; // file-kezelés
import * as http from "http";
import * as url from "url"; // űrlapokhoz, input kiolvasás
import Tabla from "./tabla";

export default class Content {

    public content(req: http.IncomingMessage, res: http.ServerResponse): void {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<pre style='font-family: Courier'>");
        res.write("<form style='font-size:16px;'>");

        // Nem a feladat része, teszteléshez készült az input:
        const query: any = url.parse(req.url, true).query; // user input
        const p1: string = query.p1 === undefined ? "F;4;1;0;1" : query.p1;
        const p2: string = query.p2 === undefined ? "K;1;3" : query.p2;

        // 4. feladat: osztálypéldány (objektum) létrehozása
        const obj: Tabla = new Tabla("allas.txt", res);

        res.write("<p>5. feladat: A betöltött tábla</p>");
        obj.megjelenít();

        res.write("<p>6. feladat: Összegzés</p>");
        res.write(`    Kék korongok száma: ${obj.megszámol("K")}<br>`);
        res.write(`    Fehér korongok száma: ${obj.megszámol("F")}<br>`);
        res.write(`    Üres mezők száma: ${obj.megszámol("#")}<br>`);

        // Az input nem a feladat része!
        res.write("<p>8. feladat: [jatekos, sor, oszlop, iranySor, iranyOszlop] = " +
            "<input type='text' name='p1' style='font-family:Courier;' " +
            `value='${p1}' onChange='this.form.submit();'></p>`);
        const m1: string[] = p1.split(";");
        res.write(`<p>    ${obj.vanForditas(m1[0], parseInt(m1[1], 10), parseInt(m1[2], 10), parseInt(m1[3], 10),
            parseInt(m1[4], 10)) ? "Van" : "Nics"} fordítás!</p>`);

        // Az input nem a feladat része!
        res.write("<p>9. feladat: [jatekos, sor, oszlop] = " +
            "<input type='text' name='p2' style='font-family:Courier;' " +
            `value='${p2}' onChange='this.form.submit();'></p>`);
        const m2: string[] = p2.split(";");
        res.write(`<p>    ${obj.szabalyosLepes(m2[0], parseInt(m2[1], 10), parseInt(m2[2], 10)) ?
            "Szabályos" : "Nem szabályos"} lépés!</p>`);

        // res.write("<input type='submit' value='Frissítés'></form>");

        // Nem a feladat része :
        res.write("<p><b>allas.txt fájl::</b></p>");
        fs.readFileSync("allas.txt").toString().split("\n\r").forEach(i => {
            res.write(`${i}<br>`);
        });
        res.write("</pre>");
        res.end();
    }
}
