# Frontend Security Checklist

Stored in: docs/security-checklist.md

Purpose: concise, actionable checklist for frontend security practices to include in the project documentation and GitHub.

---

## Mandatory Items (verify & document)

- [ / ] Input validation
  - Client-side checks for required fields, email formats, length, and allowed characters.
  - Validate before API requests to reduce server load and prevent simple malformed input.

- [ / ] Authentication and authorization
  - Use token-based auth in `localStorage` or secure cookie patterns (document choice).
  - Ensure protected routes (PrivateRoute) and role checks are enforced in the UI.

- [ / ] Secure handling of sensitive data
  - Never hardcode secrets or API keys in the frontend.
  - Use environment variables for configurable endpoints and keys; do not commit `.env` files.
  - Do not log tokens or passwords in production.

- [ / ] Logging of system activities (frontend-focused)
  - Log important user actions (login, logout, critical failures) to client-side telemetry (only non-sensitive data).
  - Ensure logs do not contain tokens, passwords, or PII.

- [ / ] Principle of least privilege
  - UI should not show controls or navigation items the current user is not authorized to use.
  - Enforce checks server-side as well (document frontend gating as UX-only controls).

---

## Additional Frontend Practices

- [ / ] CSRF and XSS mitigations
  - Use safe rendering (avoid dangerouslySetInnerHTML) and escape user content.
  - Use appropriate Content-Security-Policy headers (document expectation for backend to set headers).

- [ / ] Secure transport
  - Ensure the app communicates only over HTTPS in production.

- [ / ] Dependency management
  - Run `npm audit` regularly and include audit results in the repo documentation.
  - Enable Dependabot or Renovate to keep dependencies up to date.

- [ / ] Error handling and user feedback
  - Provide user-friendly error messages without leaking sensitive info.
  - Use centralized error boundaries and logging integration.

- [ / ] Session management
  - Handle token refresh flows and remove tokens on logout.
  - Expire sessions gracefully and require re-authentication where appropriate.

- [ / ] CI checks
  - Add `npm audit` (or `npm ci && npm audit --audit-level=moderate`) to CI pipelines.
  - Fail the build for critical/high vulnerabilities.

---

## Ownership & cadence

- Owner: DevOps Lead **Name:** Sajol, Rhenel Jhon R.
- Cadence: run checklist verification and `npm audit` before each release and at least monthly.

---

End of checklist.
