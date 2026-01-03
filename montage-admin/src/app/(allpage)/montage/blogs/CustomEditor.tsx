"use client";

import React, { useCallback, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import Image from "@tiptap/extension-image";
import FontFamily from "@tiptap/extension-font-family";
import axios from "axios";

// Import Lucide Icons
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Type,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Link as LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Palette,
  Highlighter,
  Table as TableIcon,
  Trash2,
  Image as ImageIcon,
  Upload,
  Eye,
  EyeOff,
  Download,
  Copy,
  Check,
  X,
  Moon,
  Sun,
  Save,
  FileCode,
  Smile,
  Hash,
  Plus,
  Minus,
  Grid3x3,
  Loader2,
} from "lucide-react";
import { api_url } from "@/hook/Apiurl";

// API base URL - replace with your actual API URL

export default function TiptapEditor() {
  const [showPreview, setShowPreview] = React.useState(true);
  const [copied, setCopied] = React.useState(false);
  const [htmlContent, setHtmlContent] = React.useState("");
  const [darkMode, setDarkMode] = React.useState(true);
  const [wordCount, setWordCount] = React.useState(0);
  const [showTableModal, setShowTableModal] = useState(false);
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [withHeader, setWithHeader] = useState(true);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imageUploadProgress, setImageUploadProgress] = useState(0);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight.configure({
        multicolor: true,
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: "table-auto border-collapse w-full",
        },
      }),
      TableRow.configure({
        HTMLAttributes: {
          class: "border",
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: "border p-2",
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class: "border p-2 bg-gray-100 font-bold",
        },
      }),
      Image.configure({
        allowBase64: false,
        HTMLAttributes: {
          class: "rounded-lg max-w-full h-auto",
        },
      }),
      FontFamily,
    ],
    content: "<p class='text-gray-300'>শুরু করুন লেখা দিয়ে...</p>",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      setHtmlContent(content);
      const text = editor.getText();
      setWordCount(text.split(/\s+/).filter((word) => word.length > 0).length);
    },
  });

  const handleBold = useCallback(() => {
    editor?.chain().focus().toggleBold().run();
  }, [editor]);

  const handleItalic = useCallback(() => {
    editor?.chain().focus().toggleItalic().run();
  }, [editor]);

  const handleUnderline = useCallback(() => {
    editor?.chain().focus().toggleUnderline().run();
  }, [editor]);

  const handleHeading = useCallback(
    (level: 1 | 2 | 3) => {
      editor?.chain().focus().toggleHeading({ level }).run();
    },
    [editor]
  );

  const handleBulletList = useCallback(() => {
    editor?.chain().focus().toggleBulletList().run();
  }, [editor]);

  const handleOrderedList = useCallback(() => {
    editor?.chain().focus().toggleOrderedList().run();
  }, [editor]);

  const handleLink = useCallback(() => {
    const url = window.prompt("URL লিখুন:");
    if (url) {
      editor
        ?.chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  }, [editor]);

  const handleAlign = useCallback(
    (alignment: string) => {
      editor?.chain().focus().setTextAlign(alignment).run();
    },
    [editor]
  );

  const handleTextColor = useCallback(
    (color: string) => {
      editor?.chain().focus().setColor(color).run();
    },
    [editor]
  );

  const handleBackgroundColor = useCallback(
    (color: string) => {
      editor?.chain().focus().setHighlight({ color }).run();
    },
    [editor]
  );

  const handleAddTable = useCallback(() => {
    setShowTableModal(true);
  }, []);

  const handleInsertTable = useCallback(() => {
    editor
      ?.chain()
      .focus()
      .insertTable({
        rows: Math.max(1, rows),
        cols: Math.max(1, cols),
        withHeaderRow: withHeader,
      })
      .run();
    setShowTableModal(false);
    setRows(3);
    setCols(3);
  }, [editor, rows, cols, withHeader]);

  const handleDeleteTable = useCallback(() => {
    editor?.chain().focus().deleteTable().run();
  }, [editor]);

  const handleAddImage = useCallback(() => {
    const url = window.prompt("ইমেজ URL লিখুন:");
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const handleImageUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
      const ALLOWED_FILE_TYPES = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/gif",
      ];

      const file = e.target.files?.[0];
      if (!file) return;

      // Reset file input
      if (e.target) {
        e.target.value = "";
      }

      // File type validation
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        alert("Invalid File: Only JPG, PNG, WEBP, and GIF images are allowed");
        return;
      }

      // File size validation
      if (file.size > MAX_FILE_SIZE) {
        alert("File Too Large: Maximum file size is 5MB");
        return;
      }

      setIsUploadingImage(true);
      setImageUploadProgress(0);

      try {
        // Create FormData
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "editor-uploads"); // Optional: specify folder

        // Upload to server
        const response = await api_url.post<{
          url: string;
          success: boolean;
          message?: string;
        }>("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setImageUploadProgress(progress);
            }
          },
        });

        if (response.data.success && response.data.url) {
          // Insert image into editor
          editor?.chain().focus().setImage({ src: response.data.url }).run();
          alert("Image uploaded successfully!");
        } else {
          throw new Error(response.data.message || "Upload failed");
        }
      } catch (error) {
        console.error("Upload error:", error);
        alert("Failed to upload image. Please try again.");
      } finally {
        setIsUploadingImage(false);
        setImageUploadProgress(0);
      }
    },
    [editor]
  );

  const handleFontSize = useCallback(
    (size: string) => {
      editor?.chain().focus().setMark("textStyle", { fontSize: size }).run();
    },
    [editor]
  );

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(htmlContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [htmlContent]);

  const downloadHTML = useCallback(() => {
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "content.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [htmlContent]);

  const clearContent = useCallback(() => {
    if (editor && confirm("আপনি কি নিশ্চিত যে আপনি সবকিছু মুছে ফেলতে চান?")) {
      editor.chain().focus().clearContent().run();
    }
  }, [editor]);

  const saveContent = useCallback(() => {
    localStorage.setItem("tiptap_content", htmlContent);
    alert("কন্টেন্ট সেভ হয়েছে!");
  }, [htmlContent]);

  if (!editor) {
    return (
      <div className="p-8 text-center text-gray-400 min-h-screen flex items-center justify-center bg-gray-900">
        লোড হচ্ছে...
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-black to-gray-900"
          : "bg-gradient-to-br from-blue-50 to-indigo-100"
      } p-6`}
    >
      {/* Table Insert Modal */}
      {showTableModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            className={`rounded-xl shadow-2xl h-[60%] overflow-y-scroll max-w-md w-full ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div
              className={`p-6 border-b ${
                darkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <h3
                  className={`text-xl font-bold ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  টেবিল তৈরি করুন
                </h3>
                <button
                  onClick={() => setShowTableModal(false)}
                  className={`p-1 rounded-lg ${
                    darkMode
                      ? "hover:bg-gray-700 text-gray-300"
                      : "hover:bg-gray-100 text-gray-600"
                  }`}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Table Grid Preview */}
              <div className="mb-6">
                <div
                  className={`grid gap-1 mb-4`}
                  style={{
                    gridTemplateColumns: `repeat(${Math.min(cols, 10)}, 1fr)`,
                  }}
                >
                  {Array.from({ length: Math.min(rows * cols, 100) }).map(
                    (_, i) => (
                      <div
                        key={i}
                        className={`aspect-square border ${
                          darkMode
                            ? "border-blue-400 bg-blue-500/20"
                            : "border-blue-300 bg-blue-100"
                        } rounded`}
                      />
                    )
                  )}
                </div>

                <div className="text-center mb-2">
                  <span
                    className={darkMode ? "text-gray-300" : "text-gray-600"}
                  >
                    {rows} × {cols} টেবিল
                  </span>
                </div>
              </div>

              {/* Table Size Controls */}
              <div className="space-y-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    সারির সংখ্যা
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setRows((prev) => Math.max(1, prev - 1))}
                      className={`p-2 rounded-lg ${
                        darkMode
                          ? "bg-gray-700 hover:bg-gray-600"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      <Minus size={16} />
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={rows}
                      onChange={(e) =>
                        setRows(
                          Math.min(
                            20,
                            Math.max(1, parseInt(e.target.value) || 1)
                          )
                        )
                      }
                      className={`flex-1 text-center p-2 rounded-lg border ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-300 text-gray-800"
                      }`}
                    />
                    <button
                      onClick={() => setRows((prev) => Math.min(20, prev + 1))}
                      className={`p-2 rounded-lg ${
                        darkMode
                          ? "bg-gray-700 hover:bg-gray-600"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    কলামের সংখ্যা
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setCols((prev) => Math.max(1, prev - 1))}
                      className={`p-2 rounded-lg ${
                        darkMode
                          ? "bg-gray-700 hover:bg-gray-600"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      <Minus size={16} />
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={cols}
                      onChange={(e) =>
                        setCols(
                          Math.min(
                            10,
                            Math.max(1, parseInt(e.target.value) || 1)
                          )
                        )
                      }
                      className={`flex-1 text-center p-2 rounded-lg border ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-300 text-gray-800"
                      }`}
                    />
                    <button
                      onClick={() => setCols((prev) => Math.min(10, prev + 1))}
                      className={`p-2 rounded-lg ${
                        darkMode
                          ? "bg-gray-700 hover:bg-gray-600"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="header-row"
                    checked={withHeader}
                    onChange={(e) => setWithHeader(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <label
                    htmlFor="header-row"
                    className={`text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    হেডার রো যোগ করুন (প্রথম সারি বোল্ড হবে)
                  </label>
                </div>

                {/* Quick Presets */}
                <div className="pt-4 border-t border-gray-700">
                  <p
                    className={`text-sm mb-2 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    দ্রুত তৈরি করুন:
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { rows: 1, cols: 1, label: "1×1" },
                      { rows: 2, cols: 2, label: "2×2" },
                      { rows: 3, cols: 3, label: "3×3" },
                      { rows: 4, cols: 4, label: "4×4" },
                      { rows: 3, cols: 4, label: "3×4" },
                      { rows: 4, cols: 3, label: "4×3" },
                      { rows: 5, cols: 2, label: "5×2" },
                      { rows: 2, cols: 5, label: "2×5" },
                    ].map((preset, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setRows(preset.rows);
                          setCols(preset.cols);
                        }}
                        className={`p-2 rounded-lg text-sm ${
                          darkMode
                            ? "bg-gray-700 hover:bg-gray-600"
                            : "bg-gray-100 hover:bg-gray-200"
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`p-6 flex justify-end gap-3 ${
                darkMode ? "bg-gray-900" : "bg-gray-50"
              }`}
            >
              <button
                onClick={() => setShowTableModal(false)}
                className={`px-4 py-2 rounded-lg ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                }`}
              >
                বাতিল
              </button>
              <button
                onClick={handleInsertTable}
                className={`px-4 py-2 rounded-lg ${
                  darkMode
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                টেবিল যোগ করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Upload Progress Modal */}
      {isUploadingImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div
            className={`rounded-xl shadow-2xl p-6 max-w-md w-full mx-4 ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex flex-col items-center">
              <Loader2 className="h-12 w-12 animate-spin text-blue-500 mb-4" />
              <h3
                className={`text-lg font-semibold mb-2 ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Uploading Image...
              </h3>
              <p
                className={`text-sm mb-4 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Please wait while we upload your image
              </p>

              {/* Progress Bar */}
              <div className="w-full bg-gray-700 rounded-full h-2.5 mb-2">
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${imageUploadProgress}%` }}
                ></div>
              </div>
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {imageUploadProgress}% uploaded
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header with Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <h1
              className={`text-3xl md:text-4xl font-bold ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Tiptap Text Editor
            </h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg ${
                darkMode
                  ? "bg-gray-800 hover:bg-gray-700 text-yellow-300"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              }`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                darkMode
                  ? "bg-gray-800 hover:bg-gray-700 text-white border-gray-700"
                  : "bg-white border border-gray-300 hover:bg-gray-50 text-gray-700"
              }`}
            >
              {showPreview ? <EyeOff size={20} /> : <Eye size={20} />}
              <span>{showPreview ? "প্রিভিউ লুকান" : "প্রিভিউ দেখুন"}</span>
            </button>

            <button
              onClick={saveContent}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                darkMode
                  ? "bg-blue-900 hover:bg-blue-800 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              <Save size={20} />
              <span>সেভ</span>
            </button>
          </div>
        </div>

        <div
          className={`grid ${
            showPreview ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"
          } gap-6`}
        >
          {/* Editor Section */}
          <div
            className={`rounded-xl shadow-lg overflow-hidden flex flex-col h-fit lg:h-screen border ${
              darkMode
                ? "bg-gray-900 border-gray-800"
                : "bg-white border-gray-200"
            }`}
          >
            <div
              className={`p-4 flex justify-between items-center ${
                darkMode
                  ? "bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-800"
                  : "bg-gradient-to-r from-blue-500 to-indigo-600"
              }`}
            >
              <h2
                className={`font-bold text-lg flex items-center gap-2 ${
                  darkMode ? "text-gray-300" : "text-white"
                }`}
              >
                <Type size={20} />
                এডিটর
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={copyToClipboard}
                  className={`px-3 py-1 rounded-lg text-sm flex items-center gap-1 ${
                    darkMode
                      ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                      : "bg-blue-400 hover:bg-blue-500 text-white"
                  }`}
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? "কপি হয়েছে!" : "কপি"}
                </button>
                <button
                  onClick={downloadHTML}
                  className={`px-3 py-1 rounded-lg text-sm flex items-center gap-1 ${
                    darkMode
                      ? "bg-emerald-900 hover:bg-emerald-800 text-emerald-200"
                      : "bg-green-500 hover:bg-green-600 text-white"
                  }`}
                >
                  <Download size={16} />
                  ডাউনলোড
                </button>
              </div>
            </div>

            {/* Organized Toolbar */}
            <div
              className={`border-b ${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-gray-50 border-gray-200"
              } p-4`}
            >
              {/* Formatting Tools - Row 1 */}
              <div className="flex flex-wrap gap-2 mb-3">
                {/* Text Format */}
                <div
                  className={`flex items-center gap-1 border-r ${
                    darkMode ? "border-gray-700" : "border-gray-300"
                  } pr-2`}
                >
                  <button
                    onClick={handleBold}
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode
                        ? editor.isActive("bold")
                          ? "bg-blue-900 text-white"
                          : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                        : editor.isActive("bold")
                        ? "bg-blue-500 text-white"
                        : "bg-white border border-gray-300 hover:bg-gray-100 text-gray-700"
                    }`}
                    title="Bold"
                  >
                    <Bold size={18} />
                  </button>
                  <button
                    onClick={handleItalic}
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode
                        ? editor.isActive("italic")
                          ? "bg-blue-900 text-white"
                          : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                        : editor.isActive("italic")
                        ? "bg-blue-500 text-white"
                        : "bg-white border border-gray-300 hover:bg-gray-100 text-gray-700"
                    }`}
                    title="Italic"
                  >
                    <Italic size={18} />
                  </button>
                  <button
                    onClick={handleUnderline}
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode
                        ? editor.isActive("underline")
                          ? "bg-blue-900 text-white"
                          : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                        : editor.isActive("underline")
                        ? "bg-blue-500 text-white"
                        : "bg-white border border-gray-300 hover:bg-gray-100 text-gray-700"
                    }`}
                    title="Underline"
                  >
                    <UnderlineIcon size={18} />
                  </button>
                </div>

                {/* Headings */}
                <div
                  className={`flex items-center gap-1 border-r ${
                    darkMode ? "border-gray-700" : "border-gray-300"
                  } pr-2`}
                >
                  <button
                    onClick={() => handleHeading(1)}
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode
                        ? editor.isActive("heading", { level: 1 })
                          ? "bg-blue-900 text-white"
                          : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                        : editor.isActive("heading", { level: 1 })
                        ? "bg-blue-500 text-white"
                        : "bg-white border border-gray-300 hover:bg-gray-100 text-gray-700"
                    }`}
                    title="Heading 1"
                  >
                    <Heading1 size={18} />
                  </button>
                  <button
                    onClick={() => handleHeading(2)}
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode
                        ? editor.isActive("heading", { level: 2 })
                          ? "bg-blue-900 text-white"
                          : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                        : editor.isActive("heading", { level: 2 })
                        ? "bg-blue-500 text-white"
                        : "bg-white border border-gray-300 hover:bg-gray-100 text-gray-700"
                    }`}
                    title="Heading 2"
                  >
                    <Heading2 size={18} />
                  </button>
                  <button
                    onClick={() => handleHeading(3)}
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode
                        ? editor.isActive("heading", { level: 3 })
                          ? "bg-blue-900 text-white"
                          : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                        : editor.isActive("heading", { level: 3 })
                        ? "bg-blue-500 text-white"
                        : "bg-white border border-gray-300 hover:bg-gray-100 text-gray-700"
                    }`}
                    title="Heading 3"
                  >
                    <Heading3 size={18} />
                  </button>
                </div>

                {/* Lists */}
                <div
                  className={`flex items-center gap-1 border-r ${
                    darkMode ? "border-gray-700" : "border-gray-300"
                  } pr-2`}
                >
                  <button
                    onClick={handleBulletList}
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode
                        ? editor.isActive("bulletList")
                          ? "bg-blue-900 text-white"
                          : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                        : editor.isActive("bulletList")
                        ? "bg-blue-500 text-white"
                        : "bg-white border border-gray-300 hover:bg-gray-100 text-gray-700"
                    }`}
                    title="Bullet List"
                  >
                    <List size={18} />
                  </button>
                  <button
                    onClick={handleOrderedList}
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode
                        ? editor.isActive("orderedList")
                          ? "bg-blue-900 text-white"
                          : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                        : editor.isActive("orderedList")
                        ? "bg-blue-500 text-white"
                        : "bg-white border border-gray-300 hover:bg-gray-100 text-gray-700"
                    }`}
                    title="Ordered List"
                  >
                    <ListOrdered size={18} />
                  </button>
                </div>

                {/* Alignment */}
                <div
                  className={`flex items-center gap-1 border-r ${
                    darkMode ? "border-gray-700" : "border-gray-300"
                  } pr-2`}
                >
                  <button
                    onClick={() => handleAlign("left")}
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode
                        ? editor.isActive({ textAlign: "left" })
                          ? "bg-blue-900 text-white"
                          : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                        : editor.isActive({ textAlign: "left" })
                        ? "bg-blue-500 text-white"
                        : "bg-white border border-gray-300 hover:bg-gray-100 text-gray-700"
                    }`}
                    title="Align Left"
                  >
                    <AlignLeft size={18} />
                  </button>
                  <button
                    onClick={() => handleAlign("center")}
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode
                        ? editor.isActive({ textAlign: "center" })
                          ? "bg-blue-900 text-white"
                          : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                        : editor.isActive({ textAlign: "center" })
                        ? "bg-blue-500 text-white"
                        : "bg-white border border-gray-300 hover:bg-gray-100 text-gray-700"
                    }`}
                    title="Align Center"
                  >
                    <AlignCenter size={18} />
                  </button>
                  <button
                    onClick={() => handleAlign("right")}
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode
                        ? editor.isActive({ textAlign: "right" })
                          ? "bg-blue-900 text-white"
                          : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                        : editor.isActive({ textAlign: "right" })
                        ? "bg-blue-500 text-white"
                        : "bg-white border border-gray-300 hover:bg-gray-100 text-gray-700"
                    }`}
                    title="Align Right"
                  >
                    <AlignRight size={18} />
                  </button>
                </div>
              </div>

              {/* Advanced Tools - Row 2 */}
              <div className="flex flex-wrap gap-2">
                {/* Colors */}
                <div
                  className={`flex items-center gap-1 border-r ${
                    darkMode ? "border-gray-700" : "border-gray-300"
                  } pr-2`}
                >
                  <label
                    className={`p-2 rounded-lg hover:bg-gray-600 cursor-pointer flex items-center transition-colors ${
                      darkMode
                        ? "bg-gray-700 text-gray-300"
                        : "bg-white border border-gray-300 hover:bg-gray-100"
                    }`}
                    title="Text Color"
                  >
                    <Palette size={18} />
                    <input
                      type="color"
                      defaultValue={darkMode ? "#ffffff" : "#000000"}
                      onChange={(e) => handleTextColor(e.target.value)}
                      className="w-0 h-0 opacity-0"
                    />
                  </label>
                  <label
                    className={`p-2 rounded-lg hover:bg-gray-600 cursor-pointer flex items-center transition-colors ${
                      darkMode
                        ? "bg-gray-700 text-gray-300"
                        : "bg-white border border-gray-300 hover:bg-gray-100"
                    }`}
                    title="Background Color"
                  >
                    <Highlighter size={18} />
                    <input
                      type="color"
                      defaultValue={darkMode ? "#3b82f6" : "#FFFF00"}
                      onChange={(e) => handleBackgroundColor(e.target.value)}
                      className="w-0 h-0 opacity-0"
                    />
                  </label>
                </div>

                {/* Font Size */}
                <div
                  className={`flex items-center gap-1 border-r ${
                    darkMode ? "border-gray-700" : "border-gray-300"
                  } pr-2`}
                >
                  <select
                    onChange={(e) => handleFontSize(e.target.value)}
                    className={`p-2 rounded-lg transition-colors text-sm ${
                      darkMode
                        ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                        : "bg-white border border-gray-300 hover:bg-gray-100 text-gray-700"
                    }`}
                    title="Font Size"
                  >
                    <option value="" className={darkMode ? "bg-gray-800" : ""}>
                      আকার
                    </option>
                    <option
                      value="12px"
                      className={darkMode ? "bg-gray-800" : ""}
                    >
                      12px
                    </option>
                    <option
                      value="14px"
                      className={darkMode ? "bg-gray-800" : ""}
                    >
                      14px
                    </option>
                    <option
                      value="16px"
                      className={darkMode ? "bg-gray-800" : ""}
                    >
                      16px
                    </option>
                    <option
                      value="18px"
                      className={darkMode ? "bg-gray-800" : ""}
                    >
                      18px
                    </option>
                    <option
                      value="20px"
                      className={darkMode ? "bg-gray-800" : ""}
                    >
                      20px
                    </option>
                    <option
                      value="24px"
                      className={darkMode ? "bg-gray-800" : ""}
                    >
                      24px
                    </option>
                    <option
                      value="28px"
                      className={darkMode ? "bg-gray-800" : ""}
                    >
                      28px
                    </option>
                    <option
                      value="32px"
                      className={darkMode ? "bg-gray-800" : ""}
                    >
                      32px
                    </option>
                  </select>
                </div>

                {/* Link */}
                <div
                  className={`flex items-center gap-1 border-r ${
                    darkMode ? "border-gray-700" : "border-gray-300"
                  } pr-2`}
                >
                  <button
                    onClick={handleLink}
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode
                        ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                        : "bg-white border border-gray-300 hover:bg-gray-100 text-gray-700"
                    }`}
                    title="Add Link"
                  >
                    <LinkIcon size={18} />
                  </button>
                </div>

                {/* Table */}
                <div
                  className={`flex items-center gap-1 border-r ${
                    darkMode ? "border-gray-700" : "border-gray-300"
                  } pr-2`}
                >
                  <button
                    onClick={handleAddTable}
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode
                        ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                        : "bg-white border border-gray-300 hover:bg-gray-100 text-gray-700"
                    }`}
                    title="Add Table"
                  >
                    <TableIcon size={18} />
                  </button>
                  <button
                    onClick={handleDeleteTable}
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode
                        ? "bg-gray-700 hover:bg-gray-600 text-red-400"
                        : "bg-white border border-red-300 text-red-600 hover:bg-red-50"
                    }`}
                    title="Delete Table"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {/* Image */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={handleAddImage}
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode
                        ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                        : "bg-white border border-gray-300 hover:bg-gray-100 text-gray-700"
                    }`}
                    title="Add Image URL"
                  >
                    <ImageIcon size={18} />
                  </button>
                  <label
                    className={`p-2 rounded-lg transition-colors cursor-pointer flex items-center ${
                      darkMode
                        ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                        : "bg-white border border-gray-300 hover:bg-gray-100 text-gray-700"
                    }`}
                    title="Upload Image"
                  >
                    <Upload size={18} />
                    <input
                      type="file"
                      accept="image/jpeg, image/png, image/webp, image/gif"
                      onChange={handleImageUpload}
                      className="w-0 h-0 opacity-0"
                      disabled={isUploadingImage}
                    />
                  </label>
                  {isUploadingImage && (
                    <div className="ml-2 flex items-center">
                      <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                      <span className="text-xs ml-1 text-gray-500">
                        {imageUploadProgress}%
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Editor Content */}
            <div
              className={`p-6 flex-1 overflow-y-auto ${
                darkMode ? "bg-gray-900" : "bg-white"
              }`}
            >
              <EditorContent
                editor={editor}
                className={`prose prose-sm max-w-none focus:outline-none ${
                  darkMode ? "prose-invert" : ""
                }`}
                style={{
                  minHeight: "400px",
                }}
              />
            </div>

            {/* Stats Bar */}
            <div
              className={`border-t ${
                darkMode
                  ? "border-gray-800 bg-gray-900"
                  : "border-gray-200 bg-gray-50"
              } p-4`}
            >
              <div className="flex justify-between items-center">
                <div className="flex gap-4 text-sm">
                  <span
                    className={darkMode ? "text-gray-400" : "text-gray-600"}
                  >
                    শব্দ: <span className="font-semibold">{wordCount}</span>
                  </span>
                  <span
                    className={darkMode ? "text-gray-400" : "text-gray-600"}
                  >
                    অক্ষর:{" "}
                    <span className="font-semibold">
                      {editor.getText().length}
                    </span>
                  </span>
                </div>
                <button
                  onClick={clearContent}
                  className={`px-3 py-1 rounded-lg text-sm flex items-center gap-1 ${
                    darkMode
                      ? "bg-red-900 hover:bg-red-800 text-red-200"
                      : "bg-red-100 text-red-700 hover:bg-red-200"
                  }`}
                >
                  <X size={16} />
                  সব মুছুন
                </button>
              </div>
            </div>
          </div>

          {/* Preview Section - Conditionally Rendered */}
          {showPreview && (
            <div
              className={`rounded-xl shadow-lg overflow-hidden flex flex-col h-fit lg:h-screen border ${
                darkMode
                  ? "bg-gray-900 border-gray-800"
                  : "bg-white border-gray-200"
              }`}
            >
              <div
                className={`p-4 ${
                  darkMode
                    ? "bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-800"
                    : "bg-gradient-to-r from-green-500 to-emerald-600"
                }`}
              >
                <h2
                  className={`font-bold text-lg flex items-center gap-2 ${
                    darkMode ? "text-gray-300" : "text-white"
                  }`}
                >
                  <Eye size={20} />
                  লাইভ প্রিভিউ
                </h2>
              </div>

              <div
                className={`p-6 flex-1 overflow-y-auto ${
                  darkMode ? "bg-gray-900" : "bg-gray-50"
                }`}
              >
                <div
                  className={`prose prose-sm max-w-none p-6 rounded-lg shadow-sm ${
                    darkMode ? "bg-gray-800 prose-invert" : "bg-white"
                  }`}
                >
                  <div
                    className="editor-preview-content"
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                  />
                </div>
              </div>

              {/* HTML Output with Copy Option */}
              <div
                className={`border-t ${
                  darkMode
                    ? "border-gray-800 bg-gray-900"
                    : "border-gray-200 bg-gray-50"
                } p-4`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span
                    className={`font-semibold flex items-center gap-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    <FileCode size={16} />
                    HTML কোড
                  </span>
                  <button
                    onClick={copyToClipboard}
                    className={`px-3 py-1 rounded-lg text-sm flex items-center gap-1 ${
                      darkMode
                        ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                        : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                    }`}
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? "কপি হয়েছে!" : "কপি"}
                  </button>
                </div>
                <pre
                  className={`mt-2 p-3 rounded text-xs overflow-x-auto max-h-48 ${
                    darkMode
                      ? "bg-gray-950 text-emerald-400 border border-gray-800"
                      : "bg-gray-900 text-green-400"
                  }`}
                >
                  {htmlContent}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        :global(.ProseMirror) {
          outline: none;
        }
        :global(.ProseMirror p) {
          color: ${darkMode ? "#d1d5db" : "#374151"};
        }
        :global(.ProseMirror h1) {
          font-size: 2em;
          font-weight: bold;
          margin: 0.67em 0;
          color: ${darkMode ? "#ffffff" : "#111827"};
        }
        :global(.ProseMirror h2) {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.75em 0;
          color: ${darkMode ? "#e5e7eb" : "#1f2937"};
        }
        :global(.ProseMirror h3) {
          font-size: 1.17em;
          font-weight: bold;
          margin: 0.83em 0;
          color: ${darkMode ? "#d1d5db" : "#374151"};
        }
        :global(.ProseMirror ul) {
          list-style-type: disc;
          padding-left: 2em;
          margin: 1em 0;
        }
        :global(.ProseMirror ol) {
          list-style-type: decimal;
          padding-left: 2em;
          margin: 1em 0;
        }
        :global(.ProseMirror a) {
          color: ${darkMode ? "#60a5fa" : "#3b82f6"};
          text-decoration: underline;
          cursor: pointer;
        }
        :global(.ProseMirror table) {
          border-collapse: collapse;
          margin: 1em 0;
          width: 100%;
          border: 1px solid ${darkMode ? "#4b5563" : "#d1d5db"};
        }
        :global(.ProseMirror table td),
        :global(.ProseMirror table th) {
          border: 1px solid ${darkMode ? "#4b5563" : "#d1d5db"};
          padding: 0.5em;
          text-align: left;
          color: ${darkMode ? "#e5e7eb" : "#374151"};
        }
        :global(.ProseMirror table th) {
          background-color: ${darkMode ? "#374151" : "#f3f4f6"};
          font-weight: bold;
        }
        :global(.ProseMirror img) {
          max-width: 100%;
          height: auto;
          margin: 1em 0;
          border-radius: 0.5em;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }
        select {
          font-family: inherit;
        }
        :global(.editor-preview-content) {
          font-family: inherit;
        }
        :global(.editor-preview-content h1) {
          font-size: 2em;
          font-weight: bold;
          margin: 0.67em 0;
          color: ${darkMode ? "#ffffff" : "#111827"};
        }
        :global(.editor-preview-content h2) {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.75em 0;
          color: ${darkMode ? "#e5e7eb" : "#1f2937"};
        }
        :global(.editor-preview-content ul) {
          list-style-type: disc;
          padding-left: 2em;
          margin: 1em 0;
        }
        :global(.editor-preview-content table) {
          border-collapse: collapse;
          margin: 1em 0;
          width: 100%;
          border: 1px solid ${darkMode ? "#4b5563" : "#d1d5db"};
        }
        :global(.editor-preview-content table td),
        :global(.editor-preview-content table th) {
          border: 1px solid ${darkMode ? "#4b5563" : "#d1d5db"};
          padding: 0.5em;
          text-align: left;
          color: ${darkMode ? "#e5e7eb" : "#374151"};
        }
        :global(.editor-preview-content table th) {
          background-color: ${darkMode ? "#374151" : "#f3f4f6"};
          font-weight: bold;
        }
        :global(.ProseMirror .tiptap-image {
          border-radius: 0.5rem;
        }
        :global(.ProseMirror-focused) {
          outline: none;
        }
      `}</style>
    </div>
  );
}
