import React, { useState } from 'react';
import { JAVA_PROJECT_FILES, JavaFileItem } from '../data/javaProjectCode';
import { 
  Code2, 
  Database, 
  BookOpen, 
  Copy, 
  Check, 
  X, 
  FileText, 
  Terminal, 
  Layers, 
  Search,
  ExternalLink,
  Award,
  ChevronRight
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const JavaBackendModal: React.FC<Props> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState<string>('product_entity');
  const [activeTab, setActiveTab] = useState<'code' | 'viva' | 'database' | 'setup'>('code');
  const [copied, setCopied] = useState(false);
  const [search, setSearch] = useState('');

  const selectedFile = JAVA_PROJECT_FILES.find(f => f.id === selectedFileId) || JAVA_PROJECT_FILES[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredFiles = JAVA_PROJECT_FILES.filter(f => 
    f.name.toLowerCase().includes(search.toLowerCase()) || 
    f.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Trigger floating button for easy access during viva / evaluation */}
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2.5 bg-slate-900/95 hover:bg-slate-800 text-slate-100 rounded-full shadow-lg border border-slate-700 font-bold text-xs cursor-pointer transition-all hover:scale-103 backdrop-blur-md"
        >
          <Code2 className="w-4 h-4 text-amber-400" />
          <span>Java Backend Code</span>
          <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[9px] border border-amber-500/40">
            Viva Notes
          </span>
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-6xl h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-600/20 border border-orange-500/40 text-orange-400 flex items-center justify-center font-bold">
                  <Code2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base sm:text-lg font-black text-white">
                      Java Spring Boot Backend & OOP Architecture
                    </h2>
                    <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 text-[10px] font-bold border border-blue-500/30">
                      College Project Engine
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Layered Architecture: Controller → Service → Repository → MySQL Entity
                  </p>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center bg-slate-800 p-1 rounded-lg text-xs font-semibold">
                  <button
                    onClick={() => setActiveTab('code')}
                    className={`px-3 py-1.5 rounded-md transition-colors ${
                      activeTab === 'code' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Java Files ({JAVA_PROJECT_FILES.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('viva')}
                    className={`px-3 py-1.5 rounded-md transition-colors ${
                      activeTab === 'viva' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Viva Q&A
                  </button>
                  <button
                    onClick={() => setActiveTab('database')}
                    className={`px-3 py-1.5 rounded-md transition-colors ${
                      activeTab === 'database' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    MySQL Schema
                  </button>
                  <button
                    onClick={() => setActiveTab('setup')}
                    className={`px-3 py-1.5 rounded-md transition-colors ${
                      activeTab === 'setup' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Run Guide
                  </button>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-hidden">
              {activeTab === 'code' && (
                <div className="grid grid-cols-1 md:grid-cols-12 h-full">
                  {/* Sidebar File Tree */}
                  <div className="md:col-span-4 border-r border-slate-800 p-3 flex flex-col h-full bg-slate-950/60 overflow-hidden">
                    <div className="relative mb-3">
                      <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
                      <input
                        type="text"
                        placeholder="Search Java classes..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-hidden focus:border-blue-500"
                      />
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-1 pr-1 text-xs">
                      {filteredFiles.map((file) => (
                        <button
                          key={file.id}
                          onClick={() => setSelectedFileId(file.id)}
                          className={`w-full text-left p-2 rounded-lg flex items-center justify-between transition-colors ${
                            selectedFileId === file.id
                              ? 'bg-blue-600/20 border border-blue-500/50 text-white font-semibold'
                              : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <FileText className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                            <span className="truncate">{file.name}</span>
                          </div>
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono shrink-0 ${
                            file.category === 'Entity' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                            file.category === 'Service' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                            file.category === 'Controller' ? 'bg-purple-950 text-purple-400 border border-purple-800' :
                            'bg-slate-800 text-slate-400'
                          }`}>
                            {file.category}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Code Viewer Panel */}
                  <div className="md:col-span-8 flex flex-col h-full overflow-hidden bg-slate-900">
                    {/* File Meta Header */}
                    <div className="p-3 border-b border-slate-800 bg-slate-950/40 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-blue-400">{selectedFile.path}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">{selectedFile.description}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        {selectedFile.oopConcepts.map((c, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-medium border border-slate-700">
                            {c}
                          </span>
                        ))}
                        <button
                          onClick={handleCopy}
                          className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors cursor-pointer"
                        >
                          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Syntax Code Container */}
                    <div className="flex-1 overflow-auto p-4 font-mono text-xs text-slate-300 leading-relaxed bg-slate-950 select-text">
                      <pre><code>{selectedFile.content}</code></pre>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: College Viva Prep Questions & Answers */}
              {activeTab === 'viva' && (
                <div className="p-6 overflow-y-auto h-full space-y-6 text-xs text-slate-300 max-w-4xl mx-auto">
                  <div className="bg-blue-950/40 border border-blue-800/60 p-4 rounded-xl">
                    <h3 className="text-sm font-bold text-blue-300 flex items-center gap-2 mb-1">
                      <Award className="w-4 h-4 text-blue-400" />
                      College Project Viva Voce & Technical Defense Guide
                    </h3>
                    <p className="text-slate-400">
                      Standard questions examiners and evaluators ask regarding Object-Oriented Design, Spring Boot architecture, and B2B logic.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 space-y-2">
                      <h4 className="font-bold text-white text-sm">
                        Q1: How are the 4 core OOP concepts implemented in this Spring Boot application?
                      </h4>
                      <div className="space-y-1.5 text-slate-300 leading-relaxed">
                        <p><strong>1. Encapsulation:</strong> All entity fields (e.g. `wholesalePrice`, `minOrderQuantity`, `availableStock`) are `private`. Access is guarded via getters, setters, and business logic methods like `reduceStock(int quantity)` which encapsulate stock integrity checks inside the domain entity.</p>
                        <p><strong>2. Abstraction:</strong> Service interfaces (`ProductService`, `OrderService`) define abstract contracts (`createProduct()`, `placeOrder()`). Controllers only depend on these abstractions, hiding complex transaction logic and JPA operations.</p>
                        <p><strong>3. Inheritance:</strong> We defined a polymorphic base class structure (`BaseEntity` with audit timestamps, and specialized user roles inheriting common attributes).</p>
                        <p><strong>4. Polymorphism:</strong> `ProductServiceImpl` implements `ProductService`. Method overloading is demonstrated for query search filters (`findProducts(String query)` vs `findProducts(CategoryId, PriceRange)`).</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 space-y-2">
                      <h4 className="font-bold text-white text-sm">
                        Q2: What is Minimum Order Quantity (MOQ) and how is it enforced in Java?
                      </h4>
                      <p className="text-slate-300 leading-relaxed">
                        In B2B wholesale, suppliers sell in bulk lots rather than individual units to optimize factory packaging and freight economics. In our backend, whenever an order is submitted to `OrderService.placeOrder()`, the service validates that `orderItem.getQuantity() &gt;= product.getMinOrderQuantity()`. If violated, a custom `MoqViolationException` is thrown and handled by the `@ControllerAdvice` (`GlobalExceptionHandler`) to return HTTP 400 Bad Request with a clear explanation.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 space-y-2">
                      <h4 className="font-bold text-white text-sm">
                        Q3: Why Spring Data JPA instead of standard JDBC?
                      </h4>
                      <p className="text-slate-300 leading-relaxed">
                        Spring Data JPA eliminates boilerplate SQL writing through repository interfaces extending `JpaRepository&lt;T, ID&gt;`. It manages connection pooling via HikariCP, supports automatic transaction rollback using `@Transactional`, provides Object-Relational Mapping with Hibernate, and generates dynamic JPQL queries at runtime without manual SQL string concatenation.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 space-y-2">
                      <h4 className="font-bold text-white text-sm">
                        Q4: How does MySQL handle cascading for Orders and Order Items?
                      </h4>
                      <p className="text-slate-300 leading-relaxed">
                        The `Order` entity defines `@OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)`. When an order is persisted, Hibernate automatically cascades the insert to the `order_items` table in the same ACID database transaction, ensuring consistent financial totals.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: MySQL DDL Schema */}
              {activeTab === 'database' && (
                <div className="p-6 overflow-y-auto h-full font-mono text-xs text-slate-300 bg-slate-950 select-text">
                  <pre><code>{`-- =========================================================================
-- B2B Wholesale Marketplace Database Schema (MySQL 8.0 / InnoDB)
-- Author: College Project Team
-- Database: b2b_wholesale_db
-- =========================================================================

CREATE DATABASE IF NOT EXISTS b2b_wholesale_db
  CHARACTER SET utf8mb4 
  COLLATE utf8mb4_unicode_ci;

USE b2b_wholesale_db;

-- 1. Users Table (Retailers, Suppliers, Admins)
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('RETAILER', 'SUPPLIER', 'ADMIN') NOT NULL,
    company_name VARCHAR(150) NOT NULL,
    tax_id VARCHAR(50),
    phone VARCHAR(30),
    address VARCHAR(255),
    city VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_email (email),
    INDEX idx_user_role (role)
) ENGINE=InnoDB;

-- 2. Categories Table
CREATE TABLE categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 3. Products Table (With Wholesale Price & MOQ constraints)
CREATE TABLE products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    supplier_id BIGINT NOT NULL,
    category_id BIGINT NOT NULL,
    sku VARCHAR(64) NOT NULL UNIQUE,
    name VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    wholesale_price DECIMAL(10,2) NOT NULL,
    retail_msrp DECIMAL(10,2) NOT NULL,
    min_order_quantity INT NOT NULL DEFAULT 10,
    available_stock INT NOT NULL DEFAULT 100,
    unit VARCHAR(30) DEFAULT 'pcs',
    image_url VARCHAR(500),
    status ENUM('ACTIVE', 'OUT_OF_STOCK', 'INACTIVE') DEFAULT 'ACTIVE',
    rating DECIMAL(2,1) DEFAULT 5.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (supplier_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT,
    INDEX idx_prod_supplier (supplier_id),
    INDEX idx_prod_category (category_id),
    INDEX idx_prod_moq (min_order_quantity)
) ENGINE=InnoDB;

-- 4. Orders Table (Commercial Purchase Orders & Net-30 Invoicing)
CREATE TABLE orders (
    id VARCHAR(36) PRIMARY KEY, -- UUID / Custom Order Number (e.g. ORD-2026-8912)
    retailer_id BIGINT NOT NULL,
    status ENUM('PENDING', 'CONFIRMED', 'PROCESSING', 'DISPATCHED', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED') DEFAULT 'PENDING',
    subtotal DECIMAL(12,2) NOT NULL,
    tax_amount DECIMAL(12,2) NOT NULL,
    shipping_fee DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    total_amount DECIMAL(12,2) NOT NULL,
    payment_method ENUM('NET_30', 'BANK_TRANSFER', 'CREDIT_CARD') NOT NULL,
    payment_status ENUM('PAID', 'PENDING_NET30', 'OVERDUE') DEFAULT 'PENDING_NET30',
    carrier VARCHAR(100),
    tracking_number VARCHAR(100),
    shipping_address_json JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (retailer_id) REFERENCES users(id) ON DELETE RESTRICT,
    INDEX idx_order_retailer (retailer_id),
    INDEX idx_order_status (status)
) ENGINE=InnoDB;

-- 5. Order Items Table (Lot Line Items)
CREATE TABLE order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(36) NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    wholesale_price DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(12,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
) ENGINE=InnoDB;`}</code></pre>
                </div>
              )}

              {/* Tab 4: Setup and Run Instructions */}
              {activeTab === 'setup' && (
                <div className="p-6 overflow-y-auto h-full space-y-4 text-xs text-slate-300 max-w-4xl mx-auto leading-relaxed">
                  <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700 space-y-3">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-emerald-400" />
                      How to Run the Java Backend (Step-by-Step for College Viva)
                    </h3>
                    <ol className="list-decimal list-inside space-y-2 text-slate-300">
                      <li><strong>Install Prerequisites:</strong> Java Development Kit (JDK 17 or 21) and MySQL 8.0 Server.</li>
                      <li><strong>Configure Database:</strong> Open MySQL Workbench and execute the script from the <em>MySQL Schema</em> tab.</li>
                      <li><strong>Update Database Credentials:</strong> In `src/main/resources/application.properties`, configure your `spring.datasource.username` and `password`.</li>
                      <li><strong>Build the Maven Project:</strong> Run <code className="bg-slate-900 px-2 py-0.5 rounded text-emerald-400">mvn clean install</code> in the terminal.</li>
                      <li><strong>Start Spring Boot Application:</strong> Run <code className="bg-slate-900 px-2 py-0.5 rounded text-emerald-400">mvn spring-boot:run</code> or run `B2BMarketplaceApplication.java` inside IntelliJ IDEA or Eclipse.</li>
                      <li><strong>Verify REST API:</strong> Open <code className="bg-slate-900 px-2 py-0.5 rounded text-blue-400">http://localhost:8080/api/products</code> to see the JSON response.</li>
                    </ol>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
