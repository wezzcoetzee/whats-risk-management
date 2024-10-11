export default function Output({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-grow p-2 flex flex-col gap-4">
      <h1 className="font-bold text-xl">Calculation Outputs</h1>
      {children}
    </div>
  );
}
