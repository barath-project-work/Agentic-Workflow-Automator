package com.atlasai.customer.service;

import com.atlasai.customer.model.entity.Customer;
import com.atlasai.customer.model.enums.CustomerStatus;
import com.atlasai.customer.model.request.CustomerRequest;
import com.atlasai.customer.model.response.CustomerResponse;
import com.atlasai.customer.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private static final Logger log = LoggerFactory.getLogger(CustomerService.class);

    private final CustomerRepository customerRepository;

    public Page<CustomerResponse> getAllCustomers(Pageable pageable) {
        return customerRepository.findAll(pageable)
                .map(this::toResponse);
    }

    public Page<CustomerResponse> searchCustomers(String search, String industry, String location,
                                                   String status, Integer daysSinceContact,
                                                   Pageable pageable) {

        // No filters — use simple findAll to avoid custom JPQL query issues on bytea columns
        if ((search == null || search.isBlank()) &&
            (industry == null || industry.isBlank()) &&
            (location == null || location.isBlank()) &&
            (status == null || status.isBlank()) &&
            daysSinceContact == null) {
            return customerRepository.findAll(pageable)
                    .map(this::toResponse);
        }

        CustomerStatus statusEnum = null;
        if (status != null && !status.isBlank()) {
            try {
                statusEnum = CustomerStatus.valueOf(status.toUpperCase());
            } catch (IllegalArgumentException ignored) {
                log.warn("Invalid customer status value: {}", status);
            }
        }

        LocalDateTime lastContactedBefore = null;
        if (daysSinceContact != null) {
            lastContactedBefore = LocalDateTime.now().minusDays(daysSinceContact);
        }

        return customerRepository.searchCustomers(search, industry, location, statusEnum, lastContactedBefore, pageable)
                .map(this::toResponse);
    }

    public CustomerResponse getCustomerById(UUID id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Customer not found: " + id));
        return toResponse(customer);
    }

    @Transactional
    public CustomerResponse createCustomer(CustomerRequest request) {
        Customer customer = Customer.builder()
                .name(request.getName())
                .company(request.getCompany())
                .industry(request.getIndustry())
                .location(request.getLocation())
                .email(request.getEmail())
                .phone(request.getPhone())
                .contactPerson(request.getContactPerson())
                .lastContacted(request.getLastContacted())
                .website(request.getWebsite())
                .notes(request.getNotes())
                .tags(request.getTags())
                .status(parseStatus(request.getStatus()))
                .build();

        customer = customerRepository.save(customer);
        return toResponse(customer);
    }

    @Transactional
    public CustomerResponse updateCustomer(UUID id, CustomerRequest request) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Customer not found: " + id));

        customer.setName(request.getName());
        customer.setCompany(request.getCompany());
        customer.setIndustry(request.getIndustry());
        customer.setLocation(request.getLocation());
        customer.setEmail(request.getEmail());
        customer.setPhone(request.getPhone());
        customer.setContactPerson(request.getContactPerson());
        customer.setLastContacted(request.getLastContacted());
        customer.setWebsite(request.getWebsite());
        customer.setNotes(request.getNotes());
        customer.setTags(request.getTags());
        if (request.getStatus() != null) {
            customer.setStatus(parseStatus(request.getStatus()));
        }

        customer = customerRepository.save(customer);
        return toResponse(customer);
    }

    @Transactional
    public void deleteCustomer(UUID id) {
        if (!customerRepository.existsById(id)) {
            throw new IllegalArgumentException("Customer not found: " + id);
        }
        customerRepository.deleteById(id);
    }

    public long getCustomerCount() {
        return customerRepository.count();
    }

    private CustomerStatus parseStatus(String status) {
        if (status == null || status.isBlank()) return CustomerStatus.LEAD;
        try {
            return CustomerStatus.valueOf(status.toUpperCase());
        } catch (IllegalArgumentException e) {
            return CustomerStatus.LEAD;
        }
    }

    private CustomerResponse toResponse(Customer customer) {
        return CustomerResponse.builder()
                .id(customer.getId())
                .name(customer.getName())
                .company(customer.getCompany())
                .industry(customer.getIndustry())
                .location(customer.getLocation())
                .email(customer.getEmail())
                .phone(customer.getPhone())
                .contactPerson(customer.getContactPerson())
                .lastContacted(customer.getLastContacted())
                .status(customer.getStatus() != null ? customer.getStatus().name() : "LEAD")
                .tags(customer.getTags())
                .notes(customer.getNotes())
                .website(customer.getWebsite())
                .createdAt(customer.getCreatedAt())
                .updatedAt(customer.getUpdatedAt())
                .build();
    }
}
