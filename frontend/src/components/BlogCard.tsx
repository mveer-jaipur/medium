import { Link } from 'react-router-dom';
import { IBlogCard } from '../interfaces/IBlogCard';
import { Avatar } from './Avatar';

export const BlogCard = ({
    authorName,
    content,
    publishedDate,
    title,
    id
}: IBlogCard) => {
    return (
        <Link to={`${id}`}>
            <div className="flex justify-center mt-10 align-middle">
                <div className="border-b border-slate-200 pb-4 w-2/4">
                    <div className="flex align-middle items-center">
                        <Avatar authorName={authorName} />
                        <div className="font-extralight pl-2">{authorName}</div>
                        <div className="text-xs flex justify-center items-center px-2">
                            &#9679;
                        </div>
                        <div className="pl-2 text-slate-500 text-sm">
                            {publishedDate}
                        </div>
                    </div>
                    <div className="font-bold text-2xl">{title}</div>
                    <div>{content.slice(0, 100) + '...'}</div>
                    <div className="text-slate-400 text-sm mt-6">
                        {`${Math.ceil(content.length / 100)} minutes read`}
                    </div>
                </div>
            </div>
        </Link>
    );
};
