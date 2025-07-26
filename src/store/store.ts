import { makeAutoObservable } from "mobx";
import type { IUser, UserPatchDto } from "../types";
import api from "../api";

class UserStore {
  items: IUser[] = [];
  currentUser: IUser | null = null;
  isLoading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  loadUsers = async () => {
    this.isLoading = true;
    this.error = null;
    try {
      const users = await api.getAllUsers();
      this.items = users;
    } catch (error) {
      this.error = "Failed to load users";
      console.error("Error loading users:", error);
    } finally {
      this.isLoading = false;
    }
  };

  createUser = async (userData: Omit<IUser, "id">) => {
    this.isLoading = true;
    this.error = null;
    try {
      const newUser = await api.createUser(userData);
      this.items.push(newUser);
      return newUser;
    } catch (error) {
      this.error = "Failed to create user";
      console.error("Error creating user:", error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  };

  deleteUser = async (id: string) => {
    this.isLoading = true;
    this.error = null;
    try {
      const success = await api.deleteUser(id);
      if (success) {
        this.items = this.items.filter((item) => item.id !== id);
      }
      return success;
    } catch (error) {
      this.error = "Failed to delete user";
      console.error("Error deleting user:", error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  };

  updateUser = async (id: string, updates: UserPatchDto) => {
    this.isLoading = true;
    this.error = null;
    try {
      const updatedUser = await api.updateUser(id, updates);
      const index = this.items.findIndex((user) => user.id === id);
      if (index !== -1) {
        this.items[index] = updatedUser;
      }
      return updatedUser;
    } catch (error) {
      this.error = "Failed to update user";
      console.error("Error updating user:", error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  };

  getUserById = async (id: string) => {
    this.isLoading = true;
    this.error = null;
    try {
      const user = await api.getUserById(id);
      return user;
    } catch (error) {
      this.error = "Failed to get user";
      console.error("Error getting user:", error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  };

  login = async (credentials: { email: string; password: string }) => {
    this.isLoading = true;
    this.error = null;
    try {
      const user = await api.login(credentials);
      this.currentUser = user;
      return user;
    } catch (error) {
      this.error = "Failed to login";
      console.error("Error logging in:", error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  };

  logout = async () => {
    this.isLoading = true;
    this.error = null;
    try {
      const success = await api.logout();
      if (success) {
        this.currentUser = null;
      }
      return success;
    } catch (error) {
      this.error = "Failed to logout";
      console.error("Error logging out:", error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  };

  getCurrentUser = async () => {
    this.isLoading = true;
    this.error = null;
    try {
      const user = await api.getCurrentUser();
      this.currentUser = user;
      return user;
    } catch (error) {
      this.error = "Failed to get current user";
      console.error("Error getting current user:", error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  };
}

export default UserStore;
