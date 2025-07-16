import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Lock, AlertCircle, Mail } from 'lucide-react';
import { useAdminAuth } from '../../hooks/useAdminAuth';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
    const [resetMessage, setResetMessage] = useState('');
    const { login, forgotPassword } = useAdminAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const success = await login(email, password);
        if (!success) {
            setError('Invalid email or password');
        }
        setLoading(false);
    };

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResetMessage('');

        const success = await forgotPassword(forgotPasswordEmail);
        if (success) {
            setResetMessage('Password reset email sent! Check your inbox.');
            setShowForgotPassword(false);
        } else {
            setError('Failed to send reset email. Please check your email address.');
        }
        setLoading(false);
    };

    return (
        <>
            <Header />

            <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <Lock className="w-12 h-12 mx-auto text-blue-600 mb-4" />
                        <CardTitle className="text-2xl">
                            {showForgotPassword ? 'Reset Password' : 'Admin Portal Login'}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {!showForgotPassword ? (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {error && (
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2 text-red-700">
                                        <AlertCircle className="w-4 h-4" />
                                        <span className="text-sm">{error}</span>
                                    </div>
                                )}

                                {resetMessage && (
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center space-x-2 text-green-700">
                                        <Mail className="w-4 h-4" />
                                        <span className="text-sm">{resetMessage}</span>
                                    </div>
                                )}

                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        required
                                    />
                                </div>

                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? 'Logging in...' : 'Login'}
                                </Button>

                                <div className="text-center">
                                    <button
                                        type="button"
                                        onClick={() => setShowForgotPassword(true)}
                                        className="text-blue-600 hover:text-blue-800 text-sm"
                                    >
                                        Forgot Password?
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <form onSubmit={handleForgotPassword} className="space-y-4">
                                {error && (
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2 text-red-700">
                                        <AlertCircle className="w-4 h-4" />
                                        <span className="text-sm">{error}</span>
                                    </div>
                                )}

                                <div>
                                    <Label htmlFor="forgotEmail">Email</Label>
                                    <Input
                                        id="forgotEmail"
                                        type="email"
                                        value={forgotPasswordEmail}
                                        onChange={(e) => setForgotPasswordEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>

                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? 'Sending...' : 'Send Reset Email'}
                                </Button>

                                <div className="text-center">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowForgotPassword(false);
                                            setError('');
                                            setForgotPasswordEmail('');
                                        }}
                                        className="text-blue-600 hover:text-blue-800 text-sm"
                                    >
                                        Back to Login
                                    </button>
                                </div>
                            </form>
                        )}
                    </CardContent>
                </Card>
            </div>

            <Footer />
        </>
    );
};

export default AdminLogin;