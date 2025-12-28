public class Haina {

    private String tip ;
    private String material ;
    private String culoare;
    private String stil ;
    private String anotimp ;
    private String poza;

    public Haina(String tip , String material , String culoare , String stil, String anotimp , String poza){
        this.anotimp= anotimp;
        this.stil = stil;
        this.culoare = culoare;
        this.material = material;
        this.tip = tip;
        this.poza= poza;

    }

    public String getTip(){
        return tip;
    }
    public String getMaterial(){
        return material;
    }
    public String getCuloare(){
        return culoare;
    }
    public String getAnotimp(){
        return anotimp;
    }
    public String getStil(){
        return stil;
    }
    public String getPoza(){
        return poza;
    }

    public String toString() {
        return  ( tip+" din " + material+ " de culoare " +culoare+" / " + anotimp+" /" + stil );
    }

}
