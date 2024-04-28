import { BlogCard } from '../components/BlogCard';
import { useBlogs } from '../components/hooks';
import { Skeleton } from '../components/Skeleton';
import { Blog } from '../interfaces/IBlog';

export const Blogs = () => {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return <Skeleton />;
    }

    return (
        <div>
            {blogs.map((blog: Blog) => (
                <BlogCard
                    key={blog.id}
                    authorName={blog.author.username}
                    title={blog.title}
                    content={blog.content}
                    publishedDate={blog.publishedDate}
                    id={blog.id}
                />
            ))}
        </div>
    );
};
