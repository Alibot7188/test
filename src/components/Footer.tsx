export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} NexusConnect. All rights reserved.
        Powered by the College Alumni Association.
      </div>
    </footer>
  );
}
