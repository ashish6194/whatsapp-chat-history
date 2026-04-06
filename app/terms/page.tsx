import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service — WhatsApp Chat Viewer',
};

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-[#eae6df]">
      <div className="bg-[#075e54] text-white px-6 py-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="text-white/80 text-sm hover:text-white">&larr; Back to Chat Viewer</Link>
          <h1 className="text-2xl font-semibold mt-2">Terms of Service</h1>
          <p className="text-white/70 text-sm mt-1">Last updated: April 6, 2026</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm space-y-6 text-[#111b21] text-[15px] leading-relaxed">

          <section>
            <h2 className="text-lg font-semibold mb-2">Acceptance of Terms</h2>
            <p>
              By accessing and using WhatsApp Chat Viewer, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Description of Service</h2>
            <p>
              WhatsApp Chat Viewer is a free, client-side web application that allows you to view, search, bookmark, analyze, and export your WhatsApp chat history. The service processes files entirely in your browser. Chat data may be stored locally on your device using IndexedDB for convenience, but is never transmitted to any server.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Features</h2>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Chat Viewer</strong> &mdash; upload and view WhatsApp exported .txt or .zip files with a familiar chat interface</li>
              <li><strong>Search &amp; Filter</strong> &mdash; search messages by text, filter by sender or date range</li>
              <li><strong>Media Display</strong> &mdash; view photos, videos, and audio from .zip exports inline</li>
              <li><strong>Bookmarks</strong> &mdash; bookmark important messages for quick access later</li>
              <li><strong>Chat Analytics</strong> &mdash; view statistics including message counts, activity patterns, top emojis, and more</li>
              <li><strong>PDF Export</strong> &mdash; download your chat as a styled PDF document</li>
              <li><strong>Local Storage</strong> &mdash; save chats to your browser for revisiting without re-uploading</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">User Responsibilities</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>You are responsible for the content you upload to the viewer</li>
              <li>You must have the right to access the chat history you upload</li>
              <li>You should not upload files containing illegal content</li>
              <li>You are responsible for maintaining the privacy of your chat data</li>
              <li>You are responsible for managing locally stored data on your device</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Local Data Storage</h2>
            <p>
              This application may store your uploaded chat data, media files, and bookmarks in your browser&apos;s IndexedDB storage. This data is stored only on your device, is not accessible to us or any third party, and can be deleted at any time from within the app or by clearing your browser&apos;s site data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">PDF Export</h2>
            <p>
              The PDF export feature generates documents entirely in your browser. Generated PDFs are downloaded directly to your device. We are not responsible for the content of exported PDFs, which is derived from the chat data you provide.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Intellectual Property</h2>
            <p>
              WhatsApp is a registered trademark of Meta Platforms, Inc. This application is an independent tool and is not affiliated with, endorsed by, or sponsored by Meta Platforms, Inc. or WhatsApp LLC.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Disclaimer of Warranties</h2>
            <p>
              This service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind, either express or implied. We do not guarantee that the service will be uninterrupted, error-free, or that it will correctly parse all WhatsApp export formats. Chat analytics and statistics are provided for informational purposes only and may not be fully accurate.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use this service, including but not limited to loss of data, inaccurate analytics, or issues with exported PDF files.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Advertising</h2>
            <p>
              This service displays advertisements provided by Google AdSense. By using this service, you acknowledge that advertisements may be displayed alongside the chat viewer interface.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Contact</h2>
            <p>
              For questions regarding these terms, please visit our{' '}
              <a href="https://github.com/ashish6194/whatsapp-chat-history/issues" className="text-[#00a884] underline" target="_blank" rel="noopener noreferrer">GitHub repository</a>.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
