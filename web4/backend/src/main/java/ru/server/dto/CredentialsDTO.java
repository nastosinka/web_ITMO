package ru.server.dto;

import lombok.*;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CredentialsDTO {
    private String accessToken;
    private UUID refreshToken;
}
