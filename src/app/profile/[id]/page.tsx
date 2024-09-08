"use client"; 

import DeleteModal from "@/components/Users/DeleteModal"
import EditUserModal from "@/components/Users/EditUserModal"
import Loading from "@/components/Loading"
import { useEffect, useRef, useState } from "react"
import { BiEdit } from "react-icons/bi"
import { RiDeleteBin6Fill } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../../store/store"
import { fetchAllUsers, userType } from "../../../../slices/UserSlice"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { getUserProfile } from "../../../../slices/ProfileSlice";
import AddUserProfileModal from "@/components/Profile/AddUserProfileModal";
import DeleteProfileModal from "@/components/Profile/DeleteProfileModal";
import EditUserProfileModal from "@/components/Profile/EditUserProfileModal";

const profile = () => {
    const pathname = usePathname()
  const searchParams = useSearchParams()
    const [isDeleteModal, setIsDeleteModal] = useState(false)
    const [isAddUserProfileModal, setIsAddUserProfileModal] = useState(false)
    const [isEditUserModal, setIsEditUserModal] = useState(false)

    const dispatch = useDispatch<AppDispatch>()
    const { profile, isProfileLoading, profileError } = useSelector((state: RootState) => state.profile)
    const [currentUser, setCurrentUser] = useState<string>('')
    const userRef = useRef(false)
    console.log(profile)
    useEffect(() => {
        // Extract the ID from the pathname
        const segments = pathname.split('/');
        if (segments.length > 2) {
            const id = segments[2]; // This will be '957d8ab5-299c-49b1-a7a7-b3dd9e76f93f'
             dispatch(getUserProfile(id))
             setCurrentUser(id)
        }
    }, [pathname]);
   
  return (
    <div>
        <div className={`w-screen `}>
        
        <div className="mx-auto mt-8 max-w-screen-sm   px-2">
            <div className={`mt-6 rounded-xl border shadow  ${isDeleteModal || isAddUserProfileModal || isEditUserModal ? 'opacity-30': '' }`}>
                <div className=" flex justify-between bg-slate-100 px-2.5 md:px-6 py-3 ">
                    <p className=" text-xl font-medium text-gray-900">User Profile</p>
                    <div className="flex items-center space-x-2 justify-start ">
                       {!profile?.id && <button onClick={()=> setIsAddUserProfileModal(true)}  type="button" className="inline-flex bg-blue-200 cursor-pointer items-center rounded-lg border border-gray-400  py-2 px-3 text-center text-sm font-medium text-black shadow hover:bg-gray-100 focus:shadow">
                        <svg className="mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" className=""></path>
                        </svg>
                        Create
                        </button>}
                       
                       {profile?.id && <div onClick={()=> {
                        setIsEditUserModal(true) 
                                    }} className="border w-[33px] cursor-pointer hover:text-xl rounded-md p-1"> <BiEdit className="  text-green-600  rounded-md text-2xl"/>
                        </div>}
                        
                        {profile?.id && <div onClick={()=> { 
                            setIsDeleteModal(true)
                                    }} className="border w-[33px] cursor-pointer hover:text-xl rounded-md p-1"> <RiDeleteBin6Fill className="  text-red-600  rounded-md text-2xl"/>
                        </div>}
                      
                    </div>
                </div>
                <div className="overflow-x-auto xs:w-screen w-full xs:overflow-x-scroll">
                    <table className="min-w-full container  border-separate  md:border-spacing-y-0 border-spacing-x-2 px-5 ">
                                    

                        { profile?.id ? (<tbody className="">
                           
                                <tr className="flex justify-start space-x-2">
                                <td width="30%" className="  py-4 text-md font-medium text-black/90 sm:px-6">
                                    Email:
                                </td>
                                <td width="20%" className=" md:flex  whitespace-normal py-4 text-md font-medium text-black/90 sm:px-6">
                                    {profile.email}
                                </td>
                               
                                </tr>
                                <tr className="flex justify-start space-x-2">
                                <td width="30%" className="  py-4 text-md font-medium text-black/90 sm:px-6">
                                    Gender:
                                </td>
                                <td width="20%" className=" md:flex  whitespace-normal py-4 text-md font-medium text-black/90 sm:px-6">
                                    {profile.gender}
                                </td>
                               
                                </tr>
                                <tr className="flex justify-start space-x-2">
                                <td width="30%" className="  py-4 text-md font-medium text-black/90 sm:px-6">
                                    Address:
                                </td>
                                <td width="70%" className=" md:flex  whitespace-normal py-4 text-md font-medium text-black/90 sm:px-6">
                                    {profile.address}
                                </td>
                               
                                </tr>
                                <tr className="flex justify-start space-x-2">
                                <td width="30%" className="  py-4 text-md font-medium text-black/90 sm:px-6">
                                    Pincode:
                                </td>
                                <td width="20%" className=" md:flex  whitespace-normal py-4 text-md font-medium text-black/90 sm:px-6">
                                    {profile.pincode}
                                </td>
                               
                                </tr>
                                <tr className="flex justify-start space-x-2">
                                <td width="30%" className="  py-4 text-md font-medium text-black/90 sm:px-6">
                                    City:
                                </td>
                                <td width="20%" className=" md:flex  whitespace-normal py-4 text-md font-medium text-black/90 sm:px-6">
                                    {profile.city}
                                </td>
                               
                                </tr>
                                <tr className="flex justify-start space-x-2">
                                <td width="30%" className="  py-4 text-md font-medium text-black/90 sm:px-6">
                                    State:
                                </td>
                                <td width="20%" className=" md:flex  whitespace-normal py-4 text-md font-medium text-black/90 sm:px-6">
                                    {profile.state}
                                </td>
                               
                                </tr>
                                <tr className="flex justify-start space-x-2">
                                <td width="30%" className="  py-4 text-md font-medium text-black/90 sm:px-6">
                                    Country:
                                </td>
                                <td width="20%" className=" md:flex  whitespace-normal py-4 text-md font-medium text-black/90 sm:px-6">
                                    {profile.country}
                                </td>
                               
                                </tr>
                            
                          
                           
                        </tbody>) : <div className="p-4">No Profile available feel free to Create one!</div>}
                    </table>
                </div>
            </div>

            {
                isDeleteModal && <DeleteProfileModal currentUser={currentUser} setCurrentUser={setCurrentUser} setIsDeleteProfileModal={setIsDeleteModal}/>
            }
            {
                isAddUserProfileModal && <AddUserProfileModal id={currentUser} setIsAddUserProfileModal={setIsAddUserProfileModal}/>
            }
            {
                isEditUserModal && <EditUserProfileModal id={currentUser} setCurrentUser={setCurrentUser} setIsEditUserProfileModal={setIsEditUserModal}/>
            }
            {
                isProfileLoading && <Loading/>
            }


        </div>

        </div>
        
    </div>
  )
}

export default profile