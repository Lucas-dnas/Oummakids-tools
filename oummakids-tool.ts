
// Constantes
const addBabysitter = document.getElementById('addBabysitter') as HTMLSelectElement;
const addParent = document.getElementById('addParent') as HTMLSelectElement;
const loginAdmin = document.getElementById('loginAdmin') as HTMLSelectElement;
const loginParent = document.getElementById('loginParent') as HTMLSelectElement;
const loginBabys = document.getElementById('loginBabys') as HTMLSelectElement;
const getProfile = document.getElementById('getProfile') as HTMLSelectElement;
const selectSendMessage = document.getElementById('selectSendMessage') as HTMLSelectElement;
const deleteUser = document.getElementById('deleteUser') as HTMLSelectElement;
const selectAllUsers = document.getElementById('selectAllUsers') as HTMLSelectElement;
const selectAllBabysitters = document.getElementById('selectAllBabysitters') as HTMLSelectElement;
const selectAllParents = document.getElementById('selectAllParents') as HTMLSelectElement;
const getProfileBabysitter = document.getElementById('getProfileBabysitter') as HTMLSelectElement;
const incrementParent = document.getElementById('incrementParent') as HTMLSelectElement;
const incrementBabysitter = document.getElementById('incrementBabysitter') as HTMLSelectElement;
const deleteChat = document.getElementById('deleteChat') as HTMLSelectElement;
const loadUserBtn = document.getElementById('loadUser') as HTMLSelectElement;
const getAllChats = document.getElementById('getAllChats') as HTMLSelectElement;
const getChat = document.getElementById('getChat') as HTMLSelectElement;
const selects = document.querySelectorAll('select');


// Variables
let token: string;
let numParent = 0;
let numBabysitter = 0;


// AddEnventListener
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
        const num: number = Math.trunc(Math.random() * 100);
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
        })
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
loginAdmin?.addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(
                {
                    "email": "admin@test.com",
                    "password": "password123"
                }
            )
        });
        const data: any = await response.json();
        if (response.ok) {
            console.log("Yessir! Good Sir! 🫡");
            console.log(data);
            token = data.user.token;
            header(token)
            await getAllBabysitters();
        } else {
            console.error("Erreur HTTP", response.status, data);
        }
    } catch (error: any) {
        console.error(error)
    }
});
loginParent?.addEventListener('click', async () => {
    try {
        const response: Response = await fetch('http://localhost:3000/api/auth/login', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(
                {
                    "email": "parent@test.com",
                    "password": "password123"
                }
            )
        });

        const data: any = await response.json();  // any car pas de types back
        if (response.ok) {
            console.log("You did it!");
            console.log(data);
            console.log(data.user.token);
            token = data.user.token;
            header(token);

            await getAllChatsFunction();
            await getAllBabysitters();
            await deleteChatFunction();
            await sendMessageFunction();
        } else {
            console.error("Error HTTP", response.status, data);
        }
    } catch (error: any) {
        console.error(error)
    }
});
loginBabys?.addEventListener('click', async () => {
    try {
        const response: Response = await fetch('http://localhost:3000/api/auth/login', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(
                {
                    "email": "babysitter@test.com",
                    "password": "password123"
                }
            )
        })
        const data: any = await response.json();

        // any car pas de types back
        if (response.ok) {
            console.log("You did it baby!");
            console.log(data);
            console.log(data.user.token);
            token = data.user.token;
            header(token)

            await getAllChatsFunction();
            await deleteChatFunction();
            await sendMessageFunction();
        } else {
            console.error("Error HTTP", response.status);
        }
    } catch (error: any) {
        console.error(error)
    }
});
getProfile?.addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:3000/api/profile', {
            method: "GET",
            headers: header(token)
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
})


