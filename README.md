Database Systems CSC 3326

**SkillSphere: A Community Skill Exchange Platform - Project Proposal**

Alex Chen
Ben Miller

Supervised by: Dr. Ada Lovelace

SPRING 2025

## Table of Content

Introduction
Requirements Gathering
Requirements Specification
  Functional Requirements
  Non-Functional Requirements
Project Management Plan:
  Time Management
  Procedures and Tasks Distribution
Conclusion

## 1. Introduction

Our application, SkillSphere, is designed to be a dynamic platform for the AUI (Al Akhawayn University) community (students, faculty, and staff) to offer, discover, and request skills. Beyond simple listings, SkillSphere aims to foster a collaborative environment where members can connect to share expertise, learn new abilities, or find help for specific tasks. While initially focused on peer-to-peer skill exchange, the platform could evolve (post-initial release) to support workshops, group learning sessions, and mentorship programs, potentially managed by university departments or student organizations.

The title chosen for our project is **SkillSphere**.

The team members are Alex Chen and Ben Miller. This project will utilize React for the frontend, Express.js for the backend API, and PostgreSQL for the database.

## 2. Requirements Gathering

Currently, skill sharing within the AUI community happens informally, often through word-of-mouth, social media groups, or departmental listservs. This fragmented approach makes it difficult for individuals to efficiently find someone with a specific skill they need or to make their own skills known to a wider audience. There isn't a centralized, dedicated system for this purpose. SkillSphere addresses this gap by providing a structured and searchable platform exclusive to the AUI community.

The product aims to solve these inefficiencies by offering a user-friendly interface where members can:
1.  Create and manage profiles showcasing their skills and interests.
2.  Post "skill offers" detailing what they can teach or help with.
3.  Post "skill requests" for assistance or learning opportunities.
4.  Browse and search for available skills and active requests.
5.  Connect with other users to arrange skill exchange sessions.

Based on initial considerations and potential user needs, the project can be broken down into the following high-level requirements:

1.  **Having a web platform:** Accessible via standard web browsers.
2.  **Restrict access to AUI community members:** Likely via AUI email verification or SSO.
3.  **Browse and search:** Users can easily find skill offers and requests.
4.  **Create/Manage Content:** Users can post, edit, and delete their skill offers and requests.
5.  **User Profiles:** Users can create and maintain a basic profile.

In short, the product's objectives are the following:

-   Offer a user-friendly interface exclusively for AUIers.
-   Save time in finding or offering skills.
-   Facilitate the process of connecting individuals for skill exchange.
-   Enable users to easily list their skills or request assistance.
-   Foster a stronger sense of community and collaborative learning.

## 3. Requirements Specification

### A. Functional Requirements

**User Authentication & Authorization**

*   **Login/Registration:**
    *   **Customer Requirements:** Users (students, faculty, staff) should be able to register (if first time) and log in to the application, ideally using their AUI credentials.
    *   **System Requirements:** Support authentication, potentially via AUI's SSO or an email verification system for @aui.ma addresses. Securely manage user sessions.
    *   **Input/Output:** Input: AUI credentials or email/password. Output: Session token or server response specifying login success/failure.
*   **Logout:**
    *   **Customer Requirements:** The user should be able to log out of the application.
    *   **System Requirements:** Invalidate the user's session.
    *   **Input/Output:** Input: Logout request. Output: Confirmation of logout.

**User Profile Management (CRUD)**

*   **Create/View/Update Profile:**
    *   **Customer Requirements:** Users should be able to create a profile with basic information (name, department/major, contact preference, brief bio, list of skills they possess or are interested in). Users should be able to view and update their own profile.
    *   **System Requirements:** The system should allow for the creation, storage, retrieval, and modification of user profile data in the database.
    *   **Input/Output:** Input: Profile information (text, selections). Output: Confirmation message and updated profile view.

**Skill Offering Management (CRUD)**

*   **Create Skill Offering:**
    *   **Customer Requirements:** Users should be able to create a new skill offering, specifying the skill name, a description, category (e.g., Academic, Technical, Arts, Practical), preferred mode of exchange (e.g., online, in-person), and availability.
    *   **System Requirements:** The system should store new skill offerings in the database, associating them with the offering user.
    *   **Input/Output:** Input: Skill offering details (title, description, category, etc.). Output: Confirmation message and the new offering listed.
*   **View/Search Skill Offerings:**
    *   **Customer Requirements:** Users should be able to browse all available skill offerings and search/filter them by keywords, category, or user.
    *   **System Requirements:** The system should retrieve and display skill offerings based on search/filter criteria.
    *   **Input/Output:** Input: Search/filter parameters. Output: A list of matching skill offerings.
*   **Modify Skill Offering:**
    *   **Customer Requirements:** Users should be able to modify the details of their own skill offerings.
    *   **System Requirements:** The system should update the corresponding skill offering in the database.
    *   **Input/Output:** Input: Modified skill offering details and Offering ID. Output: Confirmation message.
*   **Delete Skill Offering:**
    *   **Customer Requirements:** Users should be able to delete their own skill offerings.
    *   **System Requirements:** The system should remove the skill offering from the database.
    *   **Input/Output:** Input: Offering ID to be deleted. Output: Confirmation message.

**Skill Request Management (CRUD)**

*   **Create Skill Request:**
    *   **Customer Requirements:** Users should be able to create a new skill request, specifying the skill needed, a description, category, and urgency/preferred timeframe.
    *   **System Requirements:** The system should store new skill requests in the database, associating them with the requesting user.
    *   **Input/Output:** Input: Skill request details. Output: Confirmation message and the new request listed.
