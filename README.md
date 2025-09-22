# 🐺 SkillCheck

SkillCheck est l’interface utilisateur de l’application web de gestion et de passation de tests de type QCM.

Elle permet aux utilisateurs de:
- Passer des tests chronométrés
- Consulter leurs résultats et statistiques
- Accéder aux questions avec code et tags
- Filtrer et rechercher les tests/questions

Une interface administrateur est également disponible afin de:
- Créer et gérer les tests, questions, réponses et tags
- Gérer les utilisateurs
- Importer et exporter les données (Excel)
- Suivre les statistiques globales

Ce frontend communique avec le backend Spring Boot + PostgreSQL disponible ici: https://github.com/LarekMehdi/BO-skill-check

## Stack technique:
- Vue 3 (Option API)
- TypeScript
- Pinia (state management, avec persistance)
- Vue Router
- Bootstrap + PrimeVue pour les composants UI
- Vue Toastification pour les notifications
- Axios pour les appels API

## Installation:
1. Cloner le projet
- git clone https://github.com/LarekMehdi/FO-skill-check.git
- cd FO-skill-check

2. Installer les dépendances:
- npm install

3. Configurer l’API backend:
Créer un fichier .env à la racine avec l’URL de l’API :
- VITE_API_BASE_URL=http://localhost:8080

4. Lancer l’application:
- npm run dev


L’interface est accessible sur http://localhost:5173


## Fonctionnalités principales:

- Authentification (JWT)
- Gestion des tests, questions, réponses et tags
- Interface administrateur complète
- Import/Export des données via Excel
- Tests chronométrés
- Statistiques (taux de réussite, progression…)


## Liens:

- Backend API: https://github.com/LarekMehdi/BO-skill-check

- Frontend: https://github.com/LarekMehdi/FO-skill-check#