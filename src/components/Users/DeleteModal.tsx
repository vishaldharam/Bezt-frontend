"use client"

import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { deleteUser, userType } from "../../../slices/UserSlice";

interface DeleteModalProps {
    setIsDeleteModal: (value: boolean) => void;
    setCurrentUser: (value: userType | null) => void;
    currentUser: userType | null
  }

const DeleteModal: React.FC<DeleteModalProps> = ({setIsDeleteModal,  currentUser, setCurrentUser}) => {
  const dispatch = useDispatch<AppDispatch>()

  const handleSubmit = (e:  React.MouseEvent<HTMLButtonElement> ) => {
    e.preventDefault()

        dispatch(deleteUser(currentUser?.id)) 
        setIsDeleteModal(false)
        setCurrentUser(null)
    }
  return (
    <div className="absolute modal-container  inset-0 flex justify-center top-[220px] ">
        <div className="w-[400px] flex-col space-y-8 flex items-center rounded-lg bg-[#ffeb9a] border border-black/25 h-44   py-10 justify-center">
            <p className="text-xl font-semibold text-black/80">Are you sure want to delete?</p>
            <div className="flex w-[200px]   justify-center space-x-[50px]">
                <button onClick={()=>{ 
                  setIsDeleteModal(false);
                  setCurrentUser(null) }} className="border border-black bg-white px-6 text-lg font-semibold rounded-md py-1">No</button>
                <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSubmit(e)} className="border border-black bg-red-200 px-6 text-lg font-semibold rounded-md py-1">Yes</button>
            </div>
        </div>
    </div>

  )
}

export default DeleteModal