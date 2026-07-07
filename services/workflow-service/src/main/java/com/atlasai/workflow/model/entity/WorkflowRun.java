package com.atlasai.workflow.model.entity;

import com.atlasai.workflow.model.enums.WorkflowStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "workflow_runs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WorkflowRun {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String goal;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private WorkflowStatus status;

    @Column(name = "requested_by", columnDefinition = "VARCHAR(255)")
    private String requestedBy;

    @Column(columnDefinition = "TEXT")
    private String plan;

    @Column(columnDefinition = "TEXT")
    private String result;

    @Column(name = "step_count", nullable = false)
    @Builder.Default
    private int stepCount = 0;

    @Column(name = "steps_completed", nullable = false)
    @Builder.Default
    private int stepsCompleted = 0;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (status == null) {
            status = WorkflowStatus.RUNNING;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        if (status == WorkflowStatus.COMPLETED || status == WorkflowStatus.FAILED || status == WorkflowStatus.CANCELLED) {
            completedAt = LocalDateTime.now();
        }
    }
}
