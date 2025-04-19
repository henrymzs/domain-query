import { useState } from "react";

function DomainCheck() {
    const [input, setInput] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    function formatDate(isoString) {
        if (!isoString) {
            return 'Não Disponivel';
        }
        const date = new Date(isoString);
        return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
    }

    const handleCheckDomain = async () => {
        if (!input.trim()) {
            alert('Por favor, insira um domínio.');
            return
        }
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`https://brasilapi.com.br/api/registrobr/v1/${encodeURIComponent(input)}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar dados');
            }
            const data = await response.json();
            setResult(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-verify">
            <div className="input-container">
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Digite o domínio" />
                <button id="btn" onClick={handleCheckDomain}>Verificar</button>
            </div>
        
            {loading && <p>Carregando...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            {result && (
                <div id="results-container">
                    <p><strong>Status:</strong> {result.status}</p>
                    <p><strong>Domínio:</strong> {result.fqdn}</p>
                    <p><strong>Expira em:</strong> {formatDate(result["expires-at"])}</p>
                </div>
            )}
        </div>
    );
}

export default DomainCheck;


