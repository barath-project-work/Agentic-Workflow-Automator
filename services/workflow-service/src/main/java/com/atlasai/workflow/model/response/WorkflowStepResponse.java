package com.atlasai.workflow.model.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@Builder
public class WorkflowStepResponse {

    private UUID id;
    private int stepNumber;
    private String toolName;
    private String description;
    private String status;
    private String input;
    private String output;
    private String errorDetail;
    private String duration;
    private LocalDateTime createdAt;
}
