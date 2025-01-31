package ru.server.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.server.dto.PointRequestDTO;
import ru.server.dto.PointResponseDTO;
import ru.server.dto.UserProfileDataDTO;
import ru.server.dto.*;
import ru.server.repository.PointRepository;
import ru.server.entity.Point;
import ru.server.entity.User;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Transactional
@Service
@RequiredArgsConstructor
public class UserService {
    private final PointRepository pointRepository;
    private final AreaCheckService areaCheckService;

    public List<PointResponseDTO> getAllPoints(User user, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Point> pointPage = pointRepository.findByUserId(user.getId(), pageable);
        return pointPage.stream().map(PointResponseDTO::new).collect(Collectors.toList());
    }
    public Page<Point> getPointsWithPagination(User user, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return pointRepository.findByUserId(user.getId(), pageable);
    }

    public PointResponseDTO addPoint(PointRequestDTO point, User user) {
        PointResponseDTO response = areaCheckService.checkPoint(point);
        Point pointEntity = Point.builder()
                .x(response.getX())
                .y(response.getY())
                .r(response.getR())
                .hit(response.isHit())
                .reqTime(response.getReqTime())
                .procTime(response.getProcTime())
                .user(user)
                .build();
        this.pointRepository.save(pointEntity);
        return response;
    }

    public void removePoints(User user) {
        pointRepository.deleteByUserId(user.getId());
    }

    public UserProfileDataDTO getUserProfileData(User user) {
        return UserProfileDataDTO
                .builder()
                .username(user.getUsername())
                .build();
    }
}
