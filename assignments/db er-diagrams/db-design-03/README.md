# 🏥 Clinic Appointment & Diagnostics Platform – Database Design

## Overview

This database models a healthcare system including patients, doctors, appointments, consultations, diagnostics, and billing. It ensures normalized structure with clear separation of medical, operational, and financial data.

---

## Core Entities

* **users** – base authentication & identity
* **patient_profile** – patient details
* **doctor_profile** – doctor details
* **appointments** – booking records
* **consultation** – doctor-patient interaction
* **tests** – diagnostic tests
* **reports** – test results
* **payment** – billing records
* **payment_items** – itemized charges
* **specialties** – medical domains
* **doctor_specialties** – doctor-specialty mapping
* **doctor_availability** – doctor schedule

---

## Relationships

### 1. User Mapping

* users (1) → (1) patient_profile
* users (1) → (1) doctor_profile

### 2. Appointments

* patient_profile (1) → (M) appointments
* doctor_profile (1) → (M) appointments
* appointments (1) → (1) consultation

### 3. Diagnostics

* consultation (1) → (M) tests
* tests (1) → (1) reports

### 4. Payments

* patient_profile (1) → (M) payment
* appointments (1) → (1) payment
* payment (1) → (M) payment_items
* tests (1) → (M) payment_items

### 5. Doctor Metadata

* doctor_profile (1) → (M) doctor_specialties
* specialties (1) → (M) doctor_specialties
* doctor_profile (1) → (1) doctor_availability

---

## Design Decisions

* **UUIDs** used for all primary keys
* **Strict 1:1 mapping** for user → profile separation
* **Consultation abstraction** separates appointment from medical data
* **Tests & reports isolated** for extensible diagnostics
* **Itemized billing** via payment_items
* **M:M handled via doctor_specialties**
* **1:M dominant structure** for scalability
* **Audit fields recommended** (`created_at`, `updated_at`)

---
