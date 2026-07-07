package com.atlasai.workflow.repository;

import com.atlasai.workflow.model.entity.WorkflowRun;
import com.atlasai.workflow.model.enums.WorkflowStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface WorkflowRunRepository extends JpaRepository<WorkflowRun, UUID> {

    Page<WorkflowRun> findByStatus(WorkflowStatus status, Pageable pageable);

    @Query(value = "SELECT w FROM WorkflowRun w WHERE " +
           "(:status IS NULL OR w.status = :status) " +
           "AND (:search IS NULL OR w.goal LIKE CONCAT('%', :search, '%'))",
           countQuery = "SELECT COUNT(w) FROM WorkflowRun w WHERE " +
           "(:status IS NULL OR w.status = :status) " +
           "AND (:search IS NULL OR w.goal LIKE CONCAT('%', :search, '%'))")
    Page<WorkflowRun> searchWorkflows(
            @Param("status") WorkflowStatus status,
            @Param("search") String search,
            Pageable pageable
    );
}
