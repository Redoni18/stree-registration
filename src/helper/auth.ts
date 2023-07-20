export interface User {
    fullName?: string;
    email: string;
    phone?: string | null;
    password: string;
}
  
export function storeUsers(userData: User[]): void {
    const usersJSON = JSON.stringify(userData);
    localStorage.setItem('users', usersJSON);
}

export function storeLoggedInUser(userData: User): void {
    const usersJSON = JSON.stringify(userData);
    localStorage.setItem('loggedInUser', usersJSON);
}

export function getUsers(): User[] {
    const usersJSON = localStorage.getItem('users');
    if (usersJSON) {
        return JSON.parse(usersJSON) as User[];
    }
    return [];
}
  
export function getLoggedInUser() {
    const activeUserJSON = localStorage.getItem('loggedInUser');
    if (activeUserJSON) {
        return JSON.parse(activeUserJSON)
    }

    return null
}

export function removeLoggedInUser(): void {
    localStorage.removeItem('loggedInUser');
}