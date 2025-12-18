import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { DataProvider } from "@/contexts/DataContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import TournamentsPage from "./pages/TournamentsPage";
import TournamentDetailPage from "./pages/TournamentDetailPage";
import WalletPage from "./pages/WalletPage";
import ProfilePage from "./pages/ProfilePage";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminTournaments from "./pages/admin/AdminTournaments";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminWithdrawals from "./pages/admin/AdminWithdrawals";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <DataProvider>
        <NotificationProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<LoginPage />} />
                <Route path="/tournaments" element={<TournamentsPage />} />
                <Route path="/tournament/:id" element={<TournamentDetailPage />} />
                <Route path="/wallet" element={<WalletPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="tournaments" element={<AdminTournaments />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="withdrawals" element={<AdminWithdrawals />} />
                </Route>
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </NotificationProvider>
      </DataProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
