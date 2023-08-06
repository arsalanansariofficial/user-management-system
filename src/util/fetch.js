/*
    Contains all the API calls to the backend
    Created By- Arsalan Ansari
 */

let domainName = "https://jsonplaceholder.typicode.com";

const Fetch = (method) => {
    const getUsers = async () => {
        const url = `${domainName}/users`;
        const requestConfigurations = {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        };
        try {
            const response = await fetch(url, requestConfigurations);
            if (response.ok) return await response.json();
            return {error: 500, message: "Something went wrong!"}
        } catch (error) {
            return {error: 700, message: `Network Error Occurred`};
        }
    };

    const getUser = async (id) => {
        const url = `${domainName}/users/${id}`;
        const requestConfigurations = {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        };
        try {
            const response = await fetch(url, requestConfigurations);
            if (response.ok) return await response.json();
            return {error: 500, message: "Something went wrong!"}
        } catch (error) {
            return {error: 700, message: `Network Error Occurred`};
        }
    };

    const createUser = async (user) => {
        const url = `${domainName}/users`;
        const requestConfigurations = {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(user)
        };
        try {
            const response = await fetch(url, requestConfigurations);
            if (response.ok) return await response.json();
            return {error: 500, message: "Something went wrong!"}
        } catch (error) {
            return {error: 700, message: `Network Error Occurred`};
        }
    };

    const updateUser = async (id, user) => {
        const url = `${domainName}/users/${id}`;
        const requestConfigurations = {
            method: "PUT",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(user)
        };
        try {
            const response = await fetch(url, requestConfigurations);
            if (response.ok) return await response.json();
            return {error: 500, message: "Something went wrong!"}
        } catch (error) {
            return {error: 700, message: `Network Error Occurred`};
        }
    };

    const deleteUser = async (id) => {
        const url = `${domainName}/users/${id}`;
        const requestConfigurations = {
            method: "DELETE",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        };
        try {
            const response = await fetch(url, requestConfigurations);
            if (response.ok) return await response.json();
            return {error: 500, message: "Something went wrong!"}
        } catch (error) {
            return {error: 700, message: `Network Error Occurred`};
        }
    };

    switch (method.methodName) {
        case "GetUsers":
            return getUsers();
        case "GetUser":
            return getUser(method.id);
        case "CreateUser":
            return createUser(method.user);
        case "UpdateUser":
            return updateUser(method.id, method.user);
        case "DeleteUser":
            return deleteUser(method.id);
        default:
            return null;
    }
};

export default Fetch;
