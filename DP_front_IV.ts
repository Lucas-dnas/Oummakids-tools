import { functions } from './src/ts/functions/functions'


/**
 * pseudo code
 * 
 * login admin qui récup tout les users
 * afficher les users dans un tableau  avec nom prenom blabla..
 * 
 */

let token: string;

export const webDynamicSkill = {

    async login(): Promise<void> {
        try {
            const select = document.getElementById('selectLogin') as HTMLSelectElement;
            const cerdentials: string[] = select.value.split(' ');

            const response: Response = await fetch('http://localhost:3000/auth/login', {
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
                // console.log(data);
                token = data.user.token;

                if (data.user.role === 'ADMIN') { // marche pas ptdrrr
                    await this.loginGeneratedUsers();
                    return;
                }

            } else {
                console.error("Erreur HTTP", response.status, data);
                return;
            }
        } catch (error: any) {
            console.error(error)
        }
    },
    async loginGeneratedUsers(): Promise<void> {
        try {
            // const select = document.getElementById('selectLogin') as HTMLSelectElement;
            const response: Response = await fetch('http://localhost:3000/profile/admin/getAllUsers', { method: "GET", headers: functions.header(token) });
            const data: any = await response.json();

            if (response.ok) {
                // console.log(data);
                
                data.users.forEach((element: any) => {
                    document.createElement('form').setAttribute('method','post');
                    let input: HTMLInputElement = document.createElement('input');
                    console.log(typeof(input));
                    
                })









                return;
            } else {
                console.error("Error on generated button", response.status, response.body);
                return;
            }
        } catch (error: any) {
            console.error(error);
        }
    },

}
