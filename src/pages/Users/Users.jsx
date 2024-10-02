import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllUsers } from "../../features/actions/userAction"
import Pagination from '../../components/Pagination/Pagination';
import { useSearchParams } from "react-router-dom"
import SearchBar from "../../components/SearchBar/SearchBar";

const Users = () => {


    const { usersData } = useSelector(state => state.users)
    const dispatch = useDispatch()
    let [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get('page');
    const search = searchParams.get('search');


    useEffect(() => {
        dispatch(fetchAllUsers())
    }, []);

    useEffect(() => {
        dispatch(fetchAllUsers({ page, search }))
    }, [page, search]);




    return (
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 pt-10">

            <div className="items-start justify-between md:flex">
                <div className="max-w-lg">
                    <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                        Team members
                    </h3>
                    {/* <p className="text-gray-600 mt-2">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p> */}
                </div>
                <div className="mt-3 md:mt-0">
                    <SearchBar />

                </div>
            </div>
            <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
                <table className="w-full table-auto text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                        <tr>
                            <th className="py-3 px-6">id</th>
                            <th className="py-3 px-6">Email/Username</th>

                            <th className="py-3 px-6"></th>

                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {
                            Array.isArray(usersData?.data) && usersData.data.length > 0 ? usersData.data?.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="px-6 py-4 whitespace-nowrap">{item._id}</td>
                                    <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                                        <img src={item.avatar || `https://avatar.iran.liara.run/public/21`} className="w-10 h-10 rounded-full" />
                                        <div>
                                            <span className="block text-gray-700 text-sm font-medium">{item?.userName}</span>
                                            <span className="block text-gray-700 text-xs">{item.email}</span>
                                        </div>
                                    </td>
                                    {/* <td className="px-6 py-4 whitespace-nowrap">{item.phone_nimber}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.position}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.salary}</td> */}
                                    {/* <td className="text-right px-6 whitespace-nowrap">
                                        <a href="javascript:void()" className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg">
                                            Edit
                                        </a>
                                        <button href="javascript:void()" className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg">
                                            Delete
                                        </button>
                                    </td> */}
                                </tr>
                            )) : "No Data Found"
                        }
                    </tbody>
                </table>
            </div>


            {usersData.data &&
                <Pagination
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    totalPages={usersData.totalPage}
                />}

        </div>
    )
}

export default Users