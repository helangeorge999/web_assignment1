import { User } from "../types/user.types";

let users: User[] = [
  { id: "user1", username: "john_doe", email: "john@example.com", name: "John Doe", age: 30 },
  { id: "user2", username: "jane_smith", email: "jane@example.com", name: "Jane Smith", age: 25 },
];

export const userRepository = {
  findAll() {
    return users;
  },

  findById(id: string) {
    return users.find(u => u.id === id);
  },

  findByEmail(email: string) {
    return users.find(u => u.email === email);
  },

  findByUsername(username: string) {
    return users.find(u => u.username === username);
  },

  save(user: User) {
    users.push(user);
    return user;
  },

  update(id: string, data: Partial<User>) {
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return null;

    users[index] = { ...users[index], ...data };
    return users[index];
  },

  delete(id: string) {
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return false;

    users.splice(index, 1);
    return true;
  }
};
