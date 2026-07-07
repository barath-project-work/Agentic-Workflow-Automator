package com.atlasai.workflow.model.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class WorkflowTemplateResponse {

    private String id;
    private String title;
    private String description;
    private String category;
    private int steps;
    private boolean popular;
    private int useCount;
}
