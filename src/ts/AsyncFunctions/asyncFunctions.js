var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { funcitons } from "../functions/functions.js";
export let token;
export let socketVariable;
export const AsyncFunctions = {
    getUser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch('http://localhost:3000/api/profile', {
                    method: "GET",
                    headers: funcitons.header(token)
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
                const response = yield fetch('http://localhost:3000/api/profile/chats', {
                    method: "GET",
                    headers: funcitons.header(token),
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
                }
                return chats;
            }
            catch (error) {
                console.error(error);
            }
        });
    },
    getAllBabysitters() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch('http://localhost:3000/api/babysitters', {
                    method: "GET",
                    headers: funcitons.header(token)
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
                const response = yield fetch('http://localhost:3000/api/profile/admin/getAllUsers', { method: "GET", headers: funcitons.header(token) });
                const data = yield response.json();
                if (response.ok) {
                    console.log(data);
                    select.innerHTML = '<option value="">-- Sélectionner un user pour se login --</option>';
                    const admin = funcitons.loadThreeFirstUsersCredentials('admin');
                    const parent = funcitons.loadThreeFirstUsersCredentials('parent');
                    const babysitter = funcitons.loadThreeFirstUsersCredentials('babysitter');
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
                const response = yield fetch('http://localhost:3000/api/auth/login', {
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
                    funcitons.header(token);
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
                    yield this.createUpdateProfileFields();
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
                const response = yield fetch('http://localhost:3000/api/babysitters', {
                    method: "GET",
                    headers: funcitons.header(token)
                });
                const dataBabysitter = yield response.json();
                funcitons.createOptionBabysitter(dataBabysitter);
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
                console.log(user);
                const divImgProfile = document.getElementById('imgProfile');
                const selectImg = document.getElementById('imgProfileElement');
                if (selectImg) {
                    selectImg.remove();
                }
                if (divImgProfile === null || divImgProfile === undefined) {
                    return;
                }
                yield fetch(`http://localhost:3000/api${user.user.imgProfile}`, {
                    method: 'GET',
                    headers: funcitons.header(token)
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
                const response = yield fetch('http://localhost:3000/api/profile', {
                    method: "PUT",
                    headers: funcitons.header(token, true),
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
    // update profile
    createUpdateProfileFields() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
            try {
                document.getElementById('firstName').value = '';
                document.getElementById('lastName').value = '';
                document.getElementById('address').value = '';
                document.getElementById('city').value = '';
                document.getElementById('postalCode').value = '';
                document.getElementById('description').value = '';
                document.getElementById('children').value = '';
                document.getElementById('rate').value = '';
                // (document.getElementById('availabilities') as HTMLInputElement).value = '';
                const user = yield this.getUser();
                const u = user.user;
                document.getElementById('firstName').value = (_a = u.firstName) !== null && _a !== void 0 ? _a : '';
                document.getElementById('lastName').value = (_b = u.lastName) !== null && _b !== void 0 ? _b : '';
                document.getElementById('address').value = (_c = u.address) !== null && _c !== void 0 ? _c : '';
                document.getElementById('city').value = (_d = u.city) !== null && _d !== void 0 ? _d : '';
                document.getElementById('postalCode').value = (_e = u.postalCode) !== null && _e !== void 0 ? _e : '';
                document.getElementById('description').value = (_f = u.description) !== null && _f !== void 0 ? _f : '';
                if (user.user.parent !== null) {
                    document.getElementById('children').value = (_g = u.parent.children) !== null && _g !== void 0 ? _g : '';
                }
                else {
                    document.getElementById('rate').value = (_h = u.babysitter.rate) !== null && _h !== void 0 ? _h : '';
                    document.getElementById('availabilities').value = (_j = u.babysitter.availability) !== null && _j !== void 0 ? _j : '';
                }
            }
            catch (error) {
                console.error(error);
                throw new Error(error);
            }
        });
    },
    // Sent data for update profile
    updateProfile(firstName, lastName, address, city, postalCode, description, children, rate) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
};
//# sourceMappingURL=asyncFunctions.js.map