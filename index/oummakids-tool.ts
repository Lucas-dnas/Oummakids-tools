import { AsyncFunctions, socketVariable, token } from "../src/ts/AsyncFunctions/asyncFunctions.js";
import { funcitons } from "../src/ts/functions/functions.js";

// Constantes
const addBabysitter = document.getElementById('addBabysitter') as HTMLSelectElement;
const addParent = document.getElementById('addParent') as HTMLSelectElement;
const getProfile = document.getElementById('getProfile') as HTMLSelectElement;
const createChat = document.getElementById('createChat') as HTMLSelectElement;
const deleteUser = document.getElementById('deleteUser') as HTMLSelectElement;
const selectAllUsers = document.getElementById('selectAllUsers') as HTMLSelectElement;
const selectAllBabysitters = document.getElementById('selectAllBabysitters') as HTMLSelectElement;
const selectAllParents = document.getElementById('selectAllParents') as HTMLSelectElement;
const getProfileBabysitter = document.getElementById('getProfileBabysitter') as HTMLSelectElement;
const incrementParent = document.getElementById('incrementParent') as HTMLSelectElement;
const incrementBabysitter = document.getElementById('incrementBabysitter') as HTMLSelectElement;
const deleteChat = document.getElementById('deleteChat') as HTMLSelectElement;
const getAllChats = document.getElementById('getAllChats') as HTMLSelectElement;
const getChat = document.getElementById('getChat') as HTMLSelectElement;
const Login = document.getElementById('Login') as HTMLSelectElement;
const getParentProfile = document.getElementById('parentProfile') as HTMLSelectElement;
const sendMessage = document.getElementById('sendMessage') as HTMLSelectElement;
const inputImg = document.getElementById('inputImg') as HTMLInputElement;
const imgProfileBtn = document.getElementById('imgProfileBtn') as HTMLSelectElement;
const sectionUpdate = document.getElementById('section-update') as HTMLImageElement;

// Variables
let numParent = 1;
let numBabysitter = 1;


// AddEnventListene

// Increments numParent
incrementParent?.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(numParent);
    numParent++;
    console.log('New num:' + numParent);
});
// Increments numBabysitter
incrementBabysitter?.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(numBabysitter);
    numBabysitter++
    console.log('New num:' + numBabysitter);
});

// Add User
addParent?.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        const response: Response = await fetch('http://localhost:3000/api/auth/register/parent', {
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
        })
        const data: any = await response.json();  // any car pas de types back

        if (response.ok) {
            console.log("✓ Succès");
            numParent++;
        } else {
            console.error("Erreur HTTP", response.status, data);
        }
    } catch (error: any) {
        console.error(error)
    }
});

addBabysitter?.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        const response: Response = await fetch('http://localhost:3000/api/auth/register/babysitter', {
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
        const data: any = await response.json();  // any car pas de types back

        if (response.ok) {
            console.log("✓ Succès");
            numBabysitter++;
        } else {
            console.error("Erreur HTTP", response.status, data);
        }
    } catch (error: any) {
        console.error(error)
    }
});

// GET
// get profile
getProfile?.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:3000/api/profile', {
            method: "GET",
            headers: funcitons.header(token)
        });
        const profile = await response.json();

        if (response.ok) {
            console.log('Fortiche le british');
            console.log(profile);
        } else {
            console.error("Error HTTP", response.status);
        }
    } catch (error: any) {
        console.error(error);
    }
});
// get babysitter profile
getProfileBabysitter?.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        const select = document.getElementById('selectProfileBabysitter') as HTMLSelectElement;
        const id: number = Number(select.value);
        const response: Response = await fetch(`http://localhost:3000/api/babysitters/${id}`, {
            method: "GET",
            headers: funcitons.header(token)
        });
        const data: JSON = await response.json();
        if (response.ok) {
            console.log(data);
        } else {
            console.error("Error HTTP", response.status, response.body);
        }
    } catch (error: any) {
        console.error(error)
    }
});
// get all chats of this user
getAllChats?.addEventListener('click', async (e) => {
    e.preventDefault();
    await AsyncFunctions.login();
});
//get one chat of this user
getChat?.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        const select = document.getElementById('selectChat') as HTMLSelectElement;
        const id: number = Number(select?.value);

        const response: Response = await fetch(`http://localhost:3000/api/profile/chats/${id}`, {
            method: "GET",
            headers: funcitons.header(token)
        });
        const chat: JSON = await response.json();
        if (response.ok) {
            console.log(chat);
        } else {
            console.error("Error HTTP", response.status, response.body);
        }
    } catch (error: any) {
        console.error(error);
    }
});
//get a parent profile, if the babysitter has a chat with him
getParentProfile?.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        const select = document.getElementById('selectParentProfile') as HTMLSelectElement;
        const id: number = Number(select?.value);

        const response: Response = await fetch(`http://localhost:3000/api/parent/${id}`, {
            headers: funcitons.header(token)
        });

        const data: any = await response.json();
        if (response.ok) {
            console.log(data);
        } else {
            console.error("Error HTTP on parent Profile", response.status, response.body);
        }
    } catch (error: any) {
        console.error(error);
    }
});

