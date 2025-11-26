import "bootswatch/dist/brite/bootstrap.css";
import "bootswatch/dist/brite/bootstrap.min.css";
import React from "react";

export default function PaginaInicial() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 font-sans">

      {/* HERO MODERNO */}
      <section
        className="relative w-full h-[70vh] flex-sh items-center justify-center text-center px-6 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1400&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/75"></div>

        <div className="relative z-10 max-w-3xl text-white">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-xl">
            AlphaFit • Sistema Interno
          </h1>
          <p className="text-lg md:text-xl mt-4 opacity-90">
            Controle completo da sua academia em um só lugar.
          </p>
          
        </div>
      </section>

      {/* CONTAINER PRINCIPAL */}
      <section className="max-w-7xl w-full mx-auto py-20 px-6">
        <h2 className="text-4xl font-bold text-center mb-14 text-[#2ECC71]"></h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Card */}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-8 shadow-xl border border-white/10 hover:border-[#2ECC71]/40 transition cursor-pointer hover:scale-105">
            <h3 className="text-2xl font-semibold mb-3 text-[#FFFFFF]">Gestão de Alunos</h3>
            <p className="text-sm opacity-80">
              Cadastre, edite e acompanhe facilmente todos os alunos ativos.
            </p>
          </div>

          {/* Card */}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-8 shadow-xl border border-white/10 hover:border-[#2ECC71]/40 transition cursor-pointer hover:scale-105">
            <h3 className="text-2xl font-semibold mb-3 text-[#FFFFFF]">Treinos & Avaliações</h3>
            <p className="text-sm opacity-80">
              Monte fichas de treino, planos e avalições físicas completas.
            </p>
          </div>

          {/* Card */}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-8 shadow-xl border border-white/10 hover:border-[#2ECC71]/40 transition cursor-pointer hover:scale-105">
            <h3 className="text-2xl font-semibold mb-3 text-[#FFFFFF]">Financeiro</h3>
            <p className="text-sm opacity-80">
              Controle mensalidades, pagamentos e situação financeira.
            </p>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-6 opacity-60 text-sm border-t border-white/10">
        © 2025 AlphaFit • Todos os direitos reservados.
      </footer>
    </div>
  );
}
