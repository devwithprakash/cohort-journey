# 🏢 Smart Elevator Control – Database Design

## Overview

This database models an elevator system within buildings, including floors, elevators, shafts, ride requests, assignments, logs, and maintenance tracking. It ensures normalized structure and supports real-time elevator operations and tracking.

---

## ER Diagram

Eraser Link: **https://app.eraser.io/workspace/nt4sBwHJHVI7rdvSIZNw**

---

## Core Entities

* **buildings** – building details  
* **floors** – floors within a building  
* **elevators** – elevator units  
* **shafts** – physical shafts in buildings  
* **elevator_floor_map** – mapping of elevators to accessible floors  
* **floor_requests** – user requests from floors  
* **ride_assignment** – assigns elevator to requests  
* **ride_logs** – logs of completed rides  
* **status_tracking** – real-time elevator status  
* **maintainance_tracking** – maintenance records  

---

## Relationships

### 1. Building Structure

* buildings (1) → (M) floors  
* buildings (1) → (M) elevators  
* buildings (1) → (M) shafts  

### 2. Elevator–Shaft

* shafts (1) → (1) elevators  

### 3. Elevator–Floor (M:M)

* via **elevator_floor_map**
  * elevators (1) → (M) elevator_floor_map  
  * floors (1) → (M) elevator_floor_map  

### 4. Floor Requests

* floors (1) → (M) floor_requests  

### 5. Ride Assignment

* floor_requests (1) → (1) ride_assignment  
* elevators (1) → (1) ride_assignment  

### 6. Ride Logs

* elevators (1) → (M) ride_logs  
* floors (1) → (M) ride_logs *(request_floor_id)*  
* floors (1) → (M) ride_logs *(destination_floor_id)*  

### 7. Status Tracking

* elevators (1) → (1) status_tracking  

### 8. Maintenance Tracking

* elevators (1) → (M) maintainance_tracking  
* buildings (1) → (M) maintainance_tracking  

---

## Design Decisions

* **Junction table** used for elevator–floor many-to-many mapping  
* **Ride assignment separated** from requests for flexibility  
* **Ride logs store both request & destination floors**  
* **Status tracking isolated** for real-time updates  
* **Maintenance linked to both elevator and building**  
* **1:M structure maintained** for scalability and clarity  

---