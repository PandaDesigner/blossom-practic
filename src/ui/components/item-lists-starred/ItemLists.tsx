import { useCharacter } from '../../../hooks/useCharacter'
import { CiImageOff } from 'react-icons/ci'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import type { Character } from '../../../domain/character/type/Character'

interface Props {
    character: Character
}

const ItemLists = ({ character }: Props) => {
    const { isStarred, toggleStarred } = useCharacter()

    const handleClick = () => {
        toggleStarred(character.id)
    }

    return (
        <li className={`p-4 rounded-lg flex justify-between
         align-center cursor-pointer ${'hover:bg-primary-100'}`}

        >
            <div className={`h-8 w-8 ${!character.image ? 'bg-white' : 'bg-primary-600'}
            rounded-full
            flex justify-center items-center`}>
                {!character.image
                    ? <CiImageOff />
                    : <img
                        className='rounded-full h-full w-full'
                        src={character.image}
                        alt={character.name} />
                }
            </div>
            <div className='flex-1 px-2'>
                <h2
                    className='text-[14px] text-textPrimary font-medium'>
                    {character.name}
                </h2>
                {!!character.species && <p className='text-[12px] text-textPrimary font-light'>
                    {character.species}
                </p>}
            </div>
            <div className={`h-8 w-8 bg-bgPrimary hover:bg-white rounded-full
            flex justify-center items-center cursor-pointer`}
                onClick={handleClick}
            >
                {isStarred(character.id)
                    ? <FaHeart className='text-secondary-600 h-5 w-5' />
                    : <FaRegHeart className='text-gray-300 h-5 w-5' />
                }
            </div>
        </li>
    )
}

export default ItemLists