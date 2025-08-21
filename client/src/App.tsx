import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ui/theme-provider";

// Pages
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import CreateCapsule from "@/pages/CreateCapsule";
import Community from "@/pages/Community";
import Profile from "@/pages/Profile";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import NotFound from "@/pages/not-found";

// Components
import Navigation from "@/components/layout/Navigation";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/create-capsule" component={CreateCapsule} />
      <Route path="/community" component={Community} />
      <Route path="/profile" component={Profile} />
      <Route path="/auth/login" component={Login} />
      <Route path="/auth/register" component={Register} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="timecapsule-theme">
        <TooltipProvider>
          <div className="relative min-h-screen overflow-x-hidden">
            
            {/* Navigation */}
            <Navigation />
            
            {/* Main Content */}
            <div className="relative z-20">
              <Router />
            </div>
            
            {/* Toast Notifications */}
            <Toaster />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
