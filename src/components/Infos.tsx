
type InfosProps = {
    cep: string;
    rua: string;
    bairro: string;
    cidade: string;
    estado: string
}

export const Infos: React.FC<InfosProps> = ({ cep, rua, bairro, cidade, estado }) => {

    return (
        <div className="mt-10 flex items-center justify-center">
            <div className="bg-gray-900 w-full max-w-2xl h-50 flex items-center justify-center">
                <div className="p-5 flex flex-col gap-6 ">
                    <p className="text-3xl text-white">CEP: {cep}</p>
                    <p className="text-3xl text-white">Rua: {rua}</p>
                    <p className="text-3xl text-white">Bairro: {bairro}</p>
                    <p className="text-3xl text-white">Cidade: {cidade}</p>
                    <p className="text-3xl text-white">Estado: {estado}</p>
                </div>
            </div>
        </div>



    )
} 