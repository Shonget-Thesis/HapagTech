# QA Plan  
**Project:** HapagTech – Smart Restaurant Ordering System  
**Course:** CS326 – Software Implementation and Management  

---

## 1. Introduction  
This Quality Assurance (QA) Plan outlines the strategies, processes, and standards used to ensure the quality and reliability of the HapagTech system. It defines testing approaches, defect management procedures, and quality criteria to verify that the system meets both functional and non-functional requirements.

---

## 2. QA Objectives  
The objectives of this QA plan are to:

- Ensure all core functionalities work as intended  
- Detect and resolve defects early through systematic testing  
- Maintain system reliability and performance  
- Validate that the system meets user and business requirements  
- Support continuous improvement through structured defect tracking  

---

## 3. Scope of Testing  

### 3.1 In Scope  
The following components are covered by testing:

- Order creation and processing  
- Menu retrieval and display  
- Cart and total price calculation  
- API response handling  
- Input validation  

### 3.2 Out of Scope  
- Third-party integrations not implemented  
- External payment gateways (if not included in the system)  

---

## 4. Test Levels  

### 4.1 Unit Testing  
Tests individual functions and components in isolation using Jest.  
Example: Cart total calculation, input validation.

### 4.2 Integration Testing  
Tests interaction between modules such as frontend and backend APIs.

### 4.3 System Testing  
Tests the complete system to ensure it meets functional requirements.

---

## 5. Testing Approach  

- Automated testing is used for unit tests via Jest  
- Tests are executed before and after bug fixes  
- Regression testing ensures that new changes do not break existing functionality  
- Intentional defect injection is performed to validate defect detection capability  

---

## 6. Entry and Exit Criteria  

### 6.1 Entry Criteria  
Testing begins when:

- Code is implemented and builds successfully  
- Test environment is properly configured  
- No blocking syntax or runtime errors exist  

### 6.2 Exit Criteria  
Testing is completed when:

- All critical test cases have passed  
- No high-severity defects (S1 or S2) remain open  
- Test results are documented  

---

## 7. Defect Severity Levels  

| Severity | Description |
|---------|------------|
| S1 (Critical) | System crash, data loss, or complete failure |
| S2 (High) | Major feature not working |
| S3 (Medium) | Minor functional issue |
| S4 (Low) | UI or cosmetic issue |

---

## 8. Defect Management Process  

The defect lifecycle follows these steps:

1. **Detection** – Bugs identified through testing  
2. **Logging** – Defects recorded in defect-log.md  
3. **Classification** – Assigned severity level  
4. **Fixing** – Resolved in a separate Git branch  
5. **Verification** – Tests re-run to confirm fix  
6. **Closure** – Defect marked as closed after validation  

---

## 9. Tools and Technologies  

| Tool | Purpose |
|-----|--------|
| Jest | Unit testing framework |
| Git | Version control |
| GitHub | Repository hosting and pull requests |

---

## 10. Test Deliverables  

The following outputs are produced during testing:

- QA Plan document (`qa-plan.md`)  
- Unit test cases and results  
- Defect log (`defect-log.md`)  
- Screenshots of test execution  
- Pull request records for bug fixes  

---

## 11. Conclusion  

The implementation of this QA plan ensures that HapagTech maintains a high standard of quality through structured testing and defect management. By integrating automated testing and Git-based workflows, the team is able to efficiently detect, track, and resolve issues while continuously improving the system.