import "bootswatch/dist/brite/bootstrap.css";
import "bootswatch/dist/brite/bootstrap.min.css";
import MinhaImagem from "../assets/teste-foto.png";


export default function PaginaInicial() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 font-sans">
      <section>
        <div className="card border-primary mb-3">
          <h3 className="card-header border-primary mb-3 text-center">AlphaFit - Sistema Interno</h3>
          <img 
            src={MinhaImagem} 
            alt="Imagem AlphaFit"
            style={{ width: "100%", height: "240px", objectFit: "cover" }}
          />
        </div>
        <div className="row">
          <div className="col-sm-4">
            <div className="card bg-primary mb-3">
              <div className="card-body">
                <h4 className="card-header text-center">Gestão de Alunos</h4>
                <p className="card-text text-center">Cadastre, edite e acompanhe facilmente todos os alunos.</p>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card">
              <div className="card-body">
                <h4 className="card-header text-center">Treinos & Avaliações</h4>
                <p className="card-text text-center">Monte fichas de treino, planos e avalições físicas completas.</p>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card bg-primary mb-3">
              <div className="card-body">
                <h4 className="card-header text-center">Financeiro</h4>
                <p className="card-text text-center">Controle mensalidades, pagamentos e situação financeira.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="text-center py-6 opacity-60 text-sm border-t border-white/10">
        © 2025 AlphaFit • Todos os direitos reservados.
      </footer>
    </div>
  );
}

