# HapagTech Deployment Plan

## 1. Overview
This document defines the deployment process for HapagTech, including environment targets, rollout flow, and rollback procedures.

Project: HapagTech - Smart Restaurant Ordering System  
Course: CS326 - Software Implementation and Management  
Repository: https://github.com/Shonget-Thesis/HapagTech.git

## 2. Target Environment
HapagTech is deployed using the following production stack:

- Frontend: Vercel
- Backend: Vercel
- Database: Supabase

## 3. Deployment Strategy
### Strategy Selected
Rolling Deployment through Vercel Continuous Deployment.

### Implementation
- Every push to the `main` branch triggers an automated build and deployment.
- Build validation is performed before release goes live.
- The approach supports near zero-downtime deployment.
- If an issue appears, rollback to the last successful deployment can be done immediately in Vercel.

## 4. Rollout Steps
1. Confirm changes are merged into `main`.
2. Verify required environment variables are set in Vercel and Supabase.
3. Trigger deployment through Git push to `main`.
4. Monitor Vercel build logs for frontend and backend.
5. Run smoke checks on the live app:
   - App loads successfully
   - Login/register flows work
   - Product/cart/order features respond normally
6. Confirm production URL is accessible: https://hapag-tech.vercel.app/
7. Mark deployment as successful in release notes/changelog.

## 5. Rollback Plan
If deployment fails or causes production issues:

1. Check Vercel deployment logs to identify root cause (for example: missing env vars, TypeScript errors, dependency issues).
2. Trigger rollback in Vercel to the last successful deployment.
3. Redeploy the previous working build if needed.
4. Fix issue locally, retest, and push corrected commit.
5. If rollback does not fully restore service behavior, restore latest stable backup/configuration and redeploy.

## 6. Deployment Verification
After each release, verify:

- Application is reachable at the production URL.
- Core user flows are working.
- No critical runtime errors are present.
- API integrations and database connectivity are healthy.

Live System Link: https://hapag-tech.vercel.app/

## 7. Ownership and Traceability
All deployment artifacts and process documents are maintained in the project repository for consistency and auditability:

- Deployment plan: `docs/deployment-plan.md`
- Release checklist: `docs/release-checklist.md`
- Support plan: `docs/support-plan.md`
