package ru.server.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ru.server.dto.PagedPointResponseDTO;
import ru.server.dto.PointRequestDTO;
import ru.server.dto.PointResponseDTO;
import ru.server.dto.UserProfileDataDTO;
import ru.server.entity.Point;
import ru.server.entity.User;
import ru.server.service.UserService;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/main")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    //    @GetMapping("/get-points")
//    public ResponseEntity<List<PointResponseDTO>> getPoints(
//            @AuthenticationPrincipal User user,
//            @RequestParam(defaultValue = "0") int page,
//            @RequestParam(defaultValue = "10") int size) {
//        List<PointResponseDTO> points = userService.getAllPoints(user, page, size);
//        log.info("Точки для пользователя {} загружены успешно", user.getUsername());
//        return ResponseEntity.ok(points);
//    }
    @GetMapping("/get-points")
    public ResponseEntity<PagedPointResponseDTO> getPoints(
            @AuthenticationPrincipal User user,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Page<Point> pointPage = userService.getPointsWithPagination(user, page, size);

        List<PointResponseDTO> pointResponseDTOs = pointPage.getContent().stream()
                .map(PointResponseDTO::new)
                .collect(Collectors.toList());


        PagedPointResponseDTO pagedResponse = new PagedPointResponseDTO(
                pointResponseDTOs,
                pointPage.getTotalPages(),
                pointPage.getTotalElements()
        );

        log.info("Точки для пользователя {} загружены успешно", user.getUsername());
        return ResponseEntity.ok(pagedResponse);
    }



@PostMapping("/check-point")
public ResponseEntity<?> checkpoint(@Validated @RequestBody PointRequestDTO point, @AuthenticationPrincipal User user) {
    PointResponseDTO response = userService.addPoint(point, user);
    log.info("Успешно проверена точка для пользователя {}", user.getUsername());
    return ResponseEntity.ok(response);
}

@GetMapping("get-user-profile-data")
public ResponseEntity<?> getUserProfileData(@AuthenticationPrincipal User user) {
    UserProfileDataDTO userProfileDataDTO = userService.getUserProfileData(user);
    log.info("Successfully got user profile data for user with username {}", user.getUsername());
    return ResponseEntity.ok(userProfileDataDTO);
}

@PostMapping("/remove-points")
public ResponseEntity<?> removePoints(@AuthenticationPrincipal User user) {
    userService.removePoints(user);
    log.info("Successfully removed points for user with username {}", user.getUsername());
    return ResponseEntity.ok().build();
}

}
