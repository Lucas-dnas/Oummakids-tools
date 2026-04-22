import { socketVariable, token } from "../src/ts/AsyncFunctions/asyncFunctions.js";
import { funcitons } from "../src/ts/functions/functions.js";
import { AsyncFunctions } from "../src/ts/AsyncFunctions/asyncFunctions.js";

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
const sendMessage = document.getElementById('sendMessage');

// Variables
let numParent = 1;
let numBabysitter = 1;


// AddEnventListene

    // Increments numParent or numBabysitter
incrementParent?.addEventListener('click', () => {
    console.log(numParent);
    numParent++;
    console.log('New num:' + numParent);
});

incrementBabysitter?.addEventListener('click', () => {
    console.log(numBabysitter);
    numBabysitter++
    console.log('New num:' + numBabysitter);
});

// Add User
addParent?.addEventListener('click', async () => {
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

addBabysitter?.addEventListener('click', async () => {
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

// Login
Login?.addEventListener('click', async () => {
    await AsyncFunctions.login();
});

// GET something
getProfile?.addEventListener('click', async () => {
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

getProfileBabysitter?.addEventListener('click', async () => {
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

getAllChats?.addEventListener('click', async () => {
    await AsyncFunctions.login();
});

getChat?.addEventListener('click', async () => {
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

getParentProfile?.addEventListener('click', async () => {
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
// Send message
sendMessage?.addEventListener('click', async () => {
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
// Create chat
createChat?.addEventListener('click', async () => {
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

// DELETE something
deleteUser?.addEventListener('click', async () => {
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

deleteChat?.addEventListener('click', async () => {
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
selectAllParents?.addEventListener('click', async () => {
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

selectAllBabysitters?.addEventListener('click', async () => {
    await AsyncFunctions.getAllBabysitters();
});

selectAllUsers?.addEventListener('click', async () => {
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

