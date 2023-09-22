import { XMarkIcon } from '@heroicons/react/20/solid'
import {ArrowLeftIcon} from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
export default function TitleBar(props) {
  
    return (

        <>
            <div className=" items-start gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
               
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                 
                    <Link
                        
                        to={process.env.REACT_APP_PATH + "/home"}
                        className="flex-none rounded-full bg-white px-3.5 py-1 text-sm font-semibold text-orange-400 "
                    >
                      <ArrowLeftIcon className="h-9 w-7 text-orange-400 group-hover:text-white" aria-hidden="true" />
                    </Link>
                    <p className="text-sm leading-6 text-gray-600">
                        <strong className="font-extrabold text-3xl">MANAGE SUBSCRIPTION</strong>
                        
                    </p>
                </div>
                
            </div>
        </>
    )
}