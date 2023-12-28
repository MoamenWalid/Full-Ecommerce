import Cat from "../../Cat";
import CatLink from '../../CatLink';

const Categories = () => {
  return (
    <div className="container border-b pb-[30px] px-3 mx-auto my-[50px]">
      <Cat text='Categories'/>
      <h1 className="font-inter text-center md:text-left text-[31px] md:text-[36px] mt-5 mb-9 font-semibold leading-[48px] tracking-[1.44px]">Browse By Category</h1>
      <div className="categories gap-7">
        <CatLink img='/imgs/phone.svg' catName='phones'/>
        <CatLink img='/imgs/computer.svg' catName='computers'/>
        <CatLink img='/imgs/smartWatch.png' catName='smartWatch'/>
        <CatLink img='/imgs/camera.svg' catName='camera'/>
        <CatLink img='/imgs/headPhones.svg' catName='headPhones'/>
        <CatLink img='/imgs/gamming.svg' catName='gamming'/>
      </div>
    </div>
  );
}

export default Categories;
