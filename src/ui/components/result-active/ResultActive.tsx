import { useCharacter } from '../../../hooks/useCharacter'

interface PropResults {
    countResult: number,
    countFilter: number
};

function ResultActive({ countResult, countFilter }: PropResults) {

    const { clearFilters } = useCharacter()

    return (
        <span className='flex items-center justify-between'>
            <p className='text-blue-700'>{`${countResult} Results`}</p>
            <p
                className='text-green-800 bg-secondary-600/30 px-4 py-1 rounded-full cursor-pointer'
                onClick={clearFilters}
            >
                {`${countFilter} Filter`}
            </p>
        </span>
    )
}

export default ResultActive