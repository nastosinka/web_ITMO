package ru.server.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class PagedPointResponseDTO {
    private List<PointResponseDTO> points;
    private int totalPages;
    private long totalElements;

    public PagedPointResponseDTO(List<PointResponseDTO> points, int totalPages, long totalElements) {
        this.points = points;
        this.totalPages = totalPages;
        this.totalElements = totalElements;
    }


}
