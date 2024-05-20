'use client';

import { Button } from "@/components/ui/button";
import { SignInButton, SignedIn, SignedOut, UserButton, useSession } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const createFile = useMutation(api.files.createFile)  
  const files = useQuery(api.files.getFiles)
  return (
    <main className="flex min-h-screen flex-col items-center justify-center ">
        <Button onClick={()=>{
                createFile({name:"Hello world"})
               }}>

                create new File
        </Button>
        <SignedOut>
              <Button><SignInButton mode="modal" /></Button>
        </SignedOut>
        <SignedIn>
          <Button><UserButton /></Button>
          {files?.map(file=>{
          return <div key={file._id}>{file.name} </div>
          })}
        </SignedIn>
    </main>
  );
}
