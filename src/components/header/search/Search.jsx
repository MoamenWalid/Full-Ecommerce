
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import parse from 'html-react-parser';
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import urlFetching from "../../../url/url";


const Search = ({ show }) => {
  const [productsSearch, setProductsSearch] = useState([]);
  const ref = useRef();
  const refDivs = useRef();
  const refUp = useRef();

  async function onChangeFunc() {
    setProductsSearch([]);
    const { data } = await axios.get(urlFetching('products'));
    for(const key in data[0]) {
      data[0][key].map(item => item.title.toLowerCase().includes(ref.current.value.toLowerCase().trim()) ? setProductsSearch(prev => [...prev, item]) : false);
    }
  }

  return (
    <div ref={refUp} onClick={() => refDivs.current ? refDivs.current.style.display = 'flex' : false} className= {`search relative bg-secondary py-[7px] pl-[20px] pr-[12px] gap-4 justify-between items-center rounded ${show}`}>
      <input onBlur={() => refDivs.current ? setTimeout(() => refDivs.current.style.display = 'none', 100) : false} ref={ref} autoComplete="off" onChange={() => ref.current.value.trim().length !== 0 ? onChangeFunc() : setProductsSearch([])} type="text" name="search" className="bg-transparent grow min-w-[160px] text-[12px] text-dark" placeholder="What Are You Looking For?" />
      <FontAwesomeIcon onClick={() => ref.current.focus()} icon= {faMagnifyingGlass} className="text-dark cursor-pointer"/>

      {productsSearch.length > 0 && 
        <div ref={refDivs} className="search-divs absolute flex gap-2 flex-col w-full md:w-[300px] max-h-[70vh] overflow-auto xl:w-[450px] rounded-md top-[37px] left-0 bg-secondary">
          {productsSearch.map(item => <Link to={`/products/${item.cat}/${item.id}`} key={item.title + item.id}><div className="bg-white p-1 cursor-pointer capitalize text-button2 rounded-md">{parse(item.title.toLowerCase().replaceAll(ref.current.value.toLowerCase(),`<span className="text-[#2196F3] font-inter font-semibold">${ref.current.value}</span>`))}</div></Link>)}
        </div>
      }
    </div>
  );
}

export default Search;