package com.atlasai.customer.model.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@Builder
public class CustomerResponse {

    private UUID id;
    private String name;
    private String company;
    private String industry;
    private String location;
    private String email;
    private String phone;
    private String contactPerson;
    private LocalDateTime lastContacted;
    private String status;
    private String tags;
    private String notes;
    private String website;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
