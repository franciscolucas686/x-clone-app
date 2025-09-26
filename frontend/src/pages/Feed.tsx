export default function ThreeColumnLayout() {
  return (
    <div className="flex h-screen w-screen">
      <aside className="w-[22.5%] bg-red-500 p-4">
        <h2 className="font-bold text-white">Esquerda</h2>
      </aside>

      <main className="flex-1 bg-gray-100 p-4 overflow-auto">
        <h2 className="font-bold mb-4">Centro Rolável</h2>
        {Array.from({ length: 50 }).map((_, i) => (
          <p key={i} className="mb-2">Linha {i + 1}</p>
        ))}
      </main>

      <aside className="w-[32%] bg-blue-500 p-4">
        <h2 className="font-bold text-white">Direita</h2>
      </aside>
    </div>
  );
}
