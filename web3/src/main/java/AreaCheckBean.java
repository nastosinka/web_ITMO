import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Named;
import jakarta.validation.constraints.NotNull;

import java.io.Serializable;
import java.time.LocalTime;

// таски хуяски
//- сделать адекватное выделение памяти на вычитании текущего времени и ещё какой-то хуйни - доп
//- сделать парсинг на 5.000000001 - доп
//- пагинацию наоборот сделать: старое внизу - доп

//- заменить спин на R вместо икса
//- график отрисовтаь svg в отдельном файле
// господи помоги фронт



@Named("areaChecker")
@SessionScoped
public class AreaCheckBean implements Serializable {
    public Result checkArea(InputBean inputBean, boolean fromGraph) {
        System.out.println("Checking area");
        System.out.println(inputBean);
        Result resultBean = new Result();
        long startTime = System.nanoTime();
        if (!fromGraph) { // проверка был ли тыкнут граф
            resultBean.setX(inputBean.getX());
            resultBean.setY(inputBean.getY());
        } else {
            resultBean.setX(inputBean.getXGraph());
            resultBean.setY(inputBean.getYGraph());
        }
        resultBean.setR(inputBean.getR());
        resultBean.setCreatedAt(LocalTime.now());
        var x = resultBean.getX();
        var y = resultBean.getY();
        var R = resultBean.getR();
        boolean flagInn = validate(x, y, R);
        if (flagInn) {
            resultBean.setValidation(true);
        } else {
            resultBean.setValidation(false);
        }
        boolean hit = check(resultBean);
        resultBean.setResult(hit);
        resultBean.setExecutionTime(System.nanoTime() - startTime);
        return resultBean;
    }

    //чекает попал не попал
    private boolean check(Result resultBean) {
        var x = resultBean.getX();
        var y = resultBean.getY();
        var R = resultBean.getR();
        if (((x >= -R) && (x <= 0) && ((y >= 0) && (y <= R)) && ((x*x + y*y) <= R*R)) || ((x >= 0) && (x <= R/2) && (y <= R) && (y >= 0)) || ((x <= 0) && (x >= -R/2) && (y <= 0) && (y >= -R) && (y >= (-2*x - R)))) { //checking the circle in 1st part
             return true; // green
        } else {
            return  false; //red
        }
    }
    //а чё там по одз
    private boolean validate(@NotNull double x, @NotNull double y, @NotNull double R) {
        if (!((y >= -5) && (y <= 5) && ((R < 0) || (R > 3)) && (x <= 3) && (x >= -5))) {
            return true;
        } else {
            return false;
        }
    }
}
