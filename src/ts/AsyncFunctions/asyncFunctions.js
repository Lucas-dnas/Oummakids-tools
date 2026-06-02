var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { functions } from "../functions/functions.js";
export let token;
export let socketVariable;
export const AsyncFunctions = {
    getUser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch('http://localhost:3000/profile', {
                    method: "GET",
                    headers: functions.header(token)
                });
                const profile = yield response.json();
                if (response.ok) {
                    return profile;
                }
                else {
                    console.error("Error HTTP on getUser function", response.status);
                    return;
                }
            }
            catch (error) {
                console.error(error);
            }
        });
    },
    getAllChatsFunction() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const select = document.getElementById('selectChat');
                select.innerHTML = '<option value="">-- Sélectionner un chat --</option>';
                const selectDeleteChat = document.getElementById('selectDeleteChat');
                selectDeleteChat.innerHTML = '<option value="">-- Sélectionner un chat --</option>';
                const response = yield fetch('http://localhost:3000/profile/chats', {
                    method: "GET",
                    headers: functions.header(token),
                });
                const chats = yield response.json();
                const user = yield this.getUser();
                if (response.ok && (user.parent !== null)) {
                    chats.chats.forEach((chat) => {
                        const option = document.createElement('option');
                        const optionDelete = document.createElement('option');
                        option.value = chat.idChat;
                        optionDelete.value = chat.idBabysitter;
                        option.innerHTML = `[idBabysitter: ${chat.idBabysitter}]`;
                        optionDelete.innerHTML = `[idBabysitter: ${chat.idBabysitter}]`;
                        select.appendChild(option);
                        selectDeleteChat.appendChild(optionDelete);
                    });
                    console.log(chats);
                    return chats;
                }
                else if (response.ok && (user.babysitter !== null)) {
                    chats.chats.forEach((chat) => {
                        const option = document.createElement('option');
                        const optionDelete = document.createElement('option');
                        option.value = chat.idChat;
                        optionDelete.value = chat.idParent;
                        option.innerHTML = `idParent: ${chat.idParent}`;
                        optionDelete.innerHTML = `idParent: ${chat.idParent}`;
                        select.appendChild(option);
                        selectDeleteChat.appendChild(optionDelete);
                    });
                    console.log(chats);
                    return chats;
                }
                return;
            }
            catch (error) {
                console.error(error);
            }
        });
    },
    getAllBabysitters() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch('http://localhost:3000/babysitters', {
                    method: "GET",
                    headers: functions.header(token)
                });
                const data = yield response.json();
                if (response.ok) {
                    console.log(data);
                    return data;
                }
                else {
                    console.error("Error HTTP", response.status, response.body);
                    return;
                }
            }
            catch (error) {
                console.error(error);
            }
        });
    },
    loadUsersForsendMessageFunction() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const select = document.getElementById('selectSendMessage');
                const user = yield this.getUser();
                if (user.babysitter !== null) {
                    const allChats = yield this.getAllChatsFunction();
                    select.innerHTML = '<option value="">-- Sélectionner un parent --</option>';
                    allChats.chats.forEach((chat) => {
                        const option = document.createElement('option');
                        option.value = chat.idChat;
                        option.innerHTML = `[idParent: ${chat.idChat}]`;
                        select.appendChild(option);
                    });
                    return;
                }
                if (user.parent !== null) {
                    const allChats = yield this.getAllChatsFunction();
                    select.innerHTML = '<option value="">-- Sélectionner un babysitter --</option>';
                    allChats.chats.forEach((chat) => {
                        const option = document.createElement('option');
                        option.value = chat.idChat;
                        option.innerHTML = `idBabysitter: ${chat.idBabysitter}`;
                        select.appendChild(option);
                    });
                }
                return;
            }
            catch (error) {
                console.error(error);
            }
        });
    },
    // Generate the 3 first user who be charged with fixtures (back-end side)
    loginGeneratedUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const select = document.getElementById('selectLogin');
                const response = yield fetch('http://localhost:3000/profile/admin/getAllUsers', { method: "GET", headers: functions.header(token) });
                const data = yield response.json();
                if (response.ok) {
                    console.log(data);
                    select.innerHTML = '<option value="">-- Sélectionner un user pour se login --</option>';
                    const admin = functions.loadThreeFirstUsersCredentials('admin');
                    const parent = functions.loadThreeFirstUsersCredentials('parent');
                    const babysitter = functions.loadThreeFirstUsersCredentials('babysitter');
                    for (const element of [admin, parent, babysitter]) {
                        select.appendChild(element);
                    }
                    for (let i = 3; i < data.users.length; i++) {
                        const user = data.users[i];
                        const option = document.createElement('option');
                        option.value = user.email + ' ' + 'test';
                        option.innerHTML = `[ ${user.idUser} - ${user.role}]`;
                        select.appendChild(option);
                    }
                    return;
                }
                else {
                    console.error("Error HTTP on loadUser function", response.status, response.body);
                    return;
                }
            }
            catch (error) {
                console.error(error);
            }
        });
    },
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const select = document.getElementById('selectLogin');
                const cerdentials = select.value.split(' ');
                const response = yield fetch('http://localhost:3000/auth/login', {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({
                        "email": cerdentials[0],
                        "password": cerdentials[1]
                    })
                });
                const data = yield response.json();
                if (response.ok) {
                    console.log("Yessir! Good Sir! 🫡");
                    console.log(data);
                    token = data.user.token;
                    functions.header(token);
                    const socket = io("http://localhost:3000", {
                        auth: {
                            token: token
                        }
                    });
                    socketVariable = socket;
                    socket.on('Error', (error) => __awaiter(this, void 0, void 0, function* () {
                        console.error(error);
                    }));
                    socket.on('Success', (data) => __awaiter(this, void 0, void 0, function* () {
                        console.log(data);
                    }));
                    if ((_a = cerdentials[0]) === null || _a === void 0 ? void 0 : _a.includes('admin')) {
                        yield this.loginGeneratedUsers();
                        return;
                    }
                    yield this.loadHtmlElement();
                    return;
                }
                else {
                    console.error("Erreur HTTP", response.status, data);
                    return;
                }
            }
            catch (error) {
                console.error(error);
            }
        });
    },
    // Load all element in selector
    loadHtmlElement() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const selectAllBabysitters = document.getElementById('selectProfileBabysitter');
                const selectCreateChat = document.getElementById('selectCreateChat');
                yield this.loadUsersForsendMessageFunction();
                const chats = yield this.getAllChatsFunction();
                for (const chat of chats.chats) {
                    socketVariable.emit('joinChat', chat.idChat);
                }
                selectAllBabysitters.innerHTML = '<option value="">-- Sélectionner un babysitter --</option>';
                selectCreateChat.innerHTML = '<option value="">-- Sélectionner un babysitter --</option>';
                const response = yield fetch('http://localhost:3000/babysitters', {
                    method: "GET",
                    headers: functions.header(token)
                });
                const dataBabysitter = yield response.json();
                dataBabysitter.babysitters.forEach((babysitter) => {
                    const option = document.createElement('option');
                    option.value = babysitter.idUser;
                    option.innerHTML = `[idBabysitter: ${babysitter.idUser}]`;
                    selectAllBabysitters.appendChild(option);
                    selectCreateChat.appendChild(option.cloneNode(true));
                });
                const user = yield this.getUser();
                if (user.babysitter !== null) {
                    const selectParentProfile = document.getElementById('selectParentProfile');
                    selectParentProfile.innerHTML = '<option value="">-- Sélectionner un parent --</option>';
                    chats.chats.forEach((chat) => {
                        const option = document.createElement('option');
                        option.value = chat.idParent;
                        option.innerHTML = `[idParent: ${chat.idParent}`;
                        selectParentProfile.appendChild(option);
                    });
                }
                yield this.createImgProfile(user);
                return;
            }
            catch (error) {
                console.error(error);
            }
        });
    },
    // Create html tag
    createImgProfile(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const divImgProfile = document.getElementById('imgProfile');
                const selectImg = document.getElementById('imgProfileElement');
                if (selectImg) {
                    selectImg.remove();
                }
                console.log(divImgProfile);
                if (!divImgProfile) {
                    return;
                }
                yield fetch(`http://localhost:3000/${user.user.imgProfile}`, {
                    method: 'GET',
                    headers: functions.header(token)
                })
                    .then(response => response.blob())
                    .then(blob => {
                    const imgUrl = URL.createObjectURL(blob);
                    const imgElement = document.createElement('img');
                    imgElement.src = imgUrl;
                    imgElement.id = 'imgProfileElement';
                    imgElement.className = 'imgProfile';
                    divImgProfile.appendChild(imgElement);
                })
                    .catch(error => console.error('Erreur:', error));
                return;
            }
            catch (error) {
                console.error(error);
            }
        });
    },
    // Update profile picture
    profileImg(file) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const formData = new FormData();
                console.log(file);
                formData.append('imgProfile', file);
                console.log(formData);
                const response = yield fetch('http://localhost:3000/profile', {
                    method: "PUT",
                    headers: functions.header(token, true),
                    body: formData
                });
                const data = yield response.json();
                console.log(data);
                return data;
            }
            catch (error) {
                console.error(error);
            }
        });
    },
};
//# sourceMappingURL=asyncFunctions.js.map