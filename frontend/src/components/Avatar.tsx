export const Avatar = ({ authorName }: { authorName: string }) => {
    return (
        <div className="relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full m-1">
            <span className="font-light text-xs text-gray-600 p-2 ">
                {authorName.slice(0, 1).toUpperCase()}
            </span>
        </div>
    );
};
