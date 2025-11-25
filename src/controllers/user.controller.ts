import { Request, Response } from "express";
import { userService } from "../services/user.service";

export const userController = {
  getAll(req: Request, res: Response) {
    return res.json(userService.getAll());
  },

  getOne(req: Request, res: Response) {
    const user = userService.getById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    return res.json(user);
  },

  create(req: Request, res: Response) {
    try {
      const newUser = userService.create(req.body);
      return res.status(201).json(newUser);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  },

  update(req: Request, res: Response) {
    try {
      const updated = userService.update(req.params.id, req.body);
      return res.json(updated);
    } catch (err: any) {
      if (err.message === "User not found") {
        return res.status(404).json({ error: err.message });
      }
      return res.status(400).json({ error: err.message });
    }
  },

  delete(req: Request, res: Response) {
    try {
      userService.remove(req.params.id);
      return res.status(204).send();
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }
};
