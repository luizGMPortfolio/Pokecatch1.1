//hooks
import { useEffect, useState } from "react"

//imports
import pokebola from '../assets/pokebolas/padão.svg'
import greatBall from '../assets/pokebolas/greatBall.svg'
import ultraBall from '../assets/pokebolas/ultraBall.svg'
import masterBall from '../assets/pokebolas/masterBall.svg'

export const useRandonPokeball = () => {
    const [pokebolas, setPokebolas] = useState();
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    const [cancelled, setCancelled] = useState(false);


    const RandonPokeball = async () => {

        if (cancelled) {
            return;
        }
        setLoading(true);
        try {
            const RandonNunber = Math.floor(Math.random() * 100);
            var data = {}
            if(RandonNunber <= 2){
                data ={
                    imagem: masterBall,
                    quantidade: 1,
                    pokebolas: {
                        pokebola: 0,
                        great: 0,
                        ultra: 0,
                        master: 1
                    }
                }
            }else if(RandonNunber <= 20){
                const RandonNunber = Math.floor(Math.random() * 7);
                data ={
                    imagem: ultraBall,
                    quantidade: RandonNunber + 1,
                    pokebolas: {
                        pokebola: 0,
                        great: 0,
                        ultra: RandonNunber + 1,
                        master: 0
                    }
                }
            }else if(RandonNunber <= 50){
                const RandonNunber = Math.floor(Math.random() * 20);
                data ={
                    imagem: greatBall,
                    quantidade: RandonNunber + 5,
                    pokebolas: {
                        pokebola: 0,
                        great: RandonNunber + 5,
                        ultra: 0,
                        master: 0
                    }
                }
            }else if(RandonNunber <= 100){
                const RandonNunber = Math.floor(Math.random() * 20);
                data ={
                    imagem: pokebola,
                    quantidade: RandonNunber + 10,
                    pokebolas: {
                        pokebola: RandonNunber + 10,
                        great: 0,
                        ultra: 0,
                        master: 0
                    }
                }
            }

            setPokebolas(data)
        } catch (error) {
            console.log(error);
            setError(error.message);
        }
        setLoading(false);
    }

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { RandonPokeball , pokebolas, loading, error };
}
