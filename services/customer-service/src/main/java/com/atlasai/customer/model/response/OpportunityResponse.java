package com.atlasai.customer.model.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@Builder
public class OpportunityResponse {

    private UUID id;
    private String name;
    private UUID customerId;
    private String customerName;
    private String stage;
    private BigDecimal value;
    private int probability;
    private LocalDate closeDate;
    private String assignedTo;
    private String description;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
