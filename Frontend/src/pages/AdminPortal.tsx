import React, { useState } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import AdminLogin from '@/components/admin/AdminLogin';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Users, BookOpen, Briefcase } from 'lucide-react';
import TeamManagement from '@/components/admin/TeamManagement';
import PublicationManagement from '@/components/admin/PublicationManagement';
import OpeningManagement from '@/components/admin/OpeningManagement';

const AdminPortal = () => {
    const { isAuthenticated, logout, loading } = useAdminAuth();

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <AdminLogin />;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="container mx-auto px-4 py-8">
                <Card className="mb-8">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle className="text-3xl text-blue-800">Admin Portal</CardTitle>
                                <p className="text-gray-600 mt-2">
                                    Manage content for Teams, Publications, and Job Openings pages
                                </p>
                            </div>
                            <Button variant="outline" onClick={logout} className="flex items-center space-x-2">
                                <LogOut className="w-4 h-4" />
                                <span>Logout</span>
                            </Button>
                        </div>
                    </CardHeader>
                </Card>

                <Tabs defaultValue="teams" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="teams" className="flex items-center space-x-2">
                            <Users className="w-4 h-4" />
                            <span>Teams</span>
                        </TabsTrigger>
                        <TabsTrigger value="publications" className="flex items-center space-x-2">
                            <BookOpen className="w-4 h-4" />
                            <span>Publications</span>
                        </TabsTrigger>
                        <TabsTrigger value="openings" className="flex items-center space-x-2">
                            <Briefcase className="w-4 h-4" />
                            <span>Job Openings</span>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="teams" className="mt-6">
                        <TeamManagement />
                    </TabsContent>

                    <TabsContent value="publications" className="mt-6">
                        <PublicationManagement />
                    </TabsContent>

                    <TabsContent value="openings" className="mt-6">
                        <OpeningManagement />
                    </TabsContent>
                </Tabs>
            </div>

            <Footer />
        </div>
    );
};

export default AdminPortal;