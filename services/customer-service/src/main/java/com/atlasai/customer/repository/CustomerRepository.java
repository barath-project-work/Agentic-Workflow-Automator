package com.atlasai.customer.repository;

import com.atlasai.customer.model.entity.Customer;
import com.atlasai.customer.model.enums.CustomerStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, UUID> {

    List<Customer> findByStatus(CustomerStatus status);

    List<Customer> findByIndustryContainingIgnoreCase(String industry);

    List<Customer> findByLocationContainingIgnoreCase(String location);

    @Query(value = "SELECT c FROM Customer c WHERE " +
           "(:search IS NULL OR LOWER(c.name) LIKE LOWER(CONCAT('%', :search, '%')) " +
           "OR LOWER(c.company) LIKE LOWER(CONCAT('%', :search, '%')) " +
           "OR LOWER(c.email) LIKE LOWER(CONCAT('%', :search, '%'))) " +
           "AND (:industry IS NULL OR LOWER(c.industry) LIKE LOWER(CONCAT('%', :industry, '%'))) " +
           "AND (:location IS NULL OR LOWER(c.location) LIKE LOWER(CONCAT('%', :location, '%'))) " +
           "AND (:status IS NULL OR c.status = :status) " +
           "AND (:lastContactedBefore IS NULL OR c.lastContacted < :lastContactedBefore)",
           countQuery = "SELECT COUNT(c) FROM Customer c WHERE " +
           "(:search IS NULL OR LOWER(c.name) LIKE LOWER(CONCAT('%', :search, '%')) " +
           "OR LOWER(c.company) LIKE LOWER(CONCAT('%', :search, '%')) " +
           "OR LOWER(c.email) LIKE LOWER(CONCAT('%', :search, '%'))) " +
           "AND (:industry IS NULL OR LOWER(c.industry) LIKE LOWER(CONCAT('%', :industry, '%'))) " +
           "AND (:location IS NULL OR LOWER(c.location) LIKE LOWER(CONCAT('%', :location, '%'))) " +
           "AND (:status IS NULL OR c.status = :status) " +
           "AND (:lastContactedBefore IS NULL OR c.lastContacted < :lastContactedBefore)")
    Page<Customer> searchCustomers(
            @Param("search") String search,
            @Param("industry") String industry,
            @Param("location") String location,
            @Param("status") CustomerStatus status,
            @Param("lastContactedBefore") LocalDateTime lastContactedBefore,
            Pageable pageable
    );
}
