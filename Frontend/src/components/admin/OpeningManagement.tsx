import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash, Save, X } from 'lucide-react';
import { db } from '@/integrations/firebase/client';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, orderBy, query } from 'firebase/firestore';

interface JobOpening {
    id: string;
    title: string;
    category: string;
    duration: string;
    stipend: string;
    requirements: string[];
    description: string;
    deadline: string;
    type: 'phd' | 'mtech' | 'intern' | 'project';
    is_active: boolean;
    apply_url?: string;
}

const OpeningManagement = () => {
    const [openings, setOpenings] = useState<JobOpening[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [newOpening, setNewOpening] = useState<Partial<JobOpening>>({
        type: 'intern',
        is_active: true
    });
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        fetchOpenings();
    }, []);

    const fetchOpenings = async () => {
        try {
            const q = query(collection(db, 'job_openings'), orderBy('created_at', 'desc'));
            const querySnapshot = await getDocs(q);
            const openingsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as JobOpening[];
            setOpenings(openingsData);
        } catch (error) {
            console.error('Error fetching openings:', error);
        }
    };

    const handleAdd = async (openingData) => {
        try {
            const completeOpeningData = {
                ...openingData,
                created_at: new Date()
            };

            await addDoc(collection(db, 'job_openings'), completeOpeningData);
            fetchOpenings();
            setNewOpening({ type: 'intern', is_active: true });
            setShowAddForm(false);
        } catch (error) {
            console.error('Error adding opening:', error);
            alert('Error adding opening. Please try again.');
        }
    };

    const handleUpdate = async (id: string, updatedOpening: Partial<JobOpening>) => {
        try {
            const openingRef = doc(db, 'job_openings', id);
            await updateDoc(openingRef, updatedOpening);
            fetchOpenings();
            setEditingId(null);
        } catch (error) {
            console.error('Error updating opening:', error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteDoc(doc(db, 'job_openings', id));
            fetchOpenings();
        } catch (error) {
            console.error('Error deleting opening:', error);
        }
    };

    const OpeningForm = ({ opening, onSave, onCancel }: {
        opening: Partial<JobOpening>;
        onSave: (opening: Partial<JobOpening>) => void;
        onCancel: () => void;
    }) => {
        const [formData, setFormData] = useState({
            title: opening.title || '',
            category: opening.category || '',
            duration: opening.duration || '',
            stipend: opening.stipend || '',
            description: opening.description || '',
            deadline: opening.deadline || '',
            type: opening.type || 'intern',
            is_active: opening.is_active !== undefined ? opening.is_active : true,
            apply_url: opening.apply_url || ''  // Add this line
        });
        const [requirementsInput, setRequirementsInput] = useState(
            opening.requirements ? opening.requirements.join('\n') : ''
        );

        const handleSave = () => {
            // Validate required fields
            if (!formData.title || !formData.category || !formData.duration ||
                !formData.stipend || !formData.description || !formData.deadline) {
                alert('Please fill in all required fields');
                return;
            }

            const requirementsArray = requirementsInput.split('\n').map(req => req.trim()).filter(Boolean);

            const completeFormData = {
                title: formData.title,
                category: formData.category,
                duration: formData.duration,
                stipend: formData.stipend,
                requirements: requirementsArray,
                description: formData.description,
                deadline: formData.deadline,
                type: formData.type,
                is_active: formData.is_active,
                apply_url: formData.apply_url  // Add this line
            };

            onSave(completeFormData);
        };

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg bg-gray-50">
                <div>
                    <Label>Title *</Label>
                    <Input
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <Label>Category *</Label>
                    <Input
                        value={formData.category || ''}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <Label>Duration *</Label>
                    <Input
                        value={formData.duration || ''}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <Label>Stipend *</Label>
                    <Input
                        value={formData.stipend || ''}
                        onChange={(e) => setFormData({ ...formData, stipend: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <Label>Type</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value as any })}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="phd">PhD</SelectItem>
                            <SelectItem value="mtech">M.Tech</SelectItem>
                            <SelectItem value="intern">Intern</SelectItem>
                            <SelectItem value="project">Project</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label>Deadline *</Label>
                    <Input
                        value={formData.deadline || ''}
                        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                        required
                    />
                </div>
                <div className="md:col-span-2">
                    <Label>Description *</Label>
                    <Textarea
                        value={formData.description || ''}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={3}
                        required
                    />
                </div>
                <div className="md:col-span-2">
                    <Label>Requirements (one per line)</Label>
                    <Textarea
                        value={requirementsInput}
                        onChange={(e) => setRequirementsInput(e.target.value)}
                        rows={4}
                        placeholder="Requirement 1&#10;Requirement 2&#10;Requirement 3"
                    />
                </div>
                <div>
                    <Label>Apply URL</Label>
                    <Input
                        value={formData.apply_url || ''}
                        onChange={(e) => setFormData({ ...formData, apply_url: e.target.value })}
                        placeholder="https://example.com/apply"
                    />
                </div>
                <div className="md:col-span-2">
                    <Label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={formData.is_active || false}
                            onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                        />
                        <span>Active</span>
                    </Label>
                </div>
                <div className="md:col-span-2 flex space-x-2">
                    <Button onClick={handleSave}>
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
                    Job Openings Management
                    <Button onClick={() => setShowAddForm(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Opening
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {showAddForm && (
                    <OpeningForm
                        opening={newOpening}
                        onSave={handleAdd}
                        onCancel={() => setShowAddForm(false)}
                    />
                )}

                {openings.map((opening) => (
                    <div key={opening.id} className="border rounded-lg p-4">
                        {editingId === opening.id ? (
                            <OpeningForm
                                opening={opening}
                                onSave={(updatedOpening) => handleUpdate(opening.id, updatedOpening)}
                                onCancel={() => setEditingId(null)}
                            />
                        ) : (
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h3 className="font-semibold">{opening.title}</h3>
                                    <p className="text-gray-600">{opening.category}</p>
                                    <p className="text-sm text-gray-500">Duration: {opening.duration} | Stipend: {opening.stipend}</p>
                                    <p className="text-sm text-gray-500">Deadline: {opening.deadline}</p>
                                    <div className="flex space-x-2 mt-2">
                                        <Badge variant="outline">{opening.type}</Badge>
                                        <Badge variant={opening.is_active ? 'default' : 'secondary'}>
                                            {opening.is_active ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setEditingId(opening.id)}
                                    >
                                        <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDelete(opening.id)}
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

export default OpeningManagement;