*   **View/Search Skill Requests:**
    *   **Customer Requirements:** Users should be able to browse all skill requests and search/filter them.
    *   **System Requirements:** The system should retrieve and display skill requests based on search/filter criteria.
    *   **Input/Output:** Input: Search/filter parameters. Output: A list of matching skill requests.
*   **Modify Skill Request:**
    *   **Customer Requirements:** Users should be able to modify their own skill requests.
    *   **System Requirements:** The system should update the corresponding skill request in the database.
    *   **Input/Output:** Input: Modified skill request details and Request ID. Output: Confirmation.
*   **Delete Skill Request:**
    *   **Customer Requirements:** Users should be able to delete their own skill requests.
    *   **System Requirements:** The system should remove the skill request from the database.
    *   **Input/Output:** Input: Request ID. Output: Confirmation.

**Admin View (Future Scope, Basic for Initial Proposal)**

*   **User Management (Basic):**
    *   **Customer Requirements:** An administrator should be able to view a list of users and potentially deactivate accounts if misuse is reported.
    *   **System Requirements:** Provide an interface for admins to list users and change account status.
    *   **Input/Output:** Input: User ID for action. Output: List of users, confirmation of status change.
*   **Content Moderation (Basic):**
    *   **Customer Requirements:** An administrator should be able to review and remove inappropriate skill offerings or requests.
    *   **System Requirements:** Allow admins to view and delete any offering or request.
    *   **Input/Output:** Input: Offering/Request ID. Output: Confirmation of deletion.

### B. Non-Functional Requirements

*   **a. Security:** User data, especially login credentials (if not using SSO) and personal information, must be stored securely. Connections should be over HTTPS. Implement protection against common web vulnerabilities (e.g., XSS, SQL Injection). Access control must ensure users can only modify their own data.
*   **b. Performance (Response time):** The web application should load quickly. Database queries for searching and listing skills should be optimized for fast retrieval, even with a moderate number of users and entries.
*   **c. Usability:** The interface should be intuitive, clean, and easy to navigate. Features should be self-explanatory, minimizing the learning curve for new users. The process of creating, finding, and responding to skill offers/requests should be straightforward.
*   **d. Reliability:** The system should be consistently available during university operational hours. Data integrity must be maintained.
*   **e. Scalability (Consideration):** While the initial user base is the AUI community, the system should be designed with considerations for potential growth in users and data volume.
*   **f. Maintainability:** The code (React frontend, Express.js backend) should be well-structured, commented, and modular to facilitate future updates and bug fixes.

## 4. Project Management Plan:

### 1. Time Management

| Task Name                     | Start Date (2025) | End Date (2025) | Duration (work days) |
| :---------------------------- | :---------------- | :-------------- | :------------------- |
| **Project Proposal**          | **Jan 20**        | **Jan 24**      | **3**                |
| Database Design (Logical)     | Jan 27            | Jan 31          | 5                    |
| Database Creation (PostgreSQL)| Feb 03            | Feb 07          | 5                    |
| **Project Mid-Report**        | **Feb 10**        | **Feb 12**      | **3**                |
| Backend API Dev (Express.js)  | Feb 13            | Feb 28          | 12                   |
| Frontend UI/UX Dev (React)    | Mar 03            | Mar 21          | 15                   |
| Integration & Unit Testing    | Mar 24            | Mar 31          | 6                    |
| System Testing & Bug Fixing   | Apr 01            | Apr 07          | 5                    |
| Documentation (User/Dev)    | Apr 08            | Apr 11          | 4                    |
| **Final Report & Presentation**| **Apr 14**        | **Apr 18**      | **5**                |

*(Note: Durations are estimates and subject to adjustments. Dates assume a Spring 2025 semester start around mid-January.)*

### 2. Procedures and Tasks Distribution

To ensure all requirements are met and a high-quality product is delivered, each team member will be responsible for specific aspects of the project while maintaining close collaboration. Regular communication (daily check-ins, weekly summary meetings) will be key. We will use Git for version control with a shared repository (e.g., on GitHub or GitLab). Tasks will be tracked using a simple project management tool or shared document. We will respect deadlines through proactive planning and mutual support.

Every member of the team is responsible for reviewing the deliverables and guidelines. To respect our deadlines, we will adhere to the schedule above, agree on task assignments, and meet regularly to integrate work and review each other's progress.

Concerning the distribution of tasks, we decided to follow a methodology where primary responsibility is assigned, but collaboration and review are shared:

| Task                             | Primary Supervisor(s) |
| :------------------------------- | :-------------------- |
| Database Design & Schema         | Alex Chen             |
| Backend API Development (Express.js) | Alex Chen             |
| PostgreSQL Database Setup & Mgmt | Alex Chen             |
| Frontend UI/UX Design (React)    | Ben Miller            |
| Frontend Development (React)     | Ben Miller            |
| API Integration (Frontend)       | Ben Miller            |
| Testing (Unit, Integration, System) | Alex Chen & Ben Miller|
| Documentation & Reporting        | Alex Chen & Ben Miller|

## 5. Conclusion

This project proposal outlines the requirements, scope, and management plan for SkillSphere, a community skill exchange platform for AUI. Our team is committed to applying database design principles and web development best practices to build a functional, user-friendly, and secure application. We will conduct further feasibility analysis for specific features and refine our implementation approach as we progress. We are confident that SkillSphere will be a valuable addition to the AUI community.