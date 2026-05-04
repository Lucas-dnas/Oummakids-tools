async function recoveryToken(){
    try {
        const urlParams = new URLSearchParams(window.location.search);
        if (!urlParams) {
            throw new Error('Params missing');
        }
        const resetToken = String(urlParams.get('token'));
        if (!resetToken) {
            throw new Error('Params missing');
        }
        return resetToken;
    } catch (error: any) {
        console.error(error);
    }
}
const resetBtn = document.getElementById('resetBtn') as HTMLButtonElement;
resetBtn?.addEventListener('click', async (e) => {
    e.preventDefault();

    try {
        const newPassword = document.getElementById('newPassword') as HTMLInputElement;
        const confirmationPassword = document.getElementById('confirmationPassword') as HTMLInputElement;
        const resetToken: string | undefined = await recoveryToken();

        const response: Response = await fetch(`http://localhost:3000/api/auth/reset/password?token=${resetToken}`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                newPassword: newPassword,
                confirmationPassword: confirmationPassword
            })
        });

        const data: any = await response.json();
        console.log(data);

    } catch (error: any) {
        console.error(error);
    }

});