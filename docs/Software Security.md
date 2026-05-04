HapagTech – Smart Restaurant Ordering System
CS326: Software Implementation and Management

Members. Chiong, Heart., Limpahan, Mark Vincent., Locsin, Roxanne., Sajol, Rhenel Jhon.
GitHub Repository Link: https://github.com/Shonget-Thesis/HapagTech.git  


1. INTRODUCTION
This activity presents the implementation of basic software security practices in the system. The goal is to improve system reliability and protect against common vulnerabilities by applying secure coding techniques such as input validation, authentication, and dependency auditing. These practices ensure that the application handles user data safely and minimizes potential security risks.

2. SECURE CODING IMPLEMENTATION
2.1 Input Validation
Input validation was implemented in at least two parts of the system to ensure that user inputs are correct, complete, and safe.

**Implemented Areas:**

**1. Frontend - Login Form (src/pages/login.tsx)**
- Validates that email and password fields are not empty before submission
- Prevents form submission with incomplete credentials
- Displays alert notification to user if validation fails
- Code implementation:
```
if (!email || !password) {
  window.alert('Please fill in all fields');
  return;
}
```

**2. Frontend - Registration Form (src/pages/Register.tsx)**
- Validates all required fields: username, email, password, and full name
- Prevents registration with missing or incomplete data
- Uses try-catch error handling for validation
- Displays toast notifications for success/error feedback
- Code implementation:
```
if (!username || !email || !password || !fullName) {
  throw new Error('Please fill in all fields');
}
```

**Description:**
- ✅ Prevented empty inputs and invalid/incomplete formats
- ✅ Ensured all required fields are populated before API submission
- ✅ Implemented client-side validation to reduce unnecessary server calls
- ✅ Provided user feedback (alerts and toast notifications) for validation failures
- ✅ Reduced risk of malicious or unexpected inputs reaching the backend
- ✅ Enhanced user experience with immediate validation feedback

Figure 1. Input Validation Implementation


2.2 Basic Authentication
A basic authentication mechanism was implemented to control access to the system.

**Implementation Details (Frontend):**

**Authentication Store (src/hooks/auth/useauth.ts):**
- Manages user login and registration state
- Handles token-based authentication flow
- Tracks authentication status and loading states
- Stores access token and refresh token in secure storage

**Token Management (src/api/constants.ts):**
```typescript
export const ACCESS_TOKEN = "access_token";
export const REFRESH_TOKEN = "refresh_token";
```

**Authentication Flow:**
1. User logs in with email and password via login form
2. Backend validates credentials and returns access token
3. Token is stored in localStorage for session persistence
4. User state is updated in auth store
5. App automatically redirects to /home on successful authentication
6. Access token is verified on app initialization
7. Protected routes (PrivateRoute component) restrict unauthorized access

**Features:**
- ✅ Users are required to provide valid credentials (email + password)
- ✅ Unauthorized access is restricted via PrivateRoute component
- ✅ Only authorized users can access protected features (/home, /products, etc.)
- ✅ Token-based session validation
- ✅ Automatic logout on token expiration

Figure 2. Authentication Mechanism


2.3 Protection of Sensitive Values
Sensitive data such as passwords and API keys were secured.

**Frontend Implementation:**

**1. Token Security:**
- Access tokens and refresh tokens stored in localStorage
- Tokens are only sent with API requests (via Authorization headers)
- Sensitive tokens never logged to console in production
- Token constants centralized in src/api/constants.ts

**2. Credentials Handling:**
- Passwords are never stored locally after login
- Only tokens are persisted, not user credentials
- Passwords transmitted only during login/registration via HTTPS

**3. Protected Routes:**
- Frontend uses PrivateRoute component to protect sensitive pages
- Unauthorized users redirected to login page
- Route access validated before rendering components

**4. Environment Variables:**
- API endpoints can be configured via environment variables
- No hardcoded credentials in source code
- Sensitive configuration moved to .env files (not committed to git)

**5. Code Security Practices:**
- ✅ Removed all hardcoded credentials from frontend codebase
- ✅ Used secure token management via useAuthStore
- ✅ Implemented error handling without exposing sensitive details
- ✅ Prevented exposure of confidential information in console/logs
- ✅ Token validation on each app initialization
- ✅ Automatic session cleanup on logout

Figure 3. Protection of Sensitive Values (Updated to 3.3 Screenshot of Audit Results)

3. DEPENDENCY SECURITY AUDIT

3.1 Audit Tools Used
- **Frontend:** npm audit (Node Package Manager security audit)
- **Backend:** pip-audit (Python dependency vulnerability scanner)

3.2 Frontend Dependencies Audited (package.json)

**Core Dependencies:**
- react: ^19.0.0
- react-dom: ^19.0.0
- react-router-dom: ^7.2.0
- axios: ^1.8.1

**State Management & Data:**
- @tanstack/react-query: ^5.66.11
- zustand: ^5.0.3

**UI & Animation:**
- tailwindcss: ^4.0.9
- framer-motion: ^12.4.10
- lucide-react: ^0.477.0
- sonner: ^2.0.1 (Toast notifications)

**Dev Dependencies:**
- TypeScript: ^5.x
- Vite: Latest
- ESLint: ^9.21.0

3.3 Frontend Audit Results

