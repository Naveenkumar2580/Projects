import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";  // Ensure your styles are here
import { ThemeProvider } from "next-themes";  // Theme support

createRoot(document.getElementById("root")!).render(
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <App />
  </ThemeProvider>
);
