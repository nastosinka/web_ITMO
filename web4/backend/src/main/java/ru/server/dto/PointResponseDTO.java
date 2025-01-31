package ru.server.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import ru.server.entity.Point;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PointResponseDTO {
    private double x;
    private double y;
    private double r;
    private boolean hit;
    private Date reqTime;
    private long procTime;

    public PointResponseDTO(@NotNull Point point) {
        this.x = point.getX();
        this.y = point.getY();
        this.r = point.getR();
        this.hit = point.isHit();
        this.reqTime = point.getReqTime();
        this.procTime = point.getProcTime();
    }
}
