'use client';

import { Inter } from 'next/font/google';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../lib/queryClients';
import { TrendingUp, Menu } from 'lucide-react';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <div className="min-h-screen flex flex-col bg-gray-50">
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-sm">
                        <TrendingUp className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h1 className="text-xl font-bold text-gray-900">
                          AnkaFlow
                        </h1>
                        <p className="text-xs text-gray-500 hidden sm:block">Plataforma de Gestão de Investimentos</p>
                      </div>
                    </div>
                  </div>
                  
                  <nav className="hidden md:flex space-x-8">
                    <a 
                      href="/" 
                      className="text-gray-700 hover:text-orange-600 px-4 py-2 text-sm font-medium transition-colors border-b-2 border-transparent hover:border-orange-200"
                    >
                      Clientes
                    </a>
                    <a 
                      href="/oportunidades" 
                      className="text-gray-700 hover:text-orange-600 px-4 py-2 text-sm font-medium transition-colors border-b-2 border-transparent hover:border-orange-200"
                    >
                      Oportunidades
                    </a>
                    <a 
                      href="/carteiras" 
                      className="text-gray-700 hover:text-orange-600 px-4 py-2 text-sm font-medium transition-colors border-b-2 border-transparent hover:border-orange-200"
                    >
                      Carteiras
                    </a>
                  </nav>

                  <div className="md:hidden">
                    <button className="text-gray-700 hover:text-orange-600 p-2">
                      <Menu className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              </div>
            </header>

            <main className="flex-grow">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
              </div>
            </main>

            <footer className="bg-gray-900 border-t border-gray-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-white">AnkaFlow</span>
                      <p className="text-xs text-gray-400">by Anka Tech</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    2025 Anka Tech. Todos os direitos reservados.
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </QueryClientProvider>
      </body>
    </html>
  );
}