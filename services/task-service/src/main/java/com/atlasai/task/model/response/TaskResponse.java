package com.atlasai.task.model.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@Builder
public class TaskResponse {

    private UUID id;
    private String title;
    private String description;
    private String type;
    private String status;
    private String priority;
    private LocalDateTime dueDate;
    private String assignedTo;
    private String relatedEntityType;
    private String relatedEntityId;
    private String relatedEntityName;
    private String result;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
