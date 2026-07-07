package com.atlasai.workflow.model.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@Builder
public class WorkflowResponse {

    private UUID id;
    private String goal;
    private String status;
    private String requestedBy;
    private String plan;
    private String result;
    private int stepCount;
    private int stepsCompleted;
    private List<WorkflowStepResponse> steps;
    private LocalDateTime createdAt;
    private LocalDateTime completedAt;
}
