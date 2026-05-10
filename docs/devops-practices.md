# DevOps Practices & Cloud Infrastructure

## 1. Overview
This document outlines the DevOps practices, infrastructure setup, and cloud deployment strategies for the HapagTech Smart Restaurant Ordering System.

---

## 2. Infrastructure Overview

### 2.1 Cloud Platforms
- **Frontend**: Deployed on Vercel (serverless platform)
- **Backend**: Deployed on Vercel (Python serverless)
- **Database**: PostgreSQL (Railway or AWS RDS)
- **Caching**: Redis (Railway)
- **CDN**: Cloudinary (image and media delivery)
- **Email Service**: Resend

### 2.2 Technology Stack
- **Frontend**: React + TypeScript, Vite
- **Backend**: Django + Python 3.11
- **Version Control**: GitHub
- **Container Orchestration**: N/A (serverless deployment)
- **Monitoring**: Sentry, UptimeRobot

---

## 3. Continuous Integration (CI) Pipeline

### 3.1 Workflow Trigger
- All pushes to `main` branch
- Manual trigger via `workflow_dispatch`
- Concurrent runs are automatically cancelled to prevent conflicts

### 3.2 CI Steps

#### Backend Testing
- **Trigger**: Every push to main
- **Environment**: Ubuntu 24.04 latest
- **Python Version**: 3.11
- **Steps**:
  1. Checkout repository
  2. Set up Python environment
  3. Install dependencies from `requirements.txt`
  4. Run Django test suite with SQLite database
  5. Environment variables: `DATABASE_URL`, Cloudinary credentials

#### Frontend Build
- **Trigger**: Every push to main
- **Node Version**: 20.x LTS
- **Steps**:
  1. Checkout repository
  2. Set up Node.js with npm caching
  3. Install dependencies via `npm ci`
  4. Build frontend with `npm run build` (Vite)
  5. Cache optimization for faster subsequent builds

---

## 4. DevOps Documentation

### 4.1 DevOps Practices Documentation
Stored in: `docs/devops-practices.md`

### 4.2 Key Practices Implemented

#### Automation
- **CI/CD Pipeline**: Automated testing and deployment on every push
- **Dependency Management**: npm cache and pip dependency resolution
- **Testing**: Automated unit tests on backend (Django)
- **Linting & Security**: GitHub branch protection + PR review requirements

#### Collaboration
- **Feature Branching**: Developers work on feature branches before merging to main
- **Pull Request (PR) Workflow**: 
  - All changes require PR review before merge
  - Automated PR code review via GitHub Copilot
  - Status checks must pass before merge
  - Branch protection rules enforced

#### Monitoring
- **Logs**: GitHub Actions logs for CI/CD pipeline visibility
- **Error Tracking**: Sentry for runtime error detection
- **System Observation**: UptimeRobot for production uptime monitoring
- **Performance Metrics**: Response time tracking (target: ≤300ms)

#### Feedback Loop
- **Continuous Improvement**: Test results inform development priorities
- **Metrics Tracking**: KPI monitoring across defect rate, deployment frequency, response time
- **Automated Rollback**: Failed deployments prevent propagation to production
- **Incident Response**: Sentry alerts notify team of production issues

---

## 5. Cloud / DevOps Improvements

### 5.1 Improvement Implemented
**CI/CD Pipeline Optimization**

### 5.2 Description

#### What Was Added:
1. **Automated Testing on Every Push**
   - Django backend tests run automatically on main branch pushes
   - Frontend builds are validated before deployment
   - Parallel job execution (Backend Tests + Frontend Build run simultaneously)

2. **Deployment Automation**
   - Frontend deployed to Vercel on passing CI
   - Backend deployed to Vercel on passing CI
   - Smoke tests validate production endpoints after deployment
   - Automatic rollback on deployment failure (prevents broken code reaching production)

3. **Serverless Architecture**
   - Functions scale automatically based on demand
   - No infrastructure management overhead
   - Auto-scaling reduces operational complexity

4. **GitHub Actions Workflow**
   - Defined in `.github/workflows/deploy.yml`
   - Concurrency control prevents duplicate deployments
   - Environment-specific secrets management (VERCEL_TOKEN, database credentials)

#### Why This Approach:
- **Faster Feedback Loop**: Developers know within 1-2 minutes if code breaks
- **Reduced Manual Errors**: Automation eliminates manual deployment steps
- **Consistent Environments**: Serverless deployment ensures dev/staging/prod parity
- **Scalability**: Auto-scaling handles traffic spikes without manual intervention
- **Cost Efficiency**: Pay only for compute used (serverless model)
- **Security**: Secrets stored securely in GitHub; no credentials in code

### 5.3 Impact

#### Improved System Reliability
- ✅ Automated tests catch bugs before production
- ✅ Smoke tests validate endpoints post-deployment
- ✅ Rollback capability prevents broken releases
- ✅ Current system availability: **95% uptime** (target: ≥99%)

#### Faster Deployment
- ✅ CI/CD reduces deployment time from ~15 min (manual) to ~2 min (automated)
- ✅ Parallel job execution (backend + frontend tests simultaneously)
- ✅ Zero-downtime deployments via Vercel
- ✅ Average deployment frequency: **2 deployments/week** (target: 3–5/week)

