# Team Dashboard

## Project Description

Team Dashboard is a web application built with Node.js and Express.js for managing team members in an organization. It allows users to add, edit, and delete member information, including details such as name, age, university, email, phone, and committees they belong to. This project uses MongoDB for data persistence and Joi for data validation.

### Features:
- **Add Member**: Users can add new members with details and upload profile images.
- **Edit Member**: Users can edit existing members’ details and replace profile images.
- **Delete Member**: Users can remove members from the team.
- **List Members**: Displays a list of all team members.
- **Data Validation**: Ensures user input meets specified requirements.

---

## Setup Instructions

### Prerequisites

- **Node.js** (v12+ recommended)
- **MongoDB** (Make sure you have a MongoDB server running or use MongoDB Atlas)
- **Git** (for cloning the project repository)

### Installation

#### 1. **Clone the repository**:
```bash
   git clone https://github.com/Elshahaby/Team-Members-Dashboard.git
   cd Team-Members-Dashboard
```


#### 2. **Install dependencies**:

```bash
npm install
```

#### 3. **Setup MongoDB**:

- If you are using MongoDB instance, update the `mongoose.connect` URL in `index.js` to your local MongoDB connection string.
- If using MongoDB Atlas, ensure your connection string is correct and your IP is whitelisted in the MongoDB Atlas dashboard.

#### 4. **Create the folders and files**:

#### 5. **Run the application**:

#### 6. **Access the application**:

- Open your browser and go to `http://local:3000`

---

### - Routes

    - GET `/` - Displays the homepage with all team members.
    - GET `/add-member` - Shows the form to add a new team member.
    - POST `/add-member` - Submits the form data to add a new member.
    - GET `/member/:id` - Displays details for a specific member.
    - GET `/edit-member/:id` - Shows the form to edit an existing member.
    - POST `/edit-member/:id` - Submits form data to update an existing member.
    - POST `/delete-member/:id` - Deletes a member.
    
### - Validation

Joi schema validation is used to ensure all data meets requirements before storing in MongoDB. If invalid, an error message is displayed.

### Additional Notes

- **Image Uploads**: Profile images are saved locally in the `/images` directory.
- **Data Validation**: Joi validators (`addMemberValidation.js` and `EditMemberValidation.js`) ensure each input is accurate.

#### Issues

- **Uniqueness Checks**: The Joi `external` uniqueness validation may not work well in asynchronous environments. To address this, unique constraints are also enforced at the MongoDB schema level.

<br>


**`Autor: Elshahaby.`**