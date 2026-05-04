var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { AsyncFunctions, socketVariable, token } from "../src/ts/AsyncFunctions/asyncFunctions.js";
import { functions } from "../src/ts/functions/functions.js";
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
const inputImg = document.getElementById('inputImg');
const imgProfileBtn = document.getElementById('imgProfileBtn');
const updateProfileBtn = document.getElementById('updateProfileBtn');
const forgotBtn = document.getElementById('forgotBtn');
// Variables
let numParent = 1;
let numBabysitter = 1;
// AddEnventListene
// Increments numParent
incrementParent === null || incrementParent === void 0 ? void 0 : incrementParent.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(numParent);
    numParent++;
    console.log('New num:' + numParent);
});
// Increments numBabysitter
incrementBabysitter === null || incrementBabysitter === void 0 ? void 0 : incrementBabysitter.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(numBabysitter);
    numBabysitter++;
    console.log('New num:' + numBabysitter);
});
// Add User
addParent === null || addParent === void 0 ? void 0 : addParent.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
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
addBabysitter === null || addBabysitter === void 0 ? void 0 : addBabysitter.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
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
// GET
// get profile
getProfile === null || getProfile === void 0 ? void 0 : getProfile.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    try {
        const response = yield fetch('http://localhost:3000/api/profile', {
            method: "GET",
            headers: functions.header(token)
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
// get babysitter profile
getProfileBabysitter === null || getProfileBabysitter === void 0 ? void 0 : getProfileBabysitter.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    try {
        const select = document.getElementById('selectProfileBabysitter');
        const id = Number(select.value);
        const response = yield fetch(`http://localhost:3000/api/babysitters/${id}`, {
            method: "GET",
            headers: functions.header(token)
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
// get all chats of this user
getAllChats === null || getAllChats === void 0 ? void 0 : getAllChats.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    yield AsyncFunctions.login();
}));
//get one chat of this user
getChat === null || getChat === void 0 ? void 0 : getChat.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    try {
        const select = document.getElementById('selectChat');
        const id = Number(select === null || select === void 0 ? void 0 : select.value);
        const response = yield fetch(`http://localhost:3000/api/profile/chats/${id}`, {
            method: "GET",
            headers: functions.header(token)
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
//get a parent profile, if the babysitter has a chat with him
getParentProfile === null || getParentProfile === void 0 ? void 0 : getParentProfile.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    try {
        const select = document.getElementById('selectParentProfile');
        const id = Number(select === null || select === void 0 ? void 0 : select.value);
        const response = yield fetch(`http://localhost:3000/api/parent/${id}`, {
            headers: functions.header(token)
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
// DELETE something
// delete this user
deleteUser === null || deleteUser === void 0 ? void 0 : deleteUser.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    try {
        const response = yield fetch('http://localhost:3000/api/profile', {
            method: "DELETE",
            headers: functions.header(token)
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
// delete the chat selected
deleteChat === null || deleteChat === void 0 ? void 0 : deleteChat.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    try {
        const select = document.getElementById('selectDeleteChat');
        const id = Number(select.value);
        if (!id) {
            console.log('Id missing for deleted chat');
        }
        const response = yield fetch(`http://localhost:3000/api/profile/chats/${id}`, {
            method: "DELETE",
            headers: functions.header(token)
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
// ADMIN: Select all parents
selectAllParents === null || selectAllParents === void 0 ? void 0 : selectAllParents.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    try {
        const response = yield fetch('http://localhost:3000/api/profile/admin/getAllParents', {
            method: "GET",
            headers: functions.header(token)
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
// Select all babysitters
selectAllBabysitters === null || selectAllBabysitters === void 0 ? void 0 : selectAllBabysitters.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    yield AsyncFunctions.getAllBabysitters();
}));
// ADMIN: Select all users
selectAllUsers === null || selectAllUsers === void 0 ? void 0 : selectAllUsers.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    try {
        const response = yield fetch('http://localhost:3000/api/profile/admin/getAllUsers', {
            method: "GET",
            headers: functions.header(token)
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
// POST
// Login
Login === null || Login === void 0 ? void 0 : Login.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    yield AsyncFunctions.login();
}));
// Send message
sendMessage === null || sendMessage === void 0 ? void 0 : sendMessage.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    try {
        const select = document.getElementById('selectSendMessage');
        const input = document.getElementById('inputSendMessage');
        socketVariable.emit('sendMessage', {
            content: input.value,
            idChat: Number(select.value)
        });
    }
    catch (error) {
        console.log(error);
    }
}));
// PARENT: Create chat
createChat === null || createChat === void 0 ? void 0 : createChat.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    try {
        const select = document.getElementById('selectCreateChat');
        const id = Number(select === null || select === void 0 ? void 0 : select.value);
        const response = yield fetch(`http://localhost:3000/api/profile/chats/${id}`, {
            method: "POST",
            headers: functions.header(token)
        });
        const data = yield response.json();
        if (response.ok || (response.status === 201)) {
            console.log('Dans le mille émile!');
            console.log(data);
            functions.createChat(data, id);
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
// Modification of img profile
let file;
inputImg === null || inputImg === void 0 ? void 0 : inputImg.addEventListener('change', (e) => {
    var _a;
    e.preventDefault();
    file = (_a = inputImg.files) === null || _a === void 0 ? void 0 : _a[0];
    console.log(file);
});
inputImg === null || inputImg === void 0 ? void 0 : inputImg.addEventListener('dragover', (e) => {
    var _a;
    e.preventDefault();
    file = (_a = inputImg.files) === null || _a === void 0 ? void 0 : _a[0];
    console.log(file);
});
imgProfileBtn === null || imgProfileBtn === void 0 ? void 0 : imgProfileBtn.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    if (!file || file === undefined) {
        console.error('No such file');
        return;
    }
    console.log(AsyncFunctions.profileImg(file));
    return;
}));
forgotBtn === null || forgotBtn === void 0 ? void 0 : forgotBtn.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const email = document.getElementById('emailRecovery');
    const response = yield fetch('http://localhost:3000/api/auth/recovery/password', {
        method: "POST",
        headers: functions.header(null),
        body: JSON.stringify({
            email: email.value
        })
    });
    const data = yield response.json();
    console.log(data);
}));
updateProfileBtn === null || updateProfileBtn === void 0 ? void 0 : updateProfileBtn.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const address = document.getElementById('address');
    const city = document.getElementById('city');
    const postalCode = document.getElementById('postalCode');
    const description = document.getElementById('description');
    const children = document.getElementById('children');
    const rate = document.getElementById('rate');
    // const availabilities = document.getElementById('availabilities') as HTMLInputElement;
    yield AsyncFunctions.updateProfile(firstName.value, lastName.value, address.value, city.value, postalCode.value, description.value, Number(children.value), Number(rate.value));
}));
//# sourceMappingURL=oummakids-tool.js.map