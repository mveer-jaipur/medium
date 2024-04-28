export interface Blog {
    id: number;
    author: {
        username: string;
    };
    title: string;
    content: string;
    publishedDate: string;
}
