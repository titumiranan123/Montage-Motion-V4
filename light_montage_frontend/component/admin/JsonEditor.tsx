// import React, { useState } from "react";
// import { AlertCircle, Check, Code, Minimize2 } from "lucide-react";

// export default function JsonEditor() {
//   const [jsonText, setJsonText] = useState(`{
//   "name": "John Doe",
//   "age": 30,
//   "email": "john@example.com",
//   "address": {
//     "street": "123 Main St",
//     "city": "Dhaka",
//     "country": "Bangladesh"
//   },
//   "hobbies": ["reading", "coding", "traveling"]
// }`);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const validateJson = (text) => {
//     try {
//       JSON.parse(text);
//       setError("");
//       return true;
//     } catch (e) {
//       setError(e.message);
//       return false;
//     }
//   };

//   const handleChange = (e) => {
//     const value = e.target.value;
//     setJsonText(value);
//     setSuccess("");
//     if (value.trim()) {
//       validateJson(value);
//     } else {
//       setError("");
//     }
//   };

//   const formatJson = () => {
//     try {
//       const parsed = JSON.parse(jsonText);
//       const formatted = JSON.stringify(parsed, null, 2);
//       setJsonText(formatted);
//       setError("");
//       setSuccess("JSON formatted successfully!");
//       setTimeout(() => setSuccess(""), 2000);
//     } catch (e) {
//       setError("Cannot format invalid JSON");
//     }
//   };

//   const minifyJson = () => {
//     try {
//       const parsed = JSON.parse(jsonText);
//       const minified = JSON.stringify(parsed);
//       setJsonText(minified);
//       setError("");
//       setSuccess("JSON minified successfully!");
//       setTimeout(() => setSuccess(""), 2000);
//     } catch (e) {
//       setError("Cannot minify invalid JSON");
//     }
//   };

//   const renderJsonTree = () => {
//     try {
//       const parsed = JSON.parse(jsonText);
//       return <JsonTreeNode data={parsed} name="root" />;
//     } catch (e) {
//       return (
//         <div className="text-gray-500 text-sm">
//           Invalid JSON - cannot display tree view
//         </div>
//       );
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-6">
//           <h1 className="text-3xl font-bold  text-(--text-primary)  mb-2">JSON Editor</h1>
//           <p className="text-gray-400">
//             Edit, validate, and format your JSON data
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Editor Panel */}
//           <div className="bg-gray-800 rounded-lg shadow-xl p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-xl font-semibold  text-(--text-primary) ">Editor</h2>
//               <div className="flex gap-2">
//                 <button
//                   onClick={formatJson}
//                   className="flex items-center gap-1 px-3 py-2 bg-blue-600 hover:bg-blue-700  text-(--text-primary)  rounded-lg text-sm transition-colors"
//                   title="Format JSON"
//                 >
//                   <Code size={16} />
//                   Format
//                 </button>
//                 <button
//                   onClick={minifyJson}
//                   className="flex items-center gap-1 px-3 py-2 bg-purple-600 hover:bg-purple-700  text-(--text-primary)  rounded-lg text-sm transition-colors"
//                   title="Minify JSON"
//                 >
//                   <Minimize2 size={16} />
//                   Minify
//                 </button>
//               </div>
//             </div>

//             <textarea
//               value={jsonText}
//               onChange={handleChange}
//               className="w-full h-96 bg-gray-900 text-gray-100 font-mono text-sm p-4 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none resize-none"
//               spellCheck="false"
//             />

//             {/* Status Messages */}
//             <div className="mt-4 min-h-[60px]">
//               {error && (
//                 <div className="flex items-start gap-2 p-3 bg-red-900/30 border border-red-500 rounded-lg">
//                   <AlertCircle
//                     size={20}
//                     className="text-red-500 flex-shrink-0 mt-0.5"
//                   />
//                   <div>
//                     <div className="text-red-400 font-semibold">
//                       Invalid JSON
//                     </div>
//                     <div className="text-red-300 text-sm mt-1">{error}</div>
//                   </div>
//                 </div>
//               )}
//               {success && (
//                 <div className="flex items-center gap-2 p-3 bg-green-900/30 border border-green-500 rounded-lg">
//                   <Check size={20} className="text-green-500" />
//                   <div className="text-green-400">{success}</div>
//                 </div>
//               )}
//               {!error && !success && jsonText.trim() && (
//                 <div className="flex items-center gap-2 p-3 bg-green-900/30 border border-green-500 rounded-lg">
//                   <Check size={20} className="text-green-500" />
//                   <div className="text-green-400">Valid JSON</div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Tree View Panel */}
//           <div className="bg-gray-800 rounded-lg shadow-xl p-6">
//             <h2 className="text-xl font-semibold  text-(--text-primary)  mb-4">Tree View</h2>
//             <div className="bg-gray-900 rounded-lg p-4 h-[500px] overflow-auto">
//               {renderJsonTree()}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function JsonTreeNode({ data, name }: { data: string; name: string }) {
//   const [isOpen, setIsOpen] = useState(true);

//   if (data === null) {
//     return (
//       <div className="flex items-center gap-2 py-1">
//         <span className="text-blue-400">{name}:</span>
//         <span className="text-gray-500">null</span>
//       </div>
//     );
//   }

//   if (typeof data !== "object") {
//     const valueColor =
//       typeof data === "string"
//         ? "text-green-400"
//         : typeof data === "number"
//         ? "text-yellow-400"
//         : "text-purple-400";
//     const displayValue = typeof data === "string" ? `"${data}"` : String(data);

//     return (
//       <div className="flex items-center gap-2 py-1">
//         <span className="text-blue-400">{name}:</span>
//         <span className={valueColor}>{displayValue}</span>
//       </div>
//     );
//   }

//   const isArray = Array.isArray(data);
//   const entries = isArray ? data?.map((v: any, i: any) => [i, v]) : Object.entries(data);
//   const bracket = isArray ? ["[", "]"] : ["{", "}"];

//   return (
//     <div className="py-1">
//       <div
//         className="flex items-center gap-2 cursor-pointer hover:bg-gray-800 rounded px-1"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <span className="text-gray-500 w-4">{isOpen ? "▼" : "▶"}</span>
//         <span className="text-blue-400">{name}:</span>
//         <span className="text-gray-500">{bracket[0]}</span>
//         {!isOpen && <span className="text-gray-600">...</span>}
//         {!isOpen && <span className="text-gray-500">{bracket[1]}</span>}
//       </div>
//       {isOpen && (
//         <div className="ml-6 border-l border-gray-700 pl-2">
//           {entries.map(([key, value]: any, idx: number) => (
//             <JsonTreeNode
//               key={key}
//               name={key}
//               data={value}
//               isLast={idx === entries.length - 1}
//             />
//           ))}
//           <div className="text-gray-500 -ml-2">{bracket[1]}</div>
//         </div>
//       )}
//     </div>
//   );
// }
