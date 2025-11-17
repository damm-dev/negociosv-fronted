export default function MainLayout({ children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#020617",
        color: "#E5E7EB",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* HEADER / NAV */}
      <header
        style={{
          padding: "1rem 2rem",
          borderBottom: "1px solid #1F2937",
        }}
      >
        <h2 style={{ margin: 0 }}>NegocioSv</h2>
      </header>

      {/* CONTENIDO BODY*/}
      <main
        style={{
          flex: 1,
          width: "100%",
          padding: 0,
        }}
      >
        {children}
      </main>

      {/* FOOTER */}
      <footer
        style={{
          padding: "0.75rem 2rem",
          borderTop: "1px solid #1F2937",
          fontSize: "0.8rem",
          textAlign: "center",
        }}
      >
        © {new Date().getFullYear()} NegociosV · Proyecto UES
      </footer>
    </div>
  );
}
