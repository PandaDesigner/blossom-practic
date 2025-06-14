import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useCharacter } from '../../../hooks/useCharacter';
import type { Character } from '../../../domain/character/type/Character';


interface CharacterDetailProps {
    character: Character;
}

const CharacterDetail = ({
    character }:
    CharacterDetailProps) => {

    const { toggleStarred, isStarred, } = useCharacter();

    return (
        <>
            <div className='p-4 flex flex-col justify-center
    items-start w-full max-w-[90%] mt-8'>
                <div className='relative'>
                    <div className='h-19 w-19 rounded-full bg-primary-600'>
                        {character.image && (
                            <img
                                src={character.image}
                                alt={character.name}
                                className='h-full w-full rounded-full'
                            />
                        )}
                    </div>
                    <div
                        className='h-8 w-8 bg-white rounded-full
          flex justify-center items-center cursor-pointer 
          absolute bottom-[2px] right-[-8px]'
                        onClick={() => toggleStarred(character.id)}
                    >
                        {isStarred(character.id)
                            ? <FaHeart className='text-secondary-600 h-5 w-5' />
                            : <FaRegHeart className='text-gray-300 h-5 w-5' />
                        }
                    </div>
                </div>
                <h2 className='text-2xl font-bold py-2'>{character.name}</h2>
            </div>
            <ul className='w-full max-w-[90%] px-6'>
                <li className='py-4 border-b-1 border-textPrimary/20'>
                    <h3 className='text-textPrimary font-bold'>Especie</h3>
                    <p>{character.species}</p>
                </li>
                <li className='py-4 border-b-1 border-textPrimary/20'>
                    <h3 className='text-textPrimary font-bold'>Estado</h3>
                    <p>{character.status}</p>
                </li>
                <li className='py-4 border-b-1 border-textPrimary/20'>
                    <h3 className='text-textPrimary font-bold'>Género</h3>
                    <p>{character.gender}</p>
                </li>
            </ul>
        </>
    )
}

export default CharacterDetail