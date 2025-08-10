"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import DefaultPageLayout from "@/ui/layouts/DefaultPageLayout";
import { brands } from "@/lib/brands";
import { Avatar } from "@/ui/components/Avatar";
import { FeatherGamepad } from "@subframe/core";

interface Session {
  id: string;
  brand: string;
  coach_name: string;
  title: string;
  description: string;
  price: number;
  scheduled_time: string;
  game: string;
  image?: string;
}

export default function SessionInfoPage() {
  const params = useParams() as { id?: string | string[] } | null;
  const id = Array.isArray(params?.id) ? params!.id[0] : params?.id;

  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    let cancelled = false;

    async function fetchSession() {
      setLoading(true);
      const { data, error } = await supabase
        .from("sessions")
        .select("*")
        .eq("id", id)
        .single();

      if (!cancelled) {
        if (error) {
          console.error("Error fetching session:", error.message);
          setSession(null);
        } else {
          setSession(data as Session);
        }
        setLoading(false);
      }
    }

    if (id) fetchSession();
    return () => {
      cancelled = true;
    };
  }, [id, supabase]);

  const brandConfig = brands[session?.brand || "skillery"];

  return (
    <>
      <div className="fixed top-4 left-1/2 z-50 -translate-x-1/2 bg-yellow-500 px-6 py-2 rounded-md shadow-lg shadow-yellow-300 pointer-events-none">
        <span className="font-['Orbitron'] text-white text-[16px] font-bold tracking-widest uppercase drop-shadow-[0_0_6px_#ffffff]">
          DEMO DATA
        </span>
      </div>

      <DefaultPageLayout>
        <div className="container py-12 max-w-3xl mx-auto flex flex-col gap-8 bg-default-background">
          {loading ? (
            <p className="text-default-font">Loading session info...</p>
          ) : session ? (
            <>
              <div className="flex flex-col items-center gap-2">
                <FeatherGamepad className="text-heading-1 font-heading-1 text-default-font" />
                <h1 className="text-heading-1 font-heading-1 text-default-font text-center">
                  {session.title}
                </h1>
                <p className="text-subtext-color font-body text-center">
                  {brandConfig.description}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <Avatar size="large" image={session.image}>
                  {(session.coach_name && session.coach_name[0]) || "?"}
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-heading-3 font-heading-3 text-default-font">
                    {session.coach_name}
                  </span>
                  <span className="text-subtext-color text-body font-body">
                    {session.game}
                  </span>
                </div>
              </div>

              <p className="text-default-font text-body font-body">
                {session.description}
              </p>

              <div className="text-default-font font-body text-body">
                <strong>Scheduled:</strong>{" "}
                {new Date(session.scheduled_time).toLocaleString()}
              </div>

              <div className="text-default-font font-body text-body">
                <strong>Price:</strong> ${session.price.toFixed(2)}
              </div>
            </>
          ) : (
            <p className="text-error text-body">Session not found.</p>
          )}
        </div>
      </DefaultPageLayout>
    </>
  );
}