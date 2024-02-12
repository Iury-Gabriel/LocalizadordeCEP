"use client";

import { Infos } from "@/components/Infos";
import { Warn } from "@/components/Warn";
import axios from "axios";
import { useState } from "react";

function Page() {
  const [input, setInput] = useState('');
  const [showWarn, setShowWarn] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [ceps, setCep] = useState('');
  const [rua, setRua] = useState<string>('');
  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');
  const [estado, setEstado] = useState('');
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false)

  const handleSearch = async () => {
    if (input.length < 8 && input.includes('-')) {
      setShowWarn(true);
      setShowInfo(false);
    } else {
      setShowWarn(false);
      setLoading(true);

      // Adiar a requisição por 2 segundos
      setTimeout(async () => {
        const result = await axios.get(`https://viacep.com.br/ws/${input}/json/`);
        setRua(result.data?.logradouro);
        setCep(result.data?.cep);
        setCidade(result.data?.localidade);
        setBairro(result.data?.bairro);
        setEstado(result.data?.uf);
        setShowInfo(true);
        setLoading(false);
        { result.data.erro == true && setNotFound(true) }
        { result.data.erro != true && setNotFound(false) }

      }, 1000);
    }
  }

  return (
    <div className="container flex flex-col items-center gap-3 mt-14 bg-black-900">
      <h1 className="text-4xl mb-5">Localizador de CEP</h1>
      <div className="flex flex-col">
        <div className="flex justify-center">
          <input
            type="text"
            className="rounded-md text-black p-1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={8}
            placeholder="Ex: 65010030"
          />
          <button onClick={handleSearch} className="ml-4 bg-blue-500 rounded-md text-black p-1">Pesquisar</button>
        </div>
        {showWarn && <Warn />}
        {loading &&
          <p className="mt-10 text-xl text-center">Carregando...</p>
        }
        {notFound && !loading &&
          <p className="mt-10 text-xl text-center">Cep não encontrado!!</p>
        }
        {showInfo && !loading && !notFound && <Infos cep={ceps} rua={rua} bairro={bairro} cidade={cidade} estado={estado} />}

        <div className="p-4 bg-black text-white text-center fixed bottom-0 left-0 w-full">
          <p>Desenvolvido Por <a className="text-blue-700 hover:text-blue-300" href="https://github.com/Iury-Gabriel">Iury</a></p>
          <p>Versão: 1.0.0</p>
        </div>
      </div>
    </div>
  );
}

export default Page;
