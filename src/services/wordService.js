export const AVAILABLE_LANGUAGES = [
  { code: "pt-br", name: "Português" },
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "it", name: "Italiano" },
  { code: "de", name: "Deutsch" },
  { code: "fr", name: "Français" },
];

function cleanString(str) {
  if (!str || typeof str !== "string") {
    return "";
  }

  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

async function searchWord(language, length, number) {
  const url = `https://random-word-api.herokuapp.com/word?number=${number}&lang=${language}&length=${length}`;

  console.log(
    `🔍 Buscando palavras: ${language}, tamanho: ${length}, quantidade: ${number}`
  );

  try {
    const response = await fetch(url);
    const words = await response.json();
    const filteredWords = words
      .filter((word) => word && typeof word === "string")
      .map((word) => ({ word, language }));

    console.log(
      `✅ ${language}: ${filteredWords.length} palavras encontradas`
    );

    return filteredWords;
  } catch (error) {
    console.error(
      `❌ Erro ao buscar palavras em ${language}:`,
      error
    );
    return [];
  }
}

export async function newWord(languages, length) {
  console.log(
    `🎲 Sorteando palavra | Idiomas: ${languages.join(
      ", "
    )} | Tamanho: ${length}`
  );

  const promises = languages.map((language) =>
    searchWord(language, length, 1)
  );

  try {
    const wordArray = await Promise.all(promises);
    const allWords = wordArray.flat();

    console.log(
      `📊 Total de palavras candidatas: ${allWords.length}`
    );
    console.log("Palavras:", allWords);

    if (allWords.length > 0) {
      const drawnWord =
        allWords[Math.floor(Math.random() * allWords.length)];
      console.log(
        "🎯 Palavra sorteada:",
        drawnWord.word,
        "| Idioma:",
        drawnWord.language
      );
      return drawnWord;
    } else {
      console.warn("⚠️ Nenhuma palavra encontrada.");
      return null;
    }
  } catch (error) {
    console.error("❌ Erro ao sortear palavra:", error);
    return null;
  }
}

export async function wordDatabase(languages, length) {
  console.log(
    `📚 Carregando dicionário | Idiomas: ${languages.join(
      ", "
    )} | Tamanho: ${length}`
  );

  const promises = languages.map((language) =>
    searchWord(language, length, 999999999)
  );

  try {
    const results = await Promise.all(promises);
    const flatResults = results.flat();

    console.log(
      `📖 Dicionário carregado: ${flatResults.length} palavras totais`
    );
    console.log("Primeiras 10 palavras:", flatResults.slice(0, 10));

    return flatResults;
  } catch (error) {
    console.error("❌ Erro ao carregar dicionário:", error);
    return [];
  }
}

export function validateWord(word, allWords) {
  if (!word || !Array.isArray(allWords)) {
    console.warn(
      "⚠️ Validação falhou: palavra ou dicionário inválido"
    );
    return [];
  }

  const normalizedInput = cleanString(word);
  console.log(
    `🔎 Validando palavra: "${word}" (normalizada: "${normalizedInput}")`
  );
  console.log(`📚 Dicionário tem ${allWords.length} palavras`);

  const found = allWords.filter((obj) => {
    if (!obj || !obj.word) {
      return false;
    }
    return cleanString(obj.word) === normalizedInput;
  });

  console.log(
    `${found.length > 0 ? "✅" : "❌"} Palavra encontrada: ${
      found.length
    } vez(es)`,
    found
  );

  return found;
}

export { cleanString };
