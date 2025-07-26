import type { IUser, UserPatchDto } from "../types";

const API_BASE_URL = "/api/v1";

class UserAPI {
  private async fetchWithAuth(
    url: string,
    options: RequestInit = {}
  ): Promise<Response> {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  }

  async getAllUsers(): Promise<IUser[]> {
    const response = await this.fetchWithAuth("/users");
    return response.json();
  }

  async getUserById(id: string): Promise<IUser> {
    const response = await this.fetchWithAuth(`/users/${id}`);
    return response.json();
  }

  async createUser(userData: Omit<IUser, "id">): Promise<IUser> {
    const response = await this.fetchWithAuth("/users", {
      method: "POST",
      body: JSON.stringify(userData),
    });
    return response.json();
  }

  async updateUser(id: string, updates: UserPatchDto): Promise<IUser> {
    const response = await this.fetchWithAuth(`/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    });
    return response.json();
  }

  async deleteUser(id: string): Promise<boolean> {
    const response = await this.fetchWithAuth(`/users/${id}`, {
      method: "DELETE",
    });
    return response.ok;
  }

  async login(credentials: {
    email: string;
    password: string;
  }): Promise<IUser> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return response.json();
  }

  async logout(): Promise<boolean> {
    const response = await this.fetchWithAuth("/auth/logout", {
      method: "POST",
    });
    return response.ok;
  }

  async getCurrentUser(): Promise<IUser> {
    const response = await this.fetchWithAuth("/auth/me");
    return response.json();
  }
}

const api = new UserAPI();
export default api;
