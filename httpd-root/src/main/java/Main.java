import com.fastcgi.FCGIInterface;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

public class Main {
        private static final Logger logger = Logger.getLogger(Main.class.getName());
        static int attempt;
        private static final String RESULT_JSON = """
                        {    "attempt": %d,
                             "x": %s,
                             "y": %s,
                             "r": %s,
                             "answer": %b,
                             "executionTime": %s
                        }
                        """;
        private static final String HTTP_RESPONSE = """
                        HTTP/1.1 200 OK
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
        public static void main(String[] args) {
                var fcgiInterface = new FCGIInterface();
                logger.info("Starting FastCGI server...");

                HashMap<String, String> params = parse(body);
                CoordinateCounter coordinateCounter = new CoordinateCounter(); // создаём класс-считатель координаты
                boolean answer;

                while (fcgiInterface.FCGIaccept() >= 0) {

                        long startTime = System.nanoTime(); //  стартуем отсчёт для записи в журнал

                        try {
                                String body =
                        } catch (Exception e) {
                                logger.log(Level.SEVERE, "An error occurred while processing the request.", e);
                                sendJson(String.format("{\"error\": \"%s\"}", e.getMessage()));
                        }
                        String requestMethod = FCGIInterface.request.params.getProperty("REQUEST_METHOD");
                        var queryParams = System.getProperties().getProperty("QUERY_STRING");
                        Map<String, String> params = new HashMap<>();
                        if (!queryParams.isBlank())
                        System.out.println(queryParams);
                        // здесь распарсить принятые данные тело запроса

                        answer = coordinateCounter.coordinateCounter(x, y, R);
                        attempt += 1;

                        // здесь отправить данные через json выше
                        System.out.println(RESULT_JSON.formatted(attempt, x, y, R, answer, LocalDateTime.now().toString()));

                        System.out.println("\n");
                        System.out.println(FCGIInterface.request.params.getProperty("PATH_INFO"));
                        System.out.println("\n");
                        System.out.println(System.getProperty("SERVER_NAME"));




                }

        }
}


//public static void main(String[] args) throws IOException {
//        var fcgiInterface = new FCGIInterface();
//        while (fcgiInterface.FCGIaccept() >= 0) {
//                var method = FCGIInterface.request.params.getProperty("REQUEST_METHOD");
//                if (method == null) {
//                        System.out.println(errorResult("Unsupported HTTP method: null"));
//                        continue;
//                }
//
//                if (method.equals("GET")) {
//                        var queryString = FCGIInterface.request.params.getProperty("QUERY_STRING");
//                        if (queryString != null && queryString.equals("debug=1")) {
//                                var paramsDump = FCGIInterface.request
//                                        .params
//                                        .entrySet()
//                                        .stream()
//                                        .map((entry) -> "%s: %s".formatted(entry.getKey().toString(), entry.getValue().toString()))
//                                        .reduce("", (acc, el) -> acc + "\n" + el);
//                                System.out.println(echoPage(paramsDump));
//                        } else {
//                                System.out.println(getHelloPage());
//                        }
//                        continue;
//                }
//
//                if (method.equals("POST")) {
//                        var contentType = FCGIInterface.request.params.getProperty("CONTENT_TYPE");
//                        if (contentType == null) {
//                                System.out.println(errorResult("Content-Type is null"));
//                                continue;
//                        }
//
//                        if (!contentType.equals("application/x-www-form-urlencoded")) {
//                                System.out.println(errorResult("Content-Type is not supported"));
//                                continue;
//                        }
//
//                        var requestBody = simpleFormUrlEncodedParsing(readRequestBody());
//                        var xStr = requestBody.get("x");
//                        var yStr = requestBody.get("y");
//                        if (xStr == null || yStr == null) {
//                                System.out.println(errorResult("X and Y must be provided as x-www-form-urlencoded params"));
//                                continue;
//                        }
//
//                        int x, y;
//                        try {
//                                x = Integer.parseInt(xStr.toString());
//                        } catch (NumberFormatException e) {
//                                System.out.println(errorResult("X must be an integer"));
//                                continue;
//                        }
//                        try {
//                                y = Integer.parseInt(yStr.toString());
//                        } catch (NumberFormatException e) {
//                                System.out.println(errorResult("Y must be an integer"));
//                                continue;
//                        }
//
//                        System.out.println(sumPage(x, y, x + y));
//                        continue;
//                }
//
//                System.out.println(errorResult("Unsupported HTTP method: " + method));
//        }
//}
//String content = "<h1>Hello nastya, метод реквеста у нас %s</h1>".formatted(requestMethod);
//String httpResponse = """
//                        HTTP/1.1 200 OK
//                        Content-Type: %s
//                        Content-Length: %d
//
//                        %s
//                        """.formatted("text/html", content.getBytes(StandardCharsets.UTF_8).length, content);
//
//                        System.out.println(httpResponse);