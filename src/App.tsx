import { useState } from "react"
import "./styles/global.scss"
import HeaderLogo from "./components/HeaderLogo"
import BottomLogo from "./components/BottomLogo"
import ItemList from "./components/ItemList"
import ActionButtons from "./components/ActionButtons"

import { MainData } from "./models/types"

export default function App() {
  const [mainData, setMainData] = useState<MainData>({
    groups: [
      {
        mainLabel: "Tinta Uso Geral",
        itemList: [
          { label: "Alumínio", value: 0 },
          { label: "Alumínio para Rodas", value: 0 },
          { label: "Amarelo", value: 0 },
          { label: "Azul Claro", value: 0 },
          { label: "Azul Escuro", value: 0 },
          { label: "Branco Brilhante", value: 0 },
          { label: "Branco Fosco", value: 0 },
          { label: "Cinza Claro", value: 0 },
          { label: "Cinza Escuro", value: 0 },
          { label: "Dourado", value: 0 },
          { label: "Preto Brilhante", value: 0 },
          { label: "Preto Fosco", value: 0 },
          { label: "Preto Semi Brilho", value: 0 },
          { label: "Verde Claro", value: 0 },
          { label: "Verde Escuro", value: 0 },
          { label: "Vermelho", value: 0 },
          { label: "Verniz Brilhante", value: 0 },
        ],
      },
      {
        mainLabel: "Tinta Metálica",
        itemList: [
          { label: "Cromado", value: 0 },
          { label: "Dourado Metálico", value: 0 },
          { label: "Prata", value: 0 },
        ],
      },
      {
        mainLabel: "Tinta Alta Temperatura",
        itemList: [
          { label: "Alumínio Alta Temperatura", value: 0 },
          { label: "Branco Fosco Alta Temperatura", value: 0 },
          { label: "Preto Brilhante Alta Temperatura", value: 0 },
          { label: "Preto Fosco Alta Temperatura", value: 0 },
        ],
      },
      {
        mainLabel: "Outros Produtos",
        itemList: [
          { label: "Espuma Expansiva", value: 0 },
          { label: "Desingripante", value: 0 }
        ],
      },
    ],
  })

  const phone = "554884312040"
  return (
    <>
      <HeaderLogo />

      <div className="container">
        <ItemList initialData={mainData} onDataChange={setMainData} />

        <ActionButtons mainData={mainData} phone={phone} />
      </div>

      <BottomLogo />
    </>
  )
}