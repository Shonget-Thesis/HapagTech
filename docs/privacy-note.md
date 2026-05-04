# Privacy Note — HapagTech

**Last Updated:** May 2026  
**Status:** Demo / Non-production  
**Note:** This privacy note describes data handling practices for the HapagTech demo platform. Production deployments must align with applicable privacy laws (GDPR, CCPA, PIPEDA, etc.) and obtain legal review.

---

## Data Collected

### 1. **Account & Profile Data**
- **Full name, email address, phone number** — provided during registration
- **Delivery/billing address** — collected at checkout
- **Profile picture** — optional, uploaded by user
- **Dietary preferences & restrictions** — (e.g., dairy-free, vegan, gluten-free) selected during signup or profile edit
- **Account creation date, last login** — automatically recorded

### 2. **Behavioral & Browsing Data**
- **Product views & favorites** — which items user browses, saves, or marks as favorite
- **Search queries** — what terms user enters in product search
- **Cart contents** — items added/removed (including timestamps)
- **Session ID & device info** — browser type, OS, approximate geolocation (IP-based, not GPS)
- **Click patterns** — interactions with filters, sorting, recommendations

### 3. **Transaction & Order Data**
- **Order history** — items purchased, quantity, price, timestamps
- **Payment method type** — (e.g., "credit card", "PayPal") — NOT full card numbers (handled by payment processor)
- **Order status & tracking** — delivery dates, merchant assigned
- **Reviews & ratings** — if user submits product reviews or ratings
- **Return requests & disputes** — refund/return history

### 4. **Communication Data**
- **Support messages** — emails, chat logs with customer support
- **Opt-in marketing communications** — email subscription status, preferences
- **Newsletters** — frequency and content preferences

---

## Why We Collect This Data (Purpose & Legal Basis)

| Data Category | Purpose | Legal Basis |
|---|---|---|
| Account & Profile | Service provision, order fulfillment, identity verification | Contract performance, consent |
| Delivery/Billing Address | Shipping, invoicing, fraud prevention | Contract performance, legal obligation |
| Dietary Preferences | Personalize product recommendations, filter search results, improve UX | Consent, legitimate interest (service quality) |
| Behavioral & Browsing | Improve product ranking, detect trends, personalize recommendations, analytics | Legitimate interest, consent (cookies) |
| Transaction Data | Order fulfillment, payment reconciliation, customer support, dispute resolution | Contract performance, legal obligation |
| Payment Info | Payment processing (routed to third-party processor) | Contract performance, legal obligation |
| Support Messages | Resolve customer issues, improve service, audit trail | Contract performance, consent |
| Marketing Communications | Send promotional offers, product announcements (if user opted in) | Consent, consent withdrawal at any time |

---

## Data Retention

| Data Type | Retention Period | Reason for Retention |
|---|---|---|
| **Active Account Data** (name, email, address, preferences) | Duration of account + 90 days after deletion | Regulatory compliance (invoicing), fraud prevention |
| **Order History** | 7 years | Legal/tax obligations (e-commerce records, accounting) |
| **Payment Records** | 7 years | PCI-DSS compliance, dispute resolution |
| **Behavioral/Browsing Logs** | 90 days | Analytics, security, performance optimization |
| **Session Data** | 24 hours | Session management, fraud detection |
| **Support Tickets & Messages** | 2 years | Audit trail, dispute resolution |
| **Marketing Emails (if opted in) | Until user unsubscribes | Compliance with CAN-SPAM / GDPR consent |
| **Deleted Account Data** | Purged within 90 days | Legal hold exceptions noted |

---

## How We Use Your Data

- **Service Delivery:** Process orders, manage payments, arrange delivery
- **Personalization:** Recommend products based on dietary restrictions and browsing history
- **Communication:** Send order confirmations, shipping updates, support responses, and (if opted in) marketing emails
- **Analytics & Improvement:** Aggregate, anonymized analysis to improve search, recommendations, and platform performance
- **Fraud & Security:** Detect suspicious activity, prevent account takeover, enforce terms of service
- **Legal Compliance:** Tax reporting, dispute resolution, regulatory inquiries

---

## Data Sharing & Third Parties

