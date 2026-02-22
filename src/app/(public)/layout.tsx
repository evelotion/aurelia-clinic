import Navbar from "@/components/layouts/public/Navbar";
import Footer from "@/components/layouts/public/Footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-midnight font-sans text-text-light selection:bg-champagne selection:text-midnight">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
