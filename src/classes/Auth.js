import { USERS } from "../data/users";

export class AuthService {
  constructor() {
    this.currentUser = null;
  }

  login(email, password) {
    const found = USERS.find(
      (u) => u.email === email && u.password === password
    );
    if (!found) throw new Error("Correo o contraseña incorrectos.");
    this.currentUser = found;
    return found;
  }

  logout() {
    this.currentUser = null;
  }

  isAuthenticated() {
    return this.currentUser !== null;
  }
}