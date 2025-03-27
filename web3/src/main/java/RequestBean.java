import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Inject;
import jakarta.inject.Named;

import java.io.Serializable;

@SessionScoped
@Named
public class RequestBean implements Serializable {
    @Inject
    InputBean inputBean;
    @Inject
    AreaCheckBean areaChecker;
    @Inject
    ResultsRepository resultsRepository;

    public void process(boolean fromGrapgh) {
        Result result = areaChecker.checkArea(inputBean, fromGrapgh);
        if (result.isValidation()) {
            resultsRepository.addResult(result);
        }
    }
}
