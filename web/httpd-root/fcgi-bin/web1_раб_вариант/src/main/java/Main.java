import com.fastcgi.FCGIInterface;
import com.google.gson.Gson;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.logging.Logger;


public class Main {
        private static final Logger logger = Logger.getLogger(Main.class.getName());
        static DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");


        private static final String HTTP_RESPONSE = """
                HTTP/1.1 200 OK
                Content-Type: application/json
                Content-Length: %d
                
                        %s
                """;
        private static final String HTTP_SERVER_ERROR = """
                HTTP/1.1 500 Initial Server Error
                Content-Type: application/json
                Content-Length: %d
                
                %s
                """;
        private static final String HTTP_ERROR = """
                HTTP/1.1 400 Bad Request
                Content-Type: application/json
                Content-Length: %d
                
                %s
                """;
        private static final String ERROR_JSON = """
                {
                    "reason": "%s"
                }
                """;

        public static void main(String[] args) throws IOException {
                var fcgiInterface = new FCGIInterface();
                logger.info("Starting FastCGI server...");

                CoordinateCounter coordinateCounter = new CoordinateCounter(); // создаём класс-считатель координаты

                while (fcgiInterface.FCGIaccept() >= 0) {
                        long startTime = System.currentTimeMillis(); //  стартуем отсчёт для записи в журнал

                        try {
                                String body = FCGIInterface.request.params.getProperty("QUERY_STRING");
                                HashMap<String, String> params = IOfunctions.parse(body);
                                logger.info("Got new request! " + params);

                                int x = Integer.parseInt(params.get("x"));
                                logger.info("x:" + x);
                                float y = Float.parseFloat(params.get("y"));
                                logger.info("y:" + y);
                                float R = Float.parseFloat(params.get("r"));
                                logger.info("r:" + R);
                                List<ResultToServer> results = new ArrayList<>();
                                boolean answer = coordinateCounter.coordinateCounter(x, y, R);
                                results.add(new ResultToServer(x, y, R, LocalDateTime.now().format(formatter), (Long.toString(System.currentTimeMillis() - startTime) + " ms"), answer));
                                if (ResultToServer.flagInn) {
                                        ResultToServer.flagInn = false;
                                    throw new Exception();
                                }
                                var jsonResults = new Gson().toJson(results).trim();

                                System.out.printf(
                                        """
                                                Content-Type: application/json
                                                Content-Length: %d
                                                
                                                %s%n""",
                                        jsonResults.getBytes(StandardCharsets.UTF_8).length,
                                        jsonResults);
                                logger.info("Answer was sent!");
                                logger.info(String.format("""
                                                Content-Type: application/json
                                                Content-Length: %d
                                                
                                                %s%n""",
                                        jsonResults.getBytes(StandardCharsets.UTF_8).length,
                                        jsonResults));
                        } catch (IllegalArgumentException e) {
                                var json = String.format(ERROR_JSON, e.getMessage());
                                var responseBody = json.trim();
                                var response = String.format(HTTP_ERROR, responseBody.getBytes(StandardCharsets.UTF_8).length, responseBody);
                                System.out.println(Arrays.toString(response.getBytes(StandardCharsets.UTF_8)));
                                logger.info("Error was sent! " + e);
                        } catch (Exception e) {
                                var errorMessage = String.format(ERROR_JSON, "Internal Server Error: " + e.getMessage());
                                var responseBody = errorMessage.trim();
                                var response = String.format(HTTP_SERVER_ERROR, responseBody.getBytes(StandardCharsets.UTF_8).length, responseBody);
                                System.out.println(Arrays.toString(response.getBytes(StandardCharsets.UTF_8)));
                                logger.info("Error2 was sent!" + e);
                        }
                }
        }
}