// DELETE something
// delete this user
deleteUser?.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        const response: Response = await fetch('http://localhost:3000/api/profile', {
            method: "DELETE",
            headers: funcitons.header(token)
        });
        if (response.status === 204) {
            console.log("You died");
        } else {
            console.error("Error HTTP", response.status);
        }
    } catch (error: any) {
        console.error(error);
    }
});
// delete the chat selected
deleteChat?.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        const select = document.getElementById('selectDeleteChat') as HTMLSelectElement;
        const id: number = Number(select.value);
        if (!id) {
            console.log('Id missing for deleted chat');
        }
        const response: Response = await fetch(`http://localhost:3000/api/profile/chats/${id}`, {
            method: "DELETE",
            headers: funcitons.header(token)
        });
        if (response.status === 204) {
            console.log("Chat killed!");
        } else {
            console.error("Error HTTP", response.status);
        }
    } catch (error: any) {
        console.error(error);
    }
});

// SELECT something
// ADMIN: Select all parents
selectAllParents?.addEventListener('click', async (e) => {
    e.preventDefault();
    try {

        const response: Response = await fetch('http://localhost:3000/api/profile/admin/getAllParents', {
            method: "GET",
            headers: funcitons.header(token)
        });
        const data: JSON = await response.json();
        if (response.ok) {
            console.log(data);
        } else {
            console.error("Error HTTP", response.status, response.body);
        }
    } catch (error: any) {
        console.error(error)
    }
});
// Select all babysitters
selectAllBabysitters?.addEventListener('click', async (e) => {
    e.preventDefault();
    await AsyncFunctions.getAllBabysitters();
});
// ADMIN: Select all users
selectAllUsers?.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        const response: Response = await fetch('http://localhost:3000/api/profile/admin/getAllUsers', {
            method: "GET",
            headers: funcitons.header(token)
        });
        const data: JSON = await response.json();
        if (response.ok) {
            console.log(data);
        } else {
            console.error("Error HTTP", response.status);
        }
    } catch (error: any) {
        console.error(error);
    }
});

// POST
// Login
Login?.addEventListener('click', async (e) => {
    e.preventDefault();
    await AsyncFunctions.login();
});
// Send message
sendMessage?.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        const select = document.getElementById('selectSendMessage') as HTMLSelectElement;
        const input = document.getElementById('inputSendMessage') as HTMLSelectElement;

        const user = await AsyncFunctions.getUser();

        socketVariable.emit('sendMessage', {
            content: input.value,
            idChat: Number(select.value)
        });

    } catch (error: any) {
        console.log(error);
    }
});
// PARENT: Create chat
createChat?.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        const select = document.getElementById('selectCreateChat') as HTMLSelectElement;
        const id: number = Number(select?.value);
        const response: Response = await fetch(`http://localhost:3000/api/profile/chats/${id}`, {
            method: "POST",
            headers: funcitons.header(token)
        });

        const data = await response.json();
        if (response.ok || (response.status === 201)) {
            console.log('Dans le mille émile!');
            console.log(data);
            const selectSendMessage = document.getElementById('selectSendMessage');
            const option = document.createElement('option');
            option.value = data.chat.chat.idChat;
            option.innerHTML = `idBabysitter: ${id}`
            selectSendMessage?.appendChild(option);

            socketVariable.emit('joinChat', { idChat: data.chat.chat.idChat });
        } else {
            console.error("Error HTTP", response.status);
        }
    } catch (error: any) {
        console.error(error);
    }
});
// Modification of img profile
let file: File | undefined;
inputImg?.addEventListener('change', (e) => {
    e.preventDefault();
    file = inputImg.files?.[0];
    console.log(file);
});
inputImg?.addEventListener('dragover', (e) => {
    e.preventDefault();
    file = inputImg.files?.[0];
    console.log(file);
});

imgProfileBtn?.addEventListener('click', async (e) => {
    e.preventDefault();
    if (!file || file === undefined) {
        console.error('No such file');
        return;
    }
    console.log(AsyncFunctions.profileImg(file));
    return;
});
