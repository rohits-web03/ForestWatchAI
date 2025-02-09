import 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            id?: string;
            emailVerified?: DateTime;
            email?: string;
            image?: string;
        } & DefaultSession['user'];
    }

    interface User {
        id?: string;
        emailVerified?: DateTime;
        email?: string;
        image?: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id?: string;
        emailVerified?: DateTime;
        email?: string;
        image?: string;
    }
}