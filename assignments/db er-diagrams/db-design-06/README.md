# 🏏 IPL Management System – Database Design

## Overview

This database models an IPL ecosystem including teams, players, seasons, matches, broadcasters, sponsors, and performance tracking. It follows a normalized structure with junction tables to handle many-to-many relationships and season-based data.

---

## Core Entities

* **teams** – franchise details  
* **players** – player information  
* **team_player** – player-team mapping per season  
* **player_stats** – player performance per season  
* **owners** – team ownership details  
* **matches** – match scheduling and teams  
* **stadiums** – venue details  
* **broadcasters** – broadcasting platforms  
* **match_broadcaster** – match broadcasting mapping  
* **sponsors** – sponsoring companies  
* **seasons** – IPL seasons  
* **team_season_stats** – team performance per season  

---

## Relationships

### 1. Team–Player (M:M via team_player)

* teams (1) → (M) team_player  
* players (1) → (M) team_player  
* seasons (1) → (M) team_player  

---

### 2. Player Stats

* players (1) → (M) player_stats  
* seasons (1) → (M) player_stats  

---

### 3. Team Ownership

* teams (1) → (M) owners  

---

### 4. Matches

* teams (1) → (M) matches *(team1_id)*  
* teams (1) → (M) matches *(team2_id)*  
* stadiums (1) → (M) matches  
* seasons (1) → (M) matches  

---

### 5. Broadcasting (M:M via match_broadcaster)

* matches (1) → (M) match_broadcaster  
* broadcasters (1) → (M) match_broadcaster  

---

### 6. Team Season Stats

* teams (1) → (M) team_season_stats  
* seasons (1) → (M) team_season_stats  
* sponsors (1) → (M) team_season_stats  

---

## Design Decisions

* **Junction tables** used for M:M relationships (team_player, match_broadcaster)  
* **Season-based modeling** for dynamic data (players, stats, teams)  
* **Separate stats table** to avoid bloating player entity  
* **Flexible broadcasting model** at match level  
* **Normalized sponsor linkage** via team_season_stats  
* **1:M relationships** used wherever possible for simplicity and scalability  

---
