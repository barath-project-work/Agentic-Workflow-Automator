package com.atlasai.customer.model.entity;

import com.atlasai.customer.model.enums.CustomerStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "customers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, columnDefinition = "VARCHAR(255)")
    private String name;

    @Column(nullable = false, columnDefinition = "VARCHAR(255)")
    private String company;

    @Column(columnDefinition = "VARCHAR(255)")
    private String industry;

    @Column(columnDefinition = "VARCHAR(255)")
    private String location;

    @Column(columnDefinition = "VARCHAR(255)")
    private String email;

    @Column(columnDefinition = "VARCHAR(255)")
    private String phone;

    @Column(name = "contact_person", columnDefinition = "VARCHAR(255)")
    private String contactPerson;

    @Column(name = "last_contacted")
    private LocalDateTime lastContacted;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private CustomerStatus status;

    @Column(columnDefinition = "TEXT")
    private String tags;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(columnDefinition = "VARCHAR(255)")
    private String website;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (status == null) {
            status = CustomerStatus.LEAD;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
