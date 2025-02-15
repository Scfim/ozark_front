import React, { useEffect, useState } from 'react'
import { BiBeer, BiMinus, BiPencil, BiTrash, BiTrophy } from 'react-icons/bi';
import { Input } from '../../components/s/input'
import { Button } from '../../components/s/button'
import style from '../../styles/App.module.css'
import { addMark, getMark, deleteMark } from '../api/Mark';
import { getSubCategoryLike } from '../api/subCategory'
import { Dropdown } from '../../components/s/dropdown';
import useIsLoggedIn from '../../hooks/useIsLoggedIn';
import Headers from '../../components/Headers'
import Status from "../../components/Status";

const Mark = () => {


     useIsLoggedIn()

     const resetStatusIsHidden = () => setIsStatusHidden(true);
     const [statusType, setStatusType] = useState("");
     const [isStatusHidden, setIsStatusHidden] = useState(true);
     const [statusMessage, setStatusMessage] = useState("");

     useEffect(() => {
          GetMark()
     }, [])
     const [mark, setMark] = useState("");
     const onSetMark = (e) => {
          setMark(e.target.value);
     };
     const [descriptionMark, setDescriptionMark] = useState("");
     const onSetDescriptionMark = (e) => {
          setDescriptionMark(e.target.value);
     };


     const [data, setData] = useState([])
     async function AddMark() {
          await addMark({ name: mark, description: descriptionMark, subCategorieId: subCategoryId }).then((res) => {
               setIsStatusHidden(false);
               setStatusMessage(res.data.message);
               if (res.data.type.toLowerCase() === "success") setStatusType("success")
               else {

                    setStatusType("error")
                    setStatusMessage(res.data.message);
               }
               GetMark()
          })
     }
     async function DeleteMark(marque_id) {
          await deleteMark({ markId: marque_id }).then((response) => {
               GetMark()
          })
     }

     const [dataSubCategory, setDataSubCategory] = useState([])
     const [stateSubCategory, setStateSubCategory] = useState("hidden")
     const [subCategory, setCategory] = useState("")
     const [subCategoryId, setSubCategoryId] = useState("")

     const OnsetSubCategory = async (e) => {
          setCategory(e.target.value)
          if (e.target.value != "") {
               await getSubCategoryLike({ subCategoryName: e.target.value }).then((response) => {
                    setDataSubCategory(response.data.data)
                    setStateSubCategory("")
               })
          } else setStateSubCategory("hidden")
     }
     function GetCategory(subCategoryId, subCategoryName) {
          setStateSubCategory("hidden")
          setSubCategoryId(subCategoryId)
          setCategory(subCategoryName)
     }

     function GetMark() {
          getMark().then((response) => {
               setData(response.data)
          })
     }

     return <div className={`flex flex-col my-6`} >
          <Headers title="Ajouter une marque" />
          <div className={` flex flex-col w-full mx-14`}>
               <label className={` text-xl font-bold`}> Ajouter une nouvelle marque des produits </label>
               <label className={` text-sm font-normal ${style.text}`}> Complèter les champs ci-bas pour identifier une marque </label>
          </div>

          <div>
               <Status type={statusType} isHidden={isStatusHidden} message={statusMessage} resetStatusIsHidden={resetStatusIsHidden} />
          </div>
          <div className=" flex mx-14 my-8" >
               <div className="flex">
                    <div className="flex flex-col bg-white shadow-md rounded-md p-4  ">
                         <Dropdown state={stateSubCategory} type="text" htmlFor="subcategorieId" name="subcatergorie" label="Sous Catégorie du produit" value={subCategory} event={OnsetSubCategory}>
                              {dataSubCategory != undefined && dataSubCategory != null ? dataSubCategory.map((value) => {
                                   return <div key={value.sub_categorie_id} className={`text-xs  cursor-pointer py-1 px-2 ${style.bgHovered}`} onClick={() => GetCategory(value.sub_categorie_id, value.sub_categorie_name)}>{value.sub_categorie_name}</div>
                              }) : null}
                         </Dropdown>
                         <Input type="text" htmlFor="markId" name="mark" label="Marque du produit" event={onSetMark} icon={<BiBeer size="0.95rem" />} />
                         <Input type="text" htmlFor="descrptionId" name="descrption" label="Description de la marque" event={onSetDescriptionMark} icon={<BiTrophy size="0.95rem" />} />
                         <Button text={'Ajouter nouvelle marque'} event={() => AddMark()} />
                    </div>
               </div>

               <div className="ml-6 bg-white shadow-md rounded-md p-4 w-full ">
                    <table className={`border  border-gray-200 w-full`}>
                         <tbody>
                              <tr className={`${style.bg}`}>
                                   <td className={`border border-gray-200 text-white px-2`}>Sous categorie</td>
                                   <td className={`border border-gray-200 text-white px-2`}>Marques des produits</td>
                              </tr >
                              {
                                   data != undefined && data != null ? data.map((value) => {
                                        return <tr key={value.mark_id} className={`border border-gray-200 text-xs`}>
                                             <td className={`border border-gray-200 text-sm px-2 `}>{value.sub_categorie_name}</td>
                                             <td className={`border border-gray-200 text-sm px-2 `}>{value.mark_name}</td>
                                             <td className={`border border-gray-200 text-sm px-2`}>
                                                  <div className={`bg-red-600 flex justify-center p-1 rounded-sm cursor-pointer w-9`} onClick={() => DeleteMark(value.mark_id)} >
                                                       {<BiMinus size="0.95rem" className={` text-white`} />}
                                                  </div>
                                             </td>
                                             <td className={`border border-gray-200 text-sm px-2`}>
                                                  <div className={`bg-green-500 flex justify-center p-1 rounded-sm cursor-pointer w-9`} onClick={() => DeleteMark(value.mark_id)} >
                                                       {<BiPencil size="0.95rem" className={` text-white`} />}
                                                  </div>
                                             </td>
                                        </tr>
                                   }) : null
                              }
                         </tbody>
                    </table>
               </div>
          </div>
     </div>



}

export default Mark