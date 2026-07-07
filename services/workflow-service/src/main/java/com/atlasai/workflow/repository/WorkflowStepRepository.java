package com.atlasai.workflow.repository;

import com.atlasai.workflow.model.entity.WorkflowStep;
import com.atlasai.workflow.model.enums.StepStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface WorkflowStepRepository extends JpaRepository<WorkflowStep, UUID> {

    List<WorkflowStep> findByWorkflowRunIdOrderByStepNumberAsc(UUID workflowRunId);

    long countByWorkflowRunIdAndStatus(UUID workflowRunId, StepStatus status);
}
