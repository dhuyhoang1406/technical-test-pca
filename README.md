# Technical Test - Full Stack User Management

This repository contains a full-stack user management application built for the technical test:

- `Backend`: Node.js + Express + Sequelize + MySQL
- `Frontend`: React + Vite + Axios
- `Database`: MySQL (schema managed by Sequelize migrations)

---

## Implemented Features

### Backend

- REST APIs:
  - List users
  - Create user
  - Delete user
  - Export selected users to CSV
- Request validation via middleware
- Business logic separated in service layer
- Proper error handling with appropriate HTTP status codes
- CSV export with UTF-8 BOM support (Excel-friendly)

### Frontend (Single Page Application)

- Users table with:
  - Sorting
  - Pagination
  - Row checkbox selection
  - Select-all checkbox for the full dataset
- Sign Up popup with validation:
  - Required fields
  - Email format
  - Password length
  - Re-type password match
- Delete confirmation popup
- Loading popup during API calls
- Notification popup after actions
- Componentized structure using `components`, `pages`, `layouts`, `state`, `services`

---

## Project Structure

```text
Apply/
|- Backend/
|  |- config/
|  |- src/
|  |  |- controllers/
|  |  |- middlewares/
|  |  |- migrations/
|  |  |- models/
|  |  |- routes/
|  |  |- seeders/
|  |  |- services/
|  |- server.js
|
|- Frontend/
|  |- src/
|  |  |- components/
|  |  |- layouts/
|  |  |- pages/
|  |  |- services/
|  |  |- state/
|
|- .gitignore
|- README.md
```

---

## Prerequisites

- Node.js `>= 20`
- npm
- MySQL server

---

## Environment Variables

### `Backend/.env`

```env
DB_USERNAME=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_HOST=localhost
DB_NAME=technical_test_db
PORT=3308
```

### `Frontend/.env`

Current configuration:

```env
VITE_API_BASE_URL=http://localhost:3308
```

Note: this value must point to the backend URL you are running.

---

## Run Instructions

### 1) Setup Database

```sql
CREATE DATABASE technical_test_db;
```

Run migration from `Backend`:

```bash
cd Backend
npm install
npx sequelize-cli db:migrate
```

Optional seed data:

```bash
npx sequelize-cli db:seed:all
```

---

### 2) Run Backend

```bash
cd Backend
npm run dev
```

- Default backend URL: `http://localhost:3000`
- Health check: `GET /health`

---

### 3) Run Frontend

```bash
cd Frontend
npm install
npm run dev
```

- Default frontend URL: `http://localhost:5173`
- Frontend API target is read from `VITE_API_BASE_URL` in `Frontend/.env`

---

## Main API Endpoints

### List users

```http
GET /users
```

### Create user

```http
POST /users
Content-Type: application/json
{
  "firstName": "FN1",
  "lastName": "LN1",
  "email": "email1@example.com",
  "password": "123456"
}
```

### Delete user

```http
DELETE /users/:id
```

### Export CSV

```http
POST /users/export
Content-Type: application/json
{
  "userIds": ["uuid-1", "uuid-2"]
}
```

---

## Notes

- Password encryption is intentionally not implemented (per assignment note).
- CSV export format is `id,email,first_name,last_name`.
- Frontend and backend run as separate processes.
