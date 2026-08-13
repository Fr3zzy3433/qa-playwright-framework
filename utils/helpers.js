/**
 * Utilitários auxiliares para suporte aos testes de automação.
 */

/**
 * Converte string de preço em formato de moeda ($19.99) para número (19.99).
 * @param {string} precoString
 * @returns {number}
 */
function parseMoedaParaNumero(precoString) {
    if (!precoString) return 0;
    return parseFloat(precoString.replace(/[^0-9.-]+/g, ''));
}

module.exports = { parseMoedaParaNumero };
