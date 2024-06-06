import { useEffect, useState } from 'react'
import './Modal.css'
import Card from './Card'
import { useAuthValue } from '../context/AuthContext';
import { useUpdateDocument } from '../hooks/useUpdateDocument'
import { useFetchDocuments } from '../hooks/useFetchDocuments';

const Modal = ({ display, setDisplay, backcards }) => {

    const [entries, setEntries] = useState(null)
    const [ConfigId, setConfigId] = useState()

    const { user } = useAuthValue();
    const { documents: Configs } = useFetchDocuments('Configs', user.uid);
    const { updateDocument } = useUpdateDocument('Configs')

    useEffect(() => {
        if (backcards) {
            setEntries(Object.entries(backcards))
        }
    }, [backcards])
    useEffect(() => {
        if (Configs) {
            setConfigId(Configs[0].id)
        }
    }, [Configs])

    function handleUpdate(BackCard) {

        console.log(BackCard)

        updateDocument(ConfigId, {
            BackCard
        })
    }

    return (
        <div className='modal' style={{ display: `${display}` }} >
            <div className='container'>
                <div className='cards'>
                    {entries && entries.map(([key, value]) => (
                        <li key={key} onClick={() => handleUpdate(key.toString())}>
                            <Card
                                img={value}
                                Style={'List'}
                            />
                            <strong>{key}:</strong>
                        </li>
                    ))}
                </div>
                <div>
                    <button onClick={() => setDisplay('none')}>Sair</button>
                </div>
            </div>
        </div>
    )
}

export default Modal