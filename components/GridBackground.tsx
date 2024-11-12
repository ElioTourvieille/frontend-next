
export function GridBackground({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="h-[85vh] w-full bg-gray-900 bg-grid-gray-600/[0.3] relative flex items-center justify-center">
      {/* Radial gradient */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-gray-900 [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div>
      {children}
    </div>
  );
}
