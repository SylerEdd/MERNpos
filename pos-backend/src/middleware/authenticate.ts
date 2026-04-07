import { Request, Response, NextFunction } from "express";

// Middleware to check if user is authenticated before allowing access to protected routes
export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (!req.session.userId) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }
  //if authenticated, go to the controller
  next();
}
