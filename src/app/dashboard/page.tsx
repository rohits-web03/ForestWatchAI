import { auth } from '@/auth';
import { redirect } from "next/navigation";
import Image from 'next/image';
import React from 'react';

const page = async () => {
    const session = await auth();
    if (!session?.user) {
        redirect("/auth/signin");
    }
    return (
        <div>
            <p>{session.user.name}</p>
            <p>{session.user.email}</p>
            <Image src={session.user.image} alt='' width={100} height={100} />
        </div>
    )
}

export default page