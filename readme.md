# Gestion d'Assignments

## Contributeurs

- Ramananjoelina Tokiniaina Angelo
- Ratovonirina Eric

## Introduction

Ce projet est une application de gestion d'assignments développée avec Angular pour le frontend, Node.js pour le backend et MongoDB pour la base de données. L'application offre des fonctionnalités de gestion des devoirs pour deux rôles distincts : étudiants et enseignants.

## Fonctionnalités

### Rôles et Authentification

- **Rôles** :
  - **Étudiant** : Peut créer et gérer ses devoirs.
  - **Enseignant** : Peut voir et corriger les devoirs soumis par les étudiants.
- **Authentification** :
  - **Inscription** : Les utilisateurs peuvent s'inscrire en fournissant des informations de base.
  - **Connexion** : Utilisation de JWT (JSON Web Tokens) pour gérer les sessions de connexion.
  - **Mot de passe oublié** : Fonctionnalité pour récupérer le mot de passe oublié par mail.

### Espace Étudiant

- **Création de Devoirs** :

  - Les étudiants peuvent créer un nouveau devoir en fournissant :
    - **Titre du devoir**
    - **Matière**
    - **Fichier attaché** (upload de fichiers)
  - Les devoirs créés sont affichés dans une liste des devoirs de l'étudiant.

- **Suppression de Devoirs** :

  - Seuls les devoirs non-rendus peuvent être supprimé par l'étudiant propriétaire

- **Détail de Devoirs** :

  - Peut être vu dans le modal après clic sur la card du devoir concerné
  - Possibilité de télécharger le fichier attaché du devoir

- **Credentials pour quelques etudiants**:

  - email : tsmallpeice1@slashdot.org, mot de passe: test
  - email : ncoddington5@dagondesign.com, mot de passe: test

### Espace Enseignant

- **Affichage des Devoirs** :

  - Les devoirs sont affichés en deux colonnes :
    - **Devoirs non rendus** : Devoirs non encore notés.
    - **Devoirs rendu** : Devoirs déjà notés.

- **Correction des Devoirs** :

  - Les enseignants peuvent faire un **drag and drop** des devoirs non corrigés vers la colonne des devoirs corrigés.
  - Un popup s'affiche pour permettre à l'enseignant d'entrer une note et un commentaire avant de valider la correction.

- **Détail de Devoirs** :

  - Peut être vu dans le modal après clic sur la card du devoir concerné
  - Possibilité de télécharger le fichier attaché du devoir

- **Credentials pour quelques enseignants**:
  - email : sbarhem1@ebay.com, mot de passe: test
  - email : msizzeyg@rediff.com, mot de passe: test

## Technologies Utilisées

- **Frontend** : Angular
- **Backend** : Node.js avec Express
- **Base de données** : MongoDB
- **Authentification** : JWT (JSON Web Tokens)

## URL déployé sur Render

https://angular24-front.onrender.com/

## Démarrage du projet en local

### Cloner le repository

```shell
git clone https://github.com/RicManByakugan/Angular24
cd Angular24/
```

### Front-end angular

Entrer dans le repertoire de front-end

```shell
cd frontend
```

### Installer les packages npm

```shell
npm install
```

### Démarrer l'application

```shell
npm start
```

Le front-end démarre sur l'url l'url http://localhost:4200

### Backend-nodejs

Entrer dans le repertoire du backend

```shell
cd backend
```

### Installer les packages npm

```shell
npm install
```

### Ajout variables d'environnements

Dans le repertoire /backend, créer un fichier .env et y ajouter les varibales:

ENV=DEV
FILE_PATH = ../public/files
DEFAULT_FILE_PATH = ../public/default

### Démarrer l'application

```shell
npm start
```

Le backend démarre sur l'url http://localhost:8000
