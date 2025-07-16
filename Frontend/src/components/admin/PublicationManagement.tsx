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
interface Publication {
    id?: string; // Make id optional since Firestore auto-generates
    title: string;
    authors: string[];
    journal: string;
    year: string;
    type: 'Journal Article' | 'Conference Paper' | 'Review Article';
    abstract: string;
    doi?: string;
    status: 'Published' | 'Under Review' | 'In Press';
    createdAt?: Date; // Add this for ordering
}

const PublicationManagement = () => {
    const [publications, setPublications] = useState<Publication[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [newPublication, setNewPublication] = useState<Partial<Publication>>({
        type: 'Journal Article',
        status: 'Published'
    });
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        fetchPublications();
    }, []);

    const fetchPublications = async () => {
        try {
            const q = query(collection(db, 'publications'), orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            const publicationsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Publication[];
            setPublications(publicationsData);
        } catch (error) {
            console.error('Error fetching publications:', error);
        }
    };

    const handleAdd = async () => {
        try {
            await addDoc(collection(db, 'publications'), {
                ...newPublication,
                createdAt: new Date()
            });
            fetchPublications();
            setNewPublication({ type: 'Journal Article', status: 'Published' });
            setShowAddForm(false);
        } catch (error) {
            console.error('Error adding publication:', error);
        }
    };

    const handleUpdate = async (id: string, updatedPublication: Partial<Publication>) => {
        try {
            const docRef = doc(db, 'publications', id);
            await updateDoc(docRef, updatedPublication);
            fetchPublications();
            setEditingId(null);
        } catch (error) {
            console.error('Error updating publication:', error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteDoc(doc(db, 'publications', id));
            fetchPublications();
        } catch (error) {
            console.error('Error deleting publication:', error);
        }
    };

    const PublicationForm = ({ publication, onSave, onCancel }: {
        publication: Partial<Publication>;
        onSave: (publication: Partial<Publication>) => void;
        onCancel: () => void;
    }) => {
        const [formData, setFormData] = useState({
            title: publication.title || '',
            authors: publication.authors || [],
            journal: publication.journal || '',
            year: publication.year || '',
            type: publication.type || 'Journal Article',
            abstract: publication.abstract || '',
            doi: publication.doi || '',
            status: publication.status || 'Published'
        });
        const [authorsInput, setAuthorsInput] = useState(
            publication.authors ? publication.authors.join(', ') : ''
        );

        const handleSave = () => {
            const authorsArray = authorsInput.split(',').map(author => author.trim()).filter(Boolean);
            onSave({ ...formData, authors: authorsArray });
        };

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg bg-gray-50">
                <div className="md:col-span-2">
                    <Label>Title</Label>
                    <Input
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                </div>
                <div className="md:col-span-2">
                    <Label>Authors (comma-separated)</Label>
                    <Input
                        value={authorsInput}
                        onChange={(e) => setAuthorsInput(e.target.value)}
                        placeholder="Author 1, Author 2, Author 3"
                    />
                </div>
                <div>
                    <Label>Journal</Label>
                    <Input
                        value={formData.journal || ''}
                        onChange={(e) => setFormData({ ...formData, journal: e.target.value })}
                    />
                </div>
                <div>
                    <Label>Year</Label>
                    <Input
                        value={formData.year || ''}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    />
                </div>
                <div>
                    <Label>Type</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value as any })}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Journal Article">Journal Article</SelectItem>
                            <SelectItem value="Conference Paper">Conference Paper</SelectItem>
                            <SelectItem value="Review Article">Review Article</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label>Status</Label>
                    <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value as any })}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Published">Published</SelectItem>
                            <SelectItem value="Under Review">Under Review</SelectItem>
                            <SelectItem value="In Press">In Press</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label>DOI (optional)</Label>
                    <Input
                        value={formData.doi || ''}
                        onChange={(e) => setFormData({ ...formData, doi: e.target.value })}
                    />
                </div>
                <div className="md:col-span-2">
                    <Label>Abstract</Label>
                    <Textarea
                        value={formData.abstract || ''}
                        onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
                        rows={4}
                    />
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
                    Publication Management
                    <Button onClick={() => setShowAddForm(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Publication
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {showAddForm && (
                    <PublicationForm
                        publication={newPublication}
                        onSave={handleAdd}
                        onCancel={() => setShowAddForm(false)}
                    />
                )}

                {publications.map((publication) => (
                    <div key={publication.id} className="border rounded-lg p-4">
                        {editingId === publication.id ? (
                            <PublicationForm
                                publication={publication}
                                onSave={(updatedPublication) => handleUpdate(publication.id, updatedPublication)}
                                onCancel={() => setEditingId(null)}
                            />
                        ) : (
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h3 className="font-semibold">{publication.title}</h3>
                                    <p className="text-gray-600">Authors: {publication.authors ? publication.authors.join(', ') : 'No authors'}</p>
                                    <p className="text-sm text-gray-500">{publication.journal} ({publication.year})</p>
                                    <div className="flex space-x-2 mt-2">
                                        <Badge variant="outline">{publication.type}</Badge>
                                        <Badge variant={publication.status === 'Published' ? 'default' : 'secondary'}>
                                            {publication.status}
                                        </Badge>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setEditingId(publication.id)}
                                    >
                                        <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDelete(publication.id)}
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

export default PublicationManagement;