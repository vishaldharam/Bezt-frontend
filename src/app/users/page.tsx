"use client"

import AddUserModal from "@/components/Users/AddUserModal"
import DeleteModal from "@/components/Users/DeleteModal"
import EditUserModal from "@/components/Users/EditUserModal"
import Loading from "@/components/Loading"
import { useEffect, useRef, useState } from "react"
import { BiEdit } from "react-icons/bi"
import { RiDeleteBin6Fill } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import Link from "next/link"
import { AppDispatch, RootState } from "../../../store/store"
import { fetchAllUsers, userType } from "../../../slices/UserSlice"

const Users = () => {
    const [isDeleteModal, setIsDeleteModal] = useState(false)
    const [isAddUserModal, setIsAddUserModal] = useState(false)
    const [isEditUserModal, setIsEditUserModal] = useState(false)

    const dispatch = useDispatch<AppDispatch>()
    const { users, isLoading } = useSelector((state: RootState) => state.user)
    const [currentUser, setCurrentUser] = useState<userType | null>(null)
    const userRef = useRef(false)
    useEffect(()=> {
        dispatch(fetchAllUsers())
    },[])
   
  return (
    <div>
        <div className={`w-screen `}>
        
        <div className="mx-auto mt-8 max-w-screen-lg   px-2">
            <div className={`mt-6 rounded-xl border shadow  ${isDeleteModal || isAddUserModal || isEditUserModal || isLoading ? 'opacity-30': '' }`}>
                <div className=" flex justify-between bg-slate-100 px-2.5 md:px-6 py-3 ">
                    <p className=" text-xl font-medium text-gray-900">Users</p>
                    <div className="flex items-center justify-start ">
                        <button onClick={()=> setIsAddUserModal(true)}  type="button" className="inline-flex bg-blue-200 cursor-pointer items-center rounded-lg border border-gray-400  py-2 px-3 text-center text-sm font-medium text-black shadow hover:bg-gray-100 focus:shadow">
                        <svg className="mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" className=""></path>
                        </svg>
                        Add User
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto xs:w-screen w-full xs:overflow-x-scroll">
                    <table className="min-w-full container border-separate  md:border-spacing-y-0 border-spacing-x-4 md:border-spacing-x-2">
                        <thead className=" ">
                            <tr>
                            <td width="30%" className="whitespace-normal py-4 text-md font-medium text-gray-500 sm:px-6">
                                Username
                            </td>
                            <td width="20%" className="hidden md:flex whitespace-normal py-4 text-md font-medium text-gray-500 sm:px-6">
                                Phone
                            </td>
                            <td width="20%" className="whitespace-normal py-4 text-md font-medium text-gray-500 sm:px-6">
                                Edit
                            </td>
                            <td width="20%" className="whitespace-normal py-4 text-md font-medium text-gray-500 sm:px-6">
                                Delete
                            </td>
                            <td width="20%" className="whitespace-normal text-nowrap py-4 text-md font-medium text-gray-500 sm:px-6">
                                View Profile
                            </td>
                            </tr>
                        </thead>

                        <tbody className="">
                           {
                             users?.map((user)=> (
                                <tr key={user.id}>
                                <td width="30%" className="  py-4 text-md font-medium text-black/90 sm:px-6">
                                    {user.username}
                                </td>
                                <td width="20%" className="hidden md:flex mt-1.5 whitespace-normal py-4 text-md font-medium text-black/90 sm:px-6">
                                    {user.phone}
                                </td>
                                <td width="20%"  className="whitespace-normal py-4 text-md font-medium text-black/90 sm:px-6">
                                        <div onClick={()=> {
                                            setIsEditUserModal(true);
                                            setCurrentUser(user)}}  className="border w-[33px] cursor-pointer hover:text-3xl rounded-md p-1"> <BiEdit  className="  text-green-600  rounded-md text-2xl"/></div>
    
                                </td>
                                <td width="20%" className="whitespace-normal py-4 text-md font-medium text-black/90 sm:px-6">
                                <div onClick={()=> { 
                                    setIsDeleteModal(true);
                                    setCurrentUser(user);
                                    }} className="border w-[33px] cursor-pointer hover:text-3xl rounded-md p-1"> <RiDeleteBin6Fill className="  text-red-600  rounded-md text-2xl"/>
                                    </div>
    
                                </td>
                                <td width="20%" className="whitespace-normal py-4  sm:px-6">
                                <Link href={`/profile/${user.id}`}>
                                    <span className="text-md font-medium cursor-pointer text-nowrap text-blue-700 border-b-2 border-blue-700"> View Profile</span>

                                    </Link>
                                </td>
                                </tr>
                             ))
                           }
                          
                           
                        </tbody>
                    </table>
                </div>
            </div>

            {
                isDeleteModal && <DeleteModal currentUser={currentUser} setCurrentUser={setCurrentUser} setIsDeleteModal={setIsDeleteModal}/>
            }
            {
                isAddUserModal && <AddUserModal setIsAddUserModal={setIsAddUserModal}/>
            }
            {
                isEditUserModal && <EditUserModal currentUser={currentUser} setCurrentUser={setCurrentUser} setIsEditUserModal={setIsEditUserModal}/>
            }
            {
                isLoading && <Loading/>
            }


        </div>

        </div>
        
    </div>
  )
}

export default Users