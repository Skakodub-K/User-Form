
# User Management System

## Project Overview
A web application for managing user accounts with CRUD functionality and authentication.

<center><img width="364" height="309" alt="Image" src="https://github.com/user-attachments/assets/590c898d-74db-4b51-b5f3-c60506e33969" /></center>

## Features
- 📋 User listing table view
- ➕ Create new users
- ✏️ Edit existing users (with field restrictions)
- 🔒 Login authentication
- 🧭 Persistent navigation (except login page)

## Pages Structure

| Path                | Description                                  | Components               |
|---------------------|----------------------------------------------|--------------------------|
| `/`                 | Main page with users table                   | Table, Nav, Header       |
| `/user/create`      | User creation form                           | Form, Nav, Header        |
| `/user/:id`         | User editing form (pre-filled)               | Form, Nav, Header        |
| `/login`            | Authentication page                          | Login Form               |

## Start
```bash
npm install
npm run dev
```
