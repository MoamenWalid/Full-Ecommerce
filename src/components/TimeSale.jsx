/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
const TimeSale = ({ date, setDateSale, dateSale }) => {


  function calcDate(ms) {
    let total_seconds = parseInt(Math.floor(ms / 1000));
    let total_minutes = parseInt(Math.floor(total_seconds / 60));
    let total_hours = parseInt(Math.floor(total_minutes / 60));
    
    let days = parseInt(Math.floor(total_hours / 24));
    let hours = parseInt(total_hours % 24);
    let minutes = parseInt(total_minutes % 60);
    let seconds = parseInt(total_seconds % 60);

    return [days.toString().padStart(2, '0'), hours.toString().padStart(2, '0'), minutes.toString().padStart(2, '0'), seconds.toString().padStart(2, '0')];
  }

  useEffect(() => {    
    const time = setInterval(() => {
      const d1 = Date.now();
      const d2 = new Date(date);
      if (d2 - d1 <= 0) setDateSale([]);
      else setDateSale(calcDate(d2 - d1));
    }, 1000)

    return () => clearInterval(time);
  }, [])

  return (
    <div className="flex items-center justify-center gap-5">
      <div className="text-center">
        <p className="font-medium text-xs">Days</p>
        <span className="font-inter text-[32px] font-bold tracking-[1.28px]">{dateSale[0]}</span>
      </div>
      <span className="text-button2 pt-3 text-[25px] font-inter font-semibold">:</span>
      <div className="text-center">
        <p className="font-medium text-xs">Hours</p>
        <span className="font-inter text-[32px] font-bold tracking-[1.28px]">{dateSale[1]}</span>
      </div>
      <span className="text-button2 pt-3 text-[25px] font-inter font-semibold">:</span>
      <div className="text-center">
        <p className="font-medium text-xs">Minutes</p>
        <span className="font-inter text-[32px] font-bold tracking-[1.28px]">{dateSale[2]}</span>
      </div>
      <span className="text-button2 pt-3 text-[25px] font-inter font-semibold">:</span>
      <div className="text-center">
        <p className="font-medium text-xs">Seconds</p>
        <span className="font-inter text-[32px] font-bold tracking-[1.28px]">{dateSale[3]}</span>
      </div>
    </div>
  );
}

export default TimeSale;
