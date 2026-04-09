# 🚗 Comic-Con Parking System – Database Design

## Overview

This database models a parking system handling vehicles, reservations, real-time parking sessions, spot allocation, and payments. It separates **planned (reservations)** and **actual usage (sessions)** while maintaining a normalized and scalable structure.

---

## ER Diagram

Eraser Link: **https://app.eraser.io/workspace/bCqQ205t3CtyIcbyAOI1**

---

## Core Entities

* **vehicle** – vehicle details
* **vehicle_types** – type of vehicles (car, bike, EV)
* **parking_levels** – floors/levels
* **parking_zones** – zones within levels
* **parking_spots** – individual parking spaces
* **spot_types** – compatibility (car, bike, EV)
* **reservations** – pre-booked parking
* **parking_sessions** – actual parking usage
* **payment_records** – payment transactions

---

## Relationships

### 1. Vehicle

* vehicle_types (1) → (M) vehicle

### 2. Parking Hierarchy

* parking_levels (1) → (M) parking_zones
* parking_zones (1) → (M) parking_spots
* spot_types (1) → (M) parking_spots

### 3. Reservations

* vehicle (1) → (M) reservations
* parking_spots (1) → (M) reservations

### 4. Parking Sessions (Core)

* vehicle (1) → (M) sessions
* parking_spots (1) → (M) sessions
* reservations (1) → (1) sessions

### 5. Payments

* parking_sessions (1) → (M) payment_records

---

## Design Decisions

* **UUIDs** used for all primary keys
* **Separation of reservation & session**
* **Payments linked to sessions**, not vehicles
* **Normalized hierarchy**: level → zone → spot

---

## Key Rules

* One vehicle → multiple sessions over time
* One spot → multiple sessions over time
* One reservation → at most one session
* Spot availability = **no active session**
* Reserved spots → restricted by `guest_type`
* Fallback → general spots for all vehicles

---

## Flow

`vehicle → reservation (optional) → parking_session → payment`

---

