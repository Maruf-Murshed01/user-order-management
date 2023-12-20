export type Name = {
    firstName: string;
    lastName: string;
};

export type FullAddress = {
    street: string;
    city: string;
    country: string;
};

export type Order = {
    productName: string;
    price: number;
    quantity: number;
};

export type User = {
    userId: number;
    username: string;
    password: string;
    fullName: Name;
    age: number;
    email: string;
    isActive: boolean;
    hobbies: string[];
    address: FullAddress;
    orders?: Order[];
};
