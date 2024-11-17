public class CoordinateCounter {
    int x;
    int y;
    int R;
    public boolean coordinateCounter(int x, int y, int R) {
        boolean answer;
        if ((x >= -R) && (x <= 0) && ((y >= 0) && (y <= R)) && ((x*x + y*y) <= R*R)) { //checking the circle in 1st part
            answer = true; // green
        } else {
            answer = false; //red
        }
        if ((x >= 0) && (x <= R/2) && (y <= R) && (y >= 0)) {
            answer = true; //green
        } else {
            answer = false; //red
        }
        if ((x <= 0) && (x >= -R/2) && (y <= 0) && (y >= -R) && (y >= (2*x - R))) {
            answer = true;
        } else {
            answer = false;
        }
        return answer;
    }

}
