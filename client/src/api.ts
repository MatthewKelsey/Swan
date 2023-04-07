const root = "http://localhost:4001/";

interface User {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }
  
  export async function login(user: User): Promise<any> {
    try {
      const response = await fetch(`${root}login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
        credentials: "include",
      });
      const loggedUser = await response.json();
  
      return loggedUser;
    } catch (error) {
      console.log(error);
    }
  }
  
  export async function refreshUser(): Promise<any> {
    try {
      const response = await fetch(`${root}refresh`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const loggedUser = await response.json();
  
      return loggedUser;
    } catch (error) {
      console.log(error);
    }
  }
  
  export async function register(user: User): Promise<any> {
    try {
      const response = await fetch(`${root}register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
        credentials: "include",
      });
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  
  export async function logout(): Promise<any> {
    try {
      const response = await fetch(`${root}logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // body: JSON.stringify(),
        credentials: "include",
      });
      const data = await response.json;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  