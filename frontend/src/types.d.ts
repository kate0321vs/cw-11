export interface RegisterMutation {
    username: string;
    password: string;
    displayName: string;
    phoneNumber: string;
}

export interface IUser {
    _id: string;
    displayName: string;
    phoneNumber: string;
    username: string;
    password: string;
    token: string;
}

export interface RegisterResponse {
    user: IUser;
    message: string;
}

export interface LoginMutation {
    username: string;
    password: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    };
    message: string;
    name: string;
    _message: string;
}

export interface GlobalError {
    error: string;
}

export interface ICategory {
    _id: string;
    name: string;
}

export interface IItem {
    _id: string;
    title: string;
    description: string;
    image: string;
    price: number;
    category: { name: string };
    user: {
        displayName: string;
        phoneNumber: string;
        username: string;
    };
}

export interface IMutationItem {
    title: string;
    description: string;
    image: File | null;
    price: string;
    category: string;
}