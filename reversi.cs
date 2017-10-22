using System;
using System.IO;

namespace reversi
{
    class Tabla
    {
        char[,] t;

        public Tabla(string fájlnév)
        {
            t = new char[8, 8];
            string[] forrás = File.ReadAllLines(fájlnév);
            for (int sor = 0; sor < 8; sor++)
                for (int oszlop = 0; oszlop < 8; oszlop++)
                    t[sor, oszlop] = forrás[sor][oszlop];
        }

        public void Megjelenit()
        {
            for (int i = 0; i < t.GetLength(0); i++)
            {
                Console.Write("\t");
                for (int j = 0; j < t.GetLength(1); j++) Console.Write(t[i,j]);
                Console.Write("\n");
            }
        }

        public int Szum(char mit)
        {
            int db = 0;
            foreach (var i in t) if (i == mit) db++;
            return db;
        }

        //7. feladat:
        public bool VanForditas(char jatekos, int sor, int oszlop, int iranySor, int iranyOszlop)
        {
            int aktSor = sor + iranySor;
            int aktOszlop = oszlop + iranyOszlop;
            char ellenfel = 'K';
            if (jatekos == 'K') ellenfel = 'F';
            bool nincsEllenfel = true;

            while (aktSor >= 0 && aktSor < 8 && aktOszlop >= 0 && aktOszlop < 8 &&
                  t[aktSor, aktOszlop] == ellenfel)
            {
                aktSor += iranySor;
                aktOszlop += iranyOszlop;
                nincsEllenfel = false;
            }

            if (nincsEllenfel || aktSor < 0 || aktSor > 7 || aktOszlop < 0 || aktOszlop > 7 ||
               t[aktSor, aktOszlop] != jatekos) return false;

            return true;
        }


        public bool SzabalyosLepes(char jatekos, int sor, int oszlop)
        {
            if (t[sor, oszlop] != '#') return false;

            for (int dS = -1; dS <= 1; dS++)
                for (int dO = -1; dO <= 1; dO++)
                    if (!(dS == 0 && dO == 0) &&
                        VanForditas(jatekos, sor, oszlop, dS, dO))
                        return true;

            return false;
        }
    }

    class reversi
    {
        static void Main()
        {
            Tabla tábla = new Tabla("allas.txt");

            Console.WriteLine("5. feladat: A betöltött tábla");
            tábla.Megjelenit();

            Console.WriteLine("\n6. feladat: Összegzés");
            Console.WriteLine($"\tKék korongok száma: {tábla.Szum('K')}");
            Console.WriteLine($"\tFehér korongok száma: {tábla.Szum('F')}");
            Console.WriteLine($"\tÜres mezők száma: {tábla.Szum('#')}");

            
            const string paraméterek = "F;4;1;0;1";
            Console.WriteLine($"\n8. feladat: [jatekos;sor;oszlop;iranySor;iranyOszlop] = {paraméterek}");
            string[] m = paraméterek.Split(';');
            char beJátékos = char.Parse(m[0]);
            int beSor = int.Parse(m[1]);
            int beOszlop = int.Parse(m[2]);
            int beIránySor = int.Parse(m[3]);
            int beIrányOszop = int.Parse(m[4]);
            Console.WriteLine(tábla.VanForditas(beJátékos, beSor, beOszlop, beIránySor, beIrányOszop) ? "\tVan fordítás!" : "\tNincs fordítás!");

            const string paraméterek2 = "K;1;3";
            Console.WriteLine($"\n9. feladat: [jatekos;sor;oszlop] = {paraméterek2}");
            m = paraméterek2.Split(';');
            beJátékos = char.Parse(m[0]);
            beSor = int.Parse(m[1]);
            beOszlop = int.Parse(m[2]);
            Console.WriteLine(tábla.SzabalyosLepes(beJátékos, beSor, beOszlop) ? "\tSzabályos lépés!" : "\tNem szabályos lépés!");

            Console.ReadKey();
        }
    }
}
