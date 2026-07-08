package com.atlasai.task.service;

import com.atlasai.task.model.entity.TaskEntity;
import com.atlasai.task.model.enums.TaskPriority;
import com.atlasai.task.model.enums.TaskStatus;
import com.atlasai.task.model.enums.TaskType;
import com.atlasai.task.model.request.TaskRequest;
import com.atlasai.task.model.response.TaskResponse;
import com.atlasai.task.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TaskService {

    private static final Logger log = LoggerFactory.getLogger(TaskService.class);

    private final TaskRepository taskRepository;

    public Page<TaskResponse> getAllTasks(Pageable pageable) {
        return taskRepository.findAll(pageable)
                .map(this::toResponse);
    }

    public Page<TaskResponse> searchTasks(
            String status, String type, String priority,
            String assignedTo, String search, Pageable pageable) {

        TaskStatus statusEnum = parseEnum(TaskStatus.class, status);
        TaskType typeEnum = parseEnum(TaskType.class, type);
        TaskPriority priorityEnum = parseEnum(TaskPriority.class, priority);

        // If no filters at all, fall back to findAll to avoid bytea issues
        if (statusEnum == null && typeEnum == null && priorityEnum == null
                && (assignedTo == null || assignedTo.isBlank())
                && (search == null || search.isBlank())) {
            return taskRepository.findAll(pageable).map(this::toResponse);
        }

        return taskRepository.searchTasks(statusEnum, typeEnum, priorityEnum, assignedTo, search, pageable)
                .map(this::toResponse);
    }

    public TaskResponse getTaskById(UUID id) {
        TaskEntity task = taskRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Task not found: " + id));
        return toResponse(task);
    }

    @Transactional
    public TaskResponse createTask(TaskRequest request) {
        TaskStatus status = parseEnum(TaskStatus.class, request.getStatus());
        TaskType type = parseEnum(TaskType.class, request.getType());
        TaskPriority priority = parseEnum(TaskPriority.class, request.getPriority());

        TaskEntity task = TaskEntity.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .type(type != null ? type : TaskType.FOLLOW_UP)
                .status(status != null ? status : TaskStatus.PENDING)
                .priority(priority != null ? priority : TaskPriority.MEDIUM)
                .dueDate(request.getDueDate())
                .assignedTo(request.getAssignedTo())
                .relatedEntityType(request.getRelatedEntityType())
                .relatedEntityId(request.getRelatedEntityId())
                .relatedEntityName(request.getRelatedEntityName())
                .result(request.getResult())
                .build();

        task = taskRepository.save(task);
        log.info("Created task {}: {} [{}]", task.getId(), task.getTitle(), task.getType());
        return toResponse(task);
    }

    @Transactional
    public TaskResponse updateTask(UUID id, TaskRequest request) {
        TaskEntity task = taskRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Task not found: " + id));

        TaskStatus status = parseEnum(TaskStatus.class, request.getStatus());
        TaskType type = parseEnum(TaskType.class, request.getType());
        TaskPriority priority = parseEnum(TaskPriority.class, request.getPriority());

        if (request.getTitle() != null) task.setTitle(request.getTitle());
        if (request.getDescription() != null) task.setDescription(request.getDescription());
        if (type != null) task.setType(type);
        if (status != null) task.setStatus(status);
        if (priority != null) task.setPriority(priority);
        if (request.getDueDate() != null) task.setDueDate(request.getDueDate());
        if (request.getAssignedTo() != null) task.setAssignedTo(request.getAssignedTo());
        if (request.getRelatedEntityType() != null) task.setRelatedEntityType(request.getRelatedEntityType());
        if (request.getRelatedEntityId() != null) task.setRelatedEntityId(request.getRelatedEntityId());
        if (request.getRelatedEntityName() != null) task.setRelatedEntityName(request.getRelatedEntityName());
        if (request.getResult() != null) task.setResult(request.getResult());

        task = taskRepository.save(task);
        log.info("Updated task {}: status={}, priority={}", id, task.getStatus(), task.getPriority());
        return toResponse(task);
    }

    @Transactional
    public TaskResponse updateTaskStatus(UUID id, String newStatus) {
        TaskEntity task = taskRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Task not found: " + id));

        TaskStatus status = parseEnum(TaskStatus.class, newStatus);
        if (status == null) {
            throw new IllegalArgumentException("Invalid status value: " + newStatus);
        }

        task.setStatus(status);
        task = taskRepository.save(task);
        log.info("Updated task {} status to {}", id, status);
        return toResponse(task);
    }

    @Transactional
    public void deleteTask(UUID id) {
        if (!taskRepository.existsById(id)) {
            throw new IllegalArgumentException("Task not found: " + id);
        }
        taskRepository.deleteById(id);
        log.info("Deleted task {}", id);
    }

    public long getTaskCount() {
        return taskRepository.count();
    }

    public long getTaskCountByStatus(String status) {
        TaskStatus statusEnum = parseEnum(TaskStatus.class, status);
        if (statusEnum == null) return 0;
        return taskRepository.countByStatus(statusEnum);
    }

    private <E extends Enum<E>> E parseEnum(Class<E> enumClass, String value) {
        if (value == null || value.isBlank()) return null;
        try {
            return Enum.valueOf(enumClass, value.toUpperCase());
        } catch (IllegalArgumentException e) {
            log.warn("Invalid enum value for {}: {}", enumClass.getSimpleName(), value);
            return null;
        }
    }

    private TaskResponse toResponse(TaskEntity task) {
        return TaskResponse.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .type(task.getType() != null ? task.getType().name() : "FOLLOW_UP")
                .status(task.getStatus() != null ? task.getStatus().name() : "PENDING")
                .priority(task.getPriority() != null ? task.getPriority().name() : "MEDIUM")
                .dueDate(task.getDueDate())
                .assignedTo(task.getAssignedTo())
                .relatedEntityType(task.getRelatedEntityType())
                .relatedEntityId(task.getRelatedEntityId())
                .relatedEntityName(task.getRelatedEntityName())
                .result(task.getResult())
                .createdAt(task.getCreatedAt())
                .updatedAt(task.getUpdatedAt())
                .build();
    }
}
