"use client"

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, userType } from "../../../slices/UserSlice";
import { AppDispatch, RootState } from "../../../store/store";

interface AddUserModalProps {
    setIsAddUserModal: (value: boolean) => void
   
  }

const AddUserModal: React.FC<AddUserModalProps> = ({setIsAddUserModal}) => {
    const [username, setUsername] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const dispatch = useDispatch<AppDispatch>()
    const { error } = useSelector((state: RootState) => state.user)


    const handleSubmit = (e:  React.MouseEvent<HTMLButtonElement> ) => {
        e.preventDefault()
        if(username.length && phone.length === 10){
            const userData = {
                username,
                phone
            }
            dispatch(addUser(userData)) 
            setUsername("") 
            setPhone("") 
        }
        
       
    }
  return (
    <div className="absolute modal-container sm:px-0 px-6  inset-0 flex justify-center top-[100px] ">
        <div className="w-[450px]  rounded-lg bg-[#ffff] border-2 border-black/25 h-80    justify-center">
            <div className="text-lg rounded-lg rounded-b-none flex justify-center shadow-sm border-b-2 border-black/25 bg-slate-100 py-2 font-semibold text-black/80">
                <p>Create User</p>
            </div>
            <div className="flex-col space-y-8 flex items-center pb-10 pt-8">
                <div className="flex w-full space-x-2    justify-center ">
                    <div className="flex items-center">Username:</div>
                    <div><input type="text" required value={username} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} placeholder="john@gmail.com" className="border-2 border-black/50 px-4 rounded-md py-1.5 w-[280px]" /></div>
                </div>
                <div className="flex-col flex space-y-2">
                    <div className="flex w-full space-x-2    justify-center ">
                        <div className="flex items-center">Phone:</div>
                        <div><input type="text" required value={phone} onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setPhone(e.target.value)} placeholder="+91" className="border-2 ml-6 border-black/50 px-4 rounded-md py-1.5 w-[280px]" /></div>
                    </div>
                    <div className="flex justify-end"><p className="text-red-500">{error}</p></div>
                </div>
                <div className="flex w-[200px]    ml-10 space-x-[30px]">
                    <button onClick={()=> setIsAddUserModal(false)}  className="border border-black/70 bg-white px-4 text-md  rounded-md py-1.5">Cancel</button>
                    <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSubmit(e)}   className="border border-black/70 bg-green-200 px-6 text-md rounded-md py-1.5">Save</button>
                </div>
            </div>
        </div>
    </div>

  )
}

export default AddUserModal