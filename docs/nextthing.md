HapagTech – Smart Restaurant Ordering System
CS326: Software Implementation and Management

Members. Chiong, Heart., Limpahan, Mark Vincent., Locsin, Roxanne., Sajol, Rhenel Jhon.
GitHub Repository Link: https://github.com/Shonget-Thesis/HapagTech.git  


1. INTRODUCTION
This activity demonstrates the implementation of Software Configuration Management (SCM) using Git to ensure controlled, traceable, and collaborative software development. It focuses on branch management, pull request workflows, merge conflict resolution, and version control practices. By applying these techniques, the project maintains code integrity, supports team collaboration, and aligns with real-world development standards. All SCM artifacts are managed and stored in the project’s Github repository.

2. BRANCHING STRATEGY
2.1 Branch Naming Convention
The project follows a standardized branch naming format:
feature/landing-page-footer-implementation - Implementation of Landing Page Footer 

2.2 Feature Branch Implementation
A feature branch was created to isolate development work.
Changes were implemented without affecting the main or development branches.
GitHub Link:
https://github.com/Shonget-Thesis/HapagTech/tree/feature/landing-page-footer-implementation 

Figure 1. Feature Branch Creation


2.3 CODEOWNERS Configuration
A CODEOWNERS file was created to automatically assign reviewers based on file ownership. This improves accountability and ensures that changes are reviewed by the appropriate team members.
GitHub Link: 
https://github.com/Shonget-Thesis/HapagTech/blob/feature/landing-page-footer-implementation/.github/CODEOWNERS 

Figure 2. CODEOWNERS Configuration


3. PULL REQUEST WORKFLOW
3.1 Pull Request Process
The following workflow was followed:
Created a feature branch
Implemented a new feature
Committed changes with clear messages
Pushed branch to GitHub
Opened a Pull Request (PR)
Reviewed and prepared for merge into the target branch

3.2 Commit Message Quality
Clear and descriptive commit messages were used to improve traceability. Such as:
9f3bb27 - Implement landing page footer
90461da - footer changes
8ae60ad - Footer Final edit
f854081 - Footer New feature


3.3 PR Evidence
PR successfully created for the footer feature branch
Ensured no direct commits were made to main branch
GitHub Link: 
https://github.com/Shonget-Thesis/HapagTech/pull/5


Figure 3. Pull Request Page



Figure 4. Merged PR



4. MERGE CONFLICT RESOLUTION
4.1 Conflict Scenario
A merge conflict was intentionally simulated by modifying overlapping code between the main branch and the feature branch.

Figure 5. Merge Conflict



4.2 Resolution Process
Identified conflicting sections in the file
Manually edited the file to resolve differences
Selected the correct or combined version of the content
Committed the resolved version

Figure 6. Resolved Merge Conflict 


4.3 Documentation
Conflict details were documented in: docs/scm-notes.md
GitHub Link: https://github.com/Shonget-Thesis/HapagTech/blob/feature/landing-page-footer-implementation/docs/scm-notes.md

5. RELEASE MANAGEMENT
5.1 Release Notes
A release notes file was created to document the changes in this version.
Contents include:
Features added
Fixes applied
Improvements made
GitHub Link: https://github.com/Shonget-Thesis/HapagTech/blob/feature/landing-page-footer-implementation/docs/release-notes-v0.5-scm.md

5.2 Version Tagging
A version tag was created to mark this release:
v0.5-scm

The tag was pushed to GitHub to track the project version.

6. SUMMARY OF WORK DONE
Implemented Git branching strategy using feature branches
Developed and committed a new feature
Used descriptive commit messages
Created a Pull Request for branch integration and review
Simulated and resolved a merge conflict
Documented conflict resolution in scm-notes.md
Created release notes for version tracking
Tagged the project version as v0.5-scm

7. CONCLUSION
The implementation of Software Configuration Management practices ensures that the development process remains organized, controlled, and efficient. Through proper use of branching, pull requests, conflict resolution, and version tagging, the project maintains high code quality and traceability. These practices reflect industry-standard workflows and strengthen collaboration within the development team.
