import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy — WhatsApp Chat Viewer',
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#eae6df]">
      <div className="bg-[#075e54] text-white px-6 py-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="text-white/80 text-sm hover:text-white">&larr; Back to Chat Viewer</Link>
          <h1 className="text-2xl font-semibold mt-2">Privacy Policy</h1>
          <p className="text-white/70 text-sm mt-1">Last updated: April 6, 2026</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm space-y-6 text-[#111b21] text-[15px] leading-relaxed">

          <section>
            <h2 className="text-lg font-semibold mb-2">Overview</h2>
            <p>
              WhatsApp Chat Viewer is a client-side web application that allows you to view, search, analyze, and export your exported WhatsApp chat history. We are committed to protecting your privacy and being transparent about our data practices.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Data We Collect</h2>
            <p className="font-medium text-[#00a884] mb-1">We do not collect, store, or transmit your chat data to any server.</p>
            <p>
              All processing happens entirely in your web browser. When you upload a WhatsApp export file (.txt or .zip), the file is parsed locally using JavaScript. Your chat messages, media files, and personal information never leave your device and are never sent to any server.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">How Your Data Is Processed</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Chat files are read and parsed entirely in your browser</li>
              <li>Media files from .zip exports are extracted locally and displayed using temporary browser URLs</li>
              <li>Chat data may be stored locally on your device using your browser&apos;s IndexedDB storage, allowing you to revisit conversations without re-uploading</li>
              <li>Bookmarked messages are stored locally in IndexedDB on your device</li>
              <li>You can delete any stored chat data at any time from within the app</li>
              <li>No data is sent to our servers or any third party</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Local Storage (IndexedDB)</h2>
            <p>
              To improve your experience, this app uses your browser&apos;s IndexedDB storage to save uploaded chats, media files, and bookmarks locally on your device. This data:
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Is stored only on your device and never transmitted to any server</li>
              <li>Persists across page reloads and browser sessions</li>
              <li>Can be deleted at any time using the delete button next to each saved chat</li>
              <li>Can be cleared entirely by clearing your browser&apos;s site data</li>
              <li>Is not accessible to other websites or applications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">PDF Export</h2>
            <p>
              The PDF export feature generates a PDF file entirely in your browser using the jsPDF library. The generated PDF is downloaded directly to your device and is never uploaded to any server.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Chat Analytics</h2>
            <p>
              The chat analytics feature computes statistics such as message counts, activity patterns, and emoji usage entirely in your browser. No analytics data is sent to any server or third party.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Third-Party Services</h2>
            <h3 className="font-medium mb-1">Google AdSense</h3>
            <p>
              We use Google AdSense to display advertisements. Google may use cookies and web beacons to serve ads based on your prior visits to this or other websites. You can opt out of personalized advertising by visiting{' '}
              <a href="https://www.google.com/settings/ads" className="text-[#00a884] underline" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.
              For more information, see{' '}
              <a href="https://policies.google.com/privacy" className="text-[#00a884] underline" target="_blank" rel="noopener noreferrer">Google&apos;s Privacy Policy</a>.
            </p>

            <h3 className="font-medium mb-1 mt-3">Vercel</h3>
            <p>
              This site is hosted on Vercel. Vercel may collect standard web server logs including IP addresses, browser type, and pages visited. See{' '}
              <a href="https://vercel.com/legal/privacy-policy" className="text-[#00a884] underline" target="_blank" rel="noopener noreferrer">Vercel&apos;s Privacy Policy</a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Cookies</h2>
            <p>
              This website does not set any first-party cookies. Third-party services (Google AdSense) may set cookies for advertising purposes. You can manage cookie preferences through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Children&apos;s Privacy</h2>
            <p>
              This service is not directed to children under 13. We do not knowingly collect any personal information from children.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Contact</h2>
            <p>
              If you have questions about this Privacy Policy, please reach out via our{' '}
              <a href="https://github.com/ashish6194/whatsapp-chat-history/issues" className="text-[#00a884] underline" target="_blank" rel="noopener noreferrer">GitHub repository</a>.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
