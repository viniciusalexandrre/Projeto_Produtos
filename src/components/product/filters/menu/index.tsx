// import Image from 'next/image'
// import Link from 'next/link'
// import MenuIcon from '../../../../../public/icon/Filters/Menu/Menu_Icon.svg'
// import CloseIcon from '../../../../../public/icon/Filters/Menu/X-Icon.svg'
// import CaretDown from '../../../../../public/icon/Filters/Menu/caret-down.svg'
// import styles from './menu.module.scss'
// import { Dispatch, SetStateAction, useEffect, useState } from 'react'

// interface MenuProps {
//   setCategory: Dispatch<SetStateAction<string | undefined>>
//   setSelectedEquipamento: Dispatch<SetStateAction<string[]>>
// }
// export default function Menu({
//   setCategory,
//   setSelectedEquipamento,
// }: MenuProps) {
//   const [menuIsVisible, setMenuIsVisible] = useState(false)
//   const [equipmentIsVisible, setEquipamentIsVisible] = useState(false)
//   const [priceIsVisible, setpriceIsVisible] = useState(false)

//   const handleEquipmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const equipment = e.target.id
//     setSelectedEquipamento((prev) =>
//       e.target.checked
//         ? [...prev, equipment]
//         : prev.filter((item) => item !== equipment),
//     )
//   }

//   useEffect(() => {
//     setMenuIsVisible(false),
//       setEquipamentIsVisible(false),
//       setpriceIsVisible(false)
//   }, [])

//   return (
//     <div className={styles.menu}>
//       {menuIsVisible ? (
//         <div className={styles.isOpen}>
//           <div>
//             <strong>Equipamento</strong>
//             <button onClick={() => setMenuIsVisible(!menuIsVisible)}>
//               <Image
//                 src={CloseIcon}
//                 width={20}
//                 height={20}
//                 alt="Icone de fechar o menu"
//               />
//             </button>
//           </div>
//           <div>
//             <div>
//               <div>
//                 <strong>Equipamento</strong>
//                 <button
//                   onClick={() => setEquipamentIsVisible(!equipmentIsVisible)}
//                 >
//                   <Image src={CaretDown} alt="Detalhe" width={16} height={16} />
//                 </button>
//               </div>
//               {equipmentIsVisible && (
//                 <div>
//                   <div>
//                     <input
//                       type="checkbox"
//                       id="notebook"
//                       onChange={handleEquipmentChange}
//                     />
//                     <label htmlFor="notebook">Notebook</label>
//                   </div>
//                   <div>
//                     <input
//                       type="checkbox"
//                       id="console"
//                       onChange={handleEquipmentChange}
//                     />
//                     <label htmlFor="console">Console</label>
//                   </div>
//                   <div>
//                     <input
//                       type="checkbox"
//                       id="desktop"
//                       onChange={handleEquipmentChange}
//                     />
//                     <label htmlFor="desktop">Desktop</label>
//                   </div>
//                 </div>
//               )}
//             </div>
//             <div>
//               <div>
//                 <strong>Preço</strong>
//                 <button onClick={() => setpriceIsVisible(!priceIsVisible)}>
//                   <Image src={CaretDown} height={16} width={16} alt="Detalhe" />
//                 </button>
//               </div>
//               {priceIsVisible && (
//                 <div>
//                   <div>
//                     <input type="checkbox" id="lowestPrice" />
//                     <label htmlFor="price">Menor preço</label>
//                   </div>
//                   <div>
//                     <input type="checkbox" id="biggestPrice" />
//                     <label htmlFor="price">Maior preço</label>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       ) : (
//         <button onClick={() => setMenuIsVisible(!menuIsVisible)}>
//           <Link href="/">
//             <Image
//               src={MenuIcon}
//               width={20}
//               height={20}
//               alt={'Icone do menu'}
//             />
//           </Link>
//         </button>
//       )}
//     </div>
//   )
// }

import Image from 'next/image'
import Link from 'next/link'
import MenuIcon from '../../../../../public/icon/Filters/Menu/Menu_Icon.svg'
import CloseIcon from '../../../../../public/icon/Filters/Menu/X-Icon.svg'
import CaretDown from '../../../../../public/icon/Filters/Menu/caret-down.svg'
import styles from './menu.module.scss'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface MenuProps {
  setCategory: Dispatch<SetStateAction<string | undefined>>
  setSelectedEquipamento: Dispatch<SetStateAction<string[]>>
  setFilters: Dispatch<SetStateAction<{ equipamento: string[] }>>
}
export default function Menu({
  setCategory,
  setSelectedEquipamento,
  setFilters,
}: MenuProps) {
  const [menuIsVisible, setMenuIsVisible] = useState(false)
  const [equipmentIsVisible, setEquipamentIsVisible] = useState(false)
  const [priceIsVisible, setpriceIsVisible] = useState(false)

  const handleFiltersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const equipment = e.target.id
    // setSelectedEquipamento((prev) =>
    //   e.target.checked
    //     ? [...prev, equipment]
    //     : prev.filter((item) => item !== equipment),
    // )
    setFilters((prev) => ({
      ...prev,
      equipamento: e.target.checked
        ? [...prev.equipamento, equipment]
        : prev.equipamento.filter((item) => item !== equipment),
    }))
  }

  useEffect(() => {
    setMenuIsVisible(false),
      setEquipamentIsVisible(false),
      setpriceIsVisible(false)
  }, [])

  return (
    <div className={styles.menu}>
      {menuIsVisible ? (
        <div className={styles.isOpen}>
          <div>
            <strong>Equipamento</strong>
            <button onClick={() => setMenuIsVisible(!menuIsVisible)}>
              <Image
                src={CloseIcon}
                width={20}
                height={20}
                alt="Icone de fechar o menu"
              />
            </button>
          </div>
          <div>
            <div>
              <div>
                <strong>Equipamento</strong>
                <button
                  onClick={() => setEquipamentIsVisible(!equipmentIsVisible)}
                >
                  <Image src={CaretDown} alt="Detalhe" width={16} height={16} />
                </button>
              </div>
              {equipmentIsVisible && (
                <div>
                  <div>
                    <input
                      type="checkbox"
                      id="notebook"
                      onChange={handleFiltersChange}
                    />
                    <label htmlFor="notebook">Notebook</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="console"
                      onChange={handleFiltersChange}
                    />
                    <label htmlFor="console">Console</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="desktop"
                      onChange={handleFiltersChange}
                    />
                    <label htmlFor="desktop">Desktop</label>
                  </div>
                </div>
              )}
            </div>
            <div>
              <div>
                <strong>Preço</strong>
                <button onClick={() => setpriceIsVisible(!priceIsVisible)}>
                  <Image src={CaretDown} height={16} width={16} alt="Detalhe" />
                </button>
              </div>
              {priceIsVisible && (
                <div>
                  <div>
                    <input type="checkbox" id="lowestPrice" />
                    <label htmlFor="price">Menor preço</label>
                  </div>
                  <div>
                    <input type="checkbox" id="biggestPrice" />
                    <label htmlFor="price">Maior preço</label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <button onClick={() => setMenuIsVisible(!menuIsVisible)}>
          <Link href="/">
            <Image
              src={MenuIcon}
              width={20}
              height={20}
              alt={'Icone do menu'}
            />
          </Link>
        </button>
      )}
    </div>
  )
}
