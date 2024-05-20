import React, { useState, useEffect } from "react";
import { format } from "date-fns";

const Time = () => {
  const [horarioAtual, setHorarioAtual] = useState(format(new Date(), "HH:mm:ss"));
  const [horario, setHorario] = useState(('18:00:00'));

  useEffect(() => {
    const interval = setInterval(() => {
      setHorarioAtual(format(new Date(), "HH:mm:ss"));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  if(horarioAtual === '15:10:00'){
    console.log('ola')
  }

  return (
    <div className="time">
      <span>{horarioAtual}</span>
    </div>
  );
};

export default Time;