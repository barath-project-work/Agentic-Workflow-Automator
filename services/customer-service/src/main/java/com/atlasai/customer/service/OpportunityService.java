package com.atlasai.customer.service;

import com.atlasai.customer.model.entity.Opportunity;
import com.atlasai.customer.model.enums.OpportunityStage;
import com.atlasai.customer.model.request.OpportunityRequest;
import com.atlasai.customer.model.response.OpportunityResponse;
import com.atlasai.customer.repository.OpportunityRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OpportunityService {

    private static final Logger log = LoggerFactory.getLogger(OpportunityService.class);

    private final OpportunityRepository opportunityRepository;

    public Page<OpportunityResponse> getAllOpportunities(Pageable pageable) {
        return opportunityRepository.findAll(pageable)
                .map(this::toResponse);
    }

    public Page<OpportunityResponse> searchOpportunities(String search, String stage,
                                                          BigDecimal minValue, BigDecimal maxValue,
                                                          Pageable pageable) {
        OpportunityStage stageEnum = null;
        if (stage != null && !stage.isBlank()) {
            try {
                stageEnum = OpportunityStage.valueOf(stage.toUpperCase());
            } catch (IllegalArgumentException ignored) {
                log.warn("Invalid opportunity stage value: {}", stage);
            }
        }

        return opportunityRepository.searchOpportunities(search, stageEnum, minValue, maxValue, pageable)
                .map(this::toResponse);
    }

    public List<OpportunityResponse> getOpportunitiesByCustomer(UUID customerId) {
        return opportunityRepository.findByCustomerId(customerId).stream()
                .map(this::toResponse).toList();
    }

    public OpportunityResponse getOpportunityById(UUID id) {
        Opportunity opportunity = opportunityRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Opportunity not found: " + id));
        return toResponse(opportunity);
    }

    @Transactional
    public OpportunityResponse createOpportunity(OpportunityRequest request) {
        Opportunity opportunity = Opportunity.builder()
                .name(request.getName())
                .customerId(request.getCustomerId())
                .customerName(request.getCustomerName())
                .stage(parseStage(request.getStage()))
                .value(request.getValue())
                .probability(request.getProbability())
                .closeDate(request.getCloseDate())
                .assignedTo(request.getAssignedTo())
                .description(request.getDescription())
                .build();

        opportunity = opportunityRepository.save(opportunity);
        return toResponse(opportunity);
    }

    @Transactional
    public OpportunityResponse updateOpportunity(UUID id, OpportunityRequest request) {
        Opportunity opportunity = opportunityRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Opportunity not found: " + id));

        opportunity.setName(request.getName());
        opportunity.setCustomerId(request.getCustomerId());
        opportunity.setCustomerName(request.getCustomerName());
        opportunity.setValue(request.getValue());
        opportunity.setProbability(request.getProbability());
        opportunity.setCloseDate(request.getCloseDate());
        opportunity.setAssignedTo(request.getAssignedTo());
        opportunity.setDescription(request.getDescription());
        if (request.getStage() != null) {
            opportunity.setStage(parseStage(request.getStage()));
        }

        opportunity = opportunityRepository.save(opportunity);
        return toResponse(opportunity);
    }

    @Transactional
    public void deleteOpportunity(UUID id) {
        if (!opportunityRepository.existsById(id)) {
            throw new IllegalArgumentException("Opportunity not found: " + id);
        }
        opportunityRepository.deleteById(id);
    }

    public long getOpportunityCount() {
        return opportunityRepository.count();
    }

    private OpportunityStage parseStage(String stage) {
        if (stage == null || stage.isBlank()) return OpportunityStage.PROSPECT;
        try {
            return OpportunityStage.valueOf(stage.toUpperCase());
        } catch (IllegalArgumentException e) {
            return OpportunityStage.PROSPECT;
        }
    }

    private OpportunityResponse toResponse(Opportunity opportunity) {
        return OpportunityResponse.builder()
                .id(opportunity.getId())
                .name(opportunity.getName())
                .customerId(opportunity.getCustomerId())
                .customerName(opportunity.getCustomerName())
                .stage(opportunity.getStage().name())
                .value(opportunity.getValue())
                .probability(opportunity.getProbability())
                .closeDate(opportunity.getCloseDate())
                .assignedTo(opportunity.getAssignedTo())
                .description(opportunity.getDescription())
                .createdAt(opportunity.getCreatedAt())
                .updatedAt(opportunity.getUpdatedAt())
                .build();
    }
}
