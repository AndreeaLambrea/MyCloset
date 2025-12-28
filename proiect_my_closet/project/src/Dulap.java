
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.Arrays;

public class Dulap {

    public static final String[] tip_sus = {"tricou" , "camasa", "maieu", "top", "geaca de piele", "trench", "pulover" };
    public static final String[] tip_jos = {"pantaloni", "blugi", "fusta", "pantaloni scurti"};
    public static final String[] tip_one_piece = {"rochie", "salopeta"};
    public static final String[] tip_incaltaminte = {"adidasi", "pantofi", "sandale", "ghete", "cizme"};


    public static void main(String[] args){

        Scanner scanner = new Scanner(System.in);

        List<Haina> dulapul_meu= new ArrayList<>();


        dulapul_meu.add (new Haina("tricou" ,"bumbac", "alb", "casual", "vara",  "null"));
        dulapul_meu.add (new Haina("blugi" ,"denim", "negru", "casual", "toate", "null"));
        dulapul_meu.add (new Haina("tricou" ,"elastic", "rosu", "sport", "toate" ,"null"));
        dulapul_meu.add(new Haina("ghete" ,"piele", "negru", "elegant", "iarna", "null"));
        dulapul_meu.add (new Haina("cizme" ,"piele", "alb", "casual", "iarna","null" ));
        dulapul_meu.add (new Haina("pulover" ,"bumbac", "maro", "elegant", "iarna" , "E:\\An2\\POO\\proiect_my_closet\\poze"));

        boolean n = true;
        while (n){

            System.out.println("-----Dulapul meu -----");
            System.out.println("MENIU------------------");
            System.out.println("1.Adauga haine");
            System.out.println("2.Sterge haine");
            System.out.println("3.Creeaza un outfit");
            System.out.println("4.Vizualizeaza hainele");
            System.out.println("0.Iesire");

            int alegere = scanner.nextInt();
            scanner.nextLine();

            switch (alegere){
                case 1:  adauga_haine(scanner, dulapul_meu);
                        break;

                case 2: stergere_haine(scanner,dulapul_meu );
                    break;

                case 4: vizualizare_haine(dulapul_meu);
                        break;

                case 0:
                    n=false;
                    break;
            }


        }
        scanner.close();

    }
    public static void adauga_haine(Scanner scanner, List<Haina> dulap){

        System.out.println("Tip: ");
        String tip = scanner.nextLine();

        System.out.println("Material: ");
        String material = scanner.nextLine();

        System.out.println("Culoare: ");
        String culoare = scanner.nextLine();

        System.out.println("Stil: ");
        String stil = scanner.nextLine();

        System.out.println("Anotimp: ");
        String anotimp = scanner.nextLine();

        Haina haina_noua= new Haina(tip , material, culoare, stil ,anotimp, "null");
        dulap.add(haina_noua);

        System.out.println("Haina adaugata");

    }

    public static void vizualizare_haine(List<Haina> dulap){
        System.out.println("Hainele:");

        if( dulap.isEmpty()){
            System.out.println("Dulapul e gol :( ");
            return;
        }

        dulap.sort((h1, h2)-> h1.getTip().compareTo(h2.getTip()));

        for (int i = 0; i< dulap.size() ; i++){
            System.out.println( (i+1) + "." +dulap.get(i) );

        }
    }

    public static void stergere_haine(Scanner scanner, List<Haina> dulap){
            if(dulap.isEmpty()){
            System.out.println("Dulapul e gol");
            return ;
        }

        System.out.println("Hainele sunt: ");
        vizualizare_haine(dulap);


        System.out.println("Alege nr hainei pe care vrei sa o stergi");

        int nr = scanner.nextInt();
        scanner.nextLine();

        int index = nr - 1;
        Haina stearsa = dulap.remove(index);

        System.out.println("Element sters----");
    }






}


