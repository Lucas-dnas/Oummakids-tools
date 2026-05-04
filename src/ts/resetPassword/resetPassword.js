var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function recoveryToken() {
    return __awaiter(this, void 0, void 0, function* () {
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
        }
        catch (error) {
            console.error(error);
        }
    });
}
const resetBtn = document.getElementById('resetBtn');
resetBtn === null || resetBtn === void 0 ? void 0 : resetBtn.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    try {
        const newPassword = document.getElementById('newPassword');
        const confirmationPassword = document.getElementById('confirmationPassword');
        const resetToken = yield recoveryToken();
        const response = yield fetch(`http://localhost:3000/api/auth/reset/password?token=${resetToken}`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                newPassword: newPassword,
                confirmationPassword: confirmationPassword
            })
        });
        const data = yield response.json();
        console.log(data);
    }
    catch (error) {
        console.error(error);
    }
}));
export {};
//# sourceMappingURL=resetPassword.js.map