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
          { label: "Alumínio", price: 0.0, value: 0 },
          { label: "Alumínio para Rodas", price: 0.0, value: 0 },
          { label: "Amarelo", price: 0.0, value: 0 },
          { label: "Azul Claro", price: 0.0, value: 0 },
          { label: "Azul Escuro", price: 0.0, value: 0 },
          { label: "Branco Brilhante", price: 0.0, value: 0 },
          { label: "Branco Fosco", price: 0.0, value: 0 },
          { label: "Cinza Claro", price: 0.0, value: 0 },
          { label: "Cinza Escuro", price: 0.0, value: 0 },
          { label: "Dourado", price: 0.0, value: 0 },
          { label: "Preto Brilhante", price: 0.0, value: 0 },
          { label: "Preto Fosco", price: 0.0, value: 0 },
          { label: "Preto Semi Brilho", price: 0.0, value: 0 },
          { label: "Verde Claro", price: 0.0, value: 0 },
          { label: "Verde Escuro", price: 0.0, value: 0 },
          { label: "Vermelho", price: 0.0, value: 0 },
          { label: "Verniz Brilhante", price: 0.0, value: 0 },
        ],
      },
      {
        mainLabel: "Tinta Metálica",
        itemList: [
          { label: "Cromado", price: 0.0, value: 0 },
          { label: "Dourado Metálico", price: 0.0, value: 0 },
          { label: "Prata", price: 0.0, value: 0 },
        ],
      },
      {
        mainLabel: "Tinta Alta Temperatura",
        itemList: [
          { label: "Alumínio Alta Temperatura", price: 0.0, value: 0 },
          { label: "Branco Fosco Alta Temperatura", price: 0.0, value: 0 },
          { label: "Preto Brilhante Alta Temperatura", price: 0.0, value: 0 },
          { label: "Preto Fosco Alta Temperatura", price: 0.0, value: 0 },
        ],
      },
      {
        mainLabel: "Outros Produtos",
        itemList: [
          { label: "Espuma Expansiva", price: 0.0, value: 0 },
          { label: "Desingripante", price: 0.0, value: 0 }
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