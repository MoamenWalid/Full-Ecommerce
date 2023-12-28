
const About = () => {
  return (
    <div className="contact container mt-5 mb-9 pb-6 pt-6 mx-auto px-4">
      <div className="flex gap-5 items-start justify-start flex-wrap lg:flex-nowrap">
        <div className="story">
          <h1 className="font-inter mb-4 font-bold text-[35px]">Our Story</h1>
          <p className="text-[15px] max-w-[500px] mb-5">Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region. </p>
          <p className="text-[15px] max-w-[500px]">Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging  from consumer.</p>
        </div>

        <div className="photo w-fit rounded-md overflow-hidden">
          <img src="/imgs/about.jpg" alt="img" />
        </div>
      </div>

      <div className="abouting gap-2 mt-9 ">
        <div className="flex items-center justify-center gap-2 flex-col border rounded p-4">
          <div className="photo flex items-center justify-center bg-black w-[60px] h-[60px] rounded-full"><img src="/imgs/group.svg" alt="img" /></div>
          <span className="block font-inter font-semibold text-[19px]">10.5k</span>
          <p className="font-extralight text-center text-[14px]">Sallers active our site</p>
        </div>

        <div className="flex items-center bg-button2 text-white justify-center gap-2 flex-col border rounded p-4">
          <div className="photo flex items-center justify-center bg-white w-[60px] h-[60px] rounded-full"><img src="/imgs/icon-sale.svg" alt="img" /></div>
          <span className="block font-inter font-semibold text-[19px]">33k</span>
          <p className="font-extralight text-center text-[14px]">Mopnthly Produduct Sale</p>
        </div>

        <div className="flex items-center justify-center gap-2 flex-col border rounded p-4">
          <div className="photo flex items-center justify-center bg-black w-[60px] h-[60px] rounded-full"><img src="/imgs/shopping-bag.svg" alt="img" /></div>
          <span className="block font-inter font-semibold text-[19px]">45.5k</span>
          <p className="font-extralight text-center text-[14px]">Customer active in our site</p>
        </div>

        <div className="flex items-center justify-center gap-2 flex-col border rounded p-4">
          <div className="photo flex items-center justify-center bg-black w-[60px] h-[60px] rounded-full"><img src="/imgs/money.svg" alt="img" /></div>
          <span className="block font-inter font-semibold text-[19px]">25k</span>
          <p className="font-extralight text-center text-[14px]">Anual gross sale in our site</p>
        </div>
      </div>
    </div>
  );
}

export default About;
