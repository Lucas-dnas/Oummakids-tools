export const funcitons = {
    header(token, upload) {
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
        }
        catch (error) {
            console.error(error);
            return error;
        }
    },
    loadThreeFirstUsersCredentials(user) {
        try {
            const option = document.createElement('option');
            option.innerHTML = user;
            option.value = user + '@test.com password123';
            return option;
        }
        catch (error) {
            console.error(error);
            throw new Error(error);
        }
    },
    createChat(data, id) {
        try {
            const selectSendMessage = document.getElementById('selectSendMessage');
            const option = document.createElement('option');
            option.value = data.chat.chat.idChat;
            option.innerHTML = `idBabysitter: ${id}`;
            selectSendMessage === null || selectSendMessage === void 0 ? void 0 : selectSendMessage.appendChild(option);
        }
        catch (error) {
            console.error(error);
            throw new Error(error);
        }
    },
    createOptionBabysitter(dataBabysitter) {
        try {
            const selectAllBabysitters = document.getElementById('selectProfileBabysitter');
            selectAllBabysitters.innerHTML = '<option value="">-- Sélectionner un babysitter --</option>';
            dataBabysitter.babysitters.forEach((babysitter) => {
                const option = document.createElement('option');
                option.value = babysitter.idUser;
                option.innerHTML = `[idBabysitter: ${babysitter.idUser}]`;
                selectAllBabysitters.appendChild(option);
            });
        }
        catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }
};
//# sourceMappingURL=functions.js.map