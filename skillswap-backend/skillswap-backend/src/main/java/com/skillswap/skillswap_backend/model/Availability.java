package com.skillswap.skillswap_backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "availability")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Availability {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name; // e.g., "Weekends", "Weekdays"
}
