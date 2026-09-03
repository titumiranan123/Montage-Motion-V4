"use client";

import { api_url } from "@/hook/Apiurl";
import { Download, Gift, Mail, X } from "lucide-react";
import { useEffect, useState } from "react";

type ApiResponse = {
  data?: {
    downloadUrl?: string;
    emailSent?: boolean;
  };
  message?: string;
};

type EbookSettingsResponse = {
  data?: {
    title?: string;
    coverUrl?: string | null;
    isPopupEnabled?: boolean;
    hasPdf?: boolean;
  };
};

const SESSION_KEY = "montage-motion-ebook-popup-shown";

const getErrorMessage = (error: unknown) => {
  if (error && typeof error === "object" && "response" in error) {
    const response = (error as { response?: { data?: { message?: string } } })
      .response;
    if (response?.data?.message) return response.data.message;
  }
  return "We could not prepare the download. Please try again.";
};

export default function EbookLeadPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState("");
  const [ebookTitle, setEbookTitle] = useState("Content Creation Starter Kit");
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const loadSettings = async () => {
      try {
        const response = await api_url.get<EbookSettingsResponse>("/api/ebook");
        const settings = response.data.data;
        if (cancelled || !settings?.isPopupEnabled || !settings.hasPdf) return;
        setEbookTitle(settings.title || "Content Creation Starter Kit");
        setCoverUrl(settings.coverUrl || null);
        setIsAvailable(true);
      } catch {
        // A missing or unavailable ebook should not interrupt the website.
      }
    };
    void loadSettings();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isAvailable) return;
    let alreadyShown = false;
    try {
      alreadyShown = window.sessionStorage.getItem(SESSION_KEY) === "true";
    } catch {
      /* privacy mode */
    }
    if (alreadyShown) return;

    const openPopup = () => {
      setIsOpen(true);
      try {
        window.sessionStorage.setItem(SESSION_KEY, "true");
      } catch {
        /* privacy mode */
      }
      window.removeEventListener("scroll", openOnScroll);
    };
    const openOnScroll = () => {
      if (window.scrollY >= 4000) openPopup();
    };
    window.addEventListener("scroll", openOnScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", openOnScroll);
    };
  }, [isAvailable]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  const closePopup = () => {
    if (isSubmitting) return;
    setIsOpen(false);
  };

  const submitLead = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setIsSubmitting(true);
    try {
      const response = await api_url.post<ApiResponse>("/api/ebook-leads", {
        email: normalizedEmail,
      });
      const url = response.data.data?.downloadUrl;
      if (!url) throw new Error("The download link was not returned.");
      setEmail(normalizedEmail);
      setDownloadUrl(url);
      setEmailSent(Boolean(response.data.data?.emailSent));
    } catch (submitError) {
      setError(getErrorMessage(submitError));
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadEbook = async () => {
    if (!downloadUrl || isDownloading) return;
    setIsDownloading(true);
    setError("");
    try {
      const response = await api_url.get(downloadUrl, { responseType: "blob" });
      const objectUrl = window.URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = "montage-motion-ebook.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(objectUrl);
    } catch {
      setError("We could not download the ebook. Please request a new link.");
    } finally {
      setIsDownloading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#10242a]/65 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closePopup();
      }}
    >
      <section
        className="relative grid w-full max-w-[760px] overflow-hidden rounded-[22px] bg-[#d9f7fc] shadow-[0_25px_80px_rgba(6,35,45,0.35)] md:grid-cols-[minmax(250px,0.9fr)_1.1fr]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ebook-popup-title"
      >
        <button
          type="button"
          onClick={closePopup}
          aria-label="Close ebook download popup"
          className="absolute right-3 top-3 z-10 rounded-full bg-white/80 p-1.5 text-[#24444b] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isSubmitting}
        >
          <X size={18} />
        </button>

        <div className="relative hidden min-h-[340px] overflow-hidden bg-[#acd9ed] md:block">
          {coverUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={coverUrl}
              alt={`${ebookTitle} ebook cover`}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          ) : (
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(255,255,255,0.72),transparent_25%),linear-gradient(155deg,#5bdcf4_0%,#acd9ed_45%,#70b9d2_100%)]"
              aria-hidden="true"
            />
          )}
        </div>

        <div className="relative flex flex-col justify-center overflow-hidden bg-[radial-gradient(circle_at_88%_18%,rgba(255,255,255,0.88),transparent_26%),linear-gradient(135deg,#b8eef8_0%,#d8f8fb_55%,#bdeefa_100%)] p-7 sm:p-10">
          <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-[#5bdcf4]/45 blur-[58px]" />
          <div className="pointer-events-none absolute -bottom-24 right-20 h-44 w-44 rounded-full bg-[#1fb5dd]/25 blur-[60px]" />
          <div className="relative z-[1]">
            <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#1681b4]">
              <Gift size={15} /> Limited free download
            </p>
            <h2
              id="ebook-popup-title"
              className="max-w-[360px] text-3xl font-bold leading-tight text-[#12272d]"
            >
              {downloadUrl
                ? "Your free ebook is ready"
                : `Unlock your free ${ebookTitle}`}
            </h2>

            {downloadUrl ? (
              <div className="mt-4 space-y-5 text-[14px] leading-6 text-[#3d5c63]">
                <p>
                  {emailSent
                    ? `We sent the download link to ${email}.`
                    : "Your download is ready. Email delivery is temporarily unavailable, so download it here."}
                </p>
                <button
                  type="button"
                  onClick={() => void downloadEbook()}
                  disabled={isDownloading}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#08a35b] px-5 font-semibold text-white transition hover:bg-[#078d4f] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Download size={18} />{" "}
                  {isDownloading ? "Downloading..." : "Download ebook"}
                </button>
                <p className="text-center text-xs text-[#55757c]">
                  The secure link is valid for 48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={submitLead} className="mt-4 space-y-4">
                <p className="text-[14px] leading-6 text-[#3d5c63]">
                  Enter your email and we&apos;ll send the guide to help you
                  grow from zero to your first 10K followers.
                </p>
                <label className="relative block">
                  <span className="sr-only">Email address</span>
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4b9aac]"
                    size={17}
                  />
                  <input
                    type="email"
                    name="ebook-email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setError("");
                    }}
                    placeholder="Enter your email address"
                    autoComplete="email"
                    maxLength={254}
                    required
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? "ebook-email-error" : undefined}
                    className="h-12 w-full rounded-xl border border-[#80cbdc] bg-white/45 pl-10 pr-3 text-sm text-[#17363d] outline-none transition placeholder:text-[#60919d] focus:border-[#1681b4] focus:ring-2 focus:ring-[#1681b4]/20"
                  />
                </label>
                {error && (
                  <p
                    id="ebook-email-error"
                    className="text-sm text-red-700"
                    role="alert"
                  >
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#1188ec] px-5 font-semibold text-white transition hover:bg-[#0877d4] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Gift size={18} />{" "}
                  {isSubmitting
                    ? "Preparing your ebook..."
                    : "Get my free ebook"}
                </button>
                <p className="text-center text-[10px] text-[#55757c]">
                  No spam. You can unsubscribe anytime.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
