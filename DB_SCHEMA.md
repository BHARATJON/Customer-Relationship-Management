## MongoDB Schema for Mini CRM

This document outlines the database schema for the Mini CRM application. The database consists of three collections: `users`, `customers`, and `leads`.

### 1. Users Collection

Stores user information for authentication and ownership.

-   `_id`: ObjectId (Primary Key)
-   `name`: String (Required)
-   `email`: String (Required, Unique)
-   `passwordHash`: String (Required)
-   `role`: String (Enum: 'User', 'Admin', Default: 'User')

**Example Document:**

```json
{
  "_id": ObjectId("60d5f2b9c3b3c3b3c3b3c3b3"),
  "name": "John Doe",
  "email": "john.doe@example.com",
  "passwordHash": "$2a$10$abcdefghijklmnopqrstuv",
  "role": "User"
}
```

### 2. Customers Collection

Stores customer information, with a reference to the user who owns the customer record.

-   `_id`: ObjectId (Primary Key)
-   `name`: String (Required)
-   `email`: String (Required)
-   `phone`: String
-   `company`: String
-   `ownerId`: ObjectId (references `users._id`, Required)

**Example Document:**

```json
{
  "_id": ObjectId("60d5f2b9c3b3c3b3c3b3c3b4"),
  "name": "Jane Smith",
  "email": "jane.smith@example.com",
  "phone": "123-456-7890",
  "company": "ABC Corp",
  "ownerId": ObjectId("60d5f2b9c3b3c3b3c3b3c3b3")
}
```

### 3. Leads Collection

Stores lead information, with a reference to the customer it belongs to.

-   `_id`: ObjectId (Primary Key)
-   `title`: String (Required)
-   `description`: String
-   `status`: String (Enum: 'New', 'Contacted', 'Converted', 'Lost', Default: 'New')
-   `value`: Number
-   `createdAt`: Date (Default: Date.now)
-   `customerId`: ObjectId (references `customers._id`, Required)

**Example Document:**

```json
{
  "_id": ObjectId("60d5f2b9c3b3c3b3c3b3c3b5"),
  "title": "New Website Project",
  "description": "Initial discussion about a new website.",
  "status": "New",
  "value": 5000,
  "createdAt": ISODate("2025-09-07T10:00:00Z"),
  "customerId": ObjectId("60d5f2b9c3b3c3b3c3b3c3b4")
}
```
