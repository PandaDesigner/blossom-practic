import { useState } from 'react'
import { CiImageOff } from 'react-icons/ci';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

interface Props { image?: string, name?: string, species?: string }

const ItemLists = ({
    image,
    name = "Abadango Cluster Princess",
    species = "Alien"
}: Props) => {
    const [isHeart, setIsHeart] = useState(false)
    const handleClick = () => {
        setIsHeart(!isHeart)
    }
    return (
        <li className='p-4 rounded-md hover:bg-primary-100 flex justify-between
        cursor-pointer'
            onClick={() => handleClick()}
        >
            <div className={`h-8 w-8 ${!image ? 'bg-white' : 'bg-primary-600'}
            rounded-full
            flex justify-center items-center`}>
                {!image
                    ? <CiImageOff />
                    : <img
                        className='rounded-full h-full w-full'
                        src={image}
                        alt={name} />
                }
            </div>
            <div className='flex-1 px-2'>
                <h2
                    className='text-[14px] text-textPrimary font-medium'>
                    {name}
                </h2>
                {!!species && <p className='text-[12px] text-textPrimary font-light'>
                    {species}
                </p>}
            </div>
            <div className={`h-8 w-8 bg-bgPrimary hover:bg-white rounded-full
            flex justify-center items-center cursor-pointer`}
            >
                {isHeart
                    ? <FaHeart className='text-secondary-600 h-5 w-5' />
                    : <FaRegHeart className='text-gray-300 h-5 w-5' />
                }
            </div>
        </li>
    )
}

export default ItemLists