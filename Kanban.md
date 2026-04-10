
markdown

# OummaKids Tool — Kanban des boutons

## Auth

| Bouton | Méthode | Route | Retour |
|---|---|---|---|
| Login Admin | POST | `/api/auth/login` | token stocké en mémoire |
| Login Parent | POST | `/api/auth/login` | token stocké en mémoire |
| Login Babysitter | POST | `/api/auth/login` | token stocké en mémoire |

---

## Création

| Bouton | Méthode | Route | Retour |
|---|---|---|---|
| Babys +1 | POST | `/api/auth/register/babysitter` | crée babysitter avec numBabysitter auto-incrémenté |
| Parent +1 | POST | `/api/auth/register/parent` | crée parent avec numParent auto-incrémenté |
| Increment Babysitter | — | aucune requête | incrémente numBabysitter en mémoire |
| Increment Parent | — | aucune requête | incrémente numParent en mémoire |

---

## Lecture

| Bouton | Méthode | Route | Retour |
|---|---|---|---|
| Get all users | GET | `/api/profile/admin/getAllUsers` | liste tous les users (admin requis) |
| Select all parents | GET | `/api/profile/admin/getAllParents` | liste tous les parents |
| Select all babysitters | GET | `/api/babysitters` | liste tous les babysitters |
| Get profile | GET | `/api/profile` | profil du user connecté (token requis) |
| Get profile babysitter | GET | `/api/babysitters/2` | profil public d'un babysitter |
| Load users (select) | GET | `/api/profile/admin/getAllUsers` | remplit tous les `<select>` de la page |

---

## Chat

| Bouton | Méthode | Route | Retour |
|---|---|---|---|
| Send msg → babysitter OU msg -> parent | POST | `/api/profile/chats/:id` | id récupéré depuis `selectBabysitter` |
| Delete chat | DELETE | `/api/profile/chats/:id` | id récupéré depuis `selectUser` |

---

## Suppression

| Bouton | Méthode | Route | Retour |
|---|---|---|---|
| Delete user | DELETE | `/api/profile` | supprime le user connecté (token requis) |

---

