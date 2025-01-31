import { signIn } from "@/auth";
import { signOut } from "@/auth";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  console.log(session);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      Hi there!
      <form
        action={async () => {
          "use server"
          if(session?.user?.email)
            await signOut();
          else
            await signIn();
        }}
      >
        {!session?.user?.email && <button type="submit">SignIn</button>}
        {session?.user?.email && <button type="submit">SignOut</button>}
      </form>
      {session?.user?.email && <p>{JSON.stringify(session, null, 2)}</p>}
    </div>
  );
}
