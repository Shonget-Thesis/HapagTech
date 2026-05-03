HapagTech – Smart Restaurant Ordering System
CS326: Software Implementation and Management

Members. Chiong, Heart., Limpahan, Mark Vincent., Locsin, Roxanne., Sajol, Rhenel Jhon.
GitHub Repository Link: https://github.com/Shonget-Thesis/HapagTech.git  


1. INTRODUCTION
This activity presents the implementation of a Continuous Integration and Continuous Deployment (CI/CD) pipeline for the system. The objective is to automate the processes of testing, building, and deploying the application to ensure faster delivery, improved reliability, and consistent software quality.

The pipeline is configured to automatically trigger updates to the main branch, ensuring that all changes are validated and deployed in a controlled and efficient manner.

2. CI/CD PIPELINE IMPLEMENTATION
2.1 Workflow Configuration
Stored in: .github/workflows/deploy.yml
The CI/CD pipeline is configured using GitHub Actions. It is triggered whenever changes are pushed to the main branch.
Pipeline Flow:
Code checkout from the repository
Installation of backend dependencies
Execution of automated backend tests
Installation of frontend dependencies
Build process of the frontend application
Deployment of frontend and backend services to Vercel
Execution of the smoke test against the production URL
GitHub Link: 
https://github.com/Shonget-Thesis/HapagTech/blob/main/.github/workflows/deploy.yml

Figure 1. CI/CD Pipeline Run



2.2 Deployment Automation
The deployment process is fully automated and runs after successful testing and build stages. This ensures that only validated code is released to the production or staging environment.
Key Features:
Automatic deployment on push to main
Reduced manual intervention
Faster release cycles
Figure 2. Deployment Stage



2.3 Environment Variables (Secrets)
Sensitive data such as API keys and deployment tokens are securely stored using GitHub Secrets. Such as:
DATABASE_URL
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_FRONTEND_PROJECT_ID
VERCEL_BACKEND_PROJECT_ID
PRODUCTION_URL
Purpose:
Protect sensitive information
Prevent exposure of credentials in source code
Ensure secure deployment process

3. SMOKE TEST IMPLEMENTATION
3.1 Smoke Test Overview
A smoke test is implemented after deployment to verify that the application is running correctly in the live environment.
Purpose:
Quickly detect major deployment failures
Ensure that the application is accessible
Validate basic system functionality

3.2 Smoke Test Method
The smoke test checks whether the application endpoint returns a successful response. Such as:
Homepage loads successfully
Frontend route returns HTTP 200 status
Login page is accessible from the deployed URL
Register page is accessible from the deployed URL

3.3 Results
The pipeline automatically fails if the smoke test does not pass, ensuring that faulty deployments are immediately identified and addressed.

Figure 3. Smoke Test Execution



4. CI/CD PIPELINE DIAGRAM
Stored in: docs/cicd-diagram.md
The diagram illustrates the sequence of stages in the CI/CD pipeline.




























Pipeline Stages:
Push to main branch
Run tests
Build application
Deploy application
Execute smoke test
GitHub Link: 
https://github.com/Shonget-Thesis/HapagTech/blob/main/docs/cicd-diagram.md

5. SUMMARY OF WORK DONE
Configured CI/CD pipeline using GitHub Actions
Automated testing, build, and deployment processes
Integrated secure environment variables using GitHub Secrets
Implemented smoke test for deployment verification
Created CI/CD pipeline diagram for visualization
Verified successful pipeline execution

6. CONCLUSION
The implementation of the CI/CD pipeline significantly improves the efficiency and reliability of the software development process. By automating testing, building, deployment, and validation through smoke testing, the system ensures faster delivery and higher quality releases. These practices align with modern DevOps standards and enhance the overall maintainability and scalability of the project.
