import React from "react";
import {
  FaBoxes,
  FaCheckCircle,
  FaComment,
  FaDollarSign,
  FaPollH,
  FaSortNumericUp,
  FaUser,
} from "react-icons/fa";
import Headers from "../../components/Headers";
import HeadSection from "../../components/HeadSection";
import TextBox from "../../components/TextBox";
import Datalist from "../../components/Datalist";
import useForm from "../../hooks/useForm";
import Button from "../../components/Button";
import { useAddInput } from "../api/inputs";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";

export default function input() {
  useIsLoggedIn()
  const [
    {
      product,
      provider,
      comment,
      daysDate,
      expirationDate,
      lotNumber,
      quantity,
      initialPrice,
    },
    handleChange,
  ] = useForm({
    provider: "",
    product: "",
    initialPrice: "",
    quantity: "",
    lotNumber: "",
    daysDate: "",
    expirationDate: "",
    comment: "",
  });
  const onHandleAddInput = (event) => {
    event.preventDefault();
    useAddInput({
      product,
      provider,
      comment,
      daysDate,
      expirationDate,
      lotNumber,
      quantity,
      initialPrice,
    }).then((res) => console.log(res));
  };
  return (
    <>
      <Headers title="Entrée Stock | Umarps Shop Manager" />
      <div className="grid h-screen place-items-center w-full mx-auto md:w-9/12">
        <div className=" shadow bg-white rounded w-11/12 py-4 md:w-8/12 grid place-items-center">
          <HeadSection
            leader="Umarps Shop Manager"
            follower="Ajouter une entrée "
            showUploadPhoto={false}
            icon=""
          />
          <form className="w-9/12 mt-5 flex flex-col justify-center">
            <Datalist
              event={handleChange}
              placeholder="Fournisseur (falcultatif)"
              value={provider}
              name="provider"
              icon={<FaUser />}
            />
            <Datalist
              event={handleChange}
              placeholder="Produit"
              value={product}
              name="product"
              icon={<FaPollH />}
            />
            <div className="md:flex justify-between ">
              <TextBox
                style="md:mr-1"
                event={handleChange}
                placeholder="Quantité"
                value={quantity}
                name="quantity"
                icon={<FaBoxes />}
              />
              <TextBox
                style="md:ml-1"
                event={handleChange}
                placeholder="Prix initaire"
                value={initialPrice}
                name="initialPrice"
                icon={<FaDollarSign />}
              />
            </div>
            <TextBox
              event={handleChange}
              placeholder="Numéro du lot"
              value={lotNumber}
              name="lotNumber"
              icon={<FaSortNumericUp />}
            />
            <div className="md:flex justify-between ">
              <TextBox
                type="date"
                style="md:mr-1"
                event={handleChange}
                value={daysDate}
                name="daysDate"
              />
              <TextBox
                type="date"
                style="md:ml-1"
                event={handleChange}
                value={expirationDate}
                name="expirationDate"
              />
            </div>
            <TextBox
              event={handleChange}
              placeholder="Commentaire"
              value={comment}
              name="comment"
              icon={<FaComment />}
            />
            <div className="flex justify-between ">
              <p className="mt-5 text-lg">Annuler</p>
              <Button event={onHandleAddInput} design="mt-3">
                <FaCheckCircle className="mt-1" />
                <span className="ml-1">Enregistrer</span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
