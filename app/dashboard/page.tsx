// app/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import QRCode from 'qrcode'; // qrcode library import karna

// QR Code ka type define karein
interface QRCodeData {
    id: string;
    url: string;
    name: string;
    createdAt: string;
}

interface DisplayQRCode extends QRCodeData {
    qrCodeImage?: string;
}

export default function Dashboard() {
    const { data: session, status } = useSession();
    const [url, setUrl] = useState('');
    const [name, setName] = useState('');
    const [generatedQR, setGeneratedQR] = useState<DisplayQRCode | null>(null);
    const [pastQRs, setPastQRs] = useState<DisplayQRCode[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // User ke purane QR Codes fetch karna
    const fetchPastQRs = async () => {
        if (status !== 'authenticated') return;
        const response = await fetch('/api/qrcodes');
        if (response.ok) {
            const data: QRCodeData[] = await response.json();
            const qrsWithImages = await Promise.all(
                data.map(async (qr) => {
                    const qrCodeImage = await QRCode.toDataURL(qr.url, { width: 256, margin: 2 });
                    return { ...qr, qrCodeImage };
                })
            );
            setPastQRs(qrsWithImages);
        }
    };

    useEffect(() => {
        fetchPastQRs();
    }, [status]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url || !name) {
            alert('Please enter both URL and a name.');
            return;
        }
        setIsLoading(true);
        const response = await fetch('/api/qrcodes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url, name }),
        });

        if (response.ok) {
            const newQR: QRCodeData = await response.json();
            const qrCodeImage = await QRCode.toDataURL(newQR.url, { width: 256, margin: 2 });
            setGeneratedQR({ ...newQR, qrCodeImage });
            fetchPastQRs(); // List ko refresh karein
            setUrl('');
            setName('');
        } else {
            alert('Failed to generate QR code.');
        }
        setIsLoading(false);
    };

    // --- YEH NAYA FUNCTION HAI DOWNLOAD KE LIYE ---
    const handleDownload = () => {
        if (!generatedQR || !generatedQR.qrCodeImage) return;

        // Ek temporary link element banayein
        const link = document.createElement('a');
        link.href = generatedQR.qrCodeImage;
        link.download = `${generatedQR.name.replace(/\s+/g, '-')}-qrcode.png`;
        
        // Use body mein add karke click karein aur phir hata dein
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    if (status === 'loading') {
        return <p className="text-center mt-10">Loading...</p>;
    }

    if (status === 'unauthenticated') {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-3xl mb-4">Please sign in to continue</h1>
                <button onClick={() => signIn('google')} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700">
                    Sign in with Google
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 md:p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl md:text-4xl font-bold">Welcome, {session?.user?.name}</h1>
                <button onClick={() => signOut()} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                    Sign Out
                </button>
            </div>

            {/* QR Code Generation Form */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-semibold mb-4">Create a New QR Code</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name / Purpose</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g., My Portfolio Website"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="url" className="block text-sm font-medium text-gray-700">URL / Link</label>
                        <input
                            type="url"
                            id="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://example.com"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            required
                        />
                    </div>
                    <button type="submit" disabled={isLoading} className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400">
                        {isLoading ? 'Generating...' : 'Generate QR Code'}
                    </button>
                </form>
            </div>

            {/* Display Generated QR Code */}
            {generatedQR && (
                <div className="text-center bg-blue-50 p-6 rounded-lg shadow-md mb-8">
                    <h3 className="text-xl font-semibold mb-2">Your New QR Code for "{generatedQR.name}"</h3>
                    <img src={generatedQR.qrCodeImage} alt={`QR Code for ${generatedQR.name}`} className="mx-auto" />
                    {/* --- DOWNLOAD LINK KO BUTTON SE BADAL DIYA HAI --- */}
                    <button onClick={handleDownload} className="mt-4 inline-block px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600">
                        Download
                    </button>
                </div>
            )}


            {/* Past QR Codes List */}
            <div>
                <h2 className="text-3xl font-bold mb-4">Your Saved QR Codes ({pastQRs.length})</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pastQRs.map((qr) => (
                        <div key={qr.id} className="bg-white p-4 rounded-lg shadow">
                            <img src={qr.qrCodeImage} alt={`QR Code for ${qr.name}`} className="w-full h-auto object-cover rounded-md mb-4" />
                            <h3 className="font-bold text-lg truncate">{qr.name}</h3>
                            <p className="text-gray-500 text-sm truncate">{qr.url}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
