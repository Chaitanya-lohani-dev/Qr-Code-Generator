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
  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px',
        color: '#333',
        lineHeight: '1.6',
        maxWidth: '600px',
        margin: '0 auto',
      }}
    >
      <h2 style={{ color: '#0d9488', marginBottom: '8px' }}>
        📩 New Contact Form Enquiry
      </h2>
      <p style={{ marginBottom: '16px' }}>
        You have received a new enquiry through your website contact form.
      </p>

      <div
        style={{
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '16px',
          background: '#f9fafb',
          marginBottom: '20px',
        }}
      >
        <h3 style={{ margin: '0 0 12px 0', color: '#111827' }}>
          Sender’s Information
        </h3>
        <p style={{ margin: '4px 0' }}>
          <strong>Name:</strong> {firstName} {lastName}
        </p>
        <p style={{ margin: '4px 0' }}>
          <strong>Email:</strong>{' '}
          <a href={`mailto:${email}`} style={{ color: '#0d9488' }}>
            {email}
          </a>
        </p>
        {phoneNumber && (
          <p style={{ margin: '4px 0' }}>
            <strong>Phone:</strong>{' '}
            <a href={`tel:${phoneNumber}`} style={{ color: '#0d9488' }}>
              {phoneNumber}
            </a>
          </p>
        )}
      </div>

      <div
        style={{
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '16px',
          background: '#ffffff',
        }}
      >
        <h3 style={{ margin: '0 0 12px 0', color: '#111827' }}>Message</h3>
        <p style={{ whiteSpace: 'pre-line', margin: 0 }}>{message}</p>
      </div>

      <p
        style={{
          marginTop: '20px',
          fontSize: '12px',
          color: '#6b7280',
          borderTop: '1px solid #e5e7eb',
          paddingTop: '12px',
        }}
      >
        This message was automatically generated from your website contact form.
        Please do not reply directly to this email.
      </p>
    </div>
  );
}
