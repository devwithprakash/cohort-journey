# React Auth App

A React + Vite authentication demo with registration, login, and a profile page.

## Overview

This app demonstrates a lightweight authentication flow with React state and localStorage persistence. Users can register, login, and view profile details using a clean dark UI.

## Features

- Register with username, email, password, and role
- Login with username and password
- Profile page with avatar, username, email, and role
- Logout clears authentication data and returns to login
- LocalStorage-based token persistence
- Responsive dark-themed UI

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- FreeAPI authentication endpoints

## Install

```bash
git clone <repository-url>
cd react-auth-app
pnpm install
```

## Run

```bash
pnpm dev
```

Open `http://localhost:5173` in your browser.

## Build

```bash
pnpm build
```

## Project Structure

```
src/
├── App.jsx      # Main application and auth flow
├── App.css      # Styles for the app
├── index.css    # Global and Tailwind styles
└── main.jsx     # Vite entry file
```

## Components

### RegisterUser
- Manages login and registration forms
- Accepts username, email, password, and role
- Sends auth requests to the API
- Shows loading state during requests

### Profile
- Displays authenticated user details
- Shows avatar and user metadata
- Includes logout button in navbar
- Uses a compact single-column layout

### App
- Tracks auth state from localStorage
- Renders `RegisterUser` or `Profile` depending on auth status
- Handles logout and token clearing

## Authentication Flow

1. User registers or logs in via the form
2. Successful login stores the auth token in localStorage
3. Authenticated user sees the profile view
4. Logout removes stored auth data and returns to login

## API Endpoints

- Register: `POST https://api.freeapi.app/api/v1/users/register`
- Login: `POST https://api.freeapi.app/api/v1/users/login`
- Current user: `GET https://api.freeapi.app/api/v1/users/current-user`
- Logout: `POST https://api.freeapi.app/api/v1/users/logout`

## Notes

- Token persistence is handled via localStorage
- Reloading keeps the user authenticated until logout
- The profile page fetches fresh user data when authenticated