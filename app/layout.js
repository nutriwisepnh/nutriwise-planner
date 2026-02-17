export const metadata = {
  title: "Nutriwise Planner",
  description: "Weekmenu tool voor Nutriwise"
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <body style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
