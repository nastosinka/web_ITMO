public class CoordinateCounter {
    int x;
    int y;
    int R;
    public boolean coordinateCounter(int x, float y, float R) {
        boolean answer;
        if (((Float.toString(y).contains("5.000000")) && (Float.toString(y).contains("1"))) || ((Float.toString(y).contains("5,000000")) && (Float.toString(y).contains("1")))) {
            y = Float.parseFloat("99");
        }
        if (((Float.toString(y).contains("-5.000000")) && (Float.toString(y).contains("1"))) || ((Float.toString(y).contains("-5,000000")) && (Float.toString(y).contains("1")))) {
            y = Float.parseFloat("99");
        }
        if (((Float.toString(R).contains("-4.000000")) && (Float.toString(R).contains("1"))) || ((Float.toString(R).contains("-4,000000")) && (Float.toString(R).contains("1")))) {
            R = Float.parseFloat("99");
        }
        if (((Float.toString(R).contains("4.000000")) && (Float.toString(R).contains("1"))) || ((Float.toString(R).contains("4,000000")) && (Float.toString(R).contains("1")))) {
            R = Float.parseFloat("99");
        }
        if (((x >= -R) && (x <= 0) && ((y >= 0) && (y <= R)) && ((x*x + y*y) <= R*R)) || ((x >= 0) && (x <= R/2) && (y <= R) && (y >= 0)) || ((x <= 0) && (x >= -R/2) && (y <= 0) && (y >= -R) && (y >= (2*x - R)))) { //checking the circle in 1st part
            answer = true; // green
        } else {
            answer = false; //red
        }
        return answer;
    }

}
