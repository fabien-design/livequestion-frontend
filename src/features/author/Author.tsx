import React from 'react'
import { AuthorUndetailed } from '../query/author.query'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type AuthorProps = {
    author: AuthorUndetailed;
}

export const Author = ({author} :  AuthorProps) => {
  return (
    <div className='flex gap-4 items-center'>
        <Avatar>
                {author.avatar.name ? (
                    <AvatarImage
                        src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}${process.env.NEXT_PUBLIC_IMAGES_PATH}${author.avatar.name}`}
                        alt="avatar"
                        className="h-12 w-12 rounded-full"
                    />
                ) : null}
                <AvatarFallback>
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-700 text-white">
                        {author.username[0].toUpperCase()}
                    </div>  
                </AvatarFallback>
        </Avatar>
        <div className='grid'>
            <div className='flex gap-4 items-center'>
                <p className='text-lg font-semibold'>{author.username}</p>
                <p className='text-sm text-gray-500'>A rejoint le {new Date(author.created_at).toLocaleDateString("fr")}</p>
            </div>
            <p>
                <span className='text-md pr-2'>{author.questions_count}</span> Questions posées
            </p>
        </div>        
    </div>
  )
}

