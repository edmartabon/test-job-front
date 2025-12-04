"use client";

import { Attachment } from "@/lib/types";

interface AttachmentListProps {
  attachments: Attachment[];
}

export const AttachmentList = ({ attachments }: AttachmentListProps) => {
  if (!attachments.length) {
    return (
      <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
        No attachments available for this booking yet.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
      {attachments.map((file) => (
        <li key={file.id} className="flex items-center justify-between gap-4 p-4">
          <div>
            <p className="font-medium text-slate-900">{file.filename}</p>
            <p className="text-xs text-slate-500">
              {file.mimeType || "Unknown type"} ·{" "}
              {file.createdAt
                ? new Date(file.createdAt).toLocaleDateString()
                : "Uploaded date unknown"}
            </p>
          </div>
          {file.url && (
            <a
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Open
            </a>
          )}
        </li>
      ))}
    </ul>
  );
};
