"use client"

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { deleteUser, userType } from "../../../slices/UserSlice";
import { deleteUserProfile } from "../../../slices/ProfileSlice";

interface DeleteProfileModalProps {
    setIsDeleteProfileModal: (value: boolean) => void;
    setCurrentUser: (value: string) => void;
    currentUser: string 
  }

const DeleteProfileModal: React.FC<DeleteProfileModalProps> = ({setIsDeleteProfileModal,  currentUser, setCurrentUser}) => {
  const dispatch = useDispatch<AppDispatch>()
  const { profile, isProfileLoading, profileError } = useSelector((state: RootState) => state.profile)

  const handleSubmit = (e:  React.MouseEvent<HTMLButtonElement> ) => {
    e.preventDefault()

        dispatch(deleteUserProfile(profile.userId)) 
        setIsDeleteProfileModal(false)
        setCurrentUser('')
    }
  return (
    <div className="absolute modal-container  inset-0 flex justify-center top-[220px] ">
        <div className="w-[400px] flex-col space-y-8 flex items-center rounded-lg bg-[#ffeb9a] border border-black/25 h-44   py-10 justify-center">
            <p className="text-xl font-semibold text-black/80">Are you sure want to delete?</p>
            <div className="flex w-[200px]   justify-center space-x-[50px]">
                <button onClick={()=>{ 
                  setIsDeleteProfileModal(false);
                  setCurrentUser('') }} className="border border-black bg-white px-6 text-lg font-semibold rounded-md py-1">No</button>
                <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSubmit(e)} className="border border-black bg-red-200 px-6 text-lg font-semibold rounded-md py-1">Yes</button>
            </div>
        </div>
    </div>

  )
}

export default DeleteProfileModal