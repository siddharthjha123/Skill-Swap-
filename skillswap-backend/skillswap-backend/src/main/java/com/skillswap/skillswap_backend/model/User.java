package com.skillswap.skillswap_backend.model;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    @Column(unique = true)
    private String email;

    private String password;

    private String location;

    @Column(name = "profile_visibility")
    @Enumerated(EnumType.STRING)
    private ProfileVisibility profileVisibility = ProfileVisibility.PUBLIC;

    @ManyToOne
    @JoinColumn(name = "availability_id")
    private Availability availability;

    @Column(name = "profile_photo_url")
    private String profilePhotoUrl;
}

