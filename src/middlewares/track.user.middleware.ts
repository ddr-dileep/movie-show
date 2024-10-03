import { Request, Response, NextFunction } from "express";

// Middleware to track client information
export const trackClientInfo = (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  // Get the browser details (User-Agent)
  const userAgent = req.headers["user-agent"];

  // Get the IP address (handling proxy scenarios)
  const ipAddress =
    req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  // Get the referrer (if any)
  const referer = req.headers["referer"] || req.headers["origin"];

  // Get the request path
  const path = req.path;

  // Optionally, log this information or store it in a database
  console.log(
    `"Request Info: IP: ${ipAddress},Browser: ${userAgent}, Referrer: ${referer}, Path: ${path}"`
  );

  req.clientInfo = {
    userAgent,
    ipAddress,
    referer,
    path,
  };

  next();
};
