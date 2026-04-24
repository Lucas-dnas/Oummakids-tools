import { funcitons } from "../functions/functions.js";

export let token: string;
export let socketVariable: any;
declare const io: any;

export const AsyncFunctions = {

    async getUser() {
        try {
            const response = await fetch('http://localhost:3000/api/profile', {
                method: "GET",
                headers: funcitons.header(token)
            });
            const profile: any = await response.json();

            if (response.ok) {
                return profile;
            } else {
                console.error("Error HTTP on getUser function", response.status);
                return;
            }
        } catch (error: any) {
            console.error(error);
        }
    },
    async getAllChatsFunction() {
        try {
            const select = document.getElementById('selectChat') as HTMLSelectElement;
            select.innerHTML = '<option value="">-- Sélectionner un chat --</option>';

            const selectDeleteChat = document.getElementById('selectDeleteChat') as HTMLSelectElement;
            selectDeleteChat.innerHTML = '<option value="">-- Sélectionner un chat --</option>';

            const response: Response = await fetch('http://localhost:3000/api/profile/chats', {
                method: "GET",
                headers: funcitons.header(token),
            });

            const chats: any = await response.json();
            const user: any = await this.getUser();

            if (response.ok && (user.parent !== null)) {
                chats.chats.forEach((chat: any) => {
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

            } else if (response.ok && (user.babysitter !== null)) {
                chats.chats.forEach((chat: any) => {
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

        } catch (error: any) {
            console.error(error)
        }
    },
    async getAllBabysitters(): Promise<any> {
        try {
            const response: Response = await fetch('http://localhost:3000/api/babysitters', {
                method: "GET",
                headers: funcitons.header(token)
            });
            const data: any = await response.json();
            if (response.ok) {
                console.log(data);
                return data;
            } else {
                console.error("Error HTTP", response.status, response.body);
                return;
            }
        } catch (error: any) {
            console.error(error)
        }
    },
    async sendMessageFunction(): Promise<void> {
        try {
            const select = document.getElementById('selectSendMessage') as HTMLSelectElement;

            const user: any = await this.getUser();
            if (user.babysitter !== null) {
                const allChats: any = await this.getAllChatsFunction()
                select.innerHTML = '<option value="">-- Sélectionner un parent --</option>';
                allChats.chats.forEach((chat: any) => {
                    const option = document.createElement('option');
                    option.value = chat.idChat;
                    option.innerHTML = `[idParent: ${chat.idChat}]`;
                    select.appendChild(option);
                });
                return
            }
            if (user.parent !== null) {
                const allChats: any = await this.getAllChatsFunction()
                select.innerHTML = '<option value="">-- Sélectionner un babysitter --</option>';
                allChats.chats.forEach((chat: any) => {
                    const option = document.createElement('option');
                    option.value = chat.idChat;
                    option.innerHTML = `idBabysitter: ${chat.idBabysitter}`;
                    select.appendChild(option);
                });
            }
            return;
        } catch (error: any) {
            console.error(error)
        }
    },
    async loginGeneratedUsers(): Promise<void> {
        try {
            const select = document.getElementById('selectLogin') as HTMLSelectElement;
            const response: Response = await fetch('http://localhost:3000/api/profile/admin/getAllUsers', { method: "GET", headers: funcitons.header(token) });
            const data: any = await response.json();

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
            } else {
                console.error("Error HTTP on loadUser function", response.status, response.body);
                return;
            }
        } catch (error: any) {
            console.error(error);
        }
    },
    async login(): Promise<void> {
        try {
            const select = document.getElementById('selectLogin') as HTMLSelectElement;
            const cerdentials: string[] = select.value.split(' ');

            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(
                    {
                        "email": cerdentials[0],
                        "password": cerdentials[1]
                    }
                )
            });
            const data: any = await response.json();
            if (response.ok) {
                console.log("Yessir! Good Sir! 🫡");
                console.log(data);
                token = data.user.token;
                funcitons.header(token)
                const socket = io("http://localhost:3000", {
                    auth: {
                        token: token
                    }
                });
                socketVariable = socket;

                socket.on('Error', async (error: any) => {
                    console.error(error);
                });

                socket.on('Success', async (data: any) => {
                    console.log(data);
                })

                if (cerdentials[0]?.includes('admin')) {
                    await this.loginGeneratedUsers();
                    return;
                }

                await this.loadHtmlElement();
                return;

            } else {
                console.error("Erreur HTTP", response.status, data);
                return;
            }
        } catch (error: any) {
            console.error(error)
        }
    },


    async loadHtmlElement() {
        try {
            const selectAllBabysitters = document.getElementById('selectProfileBabysitter') as HTMLSelectElement;
            const selectCreateChat = document.getElementById('selectCreateChat') as HTMLSelectElement;

            await this.sendMessageFunction();

            const chats = await this.getAllChatsFunction();

            for (const chat of chats.chats) {
                socketVariable.emit('joinChat', chat.idChat);
            }
            selectAllBabysitters.innerHTML = '<option value="">-- Sélectionner un babysitter --</option>';
            selectCreateChat.innerHTML = '<option value="">-- Sélectionner un babysitter --</option>';

            const response: Response = await fetch('http://localhost:3000/api/babysitters', {
                method: "GET",
                headers: funcitons.header(token)
            });
            const dataBabysitter: any = await response.json();
            dataBabysitter.babysitters.forEach((babysitter: any) => {
                const option = document.createElement('option');
                option.value = babysitter.idUser;
                option.innerHTML = `[idBabysitter: ${babysitter.idUser}]`;
                selectAllBabysitters.appendChild(option);
                selectCreateChat.appendChild(option.cloneNode(true));

            });

            const user: any = await this.getUser();
            if (user.babysitter !== null) {
                const selectParentProfile = document.getElementById('selectParentProfile') as HTMLSelectElement;
                selectParentProfile.innerHTML = '<option value="">-- Sélectionner un parent --</option>';

                chats.chats.forEach((chat: any) => {
                    const option = document.createElement('option');
                    option.value = chat.idParent;
                    option.innerHTML = `[idParent: ${chat.idParent}`;
                    selectParentProfile.appendChild(option);
                })
            }

            await this.createImgProfile(user);
            return;
        } catch (error: any) {
            console.error(error);
        }
    },

    async createImgProfile(user: any): Promise<void> {
        try {
            const divImgProfile = document.getElementById('imgProfile') as HTMLDivElement;
            const selectImg = document.getElementById('imgProfileElement') as HTMLImageElement;
            if (selectImg) {
                selectImg.remove();
            }
            console.log(divImgProfile);
            
            if (!divImgProfile) {
                return;
            }
            await fetch(`http://localhost:3000/api${user.user.imgProfile}`, {
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
        } catch (error: any) {
            console.error(error);
        }
    },

    async profileImg(file: File): Promise<void> {
        try {
            const formData: FormData = new FormData();
            console.log(file);

            formData.append('imgProfile', file);
            console.log(formData);

            const response: Response = await fetch('http://localhost:3000/api/profile', {
                method: "PUT",
                headers: funcitons.header(token, true),
                body: formData
            });

            const data = await response.json();
            console.log(data);
            return data;
        } catch (error: any) {
            console.error(error);
        }
    },
}