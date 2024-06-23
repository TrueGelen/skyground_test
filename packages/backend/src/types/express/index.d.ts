import * as express from "express";

type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
