import { useParams, useSearchParams } from "react-router-dom";
import GetProducts from "../../GetProducts";
import { createContext, useEffect, useState } from "react";
export const NumOfPage = createContext();

// eslint-disable-next-line react/prop-types
const Products = () => {
  let { type } = useParams();
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
  const [numOfPage, setNumOfPage] = useState(1);
  const values = { setSearchParams,  numOfPage, searchParams };

  useEffect(() => {
    setSearchParams(searchParams);
    setNumOfPage(+searchParams.get('page'));
  }, [searchParams])

  return (
    <NumOfPage.Provider value={values}>
      <div className="container px-3 mx-auto my-5">
        <h1 className="font-inter text-center text-[31px] md:text-[36px] pt-2 mb-9 font-semibold leading-[48px] tracking-[1.44px] capitalize">Browse By {type == 'sale' ? 'sales products' : type}</h1>
        <GetProducts type={type} numOfPage={numOfPage}/>
      </div>
    </NumOfPage.Provider>
  );
}

export default Products;
