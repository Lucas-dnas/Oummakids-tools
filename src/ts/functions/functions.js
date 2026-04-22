export const funcitons = {
    header(token) {
        return new Headers({
            "Content-type": "application/json",
            "Authorization": "Bearer " + (token ? token : {}),
            "X-Content-Type-Options": "text/html"
        });
    },
    loadThreeFirstUsersCredentials(user) {
        const option = document.createElement('option');
        option.innerHTML = user;
        option.value = user + '@test.com password123';
        return option;
    }
};
//# sourceMappingURL=functions.js.map