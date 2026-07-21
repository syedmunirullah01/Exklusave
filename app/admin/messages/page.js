"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ConfirmModal } from "@/components/ui/AppModal";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, useDialogA11yIds } from "@/components/ui/Dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import AdminTopbar from "@/features/admin/components/AdminTopbar";

export default function AdminMessagesPage() {
  const [activeTab, setActiveTab] = useState("contacts"); // "contacts" | "subscribers"
  const [messages, setMessages] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { titleId, descriptionId } = useDialogA11yIds();

  async function loadData() {
    setIsLoading(true);
    try {
      if (activeTab === "contacts") {
        const res = await fetch("/api/contacts", { cache: "no-store" });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Unable to load messages.");
        setMessages(json.data || []);
      } else {
        const res = await fetch("/api/subscribers", { cache: "no-store" });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Unable to load subscribers.");
        setSubscribers(json.data || []);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [activeTab]);

  async function handleDeleteConfirmed() {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const endpoint = activeTab === "contacts" 
        ? `/api/contacts/${deleteTarget.id}` 
        : `/api/subscribers/${deleteTarget.id}`;

      const res = await fetch(endpoint, { method: "DELETE" });
      if (!res.ok) {
        throw new Error("Deletion failed.");
      }
      toast.success(activeTab === "contacts" ? "Message deleted." : "Subscriber removed.");
      setDeleteTarget(null);
      await loadData();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-16 font-sans antialiased">
      <AdminTopbar title="Messages & Signups" breadcrumbTrail={["Admin", "Inbox"]} />

      <main className="mx-auto max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
        
        {/* Tab Controls */}
        <div className="flex border-b border-zinc-800 gap-1.5 p-1 bg-zinc-900/60 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab("contacts")}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === "contacts"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Contact Messages ({messages.length})
          </button>
          <button
            onClick={() => setActiveTab("subscribers")}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === "subscribers"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Newsletter Subscribers ({subscribers.length})
          </button>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 sm:p-6 shadow-xs">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800 pb-4 mb-6">
            <div>
              <h3 className="text-base font-bold text-white">
                {activeTab === "contacts" ? "Contact Message Submissions" : "Newsletter Subscription List"}
              </h3>
              <p className="mt-0.5 text-xs text-zinc-400">
                {activeTab === "contacts" 
                  ? "View partnership requests, help desk queries, and contact forms filled by users." 
                  : "List of users who subscribed to the Persuekey newsletter feed."}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button type="button" onClick={loadData} variant="outline" className="text-xs h-8">
                Refresh list
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex min-h-48 items-center justify-center text-xs font-semibold text-zinc-500">
              Loading data...
            </div>
          ) : activeTab === "contacts" ? (
            messages.length ? (
              <div className="overflow-x-auto rounded-xl border border-zinc-800">
                <Table>
                  <TableHeader className="bg-zinc-800/60">
                    <TableRow>
                      <TableHead className="text-zinc-300 font-bold text-xs">Sender Profile</TableHead>
                      <TableHead className="text-zinc-300 font-bold text-xs">Subject</TableHead>
                      <TableHead className="text-zinc-300 font-bold text-xs">Message Excerpt</TableHead>
                      <TableHead className="text-zinc-300 font-bold text-xs">Received At</TableHead>
                      <TableHead className="text-right text-zinc-300 font-bold text-xs">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y divide-zinc-800">
                    {messages.map((msg) => (
                      <tr key={msg.id} className="hover:bg-zinc-800/40 transition">
                        <TableCell>
                          <div>
                            <p className="font-bold text-xs text-white">{msg.name}</p>
                            <p className="text-[10px] text-zinc-400 font-mono mt-0.5">{msg.email}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs text-zinc-200 font-semibold">{msg.subject}</TableCell>
                        <TableCell className="max-w-xs truncate text-xs text-zinc-400 font-normal">
                          {msg.message}
                        </TableCell>
                        <TableCell className="text-xs text-zinc-400 font-medium">
                          {new Date(msg.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedMessage(msg)}
                              className="h-8 text-xs font-semibold border-zinc-700"
                            >
                              View Full Message
                            </Button>
                            <Button
                              type="button"
                              variant="secondary"
                              size="sm"
                              onClick={() => setDeleteTarget(msg)}
                              className="h-8 text-xs font-semibold text-rose-400 hover:bg-rose-950/50"
                            >
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </tr>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-800/30 px-6 py-12 text-center">
                <h3 className="text-sm font-bold text-white">No Messages Found</h3>
                <p className="mt-1 text-xs text-zinc-400">
                  Any contact form submission will automatically appear here.
                </p>
              </div>
            )
          ) : subscribers.length ? (
            <div className="overflow-x-auto rounded-xl border border-zinc-800">
              <Table>
                <TableHeader className="bg-zinc-800/60">
                  <TableRow>
                    <TableHead className="text-zinc-300 font-bold text-xs">Email Address</TableHead>
                    <TableHead className="text-zinc-300 font-bold text-xs">Subscribed At</TableHead>
                    <TableHead className="text-right text-zinc-300 font-bold text-xs">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-zinc-800">
                  {subscribers.map((sub) => (
                    <tr key={sub.id} className="hover:bg-zinc-800/40 transition">
                      <TableCell>
                        <p className="font-bold text-xs text-white font-mono">{sub.email}</p>
                      </TableCell>
                      <TableCell className="text-xs text-zinc-400 font-medium">
                        {new Date(sub.subscribedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          onClick={() => setDeleteTarget(sub)}
                          className="h-8 text-xs font-semibold text-rose-400 hover:bg-rose-950/50"
                        >
                          Remove Email
                        </Button>
                      </TableCell>
                    </tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-800/30 px-6 py-12 text-center">
              <h3 className="text-sm font-bold text-white">No Subscribers Found</h3>
              <p className="mt-1 text-xs text-zinc-400">
                Subscribed users from website footer will automatically appear here.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* View Full Message Dialog */}
      <Dialog open={Boolean(selectedMessage)} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent aria-labelledby={titleId} aria-describedby={descriptionId} className="max-w-xl bg-zinc-900 border-zinc-800 text-white">
          <DialogHeader>
            <DialogTitle id={titleId} className="text-base font-bold text-white">
              Message from {selectedMessage?.name}
            </DialogTitle>
            <DialogDescription id={descriptionId} className="text-xs text-zinc-400">
              Sender Email: <span className="font-mono text-emerald-400">{selectedMessage?.email}</span>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 pt-2">
            <div className="bg-zinc-950 border border-zinc-850 p-4 rounded-xl">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">Subject</span>
              <p className="text-xs font-bold text-white mt-1">{selectedMessage?.subject}</p>
            </div>

            <div className="bg-zinc-950 border border-zinc-850 p-4 rounded-xl">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">Message Body</span>
              <p className="text-xs text-zinc-200 mt-2 whitespace-pre-wrap leading-relaxed">
                {selectedMessage?.message}
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-zinc-800">
            <Button
              type="button"
              variant="outline"
              onClick={() => setSelectedMessage(null)}
              className="text-xs font-semibold border-zinc-700"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmModal
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteTarget(null);
          }
        }}
        title={activeTab === "contacts" ? "Delete Contact Message" : "Remove Subscriber"}
        description={
          activeTab === "contacts"
            ? "Are you sure you want to delete this message? This action cannot be undone."
            : "Are you sure you want to remove this email address from the subscribers list?"
        }
        confirmLabel={activeTab === "contacts" ? "Delete Message" : "Remove Email"}
        cancelLabel="Cancel"
        onConfirm={handleDeleteConfirmed}
        isSubmitting={isDeleting}
      />
    </div>
  );
}
