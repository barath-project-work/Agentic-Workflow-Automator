package com.atlasai.customer.controller;

import com.atlasai.customer.model.request.OpportunityRequest;
import com.atlasai.customer.model.response.OpportunityResponse;
import com.atlasai.customer.service.OpportunityService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/opportunities")
@RequiredArgsConstructor
public class OpportunityController {

    private final OpportunityService opportunityService;

    @GetMapping
    public ResponseEntity<List<OpportunityResponse>> getAllOpportunities(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String stage,
            @RequestParam(required = false) BigDecimal minValue,
            @RequestParam(required = false) BigDecimal maxValue) {
        List<OpportunityResponse> opportunities = opportunityService.searchOpportunities(
                search, stage, minValue, maxValue);
        return ResponseEntity.ok(opportunities);
    }

    @GetMapping("/by-customer/{customerId}")
    public ResponseEntity<List<OpportunityResponse>> getByCustomer(@PathVariable UUID customerId) {
        return ResponseEntity.ok(opportunityService.getOpportunitiesByCustomer(customerId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<OpportunityResponse> getOpportunityById(@PathVariable UUID id) {
        OpportunityResponse opportunity = opportunityService.getOpportunityById(id);
        return ResponseEntity.ok(opportunity);
    }

    @PostMapping
    public ResponseEntity<OpportunityResponse> createOpportunity(@Valid @RequestBody OpportunityRequest request) {
        OpportunityResponse opportunity = opportunityService.createOpportunity(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(opportunity);
    }

    @PutMapping("/{id}")
    public ResponseEntity<OpportunityResponse> updateOpportunity(
            @PathVariable UUID id,
            @Valid @RequestBody OpportunityRequest request) {
        OpportunityResponse opportunity = opportunityService.updateOpportunity(id, request);
        return ResponseEntity.ok(opportunity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOpportunity(@PathVariable UUID id) {
        opportunityService.deleteOpportunity(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getOpportunityCount() {
        return ResponseEntity.ok(opportunityService.getOpportunityCount());
    }
}
