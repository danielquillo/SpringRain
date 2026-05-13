"use client";

import { useEffect, useState } from "react";
import { supabaseClient } from "@/app/lib/supabaseClient";
import { useRouter } from "next/navigation";

type QuoteRequest = {
  id: number;
  name: string;
  email: string;
  phone: string;
  city: string | null;
  zip: string | null;
  service: string;
  message: string;
  status: string;
  created_at: string;
  updated_at: string | null;
};

export default function AdminPage() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkingSession, setCheckingSession] = useState(true);
  const router = useRouter();

  async function handleLogout() {
    await supabaseClient.auth.signOut();
    router.push("/admin/login");
  }

  async function handleStatusChange(id: number, status: string) {
    const { error } = await supabaseClient
      .from("quote_requests")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      console.error("Status update error:", error.message, error.details, error.hint);
      return;
    }

    setQuotes((current) =>
      current.map((quote) =>
        quote.id === id ? { ...quote, status } : quote
      )
    );
  }

  useEffect(() => {
    async function checkSessionAndLoadQuotes() {
      const {
        data: { session },
      } = await supabaseClient.auth.getSession();
      
      if (!session) {
        router.replace("/admin/login");
        return;
      }

      setCheckingSession(false);
      const { data, error } = await supabaseClient
        .from("quote_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Quote request load error:", error.message, error.details, error.hint);
      } else {
        setQuotes(data || []);
      }

      setLoading(false);
    }

    checkSessionAndLoadQuotes();
  }, [router]);

  // if someone doing something fishy, don't let em see the page at all
  if (checkingSession) {
    return (
      <main className="min-h-screen bg-neutral-50 px-4 py-12">
        <div className="mx-auto max-w-5xl">
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-neutral-900">
            Owner Dashboard
          </h1>
          <p className="mt-2 text-neutral-600">
            View incoming quote requests.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="mb-6 rounded-xl bg-neutral-200 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-300"
        >
          Log out
        </button>

        {loading ? (
          <p className="text-neutral-600">Loading requests...</p>
        ) : quotes.length === 0 ? (
          <p className="text-neutral-600">No quote requests found.</p>
        ) : (
          <div className="grid gap-4">
            {quotes.map((quote) => (
              <div
                key={quote.id}
                className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-xl font-medium text-neutral-900">
                      {quote.name}
                    </h2>

                    <p className="text-sm text-neutral-600">
                      {quote.service}
                    </p>
                  </div>

                  <select
                    value={quote.status}
                    onChange={(e) => 
                      handleStatusChange(quote.id, e.target.value)
                    }
                    className="rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-700" 
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="quoted">Quoted</option>
                    <option value="completed">Completed</option>
                  </select>           
                </div>

                <div className="mt-4 grid gap-1 text-sm text-neutral-700">
                  <p>Email: {quote.email}</p>
                  <p>Phone: {quote.phone}</p>

                  {quote.city && <p>City: {quote.city}</p>}
                  {quote.zip && <p>ZIP: {quote.zip}</p>}
                </div>

                <div className="mt-4 rounded-xl bg-neutral-50 p-4 text-sm text-neutral-800">
                  {quote.message}
                </div>

                <p className="mt-4 text-xs text-neutral-500">
                  Submitted{" "}
                  {new Date(quote.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
