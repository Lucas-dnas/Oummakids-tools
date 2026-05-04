
export const functions = {
    header(token: string | null, upload?: boolean): Headers {
        try {
            if (upload) {
                return new Headers({
                    "Authorization": "Bearer " + (token ? token : {})
                });
            }
            return new Headers({
                "Content-type": "application/json",
                "Authorization": "Bearer " + (token ? token : {}),
                "X-Content-Type-Options": "text/html"
            });
        } catch (error: any) {
            console.error(error);
            return error;
        }
    },
    loadThreeFirstUsersCredentials(user: string): HTMLOptionElement {
        try {
            const option: any = document.createElement('option');
            option.innerHTML = user;
            option.value = user + '@test.com password123';
            return option;
        } catch (error: any) {
            console.error(error);
            throw new Error(error);
        }
    },
    createChat(data: any, id: number) {
        try {
            const selectSendMessage = document.getElementById('selectSendMessage');
            const option = document.createElement('option');
            option.value = data.chat.chat.idChat;
            option.innerHTML = `idBabysitter: ${id}`
            selectSendMessage?.appendChild(option);
        } catch (error: any) {
            console.error(error);
            throw new Error(error);
        }
    },
    createOptionBabysitter(dataBabysitter: any) {
        try {
            const selectAllBabysitters = document.getElementById('selectProfileBabysitter') as HTMLSelectElement;
            selectAllBabysitters.innerHTML = '<option value="">-- Sélectionner un babysitter --</option>';

            dataBabysitter.babysitters.forEach((babysitter: any) => {
                const option = document.createElement('option');
                option.value = babysitter.idUser;
                option.innerHTML = `[idBabysitter: ${babysitter.idUser}]`;
                selectAllBabysitters.appendChild(option);
            });
        } catch (error: any) {
            console.error(error);
            throw new Error(error);

        }
    }
}