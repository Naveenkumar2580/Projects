import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { db } from "./firebaseAdmin"; // Import the initialized database instance

export async function registerRoutes(app: Express): Promise<Server> {
  /**
   * Helper function to handle error responses
   * @param res - The Express response object
   * @param message - The error message
   * @param statusCode - The HTTP status code
   */
  const handleErrorResponse = (
    res: Response,
    message: string,
    statusCode: number
  ) => {
    console.error(`Error: ${message}`);
    return res.status(statusCode).json({ message });
  };

  /**
   * Feedback Route - Handle feedback submissions
   */
  app.post("/api/feedback", async (req: Request, res: Response) => {
    const { content, userId } = req.body;

    if (!content) {
      return handleErrorResponse(res, "Feedback content is required", 400);
    }

    try {
      const feedbackRef = db.ref("feedbacks"); // Get a reference to the "feedbacks" path
      const newFeedbackRef = feedbackRef.push(); // Create a new child reference with a unique key
      await newFeedbackRef.set({
        content,
        userId: userId || "anonymous",
        createdAt: new Date().toISOString(),
      });

      return res.status(201).json({
        message: "Feedback submitted successfully",
        id: newFeedbackRef.key,
      });
    } catch (error) {
      console.error("Failed to save feedback:", error);
      res.status(500).json({ message: "Failed to save feedback" });
    }
  });

  /**
   * Contact Route - Handle contact form submissions
   */
  app.post("/api/contact", async (req: Request, res: Response) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return handleErrorResponse(res, "Name, email, and message are required", 400);
    }

    try {
      const contactRef = db.ref("contacts"); // Get a reference to the "contacts" path
      const newContactRef = contactRef.push(); // Create a new child reference with a unique key
      await newContactRef.set({
        name,
        email,
        subject: subject || "",
        message,
        createdAt: new Date().toISOString(),
      });

      return res.status(201).json({
        message: "Message sent successfully",
        id: newContactRef.key,
      });
    } catch (error) {
      console.error("Failed to send message:", error);
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  /**
   * Order Route - Handle new order submissions
   */
  app.post("/api/orders", async (req: Request, res: Response) => {
    const {
      service,
      price,
      currency,
      customerName,
      customerEmail,
      customerPhone,
      requirements,
      userId,
    } = req.body;

    // Validate required fields
    if (!service || !price || !customerName || !customerEmail || !customerPhone) {
      return handleErrorResponse(
        res,
        "Missing required fields for order submission",
        400
      );
    }

    try {
      const orderRef = db.ref("orders"); // Get a reference to the "orders" path
      const newOrderRef = orderRef.push(); // Create a new child reference with a unique key
      await newOrderRef.set({
        service,
        price,
        currency: currency || "USD",
        customerName,
        customerEmail,
        customerPhone,
        requirements: requirements || "",
        userId: userId || null,
        createdAt: new Date().toISOString(),
      });

      return res.status(201).json({
        message: "Order submitted successfully",
        id: newOrderRef.key,
      });
    } catch (error) {
      console.error("Failed to submit order:", error);
      res.status(500).json({ message: "Failed to submit order" });
    }
  });

  // Return the HTTP server instance to be used in the main server setup
  return createServer(app);
}