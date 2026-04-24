# OummaKids — Dev Tools

Outil interne pour interagir directement avec la base de données OummaKids via des boutons en frontend.

---

## Prérequis

- [Node.js](https://nodejs.org/) installé
- Le serveur backend OummaKids qui tourne sur `http://localhost:3000`

---

## Installation

### 1. Cloner / récupérer le dossier du tool

```bash
cd oummakids-tools
```

### 2. Installer TypeScript si vous touchez au fichier oummakids-tool.ts

```bash
npm install -D typescript
```

> ⚠️ Ne pas utiliser `npm install tsc` — c'est un faux package sans rapport avec TypeScript.

### 3. Initialiser la config TypeScript

```bash
npx tsc --init
```

Ensuite, ouvre le `tsconfig.json` généré et assure-toi d'avoir ces valeurs :

```json
{
  "compilerOptions": {
    "target": "ES6",
    "lib": ["ES6", "DOM"],
    "module": "ES6"
  }
}
```

- `target` : version JS générée
- `lib` : active `fetch`, `Promise`, `Math.trunc`, etc.
- `module` : format ES modules (requis pour le navigateur)

---

## Compilation

À chaque modification du `.ts`, recompile :

```bash
npx tsc
```

Pour recompiler automatiquement à chaque sauvegarde :

```bash
npx tsc --watch
```

> Le compilateur génère un fichier `app.js` à côté de ton `app.ts`. C'est ce fichier `.js` que le navigateur utilise.

---

## Lancer le tool

1. Lance le backend OummaKids sur le port `3000`
2. Ouvre `index.html` dans un serveur local (ex: extension **Live Server** sur VS Code)

> ⚠️ Ne pas ouvrir `index.html` directement en double-cliquant — les modules ES6 nécessitent un serveur HTTP.

---

## Structure des fichiers

```
├── Kanban.md
├── README.md
├── index
│   ├── oummakids-tool..js
│   ├── oummakids-tool.css        # CSS
│   ├── oummakids-tool.d.ts
│   ├── oummakids-tool.d.ts.map
│   ├── oummakids-tool.html
│   ├── oummakids-tool.js         # FIchier a utilisé, ou le ts est compiler
│   ├── oummakids-tool.js.map
│   ├── oummakids-tool.map
│   └── oummakids-tool.ts         # On écrit ici
├── node_modules
├── package-lock.json
├── package.json
├── src
│   └── ts
│       ├── AsyncFunctions
│       │   ├── asyncFunctions.d.ts
│       │   ├── asyncFunctions.d.ts.map
│       │   ├── asyncFunctions.js
│       │   ├── asyncFunctions.js.map
│       │   └── asyncFunctions.ts
│       └── functions
│           ├── functions.d.ts
│           ├── functions.d.ts.map
│           ├── functions.js
│           ├── functions.js.map
│           └── functions.ts
└── tsconfig.json
```

---

## Utilisation

### Ordre recommandé

Certaines actions nécessitent d'être authentifié. Toujours commencer par un **login** avant d'appeler une route protégée.

```
1. Login Admin / Parent / Babysitter  →  le token est stocké en mémoire
2. Appeler les routes protégées       →  le token est envoyé automatiquement
```

### Actions disponibles

| Bouton | Méthode | Route | Auth requise |
|---|---|---|---|
| Get all users | GET | `/api/profile/admin/getAllUsers` | Oui (Admin) |
| Select all parents | GET | `/api/profile/admin/getAllParents` | Oui (Admin) |
| Select all babys | GET | `/api/babysitters` | Oui |
| Get profile| GET| `/api/profile`|Oui|
| Get all chats| GET| `/api/profile/chats`| Oui|
| Get all babysitters| GET| `/api/babysitters`|Oui|
| Get all users| GET| `/api/profile/admin/`| Oui (n)|
| Login| GET| `/api/auth/login`| Non|
| Get babysitters for | GET| `/api/babysitters`|Oui|
| Get profile image| GET| `/api/profile/img...` (route dynamique via `user.user.imgProfile`)* | Oui |
| Get profile | GET | `/api/profile` | Oui |
| Delete User | DELETE | `/api/profile` | Oui |
| Delete chat | DELETE | `/api/profile/chat/:id` | Oui |
| Start a new Chat | POST | `/api/profile/chats/:id` | Oui (Parent) |
| Put profile image| PUT| /api/profile`| Oui|
| Socket join chat| Sckt | `joinChat`| |
| Socket connection| Sckt | `http://localhost:3000`| Oui (token)|
| Babys +1 | POST | `/api/auth/register/babysitter` | Non |
| Parent +1 | POST | `/api/auth/register/parent` | Non |
| Login Babys | POST | `/api/auth/login` | Non |


### Résultats

Tous les résultats sont affichés dans la **console du navigateur** (`F12` → Console).

---

## Problèmes fréquents

### Erreur CORS
Le backend doit avoir `cors()` activé **avant** les routes :
```typescript
import cors from "cors";
app.use(cors()); // avant app.use('/api', ...)
```

### `exports is not defined`
Le `tsconfig.json` utilise le mauvais `module`. Vérifie que `"module": "ES6"` est bien présent et que le `<script>` dans le HTML a `type="module"` :
```html
<script src="app.js" type="module"></script>
```

### Le bouton ne répond pas
Vérifier que le bouton a bien un `id` (pas une `class`) dans le HTML :
```html
<button id="addBabysitter">Babys +1</button>
```

### Cache navigateur
Forcer le rechargement sans cache :
```
Ctrl + Shift + R
```
