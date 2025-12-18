import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Gamepad2, Mail, Phone, Lock, ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, loginWithPhone, isLoading } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    }
  };

  const handleSendOtp = () => {
    if (phone.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }
    // TODO: Implement Firebase phone auth
    setOtpSent(true);
    toast.success('OTP sent to your phone');
  };

  const handlePhoneLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginWithPhone(phone, otp);
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      toast.error('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="container py-6">
        <Link to="/" className="flex items-center gap-2 w-fit group">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30 group-hover:glow-primary transition-all duration-300">
            <Gamepad2 className="w-5 h-5 text-primary" />
          </div>
          <span className="font-display font-bold text-xl text-gradient">
            BattleArena
          </span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 container flex items-center justify-center py-10">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>Sign in to join tournaments and win prizes</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="email" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="email" className="gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </TabsTrigger>
                <TabsTrigger value="phone" className="gap-2">
                  <Phone className="w-4 h-4" />
                  Phone
                </TabsTrigger>
              </TabsList>
              
              {/* Email Login */}
              <TabsContent value="email">
                <form onSubmit={handleEmailLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="player@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        Sign In
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>
              
              {/* Phone Login */}
              <TabsContent value="phone">
                <form onSubmit={handlePhoneLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="flex gap-2">
                      <Input
                        className="w-20"
                        value="+91"
                        disabled
                      />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="9876543210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        required
                        disabled={otpSent}
                      />
                    </div>
                  </div>
                  
                  {!otpSent ? (
                    <Button type="button" className="w-full" onClick={handleSendOtp}>
                      Send OTP
                    </Button>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="otp">Enter OTP</Label>
                        <Input
                          id="otp"
                          type="text"
                          placeholder="123456"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                          maxLength={6}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Verifying...
                          </>
                        ) : (
                          'Verify & Sign In'
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        className="w-full"
                        onClick={() => setOtpSent(false)}
                      >
                        Change Number
                      </Button>
                    </>
                  )}
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary hover:underline font-medium">
                Sign up
              </Link>
            </div>

            {/* Demo hint */}
            <div className="mt-4 p-3 rounded-lg bg-secondary/50 border border-border/50 text-xs text-muted-foreground">
              <p className="font-medium text-foreground mb-1">Demo Mode:</p>
              <p>Use any email to login as user. Include "admin" in email for admin access.</p>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Back Link */}
      <div className="container py-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
