
export const funcitons = {
    header(token: string | null, upload?: boolean): Headers {
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
    },
    loadThreeFirstUsersCredentials(user: string): HTMLOptionElement {
        const option: any = document.createElement('option');
        option.innerHTML = user;
        option.value = user + '@test.com password123';
        return option;
    },

}