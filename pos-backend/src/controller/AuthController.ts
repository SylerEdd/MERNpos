import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

//https://www.youtube.com/watch?v=-ebXpRi1yQg - video for session management in express

const service = new AuthService();

export class AuthController {
  //login method for user authentication
  // POST /api/auth/login
  async login(req: Request, res: Response): Promise<void> {
    try {
      const result = await service.login(req.body);

      req.session.userId = result.userId;
      req.session.username = result.username;
      req.session.fullName = result.fullName;
      req.session.roles = result.roles;

      res.status(200).json(result.response);
    } catch (err: any) {
      res.status(401).json({ message: err.message ?? "Login failed" });
    }
  }

  //logout method to destroy user session
  // POST /api/auth/logout
  async logout(req: Request, res: Response): Promise<void> {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ message: "Logout failed" });
        return;
      }

      // Clear the cookie on the client side
      res.clearCookie("connect.sid");
      res.status(200).json({ message: "Logout successful" });
    });
  }

  //me endpoint to get current authenticated user info
  // GET /api/auth/me
  async me(req: Request, res: Response): Promise<void> {
    if (!req.session.userId) {
      res.status(401).json({ message: "Not authenticated" });
      return;
    }
    res.status(200).json({
      id: req.session.userId,
      username: req.session.username,
      fullName: req.session.fullName,
      roles: req.session.roles,
    });
  }
}
