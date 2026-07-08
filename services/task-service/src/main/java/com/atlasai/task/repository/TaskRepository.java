package com.atlasai.task.repository;

import com.atlasai.task.model.entity.TaskEntity;
import com.atlasai.task.model.enums.TaskPriority;
import com.atlasai.task.model.enums.TaskStatus;
import com.atlasai.task.model.enums.TaskType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface TaskRepository extends JpaRepository<TaskEntity, UUID> {

    Page<TaskEntity> findByStatus(TaskStatus status, Pageable pageable);

    Page<TaskEntity> findByAssignedTo(String assignedTo, Pageable pageable);

    Page<TaskEntity> findByRelatedEntityId(String relatedEntityId, Pageable pageable);

    @Query(value = "SELECT t FROM TaskEntity t WHERE " +
           "(:status IS NULL OR t.status = :status) " +
           "AND (:type IS NULL OR t.type = :type) " +
           "AND (:priority IS NULL OR t.priority = :priority) " +
           "AND (:assignedTo IS NULL OR t.assignedTo = :assignedTo) " +
           "AND (:search IS NULL OR LOWER(t.title) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(t.description) LIKE LOWER(CONCAT('%', :search, '%')))",
           countQuery = "SELECT COUNT(t) FROM TaskEntity t WHERE " +
           "(:status IS NULL OR t.status = :status) " +
           "AND (:type IS NULL OR t.type = :type) " +
           "AND (:priority IS NULL OR t.priority = :priority) " +
           "AND (:assignedTo IS NULL OR t.assignedTo = :assignedTo) " +
           "AND (:search IS NULL OR LOWER(t.title) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(t.description) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<TaskEntity> searchTasks(
            @Param("status") TaskStatus status,
            @Param("type") TaskType type,
            @Param("priority") TaskPriority priority,
            @Param("assignedTo") String assignedTo,
            @Param("search") String search,
            Pageable pageable
    );

    long countByStatus(TaskStatus status);
}
