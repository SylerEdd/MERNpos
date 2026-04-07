import { Request, Response, NextFunction } from "express";

export function authorize(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const userRoles: string[] = req.session.roles ?? [];

    //check if the user has at least one of the allowed roles
    const hasRole = userRoles.some((role) => allowedRoles.includes(role));

    if (!hasRole) {
      res
        .status(403)
        .json({ message: "Forbidden: You don't have permission to access." });
      return;
    }
    // role is allowed, go to the controller
    next();
  };
}
