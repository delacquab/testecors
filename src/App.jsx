import React, { useState } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState(null);

  const handleFetch = async () => {
    try {
      const response = await fetch(
        `http://macunaima-wbapi.wbstecn.com.br/api/wbapi/v1/produto/listar?per_page=2&page=1`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + inputValue,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Erro na requisição");
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error(error);
      setData({ error: "Erro ao buscar os dados" });
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Digite o Bearer Token"
      />
      <button onClick={handleFetch}>Buscar</button>

      {data && (
        <div>
          <h3>Resultado:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
