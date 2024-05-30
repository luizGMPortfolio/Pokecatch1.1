import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { differenceInMilliseconds, endOfDay } from 'date-fns';
export const Time = () => {
    const [horarioAtual, setHorarioAtual] = useState(format(new Date(), "HH:mm:ss"));
    const [DiaAtual, setDiaAtual] = useState(format(new Date(), "dd/MM/yyyy"))
    const [horario, setHorario] = useState(('18:00:00'));



    const getTimeRemaining = () => {

        const now = new Date();
        const midnight = endOfDay(now);
        const difference = differenceInMilliseconds(midnight, now);
      
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
        return {
          hours,
          minutes,
          seconds
        };
      };


    useEffect(() => {
        const interval = setInterval(() => {
            const time = getTimeRemaining();
            setHorarioAtual(`${time.hours}:${time.minutes}:${time.seconds}`);
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);




    return {
        horarioAtual,
        DiaAtual
    }
}