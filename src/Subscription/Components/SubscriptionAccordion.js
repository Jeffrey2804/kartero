
import React from "react"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
export default function SubscriptionAccordion() {

    return (


        <div className="m-2 space-y-2">

            <div
                className="group flex flex-col gap-2 rounded-3xl bg-white  text-black border-b-gray-400 border-2 focus:bg-black focus:text-white"
                tabindex="1"
            >
                <div className="flex cursor-pointer items-center justify-between p-5">
                    <span> HTML </span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
                    className="w-6 h-6 transition-all text-orange-400 duration-500 group-focus:-rotate-180 ">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
                <div
                    className="invisible 
                    group-focus:bg-white
                    group-focus:text-black
                    h-auto 
                    max-h-0 
                    items-center 
                    opacity-0 
                    transition-all 
                    group-focus:visible 
                    group-focus:max-h-screen 
                    group-focus:opacity-100 
                    group-focus:duration-1000"
                >
                    
                    
                </div>
            </div>

        

        </div>
    )
}