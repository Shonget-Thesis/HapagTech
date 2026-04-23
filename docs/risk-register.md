# Risk Register
Project: Kangina – Smart Restaurant Ordering System

---

*Formula: Score = Likelihood × Impact*

| Risk | Likelihood (1–5) | Impact (1–5) | Score | Mitigation | Owner |
|------|-------------------|--------------|-------|------------|-------|
| 1. Server Downtime         | 3 | 5 | 15 | Use cloud backup and monitoring | DevOps |
| 2. Payment Gateway Failure | 3 | 4 | 12 | Add retry logic and secondary payment provider | DevOps |
| 3. Data Breach / Unauthorized Access | 2 | 5 | 10 | Enforce JWT expiry, HTTPS, and regular security audits | DevOps |
| 4. Slow API Response Time | 4 | 4 | 16 | Add database indexing, caching, and performance monitoring | DevOps |
| 5. Frontend-Backend Integration Issues | 3 | 3 | 9 | Define API contracts early and run integration tests each sprint | QA Lead |
| 6. Incorrect Order Processing | 2 | 5 | 10 | Add validation rules and automated order workflow tests | QA Lead |
| 7. Scope Creep | 4 | 3 | 12 | Freeze sprint scope and track changes through backlog grooming | PM |
| 8. Deployment Configuration Errors | 3 | 4 | 12 | Use staging environment and deployment checklist before release | DevOps |
| 9. Tech stack mismatch | 2 | 3 | 6 | Pin dependancy versions; use a lockfile; document setup stepms | DevOps |
| 10. Poor documentation | 3 | 3 | 9 | Set doc standards from day one; require docs as part of the definition of done | Docs Lead |
| 11. Team member unavailability | 3 | 3 | 9 | Cross-train team members; maintain updated task documentation so work can be handed off | PM |
| 12. UI/UX usability issues | 3 | 4 | 12 | Run usability testing with real-users; iterate on prototypes before full build | QA Lead |
| 13. Unclear Requirements | 4 | 4 | 16 | Conduct stakeholder reviews and maintain updated requirement docs | Docs Lead |
| 14. Incomplete Documentation Updates | 3 | 3 | 9 | Regulary review and update documentation after each sprint | Docs Lead |
| 15. Poor Task Coordination | 3 | 4 | 12 | Use sprint meetings and task tracking tools to align team efforts | PM |
| 16. Invalid Cancellation Window Logic | 3 | 4 | 12 | Enforce strict status checks (`Pending` only), and add API/unit tests for status transitions | Backend Lead |
| 17. Order Cancellation Abuse | 2 | 4 | 8 | Add cancellation limits, monitoring, and audit logs for repeated cancellations | PM |
