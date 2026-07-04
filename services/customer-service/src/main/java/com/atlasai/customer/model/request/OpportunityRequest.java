package com.atlasai.customer.model.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Data
public class OpportunityRequest {

    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 200, message = "Name must be between 2 and 200 characters")
    private String name;

    private UUID customerId;

    private String customerName;

    private String stage;

    @PositiveOrZero(message = "Value must be zero or positive")
    private BigDecimal value;

    @PositiveOrZero(message = "Probability must be between 0 and 100")
    private int probability;

    private LocalDate closeDate;

    private String assignedTo;

    private String description;
}
