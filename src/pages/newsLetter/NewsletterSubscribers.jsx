
import axios from "axios"
import { useEffect, useState } from "react"

const NewsletterSubscribers = () => {
    const [subscribers, setSubscribers] = useState(["john@example.com", "jane@example.com", "bob@example.com"])
    const [newEmail, setNewEmail] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if (newEmail && !subscribers.includes(newEmail)) {
            setSubscribers([...subscribers, newEmail])
            setNewEmail("")
        }
    }

    const handleRemove = (email) => {
        setSubscribers(subscribers.filter((subscriber) => subscriber !== email))
    }

    const getNewsLetter = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/newsLetter`)
        console.log(data, "data")
        setSubscribers(data?.data || [])
    }
    useEffect(() => {
        getNewsLetter()
    }, [])


    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-6">Newsletter Subscribers</h1>

            <p className="mb-4 text-gray-600 text-lg font-medium">Total Subscribers: {subscribers.length}</p>

            <ul className="space-y-2">
                <div className="px-4 py-2 font-medium"><span>Email</span></div>
                {subscribers?.length > 0 ? subscribers.map((email) => (
                    <li key={email?._id} className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-md">
                        <span>{email?.email}</span>

                    </li>
                )) : <div className="w-full bg-slate-200 text-center p-2 rounded">
                    No Data Found
                </div>}
            </ul>


        </div>
    )
}

export default NewsletterSubscribers

