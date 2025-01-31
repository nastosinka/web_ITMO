package ru.server.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PointRequestDTO {
    @NotNull(message = "X cannot be null")
    private double x;

    @NotNull(message = "Y cannot be null")
    private double y;

    @NotNull(message = "R cannot be null")
    @DecimalMin(value = "1", message = "R must be greater than or equal to 1")
    private double r;
}
