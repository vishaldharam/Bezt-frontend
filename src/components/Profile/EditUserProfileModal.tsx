"use client"

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { editUserProfile } from "../../../slices/ProfileSlice";

interface EditUserProfileModalProps {
    setIsEditUserProfileModal: (value: boolean) => void;
    setCurrentUser: (value: string) => void;
    id: string
  }

const EditUserProfileModal: React.FC<EditUserProfileModalProps> = ({setIsEditUserProfileModal, id, setCurrentUser}) => {
    const { profileError, profile } = useSelector((state: RootState) => state.profile)
    const [email, setEmail] = useState<string>(profile?.email || '')
    const [gender, setGender] = useState<string>(profile?.gender || '')
    const [address, setAddress] = useState<string>(profile?.address || '')
    const [pincode, setPincode] = useState<string>(profile?.pincode || '')
    const [city, setCity] = useState<string>(profile?.city || '')
    const [state, setState] = useState<string>(profile?.state || '')
    const [country, setCountry] = useState<string>(profile?.country || '')
    const dispatch = useDispatch<AppDispatch>()

    const handleSubmit = (e:  React.MouseEvent<HTMLButtonElement> ) => {
        e.preventDefault()
        if(email.length && gender.length && address.length && pincode.length && city.length && 
            state.length && country.length
        ){
            const userData = {
                userId : id, email, gender, address, pincode, city, state, country
                
            }
            dispatch(editUserProfile(userData)) 
            setEmail('') 
            setGender('') 
            setPincode('') 
            setAddress('') 
            setState('') 
            setCity('') 
            setCountry('') 
            setIsEditUserProfileModal(false)
        }
        
       
    }
    return (
        <div className="absolute modal-container sm:px-0 px-6  inset-0 flex justify-center top-[100px] ">
        <div className="w-[450px]  rounded-lg bg-[#ffff] border-2 border-black/25 h-[510px]    justify-center">
            <div className="text-lg rounded-lg rounded-b-none flex justify-center shadow-sm border-b-2 border-black/25 bg-slate-100 py-2 font-semibold text-black/80">
                <p>Edit User Profile</p>
            </div>
            <div className="flex-col space-y-8 flex items-center pb-10 pt-8">
    {/* Container for inputs */}
    <div className="flex-col flex space-y-2 items-start">
        {/* Gender input */}
        <div className="flex w-full space-x-2 items-center justify-between">
            <div className="flex-shrink-0">Email:</div>
            <input 
                type="text" 
                required 
                readOnly
                value={email} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} 
                placeholder="john@gmail.com" 
                className="border-2 border-black/50 px-4 rounded-md py-1.5 w-[280px]" 
            />
        </div>
        {/* Gender input */}
        <div className="flex w-full space-x-2 items-center justify-between">
            <div className="flex-shrink-0">Gender:</div>
            <input 
                type="text" 
                required 
                value={gender} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGender(e.target.value)} 
                placeholder="male or female" 
                className="border-2 border-black/50 px-4 rounded-md py-1.5 w-[280px]" 
            />
        </div>
        {/* Address input */}
        <div className="flex w-full space-x-2 items-center justify-between">
            <div className="flex-shrink-0">Address:</div>
            <input 
                type="text" 
                required 
                value={address} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)} 
                placeholder="a/p:" 
                className="border-2 border-black/50 px-4 rounded-md py-1.5 w-[280px]" 
            />
        </div>
        {/* Pincode input */}
        <div className="flex w-full space-x-2 items-center justify-between">
            <div className="flex-shrink-0">Pincode:</div>
            <input 
                type="text" 
                required 
                value={pincode} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPincode(e.target.value)} 
                placeholder="6 digit" 
                className="border-2 border-black/50 px-4 rounded-md py-1.5 w-[280px]" 
            />
        </div>
        {/* City input */}
        <div className="flex w-full space-x-2 items-center justify-between">
            <div className="flex-shrink-0">City:</div>
            <input 
                type="text" 
                required 
                value={city} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCity(e.target.value)} 
                placeholder="city" 
                className="border-2 border-black/50 px-4 rounded-md py-1.5 w-[280px]" 
            />
        </div>
        {/* State input */}
        <div className="flex w-full space-x-2 items-center justify-between">
            <div className="flex-shrink-0">State:</div>
            <input 
                type="text" 
                required 
                value={state} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState(e.target.value)} 
                placeholder="state" 
                className="border-2 border-black/50 px-4 rounded-md py-1.5 w-[280px]" 
            />
        </div>
        {/* Country input */}
        <div className="flex w-full space-x-2 items-center justify-between">
            <div className="flex-shrink-0">Country:</div>
            <input 
                type="text" 
                required 
                value={country} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCountry(e.target.value)} 
                placeholder="country" 
                className="border-2 border-black/50 px-4 rounded-md py-1.5 w-[280px]" 
            />
        </div>
        {/* Error message */}
        <div className="flex w-full justify-end">
            <p className="text-red-500">{profileError}</p>
        </div>
    </div>
    {/* Buttons */}
    <div className="flex w-[200px] ml-10 space-x-8">
        <button 
            onClick={() => setIsEditUserProfileModal(false)}  
            className="border border-black/70 bg-white px-4 text-md rounded-md py-1.5"
        >
            Cancel
        </button>
        <button 
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSubmit(e)}  
            className="border border-black/70 bg-green-200 px-6 text-md rounded-md py-1.5"
        >
            Save
        </button>
    </div>
</div>

        </div>
    </div>

  )
}

export default EditUserProfileModal