package com.atlasai.task.model.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TaskRequest {

    @NotBlank(message = "Title is required")
    @Size(min = 1, max = 255, message = "Title must be between 1 and 255 characters")
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
}
