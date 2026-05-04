# Frontend Security Screenshots - Checklist

## Required Screenshots for Software Security.md Documentation

### **Figure 1: Input Validation Implementation**

**Screenshot 1A - Login Form Empty Validation:**
1. Start the frontend dev server: `npm run dev` (in frontend directory)
2. Navigate to `http://localhost:5173/login`
3. Leave email and password fields empty
4. Click the Login button
5. **Screenshot:** Capture the alert showing "Please fill in all fields"
6. **File name:** `figure1a-login-empty-validation.png`

**Screenshot 1B - Register Form Empty Validation:**
1. Navigate to `http://localhost:5173/register`
2. Leave all fields empty (username, email, password, full name)
3. Click the Register button
4. **Screenshot:** Capture the error message showing validation failed
5. **File name:** `figure1b-register-empty-validation.png`

**Screenshot 1C - Successful Form Population:**
1. Fill in all Login form fields with valid data
2. **Screenshot:** Show populated form fields ready for submission
3. **File name:** `figure1c-login-form-filled.png`

---

### **Figure 2: Authentication Mechanism**

**Screenshot 2A - Login Page:**
1. Navigate to `http://localhost:5173/login`
2. **Screenshot:** Full login page with form fields (email, password, login button)
3. **File name:** `figure2a-login-page.png`

**Screenshot 2B - Authentication Success & Redirect:**
1. Enter valid test credentials
2. Click Login button
3. **Screenshot:** Capture the redirect to `/home` page (shows authentication worked)
4. **File name:** `figure2b-authenticated-home-page.png`

**Screenshot 2C - Browser DevTools - Token Storage:**
1. Open DevTools (F12 or right-click → Inspect)
2. Go to **Storage → LocalStorage → http://localhost:5173**
3. **Screenshot:** Show the `access_token` key and its value in localStorage
4. **File name:** `figure2c-token-in-localstorage.png`

**Screenshot 2D - Protected Route (Without Authentication):**
1. Clear localStorage (DevTools → Storage → Clear All)
2. Navigate directly to `http://localhost:5173/home`
3. **Screenshot:** Should redirect back to `/login` (showing protection works)
4. **File name:** `figure2d-protected-route-redirect.png`

---

### **Figure 3: Dependency Audit Results**

**Screenshot 3A - Frontend npm audit:**
1. Open terminal in VS Code or system terminal
2. Navigate to `/workspaces/HapagTech/frontend`
3. Run: `npm audit`
4. **Screenshot:** Full npm audit output showing:
   - Packages scanned
   - Vulnerabilities count
   - Severity breakdown (Critical, High, Moderate, Low)
   - Recommended actions
5. **File name:** `figure3a-npm-audit-results.png`

**Screenshot 3B - npm audit --json (Optional - Structured Data):**
1. Run: `npm audit --json > audit-report.json`
2. Open the JSON file to see structured audit data
3. **Screenshot:** Show the JSON output with vulnerability details
4. **File name:** `figure3b-npm-audit-json.png`

**Screenshot 3C - npm outdated (Dependency Versions):**
1. Run: `npm outdated`
2. **Screenshot:** Shows current vs available package versions
3. **File name:** `figure3c-npm-outdated.png`

---

## Image Upload Instructions

Once you have all screenshots:

1. **Create a folder** in `/workspaces/HapagTech/docs` called `security-images/`
2. **Place all screenshots** in that folder
3. **Update** Software Security.md to reference the images using markdown syntax:

```markdown
![Input Validation - Login Form](./security-images/figure1a-login-empty-validation.png)

![Authentication - Token in LocalStorage](./security-images/figure2c-token-in-localstorage.png)

![Dependency Audit Results](./security-images/figure3a-npm-audit-results.png)
```

---

## Summary Checklist

- [ ] Figure 1A - Login form with empty field validation error
- [ ] Figure 1B - Register form with empty field validation error  
- [ ] Figure 1C - Login form with valid data populated
- [ ] Figure 2A - Login page overview
- [ ] Figure 2B - Authenticated user at /home
- [ ] Figure 2C - Access token visible in LocalStorage
- [ ] Figure 2D - Protected route redirect (no auth)
- [ ] Figure 3A - npm audit results (terminal output)
- [ ] Figure 3B - npm audit JSON output (optional)
- [ ] Figure 3C - npm outdated results (optional)

---

### **Figure 5: Updated Risk Register**

**Screenshot 5A - Risk Register (GitHub / docs view):**
1. Open the repository on GitHub (or the local `docs/risk-register.md` file in the workspace).
2. Show the updated entry items for the three identified risks and their mitigations.
3. **Screenshot:** Capture the risk register section showing risk descriptions and mitigation status.
4. **File name:** `figure5a-updated-risk-register.png`

**Notes:**
- Link the screenshot into `Software Security.md` near Figure 5.
- If the project uses a separate risk register tool, capture the equivalent view and include the link in the docs.

### Audit result note

- The frontend audit was run and the result was: `found 0 vulnerabilities`.
- Still capture the `npm audit` terminal output (file: `figure3a-npm-audit-results.png`) and include it in the docs for verification.

---

## Quick Start Commands

```bash
# Start frontend dev server
cd /workspaces/HapagTech/frontend
npm run dev

# In new terminal - Run npm audit
cd /workspaces/HapagTech/frontend
npm audit

# Check outdated packages
npm outdated

# Generate JSON audit report
npm audit --json > audit-report.json
```

---

## Notes
- All figures should show **FRONTEND ONLY** implementation
- Focus on user-facing security features
- Include code snippets where helpful
- Timestamp each screenshot for documentation purposes
