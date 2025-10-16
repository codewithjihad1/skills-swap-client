# Skill Swap Marketplace - User Flow

## 1. Enter Homepage
- The user visits the website homepage.
- The user can browse skills, but must sign up to trade or message.

## 2. Registration / Login
- New users fill out the “Sign Up” form to create an account.
- Returning users log in via “Sign In”.

## 3. Profile Setup
- The user goes to their profile to update “Skills I Can Teach” and “Skills I Want to Learn” lists.
- Adds skill name, category, proficiency level, and a brief description.

## 4. Browse and Search Skills
- The user visits the marketplace to view skills offered by other users.
- Users can search and filter skills by category or level.

## 5. Propose Trade
- If interested in a skill, the user visits the skill owner’s profile and clicks “Propose Trade”.
- Selects one of their own teachable skills to offer in exchange.

## 6. Trade Response
- The user receiving the proposal gets a notification and can “Accept” or “Decline” the trade.
- If “Accepted”, a chat/messaging option is enabled between the two users.

## 7. Communication and Scheduling
- Both users coordinate via messaging to set up time and method (online/offline) for the skill exchange.

## 8. After Skill Swap Completion
- Each user rates and reviews the other.
- Reviews and ratings are displayed on user profiles.

---

## User Flow Diagram (Mermaid Code)

```mermaid
graph TD
    A[Enter Homepage] --> B{Registration / Login?}
    B --&gt;|New User| C[Sign Up]
    B --&gt;|Returning User| D[Sign In]
    C --> E[Profile Setup]
    D --> E
    E --> F[Browse &amp; Search Skills]
    F --> G{Propose a Trade?}
    G --&gt;|Yes| H[Send Trade Proposal]
    G --&gt;|No| F
    H --> I[Trade Response (Accept/Decline)]
    I --&gt;|Accepted| J[Messaging/Communication]
    I --&gt;|Declined| F
    J --> K[Skill Swap Completed]
    K --> L[Rate &amp; Review]
    L --> F
```