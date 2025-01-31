package ru.server.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.server.entity.Point;

import java.util.List;

@Repository
public interface PointRepository extends JpaRepository<Point, Long> {
    Page<Point> findByUserId(Long userId, Pageable pageable);
    @Transactional
    void deleteByUserId(Long userId);
}
