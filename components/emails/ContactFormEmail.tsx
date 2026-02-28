import * as React from 'react';

interface ContactFormEmailProps {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  message: string;
}

export function ContactFormEmail({
  firstName,
  lastName,
  email,
  phoneNumber,
  message,
}: ContactFormEmailProps) {
  const currentDate = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        fontSize: '16px',
        color: '#1f2937',
        lineHeight: '1.6',
        maxWidth: '650px',
        margin: '0 auto',
        backgroundColor: '#f8fafc',
        padding: '20px',
      }}
    >
      {/* Email Header */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px 12px 0 0',
          padding: '24px',
          borderBottom: '3px solid #06b6d4',
          textAlign: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#06b6d4',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '12px',
            }}
          >
            <span style={{ color: '#ffffff', fontSize: '20px', fontWeight: 'bold' }}>Q</span>
          </div>
          <h1 style={{ margin: 0, color: '#1f2937', fontSize: '24px', fontWeight: 'bold' }}>
            QRify
          </h1>
        </div>
        <h2 style={{ color: '#06b6d4', margin: '0 0 8px 0', fontSize: '20px', fontWeight: '600' }}>
          📩 New Contact Form Submission
        </h2>
        <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>
          Received on {currentDate}
        </p>
      </div>

      {/* Main Content */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '0 0 12px 12px',
          padding: '24px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Sender Information */}
        <div
          style={{
            backgroundColor: '#f0f9ff',
            border: '1px solid #bae6fd',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '24px',
          }}
        >
          <h3 style={{ 
            margin: '0 0 16px 0', 
            color: '#0c4a6e', 
            fontSize: '18px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
          }}>
            👤 Contact Information
          </h3>
          <div style={{ display: 'grid', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ 
                fontWeight: '600', 
                color: '#374151', 
                minWidth: '80px',
                fontSize: '14px',
              }}>
                Name:
              </span>
              <span style={{ color: '#1f2937', fontSize: '15px' }}>
                {firstName} {lastName}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ 
                fontWeight: '600', 
                color: '#374151', 
                minWidth: '80px',
                fontSize: '14px',
              }}>
                Email:
              </span>
              <a 
                href={`mailto:${email}`} 
                style={{ 
                  color: '#06b6d4', 
                  textDecoration: 'none',
                  fontSize: '15px',
                  fontWeight: '500',
                }}
              >
                {email}
              </a>
            </div>
            {phoneNumber && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ 
                  fontWeight: '600', 
                  color: '#374151', 
                  minWidth: '80px',
                  fontSize: '14px',
                }}>
                  Phone:
                </span>
                <a 
                  href={`tel:${phoneNumber}`} 
                  style={{ 
                    color: '#06b6d4', 
                    textDecoration: 'none',
                    fontSize: '15px',
                    fontWeight: '500',
                  }}
                >
                  {phoneNumber}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Message Content */}
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '24px',
          }}
        >
          <h3 style={{ 
            margin: '0 0 16px 0', 
            color: '#1f2937', 
            fontSize: '18px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
          }}>
            💬 Message
          </h3>
          <div
            style={{
              backgroundColor: '#f9fafb',
              border: '1px solid #f3f4f6',
              borderRadius: '6px',
              padding: '16px',
              whiteSpace: 'pre-line',
              fontSize: '15px',
              lineHeight: '1.7',
              color: '#374151',
            }}
          >
            {message}
          </div>
        </div>

        {/* Quick Actions */}
        <div
          style={{
            backgroundColor: '#fef3c7',
            border: '1px solid #fbbf24',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '24px',
          }}
        >
          <h4 style={{ 
            margin: '0 0 12px 0', 
            color: '#92400e', 
            fontSize: '16px',
            fontWeight: '600',
          }}>
            ⚡ Quick Actions
          </h4>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a
              href={`mailto:${email}?subject=Re: Your QRify Contact Form Inquiry&body=Hi ${firstName},%0D%0A%0D%0AThank you for reaching out to QRify!%0D%0A%0D%0A`}
              style={{
                backgroundColor: '#06b6d4',
                color: '#ffffff',
                padding: '8px 16px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
              }}
            >
              Reply to {firstName}
            </a>
            <a
              href={`tel:${phoneNumber || ''}`}
              style={{
                backgroundColor: '#10b981',
                color: '#ffffff',
                padding: '8px 16px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                display: phoneNumber ? 'inline-block' : 'none',
              }}
            >
              Call {firstName}
            </a>
          </div>
        </div>
      </div>

      {/* Email Footer */}
      <div
        style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          border: '1px solid #e5e7eb',
          textAlign: 'center',
        }}
      >
        <p style={{
          margin: '0 0 12px 0',
          fontSize: '14px',
          color: '#6b7280',
          lineHeight: '1.5',
        }}>
          This email was automatically generated from your QRify contact form.
        </p>
        <div style={{ 
          borderTop: '1px solid #e5e7eb', 
          paddingTop: '12px',
          fontSize: '12px',
          color: '#9ca3af',
        }}>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>QRify</strong> - Built by a student, for the community
          </p>
          <p style={{ margin: 0 }}>
            📧 chaitanyalohani175@gmail.com | 🌐 qrify.com
          </p>
        </div>
      </div>
    </div>
  );
}
