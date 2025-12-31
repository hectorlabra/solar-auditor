export function Footer() {
  return (
    <footer className="w-full border-t bg-muted/50 py-6 mt-auto">
      <div className="container max-w-4xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
        <p>
          © {new Date().getFullYear()} Solar Auditor. Todos los derechos
          reservados.
        </p>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">
            Privacidad
          </a>
          <a href="#" className="hover:underline">
            Términos
          </a>
        </div>
      </div>
    </footer>
  );
}
