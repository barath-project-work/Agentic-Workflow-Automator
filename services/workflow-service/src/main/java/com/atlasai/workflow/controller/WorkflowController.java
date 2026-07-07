package com.atlasai.workflow.controller;

import com.atlasai.workflow.model.request.WorkflowRequest;
import com.atlasai.workflow.model.response.WorkflowResponse;
import com.atlasai.workflow.model.response.WorkflowTemplateResponse;
import com.atlasai.workflow.service.WorkflowService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/workflows")
@RequiredArgsConstructor
public class WorkflowController {

    private final WorkflowService workflowService;

    @GetMapping
    public ResponseEntity<Page<WorkflowResponse>> getAllWorkflows(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size,
            @RequestParam(defaultValue = "createdAt") String sort,
            @RequestParam(defaultValue = "desc") String direction) {

        Sort sortObj = direction.equalsIgnoreCase("asc")
                ? Sort.by(sort).ascending()
                : Sort.by(sort).descending();
        Pageable pageable = PageRequest.of(page, size, sortObj);

        Page<WorkflowResponse> workflows;
        if ((status == null || status.isBlank()) && (search == null || search.isBlank())) {
            workflows = workflowService.getAllWorkflows(pageable);
        } else {
            workflows = workflowService.searchWorkflows(status, search, pageable);
        }
        return ResponseEntity.ok(workflows);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkflowResponse> getWorkflowById(@PathVariable UUID id) {
        WorkflowResponse workflow = workflowService.getWorkflowById(id);
        return ResponseEntity.ok(workflow);
    }

    @PostMapping
    public ResponseEntity<WorkflowResponse> createWorkflow(@Valid @RequestBody WorkflowRequest request) {
        WorkflowResponse workflow = workflowService.createWorkflow(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(workflow);
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<WorkflowResponse> cancelWorkflow(@PathVariable UUID id) {
        WorkflowResponse workflow = workflowService.cancelWorkflow(id);
        return ResponseEntity.ok(workflow);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkflow(@PathVariable UUID id) {
        workflowService.deleteWorkflow(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getWorkflowCount() {
        return ResponseEntity.ok(workflowService.getWorkflowCount());
    }

    @GetMapping("/templates")
    public ResponseEntity<List<WorkflowTemplateResponse>> getTemplates() {
        return ResponseEntity.ok(workflowService.getTemplates());
    }
}
