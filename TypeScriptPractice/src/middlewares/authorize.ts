import { Request, Response, NextFunction } from "express";

export const authorize =
  (...allowedRoles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user; // assuming jwt middleware adds user
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: No user data" });
    }

    if (!allowedRoles.includes(user.role)) {
      return res
        .status(403)
        .json({ message: "Forbidden: You don’t have permission" });
    }

    next();
  };
