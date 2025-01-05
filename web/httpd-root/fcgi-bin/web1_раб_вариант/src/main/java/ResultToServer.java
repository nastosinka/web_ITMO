public class ResultToServer {
    String x;
    String y;
    String R;
    String timestamp;
    String scriptTime;
    String answer;
    static boolean flagInn = false;

    public ResultToServer(int x, float y, float R, String timestamp, String scriptTime, boolean answer) {
        if (!((y >= -5) && (y <= 5) && (R >= 1) && (R <= 4))) {
            flagInn = true;
        }
        this.x = Integer.toString(x);
        this.y = Float.toString(y);
        this.R = Float.toString(R);
        this.timestamp = timestamp;
        this.scriptTime = scriptTime;
        this.answer = Boolean.toString(answer);
    }
}

