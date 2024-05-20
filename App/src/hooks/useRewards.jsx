import { useEffect, useState } from 'react'


export const useRewards = () => {
    const [rewards, setRewards] = useState({});

    const NewReward = (item) => {
        setRewards({
            pokemon: item.pokemon,
            pokebolas: item.pokebolas
        })
    }

    return { rewards, NewReward };
}