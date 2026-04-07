# 🏋️ Fitness Influencer Coaching Platform – Database Design

## Overview

This database models a gym ecosystem including clients, trainers, subscriptions, plans, sessions, and progress tracking. It supports many-to-many relationships via junction tables and maintains normalized structure.

---

## ER Diagram

Eraser Link: **https://app.eraser.io/workspace/jHgso44PP4bH1TPQIDY0**

---

## Core Entities

* **clients** – user details
* **trainers** – trainer profiles
* **plans** – diet/workout plans
* **subscription** – client-plan mapping
* **payment** – subscription payments
* **consultation** – trainer-client sessions
* **sessions** – live sessions
* **check_ins** – attendance tracking
* **client_progress** – fitness tracking

---

## Relationships

### 1. Subscription

* clients (1) → (M) subscription
* plans (1) → (M) subscription

### 2. Payments

* subscription (1) → (M) payment

### 3. Trainer–Client Mapping (M:M)

* via **client_trainer**

### 4. Consultation

* clients (1) → (M) consultation
* trainers (1) → (M) consultation

### 5. Plans

* plans (1) → (M) diet_plan_details
* plans (1) → (M) workout_plan_details

### 6. Sessions

* trainers (1) → (M) sessions
* clients (1) → (M) sessions
* sessions (1) → (M) session_participants
* clients (1) → (M) session_participants *(M:M via table)*

### 7. Tracking

* clients (1) → (M) client_progress
* clients (1) → (M) check_ins

---

## Design Decisions

* **UUIDs** used for all PKs
* **Junctions tables** for M:M (client_trainer, session_participants)
* **Payments linked to subscription** (not directly client)
* **Separation of diet & workout plans** for flexibility
* **1:M dominant structure** for scalability

---

