'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function PainelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace('/login');
  }

  const menu = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Produtos', href: '/produtos' },
    { name: 'Revendedoras', href: '/revendedoras' },
    { name: 'Promoções', href: '/promocoes' },
  ];

  return (
    <div className="flex h-screen w-full bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-md flex flex-col p-4">
        <h2 className="text-xl font-bold mb-8">Painel Green</h2>

        <nav className="flex flex-col gap-3">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded-md font-medium ${
                pathname === item.href
                  ? 'bg-green-500 text-white'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto bg-red-500 text-white py-2 rounded-md"
        >
          Sair
        </button>
      </aside>

      {/* CONTAINER PRINCIPAL */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* HEADER */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            {menu.find((i) => i.href === pathname)?.name}
          </h1>
        </header>

        {/* CONTEÚDO DE CADA PÁGINA */}
        {children}
      </main>
    </div>
  );
}
