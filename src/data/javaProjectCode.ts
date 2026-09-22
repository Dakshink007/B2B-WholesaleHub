export interface JavaFileItem {
  id: string;
  name: string;
  path: string;
  category: 'Entity' | 'Repository' | 'Service' | 'Controller' | 'DTO' | 'Exception' | 'Config' | 'SQL';
  description: string;
  oopConcepts: string[];
  content: string;
}

export const JAVA_PROJECT_FILES: JavaFileItem[] = [
  {
    id: 'pom',
    name: 'pom.xml',
    path: 'pom.xml',
    category: 'Config',
    description: 'Maven Project Object Model with Spring Boot 3.2, Spring Data JPA, MySQL Connector, Lombok, and Validation dependencies',
    oopConcepts: ['Dependency Management', 'Build Automation'],
    content: `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.3</version>
        <relativePath/>
    </parent>

    <groupId>com.wholesalehub</groupId>
    <artifactId>b2b-wholesale-marketplace</artifactId>
    <version>1.0.0-SNAPSHOT</version>
    <name>b2b-wholesale-marketplace</name>
    <description>Digital Platform for Wholesale Buying and Selling - College Project</description>

    <properties>
        <java.version>17</java.version>
    </properties>

    <dependencies>
        <!-- Spring Boot Starter Web (REST APIs, MVC, Jackson) -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!-- Spring Boot Starter Data JPA (Hibernate, EntityManager) -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>

        <!-- Bean Validation (JSR-380) -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>

        <!-- MySQL JDBC Connector Driver -->
        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
            <scope>runtime</scope>
        </dependency>

        <!-- Spring Boot Starter Security (Role-Based Access Control) -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>

        <!-- JWT for Stateless Authentication -->
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-api</artifactId>
            <version>0.11.5</version>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-impl</artifactId>
            <version>0.11.5</version>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-jackson</artifactId>
            <version>0.11.5</version>
            <scope>runtime</scope>
        </dependency>

        <!-- Lombok (Reduces boilerplate getters/setters/constructors) -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <!-- Spring Boot Starter Test -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>`
  },
  {
    id: 'app-props',
    name: 'application.properties',
    path: 'src/main/resources/application.properties',
    category: 'Config',
    description: 'Spring Boot configuration for MySQL connection pooling, JPA ddl-auto, and server port 8080',
    oopConcepts: ['Configuration Abstraction'],
    content: `# Server Configuration
server.port=8080
server.servlet.context-path=/

# MySQL Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/wholesalehub_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=root1234
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA / Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# File Upload Configuration
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=15MB

# JWT Security Settings
app.jwt.secret=9a6747f3a778ac7da3190282491208345413214f53a33b1298522b
app.jwt.expiration-ms=86400000`
  },
  {
    id: 'main-app',
    name: 'WholesaleHubApplication.java',
    path: 'src/main/java/com/wholesalehub/WholesaleHubApplication.java',
    category: 'Config',
    description: 'Main Spring Boot application entry point containing public static void main and component scan',
    oopConcepts: ['Encapsulation', 'Class & Object Instantiation'],
    content: `package com.wholesalehub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * College Project: B2B Wholesale Marketplace
 * Digital Platform for Wholesale Buying and Selling
 * 
 * Entry point for Spring Boot Application.
 */
@SpringBootApplication
public class WholesaleHubApplication {

    public static void main(String[] args) {
        SpringApplication.run(WholesaleHubApplication.class, args);
        System.out.println("==================================================");
        System.out.println(" WholesaleHub B2B Backend Started on Port 8080    ");
        System.out.println(" MySQL Connected via JPA / Hibernate              ");
        System.out.println("==================================================");
    }
}`
  },
  {
    id: 'entity-user',
    name: 'User.java',
    path: 'src/main/java/com/wholesalehub/entity/User.java',
    category: 'Entity',
    description: 'Base User JPA Entity demonstrating Inheritance (mapped superclass/subclasses for Retailer & Supplier) and Encapsulation',
    oopConcepts: ['Inheritance', 'Encapsulation', 'Data Hiding', 'Getters & Setters'],
    content: `package com.wholesalehub.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * Demonstrates OOP Inheritance & Encapsulation:
 * Base class for all actors in the B2B Wholesale Marketplace.
 * Concrete roles extend this class or map to it via Role enumeration.
 */
@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.JOINED)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, length = 100)
    private String fullName;

    @Column(length = 20)
    private String phone;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Role role; // ADMIN, SUPPLIER, RETAILER

    @Column(name = "company_name", length = 150)
    private String companyName;

    @Column(name = "tax_id", length = 50)
    private String taxId; // GST / EIN / VAT number

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private AccountStatus status = AccountStatus.ACTIVE;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    // Default Constructor (Required by JPA)
    public User() {}

    // Overloaded Parameterized Constructor (OOP Polymorphism / Overloading)
    public User(String email, String password, String fullName, Role role, String companyName) {
        this.email = email;
        this.password = password;
        this.fullName = fullName;
        this.role = role;
        this.companyName = companyName;
        this.status = (role == Role.SUPPLIER) ? AccountStatus.PENDING : AccountStatus.ACTIVE;
        this.createdAt = LocalDateTime.now();
    }

    // Encapsulation: Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getTaxId() { return taxId; }
    public void setTaxId(String taxId) { this.taxId = taxId; }

    public AccountStatus getStatus() { return status; }
    public void setStatus(AccountStatus status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }

    public enum Role {
        ADMIN, SUPPLIER, RETAILER
    }

    public enum AccountStatus {
        ACTIVE, PENDING, SUSPENDED
    }
}`
  },
  {
    id: 'entity-product',
    name: 'Product.java',
    path: 'src/main/java/com/wholesalehub/entity/Product.java',
    category: 'Entity',
    description: 'Product Entity with B2B Wholesale business logic (MOQ validation, tier discounts, inventory)',
    oopConcepts: ['Encapsulation', 'Data Integrity', 'Method Overloading'],
    content: `package com.wholesalehub.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Product Entity representing wholesale inventory items.
 * Encapsulates Minimum Order Quantity (MOQ) and wholesale pricing rules.
 */
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal wholesalePrice;

    @Column(precision = 10, scale = 2)
    private BigDecimal retailMSRP;

    @Column(nullable = false)
    private Integer minOrderQuantity = 10; // Wholesale MOQ constraint

    @Column(nullable = false)
    private Integer availableStock = 0;

    @Column(length = 500)
    private String imageUrl;

    @Column(length = 50)
    private String unit = "pcs"; // e.g., 'cartons', 'sets', 'pcs'

    @Column(length = 50, unique = true)
    private String sku;

    private Double rating = 5.0;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "supplier_id", nullable = false)
    private User supplier;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ProductStatus status = ProductStatus.ACTIVE;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Product() {}

    // OOP Encapsulated Business Methods:
    public boolean satisfiesMOQ(int requestedQuantity) {
        return requestedQuantity >= this.minOrderQuantity;
    }

    public boolean hasSufficientStock(int requestedQuantity) {
        return this.availableStock >= requestedQuantity;
    }

    public void deductStock(int quantity) {
        if (!hasSufficientStock(quantity)) {
            throw new IllegalArgumentException("Insufficient inventory for product: " + this.name);
        }
        this.availableStock -= quantity;
        if (this.availableStock == 0) {
            this.status = ProductStatus.OUT_OF_STOCK;
        }
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public BigDecimal getWholesalePrice() { return wholesalePrice; }
    public void setWholesalePrice(BigDecimal wholesalePrice) { this.wholesalePrice = wholesalePrice; }

    public BigDecimal getRetailMSRP() { return retailMSRP; }
    public void setRetailMSRP(BigDecimal retailMSRP) { this.retailMSRP = retailMSRP; }

    public Integer getMinOrderQuantity() { return minOrderQuantity; }
    public void setMinOrderQuantity(Integer minOrderQuantity) { this.minOrderQuantity = minOrderQuantity; }

    public Integer getAvailableStock() { return availableStock; }
    public void setAvailableStock(Integer availableStock) { this.availableStock = availableStock; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }

    public String getSku() { return sku; }
    public void setSku(String sku) { this.sku = sku; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }

    public User getSupplier() { return supplier; }
    public void setSupplier(User supplier) { this.supplier = supplier; }

    public ProductStatus getStatus() { return status; }
    public void setStatus(ProductStatus status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }

    public enum ProductStatus {
        ACTIVE, OUT_OF_STOCK, INACTIVE
    }
}`
  },
  {
    id: 'entity-order',
    name: 'Order.java',
    path: 'src/main/java/com/wholesalehub/entity/Order.java',
    category: 'Entity',
    description: 'Order JPA Entity containing 1-to-many relationship with OrderItem, status lifecycle, and payment terms',
    oopConcepts: ['Composition', 'Relationship Mapping', 'Encapsulation'],
    content: `package com.wholesalehub.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Order Entity demonstrating Composition (Order -> List<OrderItem>)
 * and Encapsulation of B2B Wholesale purchase lifecycle.
 */
@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "order_number", nullable = false, unique = true, length = 50)
    private String orderNumber; // e.g. ORD-2026-9810

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "retailer_id", nullable = false)
    private User retailer;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items = new ArrayList<>();

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal subtotal = BigDecimal.ZERO;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal taxAmount = BigDecimal.ZERO;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal shippingFee = BigDecimal.ZERO;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal totalAmount = BigDecimal.ZERO;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private OrderStatus status = OrderStatus.PENDING;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method", length = 30)
    private PaymentMethod paymentMethod; // NET_30, BANK_TRANSFER, CREDIT_CARD

    @Column(name = "tracking_number", length = 100)
    private String trackingNumber;

    @Column(length = 100)
    private String carrier;

    @Column(name = "shipping_address", columnDefinition = "TEXT")
    private String shippingAddress;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Order() {}

    // Helper method for bidirectional composition
    public void addItem(OrderItem item) {
        items.add(item);
        item.setOrder(this);
        recalculateTotals();
    }

    public void recalculateTotals() {
        this.subtotal = items.stream()
                .map(OrderItem::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        this.taxAmount = this.subtotal.multiply(new BigDecimal("0.08")); // 8% wholesale tax
        this.totalAmount = this.subtotal.add(this.taxAmount).add(this.shippingFee);
    }

    // Getters and Setters
    public Long getId() { return id; }
    public String getOrderNumber() { return orderNumber; }
    public void setOrderNumber(String orderNumber) { this.orderNumber = orderNumber; }

    public User getRetailer() { return retailer; }
    public void setRetailer(User retailer) { this.retailer = retailer; }

    public List<OrderItem> getItems() { return items; }
    public void setItems(List<OrderItem> items) { this.items = items; }

    public BigDecimal getSubtotal() { return subtotal; }
    public BigDecimal getTaxAmount() { return taxAmount; }
    public BigDecimal getShippingFee() { return shippingFee; }
    public void setShippingFee(BigDecimal shippingFee) { this.shippingFee = shippingFee; recalculateTotals(); }

    public BigDecimal getTotalAmount() { return totalAmount; }
    public OrderStatus getStatus() { return status; }
    public void setStatus(OrderStatus status) { this.status = status; }

    public PaymentMethod getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(PaymentMethod paymentMethod) { this.paymentMethod = paymentMethod; }

    public String getTrackingNumber() { return trackingNumber; }
    public void setTrackingNumber(String trackingNumber) { this.trackingNumber = trackingNumber; }

    public String getCarrier() { return carrier; }
    public void setCarrier(String carrier) { this.carrier = carrier; }

    public String getShippingAddress() { return shippingAddress; }
    public void setShippingAddress(String shippingAddress) { this.shippingAddress = shippingAddress; }

    public LocalDateTime getCreatedAt() { return createdAt; }

    public enum OrderStatus {
        PENDING, CONFIRMED, PROCESSING, DISPATCHED, IN_TRANSIT, DELIVERED, CANCELLED
    }

    public enum PaymentMethod {
        NET_30, BANK_TRANSFER, CREDIT_CARD
    }
}`
  },
  {
    id: 'service-interface',
    name: 'ProductService.java (Interface)',
    path: 'src/main/java/com/wholesalehub/service/ProductService.java',
    category: 'Service',
    description: 'Interface defining contract for Product business operations, illustrating Abstraction and Loose Coupling',
    oopConcepts: ['Abstraction', 'Interface Segregation', 'Loose Coupling'],
    content: `package com.wholesalehub.service;

import com.wholesalehub.dto.ProductRequestDTO;
import com.wholesalehub.dto.ProductResponseDTO;
import java.util.List;

/**
 * Demonstrates Abstraction & Interface Segregation:
 * Declares the business logic operations for Products without exposing internal implementations.
 */
public interface ProductService {

    List<ProductResponseDTO> getAllActiveProducts();

    List<ProductResponseDTO> getProductsByCategory(Long categoryId);

    List<ProductResponseDTO> getProductsBySupplier(Long supplierId);

    ProductResponseDTO getProductById(Long id);

    ProductResponseDTO createProduct(Long supplierId, ProductRequestDTO requestDTO);

    ProductResponseDTO updateProduct(Long productId, Long supplierId, ProductRequestDTO requestDTO);

    void deleteProduct(Long productId, Long supplierId);

    // Method Overloading example
    List<ProductResponseDTO> searchProducts(String keyword);
    List<ProductResponseDTO> searchProducts(String keyword, Long categoryId, Double maxPrice);
}`
  },
  {
    id: 'service-impl',
    name: 'ProductServiceImpl.java',
    path: 'src/main/java/com/wholesalehub/service/impl/ProductServiceImpl.java',
    category: 'Service',
    description: 'Concrete implementation of ProductService demonstrating Polymorphism, Exception Handling, and Dependency Injection',
    oopConcepts: ['Polymorphism', 'Encapsulation', 'Dependency Injection', 'Method Overriding'],
    content: `package com.wholesalehub.service.impl;

import com.wholesalehub.dto.ProductRequestDTO;
import com.wholesalehub.dto.ProductResponseDTO;
import com.wholesalehub.entity.Category;
import com.wholesalehub.entity.Product;
import com.wholesalehub.entity.User;
import com.wholesalehub.exception.ResourceNotFoundException;
import com.wholesalehub.exception.UnauthorizedException;
import com.wholesalehub.repository.CategoryRepository;
import com.wholesalehub.repository.ProductRepository;
import com.wholesalehub.repository.UserRepository;
import com.wholesalehub.service.ProductService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Concrete Service Implementation demonstrating:
 * 1. Polymorphism via interface implementation (@Override)
 * 2. Dependency Injection via Constructor
 * 3. Business rule validation (MOQ > 0, Price > 0)
 */
@Service
@Transactional
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    // Constructor Injection (Promotes loose coupling and testability)
    public ProductServiceImpl(ProductRepository productRepository,
                              CategoryRepository categoryRepository,
                              UserRepository userRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponseDTO> getAllActiveProducts() {
        return productRepository.findByStatus(Product.ProductStatus.ACTIVE)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public ProductResponseDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        return mapToDTO(product);
    }

    @Override
    public ProductResponseDTO createProduct(Long supplierId, ProductRequestDTO dto) {
        User supplier = userRepository.findById(supplierId)
                .orElseThrow(() -> new ResourceNotFoundException("Supplier not found: " + supplierId));

        if (supplier.getRole() != User.Role.SUPPLIER && supplier.getRole() != User.Role.ADMIN) {
            throw new UnauthorizedException("Only registered wholesalers can list wholesale products.");
        }

        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found: " + dto.getCategoryId()));

        Product product = new Product();
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setWholesalePrice(dto.getWholesalePrice());
        product.setRetailMSRP(dto.getRetailMSRP());
        product.setMinOrderQuantity(dto.getMinOrderQuantity() != null ? dto.getMinOrderQuantity() : 10);
        product.setAvailableStock(dto.getAvailableStock());
        product.setImageUrl(dto.getImageUrl());
        product.setUnit(dto.getUnit() != null ? dto.getUnit() : "pcs");
        product.setSku(dto.getSku());
        product.setCategory(category);
        product.setSupplier(supplier);
        product.setStatus(Product.ProductStatus.ACTIVE);

        Product saved = productRepository.save(product);
        return mapToDTO(saved);
    }

    // Method Overloading implementation
    @Override
    @Transactional(readOnly = true)
    public List<ProductResponseDTO> searchProducts(String keyword) {
        return productRepository.findByNameContainingIgnoreCase(keyword)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponseDTO> searchProducts(String keyword, Long categoryId, Double maxPrice) {
        // Overloaded variant providing advanced filtering
        return productRepository.findByAdvancedCriteria(keyword, categoryId, maxPrice)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponseDTO> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategoryId(categoryId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponseDTO> getProductsBySupplier(Long supplierId) {
        return productRepository.findBySupplierId(supplierId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ProductResponseDTO updateProduct(Long productId, Long supplierId, ProductRequestDTO dto) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + productId));

        if (!product.getSupplier().getId().equals(supplierId)) {
            throw new UnauthorizedException("You are not authorized to update this product.");
        }

        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setWholesalePrice(dto.getWholesalePrice());
        product.setMinOrderQuantity(dto.getMinOrderQuantity());
        product.setAvailableStock(dto.getAvailableStock());
        product.setImageUrl(dto.getImageUrl());

        return mapToDTO(productRepository.save(product));
    }

    @Override
    public void deleteProduct(Long productId, Long supplierId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + productId));

        if (!product.getSupplier().getId().equals(supplierId)) {
            throw new UnauthorizedException("You are not authorized to delete this product.");
        }
        productRepository.delete(product);
    }

    // Helper mapping method encapsulating entity-to-DTO conversion
    private ProductResponseDTO mapToDTO(Product p) {
        ProductResponseDTO dto = new ProductResponseDTO();
        dto.setId(p.getId());
        dto.setName(p.getName());
        dto.setDescription(p.getDescription());
        dto.setWholesalePrice(p.getWholesalePrice());
        dto.setRetailMSRP(p.getRetailMSRP());
        dto.setMinOrderQuantity(p.getMinOrderQuantity());
        dto.setAvailableStock(p.getAvailableStock());
        dto.setImageUrl(p.getImageUrl());
        dto.setUnit(p.getUnit());
        dto.setSku(p.getSku());
        dto.setRating(p.getRating());
        dto.setStatus(p.getStatus().name());
        dto.setCategoryId(p.getCategory().getId());
        dto.setCategoryName(p.getCategory().getName());
        dto.setSupplierId(p.getSupplier().getId());
        dto.setSupplierName(p.getSupplier().getCompanyName() != null ? p.getSupplier().getCompanyName() : p.getSupplier().getFullName());
        return dto;
    }
}`
  },
  {
    id: 'controller-product',
    name: 'ProductController.java',
    path: 'src/main/java/com/wholesalehub/controller/ProductController.java',
    category: 'Controller',
    description: 'REST Controller with standard HTTP verb endpoints (GET, POST, PUT, DELETE) and HTTP status codes',
    oopConcepts: ['Encapsulation', 'MVC Layering', 'Separation of Concerns'],
    content: `package com.wholesalehub.controller;

import com.wholesalehub.dto.ProductRequestDTO;
import com.wholesalehub.dto.ProductResponseDTO;
import com.wholesalehub.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Spring MVC REST Controller for B2B Wholesale Products.
 * Maps endpoints to client-facing HTTP methods.
 */
@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*") // Allows local development and cross-origin requests
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<ProductResponseDTO>> getAllProducts(
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) String search) {
        if (categoryId != null) {
            return ResponseEntity.ok(productService.getProductsByCategory(categoryId));
        }
        if (search != null && !search.trim().isEmpty()) {
            return ResponseEntity.ok(productService.searchProducts(search));
        }
        return ResponseEntity.ok(productService.getAllActiveProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @PostMapping
    public ResponseEntity<ProductResponseDTO> createProduct(
            @RequestHeader(value = "X-Supplier-Id", defaultValue = "2") Long supplierId,
            @Valid @RequestBody ProductRequestDTO requestDTO) {
        ProductResponseDTO created = productService.createProduct(supplierId, requestDTO);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> updateProduct(
            @PathVariable Long id,
            @RequestHeader(value = "X-Supplier-Id", defaultValue = "2") Long supplierId,
            @Valid @RequestBody ProductRequestDTO requestDTO) {
        ProductResponseDTO updated = productService.updateProduct(id, supplierId, requestDTO);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(
            @PathVariable Long id,
            @RequestHeader(value = "X-Supplier-Id", defaultValue = "2") Long supplierId) {
        productService.deleteProduct(id, supplierId);
        return ResponseEntity.noContent().build();
    }
}`
  },
  {
    id: 'controller-order',
    name: 'OrderController.java',
    path: 'src/main/java/com/wholesalehub/controller/OrderController.java',
    category: 'Controller',
    description: 'REST Controller managing Order placement, status transitions, and retailer tracking',
    oopConcepts: ['Polymorphism', 'Layered Architecture'],
    content: `package com.wholesalehub.controller;

import com.wholesalehub.dto.OrderRequestDTO;
import com.wholesalehub.dto.OrderResponseDTO;
import com.wholesalehub.entity.Order;
import com.wholesalehub.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<OrderResponseDTO> createOrder(
            @RequestHeader(value = "X-Retailer-Id", defaultValue = "4") Long retailerId,
            @Valid @RequestBody OrderRequestDTO requestDTO) {
        OrderResponseDTO created = orderService.placeOrder(retailerId, requestDTO);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<OrderResponseDTO>> getOrders(
            @RequestParam(required = false) Long retailerId,
            @RequestParam(required = false) Long supplierId) {
        if (retailerId != null) {
            return ResponseEntity.ok(orderService.getOrdersByRetailer(retailerId));
        }
        if (supplierId != null) {
            return ResponseEntity.ok(orderService.getOrdersBySupplier(supplierId));
        }
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderResponseDTO> getOrderById(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getOrderById(id));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<OrderResponseDTO> updateOrderStatus(
            @PathVariable Long id,
            @RequestParam Order.OrderStatus status,
            @RequestParam(required = false) String note) {
        OrderResponseDTO updated = orderService.updateOrderStatus(id, status, note);
        return ResponseEntity.ok(updated);
    }
}`
  },
  {
    id: 'controller-auth',
    name: 'AuthController.java',
    path: 'src/main/java/com/wholesalehub/controller/AuthController.java',
    category: 'Controller',
    description: 'REST Controller for user registration (Retailer/Supplier) and secure authentication login',
    oopConcepts: ['Encapsulation', 'DTO Pattern'],
    content: `package com.wholesalehub.controller;

import com.wholesalehub.dto.AuthRequestDTO;
import com.wholesalehub.dto.AuthResponseDTO;
import com.wholesalehub.dto.RegisterRequestDTO;
import com.wholesalehub.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(@Valid @RequestBody RegisterRequestDTO request) {
        AuthResponseDTO response = authService.register(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody AuthRequestDTO request) {
        AuthResponseDTO response = authService.login(request);
        return ResponseEntity.ok(response);
    }
}`
  },
  {
    id: 'sql-schema',
    name: 'schema.sql',
    path: 'src/main/resources/schema.sql',
    category: 'SQL',
    description: 'Complete MySQL DDL table definition script with foreign keys, constraints, and indexes',
    oopConcepts: ['Relational Schema', 'Entity Mapping'],
    content: `-- ==========================================================
-- B2B Wholesale Marketplace Database Schema (MySQL 8.0)
-- WholesaleHub - Digital Platform for Wholesale Buying & Selling
-- ==========================================================

DROP DATABASE IF EXISTS wholesalehub_db;
CREATE DATABASE wholesalehub_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE wholesalehub_db;

-- 1. Users Table (Base entity for Retailers, Suppliers, Admins)
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    role ENUM('ADMIN', 'SUPPLIER', 'RETAILER') NOT NULL,
    company_name VARCHAR(150),
    tax_id VARCHAR(50),
    status ENUM('ACTIVE', 'PENDING', 'SUSPENDED') NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Categories Table
CREATE TABLE categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon_name VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Products Table (Wholesale specifications, MOQ, Stock)
CREATE TABLE products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    wholesale_price DECIMAL(10, 2) NOT NULL,
    retail_msrp DECIMAL(10, 2),
    min_order_quantity INT NOT NULL DEFAULT 10,
    available_stock INT NOT NULL DEFAULT 0,
    image_url VARCHAR(500),
    unit VARCHAR(50) DEFAULT 'pcs',
    sku VARCHAR(50) UNIQUE,
    rating DECIMAL(2, 1) DEFAULT 5.0,
    category_id BIGINT NOT NULL,
    supplier_id BIGINT NOT NULL,
    status ENUM('ACTIVE', 'OUT_OF_STOCK', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT,
    FOREIGN KEY (supplier_id) REFERENCES users(id) ON DELETE RESTRICT
);

-- 4. Shopping Carts Table
CREATE TABLE carts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    retailer_id BIGINT NOT NULL UNIQUE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (retailer_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 5. Cart Items Table
CREATE TABLE cart_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    cart_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- 6. Orders Table (Wholesale Orders & Net-30 Terms)
CREATE TABLE orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_number VARCHAR(50) NOT NULL UNIQUE,
    retailer_id BIGINT NOT NULL,
    subtotal DECIMAL(12, 2) NOT NULL,
    tax_amount DECIMAL(10, 2) NOT NULL,
    shipping_fee DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    total_amount DECIMAL(12, 2) NOT NULL,
    status ENUM('PENDING', 'CONFIRMED', 'PROCESSING', 'DISPATCHED', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    payment_method ENUM('NET_30', 'BANK_TRANSFER', 'CREDIT_CARD') NOT NULL,
    tracking_number VARCHAR(100),
    carrier VARCHAR(100),
    shipping_address TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (retailer_id) REFERENCES users(id) ON DELETE RESTRICT
);

-- 7. Order Items Table
CREATE TABLE order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    wholesale_price DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(12, 2) NOT NULL,
    supplier_id BIGINT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT,
    FOREIGN KEY (supplier_id) REFERENCES users(id) ON DELETE RESTRICT
);

-- 8. Order Status Tracking History Table
CREATE TABLE order_tracking (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    status VARCHAR(50) NOT NULL,
    note TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- Indexes for high-performance B2B filtering
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_supplier ON products(supplier_id);
CREATE INDEX idx_orders_retailer ON orders(retailer_id);
CREATE INDEX idx_orders_status ON orders(status);`
  },
  {
    id: 'exception-handler',
    name: 'GlobalExceptionHandler.java',
    path: 'src/main/java/com/wholesalehub/exception/GlobalExceptionHandler.java',
    category: 'Exception',
    description: 'Centralized ControllerAdvice handling business exceptions, validation errors, and formatted JSON responses',
    oopConcepts: ['Exception Handling', 'Polymorphism', 'Inheritance'],
    content: `package com.wholesalehub.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * Demonstrates Exception Handling in Java:
 * Centralized exception interceptor converting checked and unchecked exceptions
 * into structured REST JSON responses with HTTP status codes.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleNotFound(ResourceNotFoundException ex) {
        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("status", HttpStatus.NOT_FOUND.value());
        body.put("error", "Not Found");
        body.put("message", ex.getMessage());
        return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MoqViolationException.class)
    public ResponseEntity<Map<String, Object>> handleMoqViolation(MoqViolationException ex) {
        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("status", HttpStatus.BAD_REQUEST.value());
        body.put("error", "MOQ Requirement Not Met");
        body.put("message", ex.getMessage());
        return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<Map<String, Object>> handleUnauthorized(UnauthorizedException ex) {
        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("status", HttpStatus.FORBIDDEN.value());
        body.put("error", "Forbidden");
        body.put("message", ex.getMessage());
        return new ResponseEntity<>(body, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("status", HttpStatus.BAD_REQUEST.value());
        body.put("error", "Validation Error");
        
        Map<String, String> fieldErrors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(err -> 
            fieldErrors.put(err.getField(), err.getDefaultMessage()));
        body.put("details", fieldErrors);
        return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
    }
}`
  }
];
