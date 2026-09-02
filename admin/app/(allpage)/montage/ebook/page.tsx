"use client";
/* eslint-disable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps, @next/next/no-img-element */

import { api_url } from "@/hook/Apiurl";
import { compressImageForUpload } from "@/utils/compressImage";
import { Download, FileText, Gift, Image as ImageIcon, Save, Upload, Users } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

type Settings = {
  title: string;
  coverUrl: string | null;
  coverKey: string | null;
  pdfUrl: string | null;
  pdfKey: string | null;
  isPopupEnabled: boolean;
  hasPdf: boolean;
};

type Lead = {
  id: number;
  email: string;
  submitted_at: string;
  downloaded_at: string | null;
  download_count: number;
};

const defaultSettings: Settings = {
  title: "Content Creation Starter Kit",
  coverUrl: null,
  coverKey: null,
  pdfUrl: null,
  pdfKey: null,
  isPopupEnabled: false,
  hasPdf: false,
};

const getData = <T,>(response: { data?: { data?: T } }) => response.data?.data as T;

export default function EbookManagementPage() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<"cover" | "pdf" | null>(null);

  const loadSettings = async () => {
    const response = await api_url.get("/api/ebook/settings");
    setSettings({ ...defaultSettings, ...getData<Settings>(response) });
  };

  const loadLeads = async (targetPage = page) => {
    const response = await api_url.get(`/api/ebook/leads?page=${targetPage}&limit=10`);
    const result = getData<{ items: Lead[]; pagination: { total: number; totalPages: number } }>(response);
    setLeads(result?.items ?? []);
    setTotal(result?.pagination?.total ?? 0);
    setTotalPages(Math.max(1, result?.pagination?.totalPages ?? 1));
  };

  useEffect(() => {
    void Promise.all([loadSettings(), loadLeads(1)])
      .catch(() => toast.error("Could not load ebook management data"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (loading) return;
    void loadLeads(page).catch(() => toast.error("Could not load ebook leads"));
  }, [page]);

  const upload = async (event: ChangeEvent<HTMLInputElement>, assetType: "cover" | "pdf") => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (assetType === "pdf" && file.type !== "application/pdf") {
      toast.error("Please select a PDF file");
      return;
    }
    if (assetType === "cover" && !file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    setUploading(assetType);
    try {
      const uploadFile = assetType === "cover" ? await compressImageForUpload(file) : file;
      const formData = new FormData();
      formData.append("file", uploadFile);
      formData.append("assetType", assetType);
      const response = await api_url.post("/api/ebook/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const uploaded = getData<{ key: string; url: string }>(response);
      setSettings((current) => assetType === "cover"
        ? { ...current, coverKey: uploaded.key, coverUrl: uploaded.url }
        : { ...current, pdfKey: uploaded.key, pdfUrl: uploaded.url, hasPdf: true });
      toast.success(`${assetType === "cover" ? "Cover" : "PDF book"} uploaded`);
    } catch {
      toast.error(`Could not upload ${assetType}`);
    } finally {
      setUploading(null);
    }
  };

  const save = async () => {
    setSaving(true);
    try {
      await api_url.patch("/api/ebook/settings", settings);
      toast.success("Ebook settings saved");
    } catch {
      toast.error("Could not save ebook settings");
    } finally {
      setSaving(false);
    }
  };

  const exportLeads = async () => {
    try {
      const response = await api_url.get("/api/ebook/leads/export", { responseType: "blob" });
      const url = URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = url;
      link.download = "ebook-leads.csv";
      link.click();
      URL.revokeObjectURL(url);
    } catch {
      toast.error("Could not export leads");
    }
  };

  const copyDownloadSource = async () => {
    if (!settings.pdfUrl) return;
    await navigator.clipboard.writeText(settings.pdfUrl);
    toast.success("Download source link copied");
  };

  return (
    <div className="min-h-screen text-white">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <div className="rounded-xl bg-[#1FB5DD]/15 p-2 text-[#1FB5DD]"><Gift size={22} /></div>
              <h1 className="text-3xl font-bold">Ebook & Lead Management</h1>
            </div>
            <p className="text-sm text-gray-400">Manage one popup ebook, its R2 assets, and submitted download leads.</p>
          </div>
          <span className="rounded-full border border-[#1FB5DD]/30 bg-[#1FB5DD]/10 px-4 py-2 text-sm text-[#1FB5DD]">{total} leads</span>
        </div>

        <section className="grid gap-6 rounded-2xl border border-white/10 bg-[#07111f] p-5 shadow-xl lg:grid-cols-[280px_1fr] lg:p-7">
          <div className="flex min-h-[300px] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#102b38]">
            {settings.coverUrl ? <img src={settings.coverUrl} alt="Ebook cover" className="h-full max-h-[360px] w-full object-cover" /> : <div className="text-center text-gray-500"><ImageIcon className="mx-auto mb-3" size={42} /><p>No cover uploaded</p></div>}
          </div>
          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300" htmlFor="ebook-title">Book / popup title</label>
              <input id="ebook-title" value={settings.title} onChange={(event) => setSettings((current) => ({ ...current, title: event.target.value }))} className="h-12 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-white outline-none focus:border-[#1FB5DD]" maxLength={180} />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-gray-200 hover:bg-white/10">
                <Upload size={17} /> {uploading === "cover" ? "Uploading..." : "Upload book cover"}
                <input type="file" accept="image/*" className="hidden" onChange={(event) => void upload(event, "cover")} disabled={Boolean(uploading)} />
              </label>
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-gray-200 hover:bg-white/10">
                <FileText size={17} /> {uploading === "pdf" ? "Uploading..." : "Upload PDF book"}
                <input type="file" accept="application/pdf,.pdf" className="hidden" onChange={(event) => void upload(event, "pdf")} disabled={Boolean(uploading)} />
              </label>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-gray-400">
              <p className="flex items-center gap-2"><FileText size={16} className="text-[#1FB5DD]" /> PDF status: <span className={settings.hasPdf ? "text-emerald-400" : "text-amber-400"}>{settings.hasPdf ? "Uploaded and ready" : "Not uploaded"}</span></p>
              {settings.pdfUrl && <div className="mt-2 flex flex-wrap items-center gap-3"><a href={settings.pdfUrl} target="_blank" rel="noreferrer" className="max-w-[70%] truncate text-[#1FB5DD] hover:underline">Open current PDF</a><button type="button" onClick={() => void copyDownloadSource()} className="text-xs font-semibold text-gray-300 hover:text-white">Copy link</button></div>}
            </div>
            <label className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-black/20 p-4">
              <span><span className="block font-semibold">Show popup on frontend</span><span className="text-xs text-gray-500">Popup appears only when a PDF is available.</span></span>
              <input type="checkbox" checked={settings.isPopupEnabled} onChange={(event) => setSettings((current) => ({ ...current, isPopupEnabled: event.target.checked }))} className="h-5 w-5 accent-[#1FB5DD]" />
            </label>
            <button type="button" onClick={() => void save()} disabled={saving || Boolean(uploading)} className="inline-flex items-center gap-2 rounded-xl bg-[#1FB5DD] px-5 py-3 font-semibold text-white transition hover:bg-[#139bc3] disabled:cursor-not-allowed disabled:opacity-50"><Save size={17} /> {saving ? "Saving..." : "Save ebook settings"}</button>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-[#07111f] p-5 shadow-xl lg:p-7">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div><h2 className="flex items-center gap-2 text-xl font-bold"><Users size={20} className="text-[#1FB5DD]" /> Submitted emails</h2><p className="mt-1 text-sm text-gray-500">Every form submission is recorded; download status updates when the protected link is opened.</p></div>
            <button type="button" onClick={() => void exportLeads()} className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#1FB5DD]/40 px-4 py-2 text-sm font-semibold text-[#1FB5DD] hover:bg-[#1FB5DD]/10"><Download size={16} /> Export all CSV</button>
          </div>
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full min-w-[680px] text-left text-sm"><thead className="bg-white/5 text-xs uppercase tracking-wide text-gray-500"><tr><th className="px-4 py-3">Email</th><th className="px-4 py-3">Submitted</th><th className="px-4 py-3">Download status</th><th className="px-4 py-3">Downloads</th></tr></thead><tbody className="divide-y divide-white/10">{leads.length ? leads.map((lead) => <tr key={lead.id} className="text-gray-300"><td className="px-4 py-4 font-medium text-white">{lead.email}</td><td className="px-4 py-4">{new Date(lead.submitted_at).toLocaleString()}</td><td className="px-4 py-4">{lead.downloaded_at ? <span className="text-emerald-400">Downloaded {new Date(lead.downloaded_at).toLocaleString()}</span> : <span className="text-amber-400">Not downloaded</span>}</td><td className="px-4 py-4">{lead.download_count}</td></tr>) : <tr><td colSpan={4} className="px-4 py-10 text-center text-gray-500">{loading ? "Loading leads..." : "No ebook leads yet."}</td></tr>}</tbody></table>
          </div>
          {totalPages > 1 && <div className="mt-5 flex items-center justify-center gap-3"><button type="button" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1} className="rounded-lg border border-white/10 px-3 py-2 text-sm disabled:opacity-40">Previous</button><span className="text-sm text-gray-400">Page {page} of {totalPages}</span><button type="button" onClick={() => setPage((current) => Math.min(totalPages, current + 1))} disabled={page === totalPages} className="rounded-lg border border-white/10 px-3 py-2 text-sm disabled:opacity-40">Next</button></div>}
        </section>
      </div>
    </div>
  );
}
