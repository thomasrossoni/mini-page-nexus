
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PagesProvider } from "@/contexts/PagesContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import PublicPage from "./pages/PublicPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PagesProvider>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/edit/:id" element={<EditPage />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/p/:url" element={<PublicPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </PagesProvider>
  </QueryClientProvider>
);

export default App;
