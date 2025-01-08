# NodeJS Module Server-Side Project (HackerU 2025)

This project is a comprehensive summary of the NodeJS module learned during the Full-Stack Development course at HackerU.

The goal of this project is to create a **RESTful API** using NodeJS with the Express library and MongoDB as the database. This API includes **Users** and **Cards** models, each defined with Mongoose schemas.

---

## **Note for Reviewers**

When submitting this project, a `.env` file will be attached. It includes the following environment variables:
- **JWT_TOKEN**: Used to encrypt and decrypt user tokens.
- **ATLAS_URL**: Connection string for MongoDB Atlas.
- **COMPASS_URL**: Connection string for MongoDB Compass.
- **ENVIRONMENT**: Sets the working environment. If set to `local`, it uses MongoDB Compass; if set to `cloud`, it uses MongoDB Atlas.

---

## **Libraries Used**

- `express`  
- `mongoose`  
- `bcrypt`  
- `cors`  
- `dotenv`  
- `joi`  
- `jsonwebtoken`  
- `lodash`  
- `morgan`  
- `nodemon`  

---

## **Database Collections**

### 1. **Users**

There are three types of users:
- **Normal Users**:
  - `isBusiness` is set to `false` by default.
  - Cannot create new cards but can:
    - Patch their `isBusiness` status to `true` if needed.
    - Edit their own information.
    - Fetch their own information.

- **Business Users**:
  - `isBusiness` is set to `true`.
  - Can:
    - Create new business cards.
    - View the cards they created.
    - Edit their own information.
    - Patch their `isBusiness` status.
  - Cannot fetch the entire card collection of other users.

- **Admin Users**:
  - Can perform all actions of a business user.
  - Additional features:
    - Fetch a list of all users or a specific user.
    - Delete users and cards.

### 2. **Cards**

- Only business users can create new cards.
- Cards are visible to all users, regardless of type.

---

## **How to Test the API**

This project includes two files for testing the API routes using the **REST Client** extension for VS Code.  
**Link:** [REST Client Extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

### Testing Files
- `test.users.http`  
- `test.cards.http`  

Each file contains all the required routes for testing. Above each HTTP request, there is a **"Send Request"** button that allows you to send a request to the server.

### Variables
Default URL: `@local=http://localhost:4000`  
Tokens for user types:
- `@normaltoken=` (Normal user token)
- `@biztoken=` (Business user token)
- `@admintoken=` (Admin user token)

To use a token:
1. Paste the token provided by the API after the equal sign (`=`).
2. The token will automatically be applied in all relevant requests.

### Example Headers in Requests
- `x-auth-token: {{biztoken}}` (Token variable for authentication)  
- `Content-Type: application/json` (Sets the request body format to JSON)

---

## **Bonus Features**

1. **Admin Card Management**:
   - Admins can patch the business number of a card, provided the new number is unique and not already in use by another business.

2. **File Logger**:
   - Logs any bad requests (HTTP 400, 401, 404) to a file named with the current date.
   - If a log file with today's date already exists, new logs are appended to it.
   - Example log files are included to demonstrate this feature.

---

## **Additional Notes**

This project demonstrates the implementation of a robust API with role-based functionality and comprehensive error logging. The use of testing files ensures the API can be efficiently verified and debugged.

