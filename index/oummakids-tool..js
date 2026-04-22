var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let token;
function header(token) {
    let header = new Headers({
        "Content-type": "application/json",
        "Authorization": "Bearer " + token
    });
    return header;
}
const addBabysitter = document.getElementById('addBabysitter');
const addParent = document.getElementById('addParent');
const loginAdmin = document.getElementById('loginAdmin');
const loginParent = document.getElementById('loginParent');
const loginBabys = document.getElementById('loginBabys');
const getProfile = document.getElementById('getProfile');
const selectSendMessage = document.getElementById('selectSendMessage');
const deleteUser = document.getElementById('deleteUser');
const selectAllUsers = document.getElementById('selectAllUsers');
const selectAllBabysitters = document.getElementById('selectAllBabysitters');
const selectAllParents = document.getElementById('selectAllParents');
const getProfileBabysitter = document.getElementById('getProfileBabysitter');
const incrementParent = document.getElementById('incrementParent');
const incrementBabysitter = document.getElementById('incrementBabysitter');
const deleteChat = document.getElementById('deleteChat');
const selects = document.querySelectorAll('select');
let numParent = 0;
let numBabysitter = 0;
incrementParent === null || incrementParent === void 0 ? void 0 : incrementParent.addEventListener('click', () => {
    console.log(numParent);
    numParent++;
    console.log('New num:' + numParent);
});
incrementBabysitter === null || incrementBabysitter === void 0 ? void 0 : incrementBabysitter.addEventListener('click', () => {
    console.log(numBabysitter);
    numBabysitter++;
    console.log('New num:' + numBabysitter);
});
addParent === null || addParent === void 0 ? void 0 : addParent.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch('http://localhost:3000/api/auth/register/parent', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                "email": "new@parent" + numParent + ".com",
                "password": "test",
                "firstName": "parent  " + numParent,
                "lastName": "test",
                "address": "adressetest",
                "city": "citytest",
                "postalCode": "56000",
                "description": "description test",
                "children": 3
            })
        });
        const data = yield response.json(); // any car pas de types back
        if (response.ok) {
            console.log("✓ Succès");
            numParent++;
        }
        else {
            console.error("Erreur HTTP", response.status, data);
        }
    }
    catch (error) {
        console.error(error);
    }
}));
addBabysitter === null || addBabysitter === void 0 ? void 0 : addBabysitter.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const num = Math.trunc(Math.random() * 100);
        const response = yield fetch('http://localhost:3000/api/auth/register/babysitter', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                "email": "new@babysitter" + numBabysitter + ".com",
                "password": "test",
                "firstName": "babysitter " + numBabysitter,
                "lastName": "test",
                "address": "adressetest",
                "city": "citytest",
                "postalCode": "56000",
                "description": "description test",
                "rate": 14.5
            })
        });
        const data = yield response.json(); // any car pas de types back
        if (response.ok) {
            console.log("✓ Succès");
            numBabysitter++;
        }
        else {
            console.error("Erreur HTTP", response.status, data);
        }
    }
    catch (error) {
        console.error(error);
    }
}));
loginAdmin === null || loginAdmin === void 0 ? void 0 : loginAdmin.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch('http://localhost:3000/api/auth/login', {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                "email": "admin@test.com",
                "password": "password123"
            })
        });
        const data = yield response.json();
        if (response.ok) {
            console.log("Yessir! Good Sir! 🫡");
            console.log(data);
            token = data.user.token;
            header(token);
        }
        else {
            console.error("Erreur HTTP", response.status, data);
        }
    }
    catch (error) {
        console.error(error);
    }
}));
loginParent === null || loginParent === void 0 ? void 0 : loginParent.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch('http://localhost:3000/api/auth/login', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                "email": "parent@test.com",
                "password": "password123"
            })
        });
        const data = yield response.json(); // any car pas de types back
        if (response.ok) {
            console.log("You did it!");
            console.log(data);
            console.log(data.user.token);
            token = data.user.token;
            header(token);
        }
        else {
            console.error("Error HTTP", response.status, data);
        }
    }
    catch (error) {
        console.error(error);
    }
}));
loginBabys === null || loginBabys === void 0 ? void 0 : loginBabys.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch('http://localhost:3000/api/auth/login', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                "email": "babysitter@test.com",
                "password": "password123"
            })
        });
        const data = yield response.json();
        // any car pas de types back
        if (response.ok) {
            console.log("You did it baby!");
            console.log(data);
            console.log(data.user.token);
            token = data.user.token;
            header(token);
        }
        else {
            console.error("Error HTTP", response.status);
        }
    }
    catch (error) {
        console.error(error);
    }
}));
getProfile === null || getProfile === void 0 ? void 0 : getProfile.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch('http://localhost:3000/api/profile', {
            method: "GET",
            headers: header(token)
        });
        const profile = yield response.json();
        if (response.ok) {
            console.log('Fortiche le british');
            console.log(profile);
        }
        else {
            console.error("Error HTTP", response.status);
        }
    }
    catch (error) {
        console.error(error);
    }
}));
selectSendMessage === null || selectSendMessage === void 0 ? void 0 : selectSendMessage.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const select = document.getElementById('selectSendMessage');
        const id = Number(select === null || select === void 0 ? void 0 : select.value);
        const response = yield fetch(`http://localhost:3000/api/profile/chats/${id}`, {
            method: "POST",
            headers: header(token),
            body: JSON.stringify({
                content: "hey man"
            })
        });
        const data = yield response.json();
        if (response.ok || (response.status === 201)) {
            console.log('Dans le mille émile!');
            console.log(data);
        }
        else {
            console.error("Error HTTP", response.status);
        }
    }
    catch (error) {
        console.error(error);
    }
}));
deleteUser === null || deleteUser === void 0 ? void 0 : deleteUser.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch('http://localhost:3000/api/profile', {
            method: "DELETE",
            headers: header(token)
        });
        if (response.status === 204) {
            console.log("You died");
        }
        else {
            console.error("Error HTTP", response.status);
        }
    }
    catch (error) {
        console.error(error);
    }
}));
deleteChat === null || deleteChat === void 0 ? void 0 : deleteChat.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const select = document.getElementById('selectDeleteChat');
        const id = Number(select.value);
        if (!id) {
            console.log('Id missing for deleted chat');
        }
        const response = yield fetch(`http://localhost:3000/api/profile/chats/${id}`, {
            method: "DELETE",
            headers: header(token)
        });
        if (response.status === 204) {
            console.log("Chat killed!");
        }
        else {
            console.error("Error HTTP", response.status);
        }
    }
    catch (error) {
        console.error(error);
    }
}));
// getAllChat?.addBabysitter('click', async () => {
// })
// logout?.addEventListener('click', async () => {
//     await
// });
selectAllParents === null || selectAllParents === void 0 ? void 0 : selectAllParents.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch('http://localhost:3000/api/profile/admin/getAllParents', {
            method: "GET",
            headers: header(token)
        });
        const data = yield response.json();
        if (response.ok) {
            console.log(data);
        }
        else {
            console.error("Error HTTP", response.status, response.body);
        }
    }
    catch (error) {
        console.error(error);
    }
}));
selectAllBabysitters === null || selectAllBabysitters === void 0 ? void 0 : selectAllBabysitters.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch('http://localhost:3000/api/babysitters', {
            method: "GET",
            headers: header(token)
        });
        const data = yield response.json();
        if (response.ok) {
            console.log(data);
        }
        else {
            console.error("Error HTTP", response.status, response.body);
        }
    }
    catch (error) {
        console.error(error);
    }
}));
selectAllUsers === null || selectAllUsers === void 0 ? void 0 : selectAllUsers.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch('http://localhost:3000/api/profile/admin/getAllUsers', {
            method: "GET",
            headers: header(token)
        });
        const data = yield response.json();
        if (response.ok) {
            console.log(data);
        }
        else {
            console.error("Error HTTP", response.status);
        }
    }
    catch (error) {
        console.error(error);
    }
}));
getProfileBabysitter === null || getProfileBabysitter === void 0 ? void 0 : getProfileBabysitter.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const select = document.getElementById('selectProfileBabysitter');
        const id = Number(select.value);
        const response = yield fetch(`http://localhost:3000/api/babysitters/${id}`, {
            method: "GET",
            headers: header(token)
        });
        const data = yield response.json();
        if (response.ok) {
            console.log(data);
        }
        else {
            console.error("Error HTTP", response.status, response.body);
        }
    }
    catch (error) {
        console.error(error);
    }
}));
function loadUser() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('http://localhost:3000/api/profile/admin/getAllUsers', { method: "GET", headers: header(token) });
            const data = yield response.json();
            if (response.ok) {
                console.log(data);
            }
            selects.forEach((select) => {
                select.innerHTML = '<option value="">-- Sélectionner un user --</option>';
                data.forEach((user) => {
                    const option = document.createElement('option');
                    option.value = user.idUser;
                    option.innerHTML = `[ ${user.idUser} - ${user.role}]`;
                    select.appendChild(option);
                });
            });
        }
        catch (error) {
            console.error(error);
        }
    });
}
const loadUserBtn = document.getElementById('loadUser');
loadUserBtn === null || loadUserBtn === void 0 ? void 0 : loadUserBtn.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    yield loadUser();
}));
export {};
// async function loadBabysitter() {
//     try {
//         const response: Response = await fetch('http://localhost:3000/api/babysitters', { method: "GET", headers: header(token) });
//         const data: any = await response.json();
//         if (response.ok) {
//             console.log(data);
//         }
//         const select: HTMLElement = document.getElementById('selectBabysitter') as HTMLSelectElement;
//         select.innerHTML = '<option value="">-- Sélectionner un user --</option>';
//         data.users.forEach((user: any) => {
//             const option = document.createElement('option');
//             option.value = user.id;
//             option.textContent = `[ ${user.idUser} - ${user.role}]`;
//             select.appendChild(option);
//         });
//     } catch (error: any) {
//         console.error(error)
//     }
// }
// async function selectForNewChat() {
//     try {
//         const response: Response = await fetch('http://localhost:3000/api/profile/admin/getAllUsers', { method: "GET", headers: header(token) });
//         const data: any = await response.json();
//         if (response.ok) {
//             console.log(data);
//         }
//         const select: HTMLElement = document.getElementById('selectBabysitter') as HTMLSelectElement;
//         select.innerHTML = '<option value="">-- Sélectionner un user --</option>';
//         data.users.forEach((user: any) => {
//             const option = document.createElement('option');
//             option.value = user.id;
//             option.textContent = `[ ${user.idUser} - ${user.role}]`;
//             select.appendChild(option);
//         });
//     } catch (error: any) {
//         console.error(error)
//     }
// }
//# sourceMappingURL=Admin.js.map