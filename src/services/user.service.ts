import { userRepository } from "../repositories/user.repository";
import { CreateUserDTO, UpdateUserDTO } from "../dtos/user.dto";

export const userService = {
  getAll() {
    return userRepository.findAll();
  },

  getById(id: string) {
    return userRepository.findById(id);
  },

  create(data: CreateUserDTO) {
    if (!data.id || !data.username || !data.email || !data.name) {
      throw new Error("Missing required fields");
    }
    if (userRepository.findById(data.id)) {
      throw new Error("User ID already exists");
    }
    if (userRepository.findByEmail(data.email)) {
      throw new Error("Email already exists");
    }
    if (userRepository.findByUsername(data.username)) {
      throw new Error("Username already exists");
    }

    return userRepository.save({
      ...data,
      age: data.age || null
    });
  },

  update(id: string, data: UpdateUserDTO) {
    const user = userRepository.findById(id);
    if (!user) throw new Error("User not found");

    if (!data.username || !data.email || !data.name) {
      throw new Error("Missing required fields");
    }

    const emailTaken =
      userRepository.findByEmail(data.email) &&
      userRepository.findByEmail(data.email)?.id !== id;

    if (emailTaken) throw new Error("Email already exists");

    const usernameTaken =
      userRepository.findByUsername(data.username) &&
      userRepository.findByUsername(data.username)?.id !== id;

    if (usernameTaken) throw new Error("Username already exists");

    return userRepository.update(id, data);
  },

  remove(id: string) {
    const deleted = userRepository.delete(id);
    if (!deleted) throw new Error("User not found");
    return true;
  }
};
