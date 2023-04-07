const root = "http://localhost:8000/";

interface User {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }

 export interface Race {
    time: string;
    venue: string;
  }
  
  export async function login(user: Partial<User>): Promise<any> {
    try {
      console.log('hello')
      const response = await fetch(`${root}login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
        // credentials: "include",
      });
      const loggedUser = await response.json();
  
      return loggedUser;
    } catch (error) {
      console.log(error);
    }
  }
  
  
  export async function register(user: User): Promise<any> {
    try {
      console.log('in register')
      const response = await fetch(`${root}register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
        // credentials: "include",
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
  
  export async function getRaces(): Promise<Race[] | undefined> {
    try {
      const response = await fetch(`${root}events`, {
        method: "Get",
        headers: { "Content-Type": "application/json" },
      });
  
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  