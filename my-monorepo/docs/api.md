# API Documentation

## Overview

This document provides an overview of the API endpoints available in the blog system. The API is built using Express.js and follows RESTful principles.

## Base URL

The base URL for all API endpoints is:

```
http://localhost:3000/api
```

## Authentication

### Login

- **Endpoint:** `/auth/login`
- **Method:** POST
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```
- **Response:**
  - **200 OK:** Returns user information and a token.
  - **401 Unauthorized:** Invalid credentials.

### Register

- **Endpoint:** `/auth/register`
- **Method:** POST
- **Request Body:**
  ```json
  {
    "name": "User Name",
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```
- **Response:**
  - **201 Created:** Returns the created user information.
  - **400 Bad Request:** Validation errors.

## Users

### Get User Profile

- **Endpoint:** `/user/profile`
- **Method:** GET
- **Headers:** 
  - `Authorization: Bearer <token>`
- **Response:**
  - **200 OK:** Returns user profile information.
  - **401 Unauthorized:** Token is missing or invalid.

### Update User Profile

- **Endpoint:** `/user/profile`
- **Method:** PUT
- **Headers:** 
  - `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "name": "Updated Name",
    "email": "updated@example.com"
  }
  ```
- **Response:**
  - **200 OK:** Returns updated user information.
  - **400 Bad Request:** Validation errors.
  - **401 Unauthorized:** Token is missing or invalid.

## Posts

### Get All Posts

- **Endpoint:** `/post`
- **Method:** GET
- **Response:**
  - **200 OK:** Returns a list of posts.

### Create a Post

- **Endpoint:** `/post`
- **Method:** POST
- **Headers:** 
  - `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "title": "Post Title",
    "content": "Post content goes here."
  }
  ```
- **Response:**
  - **201 Created:** Returns the created post information.
  - **400 Bad Request:** Validation errors.
  - **401 Unauthorized:** Token is missing or invalid.

### Update a Post

- **Endpoint:** `/post/:id`
- **Method:** PUT
- **Headers:** 
  - `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "title": "Updated Title",
    "content": "Updated content goes here."
  }
  ```
- **Response:**
  - **200 OK:** Returns updated post information.
  - **400 Bad Request:** Validation errors.
  - **401 Unauthorized:** Token is missing or invalid.
  - **404 Not Found:** Post not found.

### Delete a Post

- **Endpoint:** `/post/:id`
- **Method:** DELETE
- **Headers:** 
  - `Authorization: Bearer <token>`
- **Response:**
  - **204 No Content:** Post deleted successfully.
  - **401 Unauthorized:** Token is missing or invalid.
  - **404 Not Found:** Post not found.

## Conclusion

This API provides the necessary endpoints for managing users and posts in the blog system. Ensure to handle authentication and authorization properly when accessing protected routes.