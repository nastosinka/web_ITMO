package ru.server.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

@Entity
@Table(name = "refresh_token")
public class RefreshToken {
    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false)
    private Date issuedAt;

    @Column(nullable = false)
    private Date expiresAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
