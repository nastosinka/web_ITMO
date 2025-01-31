package ru.server.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;


@Service
public class AccessTokenService {

    @Value("${jwt.secretKey}") // значение берётся из конфиги, а именно из этого поля
    private String secretKey; // ключ для подписи JWT, хранится в конфиге ap..prop

    @Value("${auth.accessTokenValidity}")
    private Duration accessTokenValidity; // продолжительность действия access token

    private Algorithm algorithm; // алгоритм подписания токенов, инициализируется в методе init() и использует секрет кей

    @PostConstruct // будет создан сразу после создания объекта (аннотация такая)
    public void init() {
        algorithm = Algorithm.HMAC256(secretKey);
    } //шифруем что-то с помощью агоритма HMAC256 и ключа

    public void verifyToken(String token) throws JWTVerificationException {
        JWT.require(algorithm).build().verify(token); // проверяет, правильный ли токен (правильно ли подписан с использованием заданного алгоритма)
    }

    public String extractUsername(String token) { //извлекает инфу из jwt которое было записано в токен как subject (помогает узнать, какой польователь с этим токеном запрос отправил)
        return JWT.decode(token).getSubject();
    }

    public String generateAccessToken(UserDetails user) { // генерирует новый jwt на основе данных полтьзователя
        return JWT.create().withIssuer("jwtService").withSubject(user.getUsername()).withIssuedAt(Instant.now()).withExpiresAt(Instant.now().plusSeconds(accessTokenValidity.toSeconds())).sign(algorithm);
    // issuer - кто создал токен, withsubject - имя пользователя, withIssuedAt - время создания токена, withExpiresAt - время истечения срока действия токена, sign - подписание токена с использованием алгоритма
    }
}