// problème coté front, backend fonctionnel
selectSendMessage?.addEventListener('click', async () => {
    try {
        const select = document.getElementById('selectSendMessage') as HTMLSelectElement;
        const id: number = Number(select?.value);
        const response: Response = await fetch(`http://localhost:3000/api/profile/chats/${id}`, {
            method: "POST",
            headers: header(token),
            body: JSON.stringify(
                {
                    content: "hey man"
                }
            )
        });
        const data = await response.json();
        if (response.ok || (response.status === 201)) {
            console.log('Dans le mille émile!');
            console.log(data);

        } else {
            console.error("Error HTTP", response.status);
        }
    } catch (error: any) {
        console.error(error);
    }
});
deleteUser?.addEventListener('click', async () => {
    try {
        const response: Response = await fetch('http://localhost:3000/api/profile', {
            method: "DELETE",
            headers: header(token)
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
            headers: header(token)
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
selectAllParents?.addEventListener('click', async () => {
    try {

        const response: Response = await fetch('http://localhost:3000/api/profile/admin/getAllParents', {
            method: "GET",
            headers: header(token)
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
    await getAllBabysitters();
});
selectAllUsers?.addEventListener('click', async () => {
    try {
        const response: Response = await fetch('http://localhost:3000/api/profile/admin/getAllUsers', {
            method: "GET",
            headers: header(token)
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
getProfileBabysitter?.addEventListener('click', async () => {
    try {
        const select = document.getElementById('selectProfileBabysitter') as HTMLSelectElement;
        const id: number = Number(select.value);
        const response: Response = await fetch(`http://localhost:3000/api/babysitters/${id}`, {
            method: "GET",
            headers: header(token)
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
loadUserBtn?.addEventListener('click', async () => {
    await loadUser();
});
getAllChats?.addEventListener('click', async () => {
    await getAllChatsFunction();
});
getChat?.addEventListener('click', async () => {
    try {
        const select = document.getElementById('selectChat') as HTMLSelectElement;
        const id: number = Number(select?.value);
        const response: Response = await fetch(`http://localhost:3000/api/profile/chats/${id}`, {
            method: "GET",
            headers: header(token)
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


// Functions
function header(token: string): Headers {
    let header: Headers = new Headers({
        "Content-type": "application/json",
        "Authorization": "Bearer " + token
    });
    return header;
}
async function loadUser() {
    try {
        const response: Response = await fetch('http://localhost:3000/api/profile/admin/getAllUsers', { method: "GET", headers: header(token) });
        const data: any = await response.json();

        if (response.ok) {
            console.log(data);
            for (const select of selects) {
                select.innerHTML = '<option value="">-- Sélectionner un user --</option>';
                data.users.forEach((user: any) => {
                    const option = document.createElement('option');
                    option.value = user.idUser;
                    option.innerHTML = `[ ${user.idUser} - ${user.role}]`;
                    select.appendChild(option);
                });
            }
        } else {
            console.error("Error HTTP on loadUser function", response.status, response.body);
        }
    } catch (error: any) {
        console.error(error)
    }
}
async function getUser() {
    try {
        const response = await fetch('http://localhost:3000/api/profile', {
            method: "GET",
            headers: header(token)
        });
        const profile: any = await response.json();

        if (response.ok) {
            return profile;
        } else {
            console.error("Error HTTP on getUser function", response.status);
        }
    } catch (error: any) {
        console.error(error);
    }
}
async function getAllChatsFunction() {
    try {
        const select = document.getElementById('selectChat') as HTMLSelectElement;
        const response: Response = await fetch('http://localhost:3000/api/profile/chats', {
            method: "GET",
            headers: header(token)
        });
        const chats: any = await response.json();
        const user: any = await getUser();
        if (response.ok && (user.parent !== null)) {
            select.innerHTML = '<option value="">-- Sélectionner un chat --</option>';
            chats.chats.forEach((chat: any) => {
                const option = document.createElement('option');
                option.value = chat.idChat;
                option.innerHTML = `[idBabysitter: ${chat.idBabysitter}]`;
                select.appendChild(option);
            });
        } else if (response.ok && (user.babysitter !== null)) {
            select.innerHTML = '<option value="">-- Sélectionner un chat --</option>';
            chats.chats.forEach((chat: any) => {
                const option = document.createElement('option');
                option.value = chat.idChat;
                option.innerHTML = `[ idParent: ${chat.idParent}]`;
                select.appendChild(option);
            });
        } else {
            console.error("Error HTTP", response.status, response.body);
            return;
        }
        console.log(chats);
        return chats;
    } catch (error: any) {
        console.error(error)
    }
}
async function deleteChatFunction() {
    try {
        const select = document.getElementById('selectDeleteChat') as HTMLSelectElement;
        const response: Response = await fetch('http://localhost:3000/api/profile/chats', {
            method: "GET",
            headers: header(token)
        });
        const chats: any = await response.json();
        if (response.ok) {
            select.innerHTML = '<option value="">-- Sélectionner un chat --</option>';
            chats.chats.forEach((chat: any) => {
                const option = document.createElement('option');
                option.value = chat.idChat;
                option.innerHTML = `[idBabysitter: ${chat.idBabysitter}]`;
                select.appendChild(option);
            });
        } else {
            console.error("Error HTTP", response.status, response.body);
            return;
        }
        console.log(chats);
        return chats;
    } catch (error: any) {
        console.error(error)
    }
}
async function getAllBabysitters() {
    try {
        const select = document.getElementById('selectProfileBabysitter') as HTMLSelectElement;
        const response: Response = await fetch('http://localhost:3000/api/babysitters', {
            method: "GET",
            headers: header(token)
        });
        const data: any = await response.json();
        if (response.ok) {
            select.innerHTML = '<option value="">-- Sélectionner un babysitter --</option>';
            data.babysitters.forEach((babysitter: any) => {
                const option = document.createElement('option');
                option.value = babysitter.idUser;
                option.innerHTML = `[idBabysitter: ${babysitter.idUser}]`;
                select.appendChild(option);
            });
            console.log(data);
            return data;
        } else {
            console.error("Error HTTP", response.status, response.body);
            return;
        }
    } catch (error: any) {
        console.error(error)
    }
}
async function sendMessageFunction() {
    try {
        const select = document.getElementById('selectSendMessage') as HTMLSelectElement;

        const user: any = await getUser();


        if (user.babysitter !== null) {
            const allChats: any = await getAllChatsFunction()
            select.innerHTML = '<option value="">-- Sélectionner un parent --</option>';
            allChats.chats.forEach((chat: any) => {
                const option = document.createElement('option');
                option.value = chat.idParent;
                option.innerHTML = `[idParent: ${chat.idParent}]`;
                select.appendChild(option);
            });
            return;
        }

        const response: Response = await fetch('http://localhost:3000/api/babysitters', {
            method: "GET",
            headers: header(token)
        });
        const data: any = await response.json();
        console.log(data);
        
        select.innerHTML = '<option value="">-- Sélectionner un babysitter --</option>';
        data.babysitters.forEach((babysitter: any) => {
            const option = document.createElement('option');
            option.value = babysitter.idUser;
            option.innerHTML = `idBabysitter: ${option.value}`;
            select.appendChild(option);
        });
        return;
    } catch (error: any) {
        console.error(error)
    }
}