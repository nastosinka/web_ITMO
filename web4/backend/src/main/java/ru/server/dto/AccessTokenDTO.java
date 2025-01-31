package ru.server.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AccessTokenDTO {
    @NotNull(message = "Access token cannot be null")
    @NotBlank(message = "Access token cannot be empty")
    private String token;
}
