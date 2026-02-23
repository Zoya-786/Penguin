"use client";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      
      // Set the session cookie for Middleware
      setCookie("penguin_session", token, { maxAge: 60 * 60 * 24 * 7 });
      
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md border-primary/20 bg-card/50 backdrop-blur-xl">
        <CardHeader className="text-center">
          <ShieldCheck className="mx-auto h-12 w-12 text-primary mb-2" />
          <CardTitle className="text-4xl font-black tracking-tighter text-primary">PENGUIN</CardTitle>
          <p className="text-muted-foreground text-xs uppercase tracking-widest">Habitat Security Portal</p>
        </CardHeader>
        <CardContent>
          <Button onClick={handleGoogleLogin} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}