import com.fastcgi.FCGIInterface;

import java.io.IOException;
import java.net.URLDecoder;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;

public class IOfunctions {
//    public static String readRequestBody() throws IOException {
//        try {
//            FCGIInterface.request.inStream.fill();
//            int contentLength = FCGIInterface.request.inStream.available();
//            var buffer = ByteBuffer.allocate(contentLength);
//            var readBytes = FCGIInterface.request.inStream.read(buffer.array(), 0, contentLength);
//            var requestBodyRaw = new byte[readBytes];
//            buffer.get(requestBodyRaw);
//            buffer.clear();
//            return new String(requestBodyRaw, StandardCharsets.UTF_8);
//        } catch (IOException e) {
//            return "";
//        }
//    }
    public static HashMap<String, String> parse(String queryString) {
        HashMap<String, String> params = new HashMap<>();
        if (queryString.isBlank()) {
            return params;
        }
        for (String pair : queryString.split("&")) {
            String[] keyValue = pair.split("=");
            String key = URLDecoder.decode(keyValue[0], StandardCharsets.UTF_8);
            if (keyValue.length > 1) {
                String value = URLDecoder.decode(keyValue[1], StandardCharsets.UTF_8);
                params.put(key, value);
            } else {
                params.put(key, "");
            }
        }
        return params;
    }
}
