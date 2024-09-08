"use client"

const Loading = () => {
  return (
    <div>
        <div className="absolute modal-container sm:px-0 px-6  inset-0 flex justify-center top-[200px] ">
           <div className="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin absolute"></div>
        </div>
    </div>
  )
}

export default Loading