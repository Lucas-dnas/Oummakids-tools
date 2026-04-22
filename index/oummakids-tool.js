var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { socketVariable, token } from "../src/ts/AsyncFunctions/asyncFunctions.js";
import { funcitons } from "../src/ts/functions/functions.js";
import { AsyncFunctions } from "../src/ts/AsyncFunctions/asyncFunctions.js";
// Constantes
const addBabysitter = document.getElementById('addBabysitter');
const addParent = document.getElementById('addParent');
const getProfile = document.getElementById('getProfile');
const createChat = document.getElementById('createChat');
const deleteUser = document.getElementById('deleteUser');
const selectAllUsers = document.getElementById('selectAllUsers');
const selectAllBabysitters = document.getElementById('selectAllBabysitters');
const selectAllParents = document.getElementById('selectAllParents');
const getProfileBabysitter = document.getElementById('getProfileBabysitter');
const incrementParent = document.getElementById('incrementParent');
const incrementBabysitter = document.getElementById('incrementBabysitter');
const deleteChat = document.getElementById('deleteChat');
const getAllChats = document.getElementById('getAllChats');
const getChat = document.getElementById('getChat');
const Login = document.getElementById('Login');
const getParentProfile = document.getElementById('parentProfile');
const sendMessage = document.getElementById('sendMessage');
// Variables
let numParent = 1;
let numBabysitter = 1;
// AddEnventListene
// Increments numParent or numBabysitter
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
// Add User
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
// Login
Login === null || Login === void 0 ? void 0 : Login.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    yield AsyncFunctions.login();
}));
// GET something
getProfile === null || getProfile === void 0 ? void 0 : getProfile.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch('http://localhost:3000/api/profile', {
            method: "GET",
            headers: funcitons.header(token)
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
getProfileBabysitter === null || getProfileBabysitter === void 0 ? void 0 : getProfileBabysitter.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const select = document.getElementById('selectProfileBabysitter');
        const id = Number(select.value);
        const response = yield fetch(`http://localhost:3000/api/babysitters/${id}`, {
            method: "GET",
            headers: funcitons.header(token)
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
getAllChats === null || getAllChats === void 0 ? void 0 : getAllChats.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    yield AsyncFunctions.login();
}));
getChat === null || getChat === void 0 ? void 0 : getChat.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const select = document.getElementById('selectChat');
        const id = Number(select === null || select === void 0 ? void 0 : select.value);
        const response = yield fetch(`http://localhost:3000/api/profile/chats/${id}`, {
            method: "GET",
            headers: funcitons.header(token)
        });
        const chat = yield response.json();
        if (response.ok) {
            console.log(chat);
        }
        else {
            console.error("Error HTTP", response.status, response.body);
        }
    }
    catch (error) {
        console.error(error);
    }
}));
getParentProfile === null || getParentProfile === void 0 ? void 0 : getParentProfile.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const select = document.getElementById('selectParentProfile');
        const id = Number(select === null || select === void 0 ? void 0 : select.value);
        const response = yield fetch(`http://localhost:3000/api/parent/${id}`, {
            headers: funcitons.header(token)
        });
        const data = yield response.json();
        if (response.ok) {
            console.log(data);
        }
        else {
            console.error("Error HTTP on parent Profile", response.status, response.body);
        }
    }
    catch (error) {
        console.error(error);
    }
}));
// Send message
sendMessage === null || sendMessage === void 0 ? void 0 : sendMessage.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const select = document.getElementById('selectSendMessage');
        const input = document.getElementById('inputSendMessage');
        const user = yield AsyncFunctions.getUser();
        socketVariable.emit('sendMessage', {
            content: input.value,
            idChat: Number(select.value)
        });
    }
    catch (error) {
        console.log(error);
    }
}));
// Create chat
createChat === null || createChat === void 0 ? void 0 : createChat.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const select = document.getElementById('selectCreateChat');
        const id = Number(select === null || select === void 0 ? void 0 : select.value);
        const response = yield fetch(`http://localhost:3000/api/profile/chats/${id}`, {
            method: "POST",
            headers: funcitons.header(token)
        });
        const data = yield response.json();
        if (response.ok || (response.status === 201)) {
            console.log('Dans le mille émile!');
            console.log(data);
            const selectSendMessage = document.getElementById('selectSendMessage');
            const option = document.createElement('option');
            option.value = data.chat.chat.idChat;
            option.innerHTML = `idBabysitter: ${id}`;
            selectSendMessage === null || selectSendMessage === void 0 ? void 0 : selectSendMessage.appendChild(option);
            socketVariable.emit('joinChat', { idChat: data.chat.chat.idChat });
        }
        else {
            console.error("Error HTTP", response.status);
        }
    }
    catch (error) {
        console.error(error);
    }
}));
// DELETE something
deleteUser === null || deleteUser === void 0 ? void 0 : deleteUser.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch('http://localhost:3000/api/profile', {
            method: "DELETE",
            headers: funcitons.header(token)
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
            headers: funcitons.header(token)
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
// SELECT something
selectAllParents === null || selectAllParents === void 0 ? void 0 : selectAllParents.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch('http://localhost:3000/api/profile/admin/getAllParents', {
            method: "GET",
            headers: funcitons.header(token)
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
    yield AsyncFunctions.getAllBabysitters();
}));
selectAllUsers === null || selectAllUsers === void 0 ? void 0 : selectAllUsers.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch('http://localhost:3000/api/profile/admin/getAllUsers', {
            method: "GET",
            headers: funcitons.header(token)
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
//# sourceMappingURL=oummakids-tool.js.map