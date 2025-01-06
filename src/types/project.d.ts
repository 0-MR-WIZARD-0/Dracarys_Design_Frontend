export interface Project {
    id: number;
    name: string;
    category: 'customization' | 'design' | 'web-development';
    description: string;
    previewImage: string;
    images: string[];
}