#### Better Scalability
- ✅ Serverless auto-scaling handles 40% more orders with same staff (per cost-benefit analysis)
- ✅ Horizontal scaling: Vercel functions scale across multiple regions
- ✅ Database auto-scaling via Railway managed PostgreSQL
- ✅ Redis caching reduces database load and improves response time

---

## 6. Monitoring & Observability

### 6.1 Monitoring Stack
| Tool | Purpose | Action |
|------|---------|--------|
| **Sentry** | Error tracking & alerting | Real-time notification of production errors |
| **UptimeRobot** | Uptime monitoring | Alerts on downtime or slow response (>10s) |
| **GitHub Actions** | CI/CD visibility | Build logs, test results, deployment status |
| **Vercel Analytics** | Performance metrics | Response time, function duration, cold starts |

### 6.2 Key Metrics Tracked
- **Response Time**: Target ≤300ms (current: 500ms)
- **System Availability**: Target ≥99% uptime (current: 95%)
- **Deployment Frequency**: Target 3–5/week (current: 2/week)
- **Defect Rate**: Target ≤1 bug/sprint (current: 3 bugs/sprint)

### 6.3 Alerting Strategy
- **Critical Alerts**: System down, database connection failed
- **Warning Alerts**: Response time > 500ms, error rate > 5%
- **Info Alerts**: Deployment completed, daily metrics summary

---

## 7. Security Practices

### 7.1 Access Control
- Branch protection on `main` branch
- PR reviews required before merge
- GitHub admin enforcement of status checks

### 7.2 Secret Management
- GitHub Secrets for API keys and tokens:
  - `VERCEL_TOKEN`: Vercel deployment authentication
  - `VERCEL_ORG_ID`: Vercel organization identifier
  - `VERCEL_BACKEND_PROJECT_ID`: Backend project reference
  - `VERCEL_FRONTEND_PROJECT_ID`: Frontend project reference
  - Database credentials stored in Railway environment variables

### 7.3 Deployment Security
- HTTPS enforced on all Vercel deployments
- Environment-specific variables prevent config leaks
- Smoke tests validate HTTPS and API security

---

## 8. Disaster Recovery & Business Continuity

### 8.1 Backup Strategy
- **Code**: GitHub (distributed version control)
- **Database**: Automated daily backups via Railway
- **Images/Media**: Cloudinary (redundant CDN storage)

### 8.2 Rollback Procedure
1. Failed CI/CD blocks production deployment automatically
2. Manual rollback: `git revert <commit>` → push to main → redeploy
3. RTO (Recovery Time Objective): ~2 minutes via automated CI/CD
4. RPO (Recovery Point Objective): ~5 minutes (last successful backup)

### 8.3 High Availability
- **Frontend**: Vercel global CDN (99.9% SLA)
- **Backend**: Vercel serverless (auto-scaling, multi-region capable)
- **Database**: PostgreSQL with automatic failover via Railway
- **Load Balancing**: Vercel edge network distributes requests

---

## 9. Cost Optimization

### 9.1 Infrastructure Costs
- **Vercel**: ~₱1,200/month (frontend) + ₱3,000/month (backend)
- **Railway**: ~₱5,700/month (PostgreSQL + Redis)
- **Cloudinary**: ~₱1,500/month (CDN)
- **Monitoring**: ~₱900/month (Sentry + UptimeRobot)
- **Total Monthly**: ~₱12,300 (see cost-benefit.md for full breakdown)

### 9.2 Cost Reduction Strategies
- Serverless reduces need for dedicated servers
- Auto-scaling ensures no overprovisioning
- Caching via Redis reduces database load
- CDN reduces bandwidth costs (Cloudinary)

---

## 10. Future Improvements

### 10.1 Short Term (Q2-Q3 2026)
- [ ] Implement containerization (Docker) for local development parity
- [ ] Add staging environment for pre-production testing
- [ ] Increase automated test coverage to >80%
- [ ] Reduce response time from 500ms to ≤300ms

### 10.2 Medium Term (Q4 2026 - Q1 2027)
- [ ] Kubernetes orchestration for multi-region deployment
- [ ] Database replication for high availability
- [ ] Advanced monitoring (Datadog/New Relic)
- [ ] Automated performance testing (load testing)

### 10.3 Long Term (2027+)
- [ ] Multi-region active-active deployment
- [ ] Zero RTO disaster recovery (geo-redundancy)
- [ ] AI-powered anomaly detection
- [ ] Serverless edge computing at regional CDN nodes

---

## 11. Team Responsibilities

### 11.1 DevOps Lead (Rhenel Jhon Sajol)
- Monitor CI/CD pipeline health
- Manage Vercel deployments
- Database and infrastructure administration
- Incident response and escalation

### 11.2 Backend & Frontend Leads
- Maintain test coverage
- Code quality standards
- PR review participation

### 11.3 QA Lead (Mark Vincent Limpahan)
- Smoke test execution
- Performance baseline verification
- Production monitoring

---

## 12. References

- **Deployment Workflow**: [.github/workflows/deploy.yml](.github/workflows/deploy.yml)
- **Cost Analysis**: [docs/cost-benefit.md](docs/cost-benefit.md)
- **KPI Tracking**: [docs/kpis.md](docs/kpis.md)
- **Monitoring Evidence**: [docs/monitoring.md](docs/monitoring.md)
- **Security Checklist**: [docs/security-checklist.md](docs/security-checklist.md)

**Last Updated**: May 2026  
**Prepared By**: HapagTech DevOps Team
