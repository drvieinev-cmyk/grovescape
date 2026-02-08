import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import NotificationContainer from "./components/NotificationContainer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import NotificationDemo from "./pages/NotificationDemo";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Developer from "./pages/Developer";
import Projects from "./pages/Projects";
import ProjectElytra from "./pages/ProjectElytra";
import TeslaCallback from "./pages/TeslaCallback";
import ConnectTesla from "./pages/ConnectTesla";
import OAuthTeslaCallback from "./pages/OAuthTeslaCallback";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/about"} component={About} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/privacy"} component={Privacy} />
      <Route path={"/notifications"} component={NotificationDemo} />
      <Route path={"/login"} component={Login} />
      <Route path={"/register"} component={Register} />
      <Route path={"/developer"} component={Developer} />
      <Route path={"/projects"} component={Projects} />
      <Route path={"/projects/elytra"} component={ProjectElytra} />
      <Route path={"/connect/tesla"} component={ConnectTesla} />
      <Route path={"/oauth/tesla/callback"} component={OAuthTeslaCallback} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="system"
        switchable
      >
        <NotificationProvider>
          <TooltipProvider>
            <Toaster />
            <NotificationContainer />
            <Router />
          </TooltipProvider>
        </NotificationProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
