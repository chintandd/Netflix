
import { ArrowLeft,ArrowRight } from 'lucide-react';
import { useSelector } from 'react-redux';

const Pagination = ({pageCount,prevButton,nextButton}) => {
 const maxPage = useSelector((store)=>store.movie.totalPage)

  return (
    <div className='h-9 md:h-12 w-full flex items-center justify-center text-white my-5 mb-15'>
            <div className='h-full flex items-center gap-4 md:gap-6 lg:gap-8'>
                <button onClick={prevButton} disabled={pageCount == 1}  className={`${pageCount == 1 ? 'bg-[#1B1B1B]':'bg-[#D9232E]'} h-full ease duration-200 flex items-center justify-center gap-1.5 lg:gap-3 w-31 md:w-40 rounded-lg  cursor-pointer`}>
                    <ArrowLeft className='h-1/2 lg:h-full aspect-square'/>
                    <p className='font-[my-font-Md] text-sm md:text-base lg:text-lg'>Previous</p>
                </button>
                <div className='h-full flex justify-center items-center pointer-events-none'>
                    <p className='text-base md:text-lg lg:text-xl font-[my-font-Bd]'>{pageCount}</p>
                </div>
                
                <div onClick={nextButton}  disabled={pageCount == maxPage}  className={`${pageCount == maxPage ? 'bg-[#1B1B1B]':'bg-[#D9232E]'} className='bg-[#D9232E] h-full flex items-center justify-center gap-1.5 lg:gap-3 w-31 md:w-40  rounded-lg cursor-pointer`}>
                    <p className='font-[my-font-Md] text-sm md:text-base lg:text-lg'>Next</p>
                     <ArrowRight className='h-1/2 lg:h-full aspect-square'/>
                </div>
            </div>
    </div>

  )
}

export default Pagination
