export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.dataset.intro="done";document.getElementById("vulcira-intro-cover")?.remove();`,
        }}
      />
      {children}
    </>
  );
}
