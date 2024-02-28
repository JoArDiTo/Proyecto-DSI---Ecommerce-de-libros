export type User = {
    id: string;
    password: string;
    email: string;
    username: string;
    is_active: boolean;
    is_superuser: boolean;
    is_staff: boolean;
    last_login: Date;
    person: string;
    groups: any[];
    user_permissions: any[];
}

export type Person = {
    id: string;
    phone: string;
    first_name: string;
    last_name: string;
}

export type JwtPayload = {
    user_id: string
};

export type UserLoaded = {
    id: string;
    password: string;
    email: string;
    username: string;
    is_active: boolean;
    is_superuser: boolean;
    is_staff: boolean;
    last_login: Date;
    person: Person;
    groups: any[];
    user_permissions: any[];
}

//extraer el token del usuario
export async function getTokenToUser(email: string, password: string) {
    const response = await fetch('http://localhost:8000/users/api/token/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const tokenData = await response.json();
    const jwt = tokenData.access;
    return jwt;

}

//extraigo la el payload del token

export function getDecoded() {
    const jwt = localStorage.getItem('token');
    if (jwt != null) {
        try {
            const payload = jwt.split('.')[1];
            const decoded = JSON.parse(atob(payload));
            return decoded;
        } catch (e) {
            return null;
        }
    }
    return null;
}


// extraigo el usuario

export async function getUser() {
    const decoded: JwtPayload = getDecoded();
    const jwt = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8000/users/api/usersDataToFrontend/${decoded.user_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        }
    });

    const user = await response.json();
    return user;
}

//actualizo el usuario

export async function updateData(url: String, data: User | Person) {
    const jwt = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8000/users/api/${url}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        },
        body: JSON.stringify(data)
    });
    console.log(response)
    return response.ok;

}

//Para crear usuario y persona
export async function createData(url: String, data: User | Person) {
    try {
        const response = await fetch(`http://localhost:8000/users/api/${url}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        console.log(response)
        return response.ok;
    } catch (e) {
        console.log("Error al crear usuario", e)
    }
}