We share your data **only** with:
- **Payment Processors** (Stripe, PayPal, etc.) — payment info only
- **Delivery Partners** — name, address, phone for order fulfillment
- **Merchant/Supplier Partners** — order details necessary for fulfillment (your name, address, items purchased)
- **Analytics Providers** — aggregated, anonymized usage data only (no PII)
- **Customer Support Tools** — ticket/message data (encrypted in transit)
- **Legal/Law Enforcement** — only when required by law, with transparency

**We do NOT:**
- Sell your personal data to third parties
- Share dietary or health preferences with advertisers or data brokers
- Use your data for purposes beyond what you've consented to

---

## Your Rights

### **In All Jurisdictions:**
1. **Access:** Request a copy of your personal data via the account settings "Download My Data" feature or contacting privacy@hapagtech.demo
2. **Correction:** Update your profile information directly in account settings; contact support for corrections you cannot make yourself
3. **Deletion:** Request account deletion via account settings or email. Data will be anonymized/purged within 90 days (legal holds excepted)
4. **Withdraw Consent:** Unsubscribe from marketing emails at any time (link in every email or via preferences)

### **In GDPR/PIPEDA Jurisdictions (EU, Canada, etc.):**
5. **Data Portability:** Request your data in machine-readable format (CSV, JSON)
6. **Object:** Object to processing for marketing or profiling purposes
7. **Restrict Processing:** Request that we limit use to storage only during a dispute
8. **Lodge a Complaint:** File a complaint with your data protection authority (e.g., ICO in UK, CNIL in France)

### **In CCPA Jurisdictions (California, etc.):**
9. **Right to Know:** Request what personal information we collect, use, and share
10. **Right to Delete:** Request deletion of collected personal information (with legal exceptions)
11. **Right to Opt-Out:** Opt out of "sale" or "sharing" of personal information for cross-context behavioral advertising (we do not enable this by default)
12. **Non-Discrimination:** We do not discriminate against you for exercising CCPA rights

### **How to Exercise Your Rights:**
- **Email:** privacy@hapagtech.demo
- **In-App:** Account Settings → Privacy & Data
- **Requests:** We aim to respond within 30 days (up to 90 days for complex requests)
- **Verification:** We may ask for identity verification before fulfilling requests

---

## Security Measures

- **Encryption:** All data in transit uses TLS 1.3; sensitive data at rest is encrypted
- **Access Controls:** Only authorized staff with need-to-know access can view personal data
- **Authentication:** Password hashing (bcrypt), optional MFA for account protection
- **Audit Logging:** All access to sensitive data is logged for compliance audits
- **Incident Response:** In the event of a breach, we will notify affected users within 72 hours (where legally required)

---

## Cookies & Tracking

- **Session Cookies:** Essential for login and cart functionality (no user consent required)
- **Analytics Cookies:** Optional; track usage patterns to improve UX (consent required via banner)
- **Marketing Cookies:** Optional; enable personalized ads if you've consented (can disable in preferences)
- **Third-Party Cookies:** Our payment and analytics partners may set cookies; review their privacy policies

Users can disable non-essential cookies in browser settings or account preferences.

---

## Children's Privacy

HapagTech is not directed to children under 13 (or applicable age of digital consent in your jurisdiction). We do not knowingly collect data from children under 13. If we become aware of such collection, we will delete the data and close the account. Parents/guardians concerned about a child's account should contact privacy@hapagtech.demo.

---

## International Data Transfers

If you are outside the region where HapagTech servers are located, your data may be transferred internationally. By using HapagTech, you consent to such transfers. We rely on Standard Contractual Clauses (SCCs) or adequacy decisions to ensure your data is protected to similar standards.

---

## Policy Changes

We may update this privacy note to reflect new features, regulations, or practices. Changes will be effective 30 days after posting to this page. Continued use of HapagTech after changes constitute acceptance.

---

## Contact

For privacy questions, requests, or complaints:

**Email:** privacy@hapagtech.demo  
**Mailing Address:** HapagTech, Privacy Team, [Demo Address], [City], [Country]  
**Response Time:** 30 days for standard requests; 90 days for complex requests  
**Data Protection Officer (DPO):** dpo@hapagtech.demo (EU/regulated entities)

---

**Demo Disclaimer:**  
This is a demonstration platform. Production deployments must conduct a formal privacy impact assessment (PIA/DPIA), obtain legal review, and align with applicable laws (GDPR, CCPA, PIPEDA, LGPD, etc.). This note is provided for educational purposes and must be tailored to your jurisdiction and specific practices before launch.
