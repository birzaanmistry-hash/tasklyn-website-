import { Footer } from "./Footer";
import { Header } from "./Header";
import { RevealObserver } from "./ui/RevealObserver";
import { Wrap } from "./ui/Wrap";

/**
 * SiteShell: the frame every page sits in. Header, <main id="main"> (target
 * of the skip link), Footer, and the single Reveal observer.
 *
 * Props
 *  children: page content (sections)
 *
 * Wrap is re-exported here because inner pages import it from this module.
 */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}

export { Wrap };
