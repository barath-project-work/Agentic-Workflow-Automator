package com.atlasai.customer.repository;

import com.atlasai.customer.model.entity.Opportunity;
import com.atlasai.customer.model.enums.OpportunityStage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface OpportunityRepository extends JpaRepository<Opportunity, UUID> {

    List<Opportunity> findByCustomerId(UUID customerId);

    List<Opportunity> findByStage(OpportunityStage stage);

    @Query(value = "SELECT o FROM Opportunity o WHERE " +
           "(:search IS NULL OR LOWER(o.name) LIKE LOWER(CONCAT('%', :search, '%')) " +
           "OR LOWER(o.customerName) LIKE LOWER(CONCAT('%', :search, '%'))) " +
           "AND (:stage IS NULL OR o.stage = :stage) " +
           "AND (:minValue IS NULL OR o.value >= :minValue) " +
           "AND (:maxValue IS NULL OR o.value <= :maxValue)",
           countQuery = "SELECT COUNT(o) FROM Opportunity o WHERE " +
           "(:search IS NULL OR LOWER(o.name) LIKE LOWER(CONCAT('%', :search, '%')) " +
           "OR LOWER(o.customerName) LIKE LOWER(CONCAT('%', :search, '%'))) " +
           "AND (:stage IS NULL OR o.stage = :stage) " +
           "AND (:minValue IS NULL OR o.value >= :minValue) " +
           "AND (:maxValue IS NULL OR o.value <= :maxValue)")
    Page<Opportunity> searchOpportunities(
            @Param("search") String search,
            @Param("stage") OpportunityStage stage,
            @Param("minValue") java.math.BigDecimal minValue,
            @Param("maxValue") java.math.BigDecimal maxValue,
            Pageable pageable
    );
}
