package com.atlasai.workflow.model.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.Map;

@Data
public class WorkflowRequest {

    @NotBlank(message = "Goal is required")
    @Size(min = 3, max = 2000, message = "Goal must be between 3 and 2000 characters")
    private String goal;

    private String requestedBy;

    private Map<String, Object> parameters;
}
