import "bootswatch/dist/brite/bootstrap.css";
import "bootswatch/dist/brite/bootstrap.min.css";

export default function PaginaInicial() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 font-sans">
      <section>
        <div className="card border-primary mb-3">
          <h3 className="card-header border-primary mb-3 text-center">AlphaFit - Sistema Interno</h3>
          <svg xmlns="http://www.w3.org/2000/svg" class="d-block user-select-none" width="100%" height="200" aria-label="Placeholder: Image cap" focusable="false" role="img" preserveAspectRatio="xMidYMid slice" viewBox="0 0 318 180">
            <rect width="100%" height="100%" fill="#868e96"></rect>
            <text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text>
          </svg>
          <div className="card-body">
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <div className="card bg-primary mb-3">
              <div className="card-body">
                <h4 className="card-header text-center">Gestão de Alunos</h4>
                <p className="card-text text-center">Cadastre, edite e acompanhe facilmente todos os alunos ativos.</p>
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

