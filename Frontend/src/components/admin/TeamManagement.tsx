import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash, Save, X } from 'lucide-react';
import { db, storage } from '@/integrations/firebase/client';
import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    getDocs,
    doc,
    orderBy,
    query
} from 'firebase/firestore';


interface TeamMember {
    id: string;
    name: string;
    role: string;
    specialization: string;
    institution: string;
    email: string;
    photo: string;
    type: 'faculty' | 'phd' | 'mtech' | 'intern';
    is_current: boolean;
    current_position?: string;
    contribution?: string;
}
const TeamManagement = () => {
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [uploadingPhoto, setUploadingPhoto] = useState<string | null>(null);
    const [newMember, setNewMember] = useState<Partial<TeamMember>>({
        is_current: true,
        type: 'intern'
    });
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const q = query(collection(db, 'team_members'), orderBy('created_at', 'desc'));
            const querySnapshot = await getDocs(q);
            const membersData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as TeamMember[];
            setMembers(membersData);
        } catch (error) {
            console.error('Error fetching members:', error);
        }
    };

    const handleAdd = async (formData: Partial<TeamMember>) => {
        try {
            const memberData = {
                ...formData,
                created_at: new Date()
            };
            await addDoc(collection(db, 'team_members'), memberData);
            fetchMembers();
            setNewMember({ is_current: true, type: 'intern' });
            setShowAddForm(false);
        } catch (error) {
            console.error('Error adding member:', error);
        }
    };


    const handleUpdate = async (id: string, updatedMember: Partial<TeamMember>) => {
        try {
            const memberRef = doc(db, 'team_members', id);
            await updateDoc(memberRef, updatedMember);
            fetchMembers();
            setEditingId(null);
        } catch (error) {
            console.error('Error updating member:', error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            // Delete document
            await deleteDoc(doc(db, 'team_members', id));
            fetchMembers();
        } catch (error) {
            console.error('Error deleting member:', error);
        }
    };


    const MemberForm = ({ member, onSave, onCancel }: {
        member: Partial<TeamMember>;
        onSave: (member: Partial<TeamMember>) => void;
        onCancel: () => void;
    }) => {
        const [formData, setFormData] = useState({
            name: member.name || '',
            role: member.role || '',
            specialization: member.specialization || '',
            institution: member.institution || '',
            email: member.email || '',
            photo: member.photo || '',
            type: member.type || 'intern',
            is_current: member.is_current !== undefined ? member.is_current : true,
            current_position: member.current_position || '',
            contribution: member.contribution || ''
        });

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg bg-gray-50">
                <div>
                    <Label>Name</Label>
                    <Input
                        value={formData.name || ''}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>
                <div>
                    <Label>Role</Label>
                    <Input
                        value={formData.role || ''}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    />
                </div>
                <div>
                    <Label>Email</Label>
                    <Input
                        value={formData.email || ''}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>
                <div>
                    <Label>Institution</Label>
                    <Input
                        value={formData.institution || ''}
                        onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    />
                </div>
                <div>
                    <Label>Type</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value as any })}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="faculty">Faculty</SelectItem>
                            <SelectItem value="phd">PhD</SelectItem>
                            <SelectItem value="mtech">M.Tech</SelectItem>
                            <SelectItem value="intern">Intern</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label>Status</Label>
                    <Select value={formData.is_current ? 'current' : 'past'} onValueChange={(value) => setFormData({ ...formData, is_current: value === 'current' })}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="current">Current</SelectItem>
                            <SelectItem value="past">Past</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="md:col-span-2">
                    <Label>Specialization</Label>
                    <Textarea
                        value={formData.specialization || ''}
                        onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    />
                </div>
                {!formData.is_current && (
                    <>
                        <div className="md:col-span-2">
                            <Label>Current Position</Label>
                            <Input
                                value={formData.current_position || ''}
                                onChange={(e) => setFormData({ ...formData, current_position: e.target.value })}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <Label>Contribution</Label>
                            <Textarea
                                value={formData.contribution || ''}
                                onChange={(e) => setFormData({ ...formData, contribution: e.target.value })}
                            />
                        </div>
                    </>
                )}
                <div className="md:col-span-2">
                    <Label>Photo</Label>
                    <div className="flex items-center space-x-4">
                        {formData.photo && (
                            <img
                                src={formData.photo}
                                alt="Member photo"
                                className="w-16 h-16 rounded-full object-cover"
                            />
                        )}
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        const base64String = reader.result as string;
                                        setFormData({ ...formData, photo: base64String });
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                        />

                        {uploadingPhoto === (member.id || 'new') && (
                            <span className="text-sm text-gray-500">Uploading...</span>
                        )}
                    </div>
                </div>
                <div className="md:col-span-2 flex space-x-2">
                    <Button onClick={() => onSave(formData)}>
                        <Save className="w-4 h-4 mr-2" />
                        Save
                    </Button>
                    <Button variant="outline" onClick={onCancel}>
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                    </Button>
                </div>
            </div>
        );
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    Team Management
                    <Button onClick={() => setShowAddForm(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Member
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {showAddForm && (
                    <MemberForm
                        member={newMember}
                        onSave={handleAdd}
                        onCancel={() => setShowAddForm(false)}
                    />
                )}

                {members.map((member) => (
                    <div key={member.id} className="border rounded-lg p-4">
                        {editingId === member.id ? (
                            <MemberForm
                                member={member}
                                onSave={(updatedMember) => handleUpdate(member.id, updatedMember)}
                                onCancel={() => setEditingId(null)}
                            />
                        ) : (
                            <div className="flex justify-between items-start">
                                <div className="flex space-x-4">
                                    {member.photo && (
                                        <img
                                            src={member.photo}
                                            alt={member.name}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                    )}
                                    <div>
                                        <h3 className="font-semibold">{member.name}</h3>
                                        <p className="text-gray-600">{member.role}</p>
                                        <p className="text-sm text-gray-500">{member.email}</p>
                                        <div className="flex space-x-2 mt-2">
                                            <Badge variant={member.is_current ? 'default' : 'secondary'}>
                                                {member.is_current ? 'Current' : 'Past'}
                                            </Badge>
                                            <Badge variant="outline">{member.type}</Badge>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setEditingId(member.id)}
                                    >
                                        <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDelete(member.id)}
                                    >
                                        <Trash className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

export default TeamManagement;