package com.atlasai.task.model.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TaskStatusRequest {

    @NotBlank(message = "Status is required")
    private String status;
}
