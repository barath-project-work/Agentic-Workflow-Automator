package com.atlasai.customer.model.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CustomerRequest {

    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    private String name;

    @NotBlank(message = "Company is required")
    @Size(max = 200, message = "Company must be at most 200 characters")
    private String company;

    private String industry;

    private String location;

    @Email(message = "Invalid email format")
    private String email;

    private String phone;

    private String contactPerson;

    private LocalDateTime lastContacted;

    private String status;

    private String tags;

    private String notes;

    private String website;
}
