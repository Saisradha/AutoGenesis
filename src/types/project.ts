export interface Project {
    id: string;
    user_id: string;

    name: string;
    framework: string;

    prompt: string | null;

    status: string;

    created_at: string;
    updated_at: string;
}