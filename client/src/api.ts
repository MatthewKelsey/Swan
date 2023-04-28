import { Dispatch, SetStateAction } from "react";

// const root = "http://localhost:8080/";
// const root = "https://swan-server.fly.dev/";
const root = "https://swan-bets-server.herokuapp.com/"
interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface Odds {
  horseName: string;
  odds: string;
}
export interface Race {
  eventUrl: string;
  event: string;
  setCurrentRace?: Dispatch<SetStateAction<string>>;
}

export async function login(user: Partial<User>): Promise<any> {
  try {
    const response = await fetch(`${root}login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
      credentials: "include",
    });
    const loggedUser = await response.json();
    if (response.ok) {
      const { token } = loggedUser;
      console.log(token)
      document.cookie = `jwt=${token};  HttpOnly`;
    }
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

    if (response.ok) {
      const { token } = data;
      document.cookie = `auth=${token}; path=/; HttpOnly`;
    }

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
    await response.json();
  } catch (error) {
    console.log(error);
  }
}
export async function getRaces(): Promise<Race[] | undefined> {
  try {
    const response = await fetch(`${root}events`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getOdds(url: string): Promise<Odds[] | undefined> {
  try {
    const response = await fetch(`${root}odds`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ url: url }),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return;
  }
}
