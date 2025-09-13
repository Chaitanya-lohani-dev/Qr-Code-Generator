'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import QRCode from 'qrcode';
import Image from 'next/image';
import {
  QrCodeIcon,
  ClipboardDocumentIcon,
  CheckIcon,
  LinkIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import Head from 'next/head';

type QRRecord = {
  id: string;
  url: string;
  name: string;
  createdAt?: string;
  qrCodeImage?: string;
};

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [generatedQR, setGeneratedQR] = useState<QRRecord | null>(null);
  const [pastQRs, setPastQRs] = useState<QRRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingList, setIsFetchingList] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  function isValidHttpUrl(candidate: string) {
    try {
      const parsed = new URL(candidate);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
      return false;
    }
  }

  const clearMessages = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const fetchPastQRs = useCallback(async () => {
    setIsFetchingList(true);
    try {
      const res = await fetch('/api/qrcodes', { method: 'GET' });
      if (!res.ok) {
        setErrorMessage('Failed to load QR codes.');
        setIsFetchingList(false);
        return;
      }
      const data: QRRecord[] = await res.json();

      // Generate QR images for each record
      const withImages = await Promise.all(
        data.map(async (qr) => {
          try {
            const img = await QRCode.toDataURL(qr.url, { width: 200, margin: 1 });
            return { ...qr, qrCodeImage: img };
          } catch {
            return qr;
          }
        })
      );

      setPastQRs(withImages);
    } catch (err) {
      console.error('Fetch error:', err);
      setErrorMessage('Network error while fetching QR codes.');
    } finally {
      setIsFetchingList(false);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) fetchPastQRs();
  }, [isLoaded, fetchPastQRs]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearMessages();

    if (!url.trim() || !name.trim()) {
      setErrorMessage('Please enter both URL and name.');
      return;
    }
    if (!isValidHttpUrl(url.trim())) {
      setErrorMessage('Please enter a valid URL.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/qrcodes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, name }),
      });

      if (!res.ok) {
        setErrorMessage('Failed to generate QR code.');
        setIsLoading(false);
        return;
      }

      const newQR: QRRecord = await res.json();
      const img = await QRCode.toDataURL(newQR.url, { width: 400, margin: 1 });
      const withImg = { ...newQR, qrCodeImage: img };
      setGeneratedQR(withImg);

      await fetchPastQRs();
      setUrl('');
      setName('');
      setSuccessMessage('QR code generated!');
    } catch (err) {
      setErrorMessage('Unexpected error.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (link: string) => {
    try {
      await navigator.clipboard.writeText(link);
      setCopiedUrl(link);
      setTimeout(() => setCopiedUrl(null), 2000);
    } catch {
      setErrorMessage('Failed to copy.');
    }
  };

  const handleDelete = async (id: string) => {
    const ok = window.confirm('Delete this QR code?');
    if (!ok) return;

    try {
      const res = await fetch('/api/qrcodes', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        setErrorMessage('Failed to delete.');
        return;
      }
      setSuccessMessage('QR deleted.');
      await fetchPastQRs();
    } catch {
      setErrorMessage('Error deleting QR.');
    }
  };

  return (
    <>
      <Head>
        <title>Dashboard • QRify</title>
        <meta
          name="description"
          content="Manage your QR codes in QRify Dashboard. Create, download, and organize your QR library."
        />
      </Head>

      <div className="m-0 pt-5 bg-slate-50 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-6 text-slate-900">Welcome, {user?.firstName ?? 'User'} 👋</h1>

          {errorMessage && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{errorMessage}</div>}
          {successMessage && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{successMessage}</div>}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Create QR */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-slate-800">Create QR Code</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  suppressHydrationWarning
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name / Purpose"
                  className="w-full border rounded px-3 py-2 text-slate-900"
                  required
                />
                <input
                  suppressHydrationWarning
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full border rounded px-3 py-2 text-slate-900"
                  required
                />
                <button
                  suppressHydrationWarning
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-cyan-600 text-white py-2 rounded hover:bg-cyan-700 disabled:opacity-50"
                >
                  {isLoading ? 'Generating...' : 'Generate QR Code'}
                </button>
              </form>

              {generatedQR && (
                <div className="mt-6 text-center">
                  <Image
                    src={generatedQR.qrCodeImage ?? ''}
                    alt={generatedQR.name}
                    width={200}
                    height={200}
                    className="mx-auto"
                  />
                  <div className="mt-3 font-medium">{generatedQR.name}</div>
                  <a
                    href={generatedQR.qrCodeImage}
                    download={`${generatedQR.name}.png`}
                    className="inline-block mt-2 px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600"
                  >
                    Download
                  </a>
                </div>
              )}
            </div>

            {/* Library */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-semibold mb-4 text-slate-900">Your Library</h2>
              {isFetchingList ? (
                <p>Loading...</p>
              ) : pastQRs.length === 0 ? (
                <div className="p-6 bg-white rounded text-center text-slate-600 border">
                  No QR codes yet. Create one!
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {pastQRs.map((qr) => (
                    <div
                      key={qr.id}
                      className="bg-white shadow rounded-lg p-4 flex flex-col items-center"
                    >
                      {qr.qrCodeImage ? (
                        <Image src={qr.qrCodeImage} alt={qr.name} width={180} height={180} />
                      ) : (
                        <QrCodeIcon className="h-32 w-32 text-slate-300" />
                      )}
                      <div className="mt-3 font-semibold text-slate-900">{qr.name}</div>
                      <p className="text-sm text-slate-800 truncate w-full text-center">{qr.url}</p>
                      <div className="mt-3 flex gap-2">
                        <button
                          onClick={() => handleCopy(qr.url)}
                          className="text-slate-700 flex items-center gap-1 px-3 py-1 text-sm border rounded hover:bg-slate-200"
                        >
                          {copiedUrl === qr.url ? <CheckIcon className="h-4 w-4 text-green-500" /> : <ClipboardDocumentIcon className="h-4 w-4" />}
                          {copiedUrl === qr.url ? 'Copied' : 'Copy'}
                        </button>
                        <button
                          onClick={() => handleDelete(qr.id)}
                          className="flex items-center gap-1 px-3 py-1 text-sm border border-red-300 text-red-600 rounded hover:bg-red-100"
                        >
                          <TrashIcon className="h-4 w-4" /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
