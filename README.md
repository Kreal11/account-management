### Web Application: Account Management

This mini-project involves the creation of a web application with a hierarchical structure of pages and tables, focusing on three main entities: Accounts, Profiles, and Campaigns.

**Table [Accounts] Structure:**
- "accountId"
- "email"
- "authToken"
- "creationDate"

**Table [Profiles of Selected Account] Structure:**
- "profileId"
- "country"
- "marketplace"

**Table [Campaigns of Selected Profile] Structure:**
- "campaignId"
- "clicks"
- "cost"
- "date"

The application comprises three clickable tables, representing the entities mentioned above. Clicking on a row in any table navigates the user through the hierarchical structure of the data (e.g., from Accounts to Profiles and then to Campaigns).

Key Features:
1. **Sorting:** Users can sort the data in each table based on specific columns.
2. **Filtering:** The application supports filtering for each table, allowing users to search for specific data.
3. **Pagination:** To enhance user experience, pagination is implemented for all tables, ensuring a limited number of rows per page.

This project aims to provide a user-friendly interface for managing and exploring data across different levels of hierarchy—enabling efficient navigation, sorting, filtering, and pagination for a seamless experience.

Made with 💙 from [Kyrylo Shyrokov](https://github.com/Kreal11)
