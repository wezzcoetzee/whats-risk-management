export default function Output({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-grow mt-4 rounded-lg p-2 flex flex-col gap-4">
      <h2 className="font-bold">Calculation Outputs</h2>
      {children}
    </div>
  );
}
