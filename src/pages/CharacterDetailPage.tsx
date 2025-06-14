import { useCharacter } from '../hooks/useCharacter';
import CharacterDetail from '../ui/components/character-detail/CharacterDetail';
import type { Character } from '../domain/character/type/Character';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';



const CharacterDetailPage = () => {
    const { id } = useParams();
    const { character, fetchCharacterById, loading } = useCharacter();

    useEffect(() => {
        fetchCharacterById(`${id}`)
    }, [id, fetchCharacterById])

    if (loading && !character) {
        return <div className="flex justify-center items-center h-screen">
            Loading...
        </div>;
    }

    return (
        <div className='p-4 w-full'>
            <CharacterDetail character={character as Character} />
        </div>
    )
}

export default CharacterDetailPage