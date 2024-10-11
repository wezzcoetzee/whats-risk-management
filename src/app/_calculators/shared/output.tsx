export default function Output({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-grow p-2 flex flex-col gap-4">
      {children}
    </div>
  );
}
