export declare let token: string;
export declare let socketVariable: any;
export declare const AsyncFunctions: {
    getUser(): Promise<any>;
    getAllChatsFunction(): Promise<any>;
    getAllBabysitters(): Promise<any>;
    loadUsersForsendMessageFunction(): Promise<void>;
    loginGeneratedUsers(): Promise<void>;
    login(): Promise<void>;
    loadHtmlElement(): Promise<void>;
    createImgProfile(user: any): Promise<void>;
    profileImg(file: File): Promise<void>;
    createUpdateProfileFields(): Promise<void>;
    updateProfile(firstName: string, lastName: string, address: string, city: string, postalCode: string, description: string, children?: number, rate?: number): Promise<void>;
};
//# sourceMappingURL=asyncFunctions.d.ts.map