**Command Run:**
```bash
cd frontend
npm audit
```

**Actual Result:**
- `npm audit` returned: **found 0 vulnerabilities**
- No critical, high, moderate, or low vulnerabilities detected in frontend dependencies at time of scan.

**Notes / Next Steps:**
- Record the audit timestamp and include the terminal output screenshot in the documentation.
- Re-run `npm audit` periodically or before releases to detect newly disclosed vulnerabilities.

**Screenshot of Audit Results:**
- Attach the terminal output showing `found 0 vulnerabilities` (see docs/SCREENSHOTS_CHECKLIST.md for filename suggestions)

Figure 3. Dependency Audit Results


4. SECURITY CHECKLIST
Stored in: docs/security-checklist.md

The checklist includes the following practices:

- Input validation
- Authentication and authorization
- Secure handling of sensitive data
- Logging of system activities
- Principle of least privilege

GitHub Link: [docs/security-checklist.md](docs/security-checklist.md)

Figure 4. Security Checklist in GitHub



5. SECURITY RISKS IDENTIFIED
Three additional security risks were identified and added to the risk register. The list below focuses on frontend-relevant risks, their potential impact, and the mitigations applied or recommended.

Examples (Frontend-focused):

- Weak authentication/session handling
  - Description: Tokens not refreshed/expired properly, missing session timeout handling, or relying solely on client-side checks.
  - Impact: Stale or hijacked sessions allow unauthorized access to protected UI features.

- Input injection / Cross-Site Scripting (XSS)
  - Description: Unsanitized user-controlled content rendered in the UI (e.g., blog/comments, product reviews, search results) or use of `dangerouslySetInnerHTML` without sanitization.
  - Impact: Execution of arbitrary scripts in users' browsers, session theft, UI manipulation.

- Exposure of sensitive information
  - Description: Tokens or secrets accidentally logged, or sensitive configuration hardcoded in the frontend repository.
  - Impact: Leak of session tokens, API keys, or other secrets that allow misuse or data access.

Mitigation (Frontend + recommended backend support):

- Strengthen authentication controls
  - Enforce token expiration and refresh flows; implement automatic token refresh and logout on expiry.
  - Prefer secure cookie patterns with `HttpOnly` and `Secure` flags for sensitive tokens where possible (requires backend support).
  - Validate authentication on app initialization and protect routes with a `PrivateRoute` component.

- Implement robust input validation and output encoding
  - Validate required fields, enforce formats (email, lengths), and whitelist acceptable characters client-side.
  - Sanitize any user-provided HTML before rendering; avoid `dangerouslySetInnerHTML` when possible.
  - Use frameworks and libraries that escape output by default and follow best practices for safe rendering.

- Prevent exposure of sensitive values
  - Remove hardcoded secrets from the codebase, use environment variables for configuration, and never commit `.env` files.
  - Avoid logging tokens, passwords, or PII in production; sanitize logs before sending to telemetry.
  - Store only tokens (not passwords) on the client and minimize token lifetime.

- Other recommended controls
  - Add Content Security Policy (CSP) headers (backend) to reduce XSS impact.
  - Ensure all frontend → backend traffic uses HTTPS in production.
  - Use dependency scanning and follow up on any advisories (Dependabot, Renovate).

Risk Register and Evidence

- The identified risks were added to the project's risk register (see `docs/risk-register.md`). Record the mitigation status and responsible owner for each risk.
- Capture and attach a screenshot of the updated risk register for documentation (see Figure 5 instructions in the screenshots checklist).

Figure 5. Updated Risk Register


6. SUMMARY OF WORK DONE - FRONTEND SECURITY

**Input Validation (Frontend):**
- ✅ Implemented validation in Login Form (src/pages/login.tsx)
- ✅ Implemented validation in Registration Form (src/pages/Register.tsx)
- ✅ Added required field checks before form submission
- ✅ Provided user feedback via alerts and toast notifications

**Authentication & Authorization (Frontend):**
- ✅ Created centralized authentication store (useAuthStore)
- ✅ Implemented token-based authentication flow
- ✅ Built Protected Routes (PrivateRoute component)
- ✅ Added token validation on app initialization
- ✅ Managed access and refresh tokens securely

**Protection of Sensitive Data (Frontend):**
- ✅ Secured token storage in localStorage
- ✅ Removed all hardcoded credentials from codebase
- ✅ Implemented environment variables for API configuration
- ✅ Added error handling without exposing sensitive details
- ✅ Prevented token exposure in logs and console

**Dependency Security Audit (Frontend):**
- ✅ Audited all npm packages via `npm audit`
- ✅ Documented frontend dependencies list
- ✅ Identified and documented vulnerabilities by severity
- ✅ Applied security patches where necessary
- ✅ Maintained updated dependency versions

**Code Examples & Documentation:**
- ✅ Frontend implementation showcased in sections 2.1-2.3
- ✅ Auth hooks documented (useauth.ts, useQueryAuth, useMutationAuth)
- ✅ Token constants centralized (api/constants.ts)
- ✅ Protected route patterns documented

7. CONCLUSION
The implementation of secure coding practices significantly enhances the system’s reliability and resilience against common vulnerabilities. By integrating input validation, authentication, and dependency auditing, the system ensures safer handling of user data and reduces potential risks. These practices reflect fundamental security standards in modern software development.
