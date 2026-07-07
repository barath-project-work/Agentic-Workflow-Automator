package com.atlasai.workflow.service;

import com.atlasai.workflow.model.entity.WorkflowRun;
import com.atlasai.workflow.model.entity.WorkflowStep;
import com.atlasai.workflow.model.enums.StepStatus;
import com.atlasai.workflow.model.enums.WorkflowStatus;
import com.atlasai.workflow.model.request.WorkflowRequest;
import com.atlasai.workflow.model.response.WorkflowResponse;
import com.atlasai.workflow.model.response.WorkflowStepResponse;
import com.atlasai.workflow.model.response.WorkflowTemplateResponse;
import com.atlasai.workflow.repository.WorkflowRunRepository;
import com.atlasai.workflow.repository.WorkflowStepRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class WorkflowService {

    private static final Logger log = LoggerFactory.getLogger(WorkflowService.class);

    private final WorkflowRunRepository workflowRunRepository;
    private final WorkflowStepRepository workflowStepRepository;
    private final ObjectMapper objectMapper;

    public Page<WorkflowResponse> getAllWorkflows(Pageable pageable) {
        return workflowRunRepository.findAll(pageable)
                .map(this::toResponse);
    }

    public Page<WorkflowResponse> searchWorkflows(String status, String search, Pageable pageable) {
        WorkflowStatus statusEnum = null;
        if (status != null && !status.isBlank()) {
            try {
                statusEnum = WorkflowStatus.valueOf(status.toUpperCase());
            } catch (IllegalArgumentException ignored) {
                log.warn("Invalid workflow status value: {}", status);
            }
        }

        return workflowRunRepository.searchWorkflows(statusEnum, search, pageable)
                .map(this::toResponse);
    }

    public WorkflowResponse getWorkflowById(UUID id) {
        WorkflowRun workflow = workflowRunRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Workflow not found: " + id));
        return toResponse(workflow);
    }

    @Transactional
    public WorkflowResponse createWorkflow(WorkflowRequest request) {
        // Serialize parameters as plan JSON
        String planJson = null;
        if (request.getParameters() != null && !request.getParameters().isEmpty()) {
            try {
                planJson = objectMapper.writeValueAsString(request.getParameters());
            } catch (Exception e) {
                log.warn("Failed to serialize workflow parameters: {}", e.getMessage());
            }
        }

        WorkflowRun workflow = WorkflowRun.builder()
                .goal(request.getGoal())
                .status(WorkflowStatus.RUNNING)
                .requestedBy(request.getRequestedBy())
                .plan(planJson)
                .stepCount(0)
                .stepsCompleted(0)
                .build();

        workflow = workflowRunRepository.save(workflow);
        log.info("Created workflow {}: {}", workflow.getId(), workflow.getGoal());
        return toResponse(workflow);
    }

    @Transactional
    public WorkflowResponse cancelWorkflow(UUID id) {
        WorkflowRun workflow = workflowRunRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Workflow not found: " + id));

        if (workflow.getStatus() != WorkflowStatus.RUNNING && workflow.getStatus() != WorkflowStatus.BLOCKED) {
            throw new IllegalArgumentException("Only RUNNING or BLOCKED workflows can be cancelled. Current status: " + workflow.getStatus());
        }

        workflow.setStatus(WorkflowStatus.CANCELLED);
        workflow = workflowRunRepository.save(workflow);
        log.info("Cancelled workflow {}", id);
        return toResponse(workflow);
    }

    @Transactional
    public void deleteWorkflow(UUID id) {
        if (!workflowRunRepository.existsById(id)) {
            throw new IllegalArgumentException("Workflow not found: " + id);
        }
        workflowStepRepository.findByWorkflowRunIdOrderByStepNumberAsc(id)
                .forEach(step -> workflowStepRepository.deleteById(step.getId()));
        workflowRunRepository.deleteById(id);
    }

    public long getWorkflowCount() {
        return workflowRunRepository.count();
    }

    public List<WorkflowTemplateResponse> getTemplates() {
        return List.of(
                WorkflowTemplateResponse.builder()
                        .id("tpl_001").title("Lead Follow-Up")
                        .description("Automated follow-up sequence for new leads")
                        .category("Lead Generation").steps(4).popular(true).useCount(128).build(),
                WorkflowTemplateResponse.builder()
                        .id("tpl_002").title("Campaign Outreach")
                        .description("Send promotional emails to targeted segments")
                        .category("Marketing").steps(3).popular(true).useCount(94).build(),
                WorkflowTemplateResponse.builder()
                        .id("tpl_003").title("Meeting Scheduling")
                        .description("Schedule meetings with interested prospects")
                        .category("Sales").steps(3).popular(true).useCount(76).build(),
                WorkflowTemplateResponse.builder()
                        .id("tpl_004").title("Quarterly Review")
                        .description("Prepare and send quarterly review reports to clients")
                        .category("Reporting").steps(5).popular(false).useCount(45).build(),
                WorkflowTemplateResponse.builder()
                        .id("tpl_005").title("Contract Renewal")
                        .description("Automate renewal reminders and follow-ups")
                        .category("Sales").steps(4).popular(false).useCount(62).build(),
                WorkflowTemplateResponse.builder()
                        .id("tpl_006").title("Cross-Sell Campaign")
                        .description("Identify cross-sell opportunities and reach out")
                        .category("Upsell").steps(4).popular(false).useCount(38).build()
        );
    }

    private WorkflowResponse toResponse(WorkflowRun workflow) {
        List<WorkflowStep> steps = workflowStepRepository
                .findByWorkflowRunIdOrderByStepNumberAsc(workflow.getId());

        List<WorkflowStepResponse> stepResponses = steps.stream()
                .map(this::toStepResponse)
                .toList();

        return WorkflowResponse.builder()
                .id(workflow.getId())
                .goal(workflow.getGoal())
                .status(workflow.getStatus() != null ? workflow.getStatus().name() : "RUNNING")
                .requestedBy(workflow.getRequestedBy())
                .plan(workflow.getPlan())
                .result(workflow.getResult())
                .stepCount(workflow.getStepCount())
                .stepsCompleted(workflow.getStepsCompleted())
                .steps(stepResponses)
                .createdAt(workflow.getCreatedAt())
                .completedAt(workflow.getCompletedAt())
                .build();
    }

    private WorkflowStepResponse toStepResponse(WorkflowStep step) {
        return WorkflowStepResponse.builder()
                .id(step.getId())
                .stepNumber(step.getStepNumber())
                .toolName(step.getToolName())
                .description(step.getDescription())
                .status(step.getStatus() != null ? step.getStatus().name() : "PENDING")
                .input(step.getInput())
                .output(step.getOutput())
                .errorDetail(step.getErrorDetail())
                .duration(step.getDuration())
                .createdAt(step.getCreatedAt())
                .build();
    }
}
