"use client";

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { CheckCircleIcon, XCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

interface StudentStatus {
  verification: {
    id: string;
    email: string;
    status: string;
    verifiedAt?: string;
    createdAt: string;
  } | null;
  subscription: {
    plan: string;
    status: string;
  };
  isStudentVerified: boolean;
}

export default function StudentVerification() {
  const { user, isLoaded } = useUser();
  const [step, setStep] = useState<'check' | 'email' | 'otp' | 'success'>('check');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [studentStatus, setStudentStatus] = useState<StudentStatus | null>(null);

  // Check student status on component mount
  useEffect(() => {
    if (isLoaded && user) {
      checkStudentStatus();
    }
  }, [isLoaded, user]);

  const checkStudentStatus = async () => {
    try {
      const response = await fetch('/api/student/status');
      if (response.ok) {
        const data = await response.json();
        setStudentStatus(data);
        
        if (data.isStudentVerified) {
          setStep('success');
        } else if (data.verification?.status === 'pending') {
          setStep('otp');
          setEmail(data.verification.email);
        }
      }
    } catch (error) {
      console.error('Error checking student status:', error);
    }
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/student/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        setStep('otp');
      } else {
        setError(data.error || 'Failed to send OTP');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/student/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        setStep('success');
        // Refresh student status
        await checkStudentStatus();
      } else {
        setError(data.error || 'Invalid OTP');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = () => {
    if (!studentStatus) return null;
    
    switch (studentStatus.verification?.status) {
      case 'verified':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case 'rejected':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = () => {
    if (!studentStatus) return 'Check Status';
    
    switch (studentStatus.verification?.status) {
      case 'verified':
        return 'Student Verified';
      case 'pending':
        return 'Verification Pending';
      case 'rejected':
        return 'Verification Rejected';
      default:
        return 'Verify Student Status';
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyan-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center p-4">
        <p className="text-slate-600 mb-4">Please sign in to verify your student status</p>
        <a 
          href="/sign-in" 
          className="inline-flex items-center px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-colors"
        >
          Sign In
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          🎓 Student Verification
          {getStatusIcon()}
        </h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          studentStatus?.isStudentVerified 
            ? 'bg-green-100 text-green-800' 
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {getStatusText()}
        </span>
      </div>

      {studentStatus?.isStudentVerified ? (
        <div className="text-center">
          <div className="mb-4">
            <CheckCircleIcon className="h-12 w-12 text-green-500 mx-auto mb-2" />
            <h4 className="text-lg font-semibold text-green-800">Student Status Verified!</h4>
            <p className="text-slate-600">
              You now have access to Student Pro features for free.
            </p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-800">
              <strong>Verified Email:</strong> {studentStatus.verification?.email}
            </p>
            <p className="text-sm text-green-800">
              <strong>Verified On:</strong> {new Date(studentStatus.verification?.verifiedAt || '').toLocaleDateString()}
            </p>
          </div>
        </div>
      ) : (
        <div>
          {step === 'check' && (
            <div className="text-center">
              <p className="text-slate-600 mb-4">
                Verify your student status to get Student Pro features for free!
              </p>
              <button
                onClick={() => setStep('email')}
                className="w-full bg-cyan-600 text-white py-2 px-4 rounded-md hover:bg-cyan-700 transition-colors"
              >
                Start Verification
              </button>
            </div>
          )}

          {step === 'email' && (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Student Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@university.edu"
                  className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  required
                />
                <p className="text-xs text-slate-500 mt-1">
                  Use your .edu, .ac.in, or other student email address
                </p>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cyan-600 text-white py-2 px-4 rounded-md hover:bg-cyan-700 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Sending...' : 'Send Verification Code'}
              </button>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Enter Verification Code
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="123456"
                  className="w-full border border-slate-300 rounded-md px-3 py-2 text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  maxLength={6}
                  required
                />
                <p className="text-xs text-slate-500 mt-1">
                  Check your email ({email}) for the 6-digit code. Expires in 10 minutes.
                </p>
              </div>
              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full bg-cyan-600 text-white py-2 px-4 rounded-md hover:bg-cyan-700 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Verifying...' : 'Verify Code'}
              </button>
              <button
                type="button"
                onClick={() => setStep('email')}
                className="w-full text-cyan-600 py-2 px-4 rounded-md hover:bg-cyan-50 transition-colors"
              >
                Use Different Email
              </button>
            </form>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3 mt-4">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 rounded-md p-3 mt-4">
              <p className="text-green-800 text-sm">{success}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
