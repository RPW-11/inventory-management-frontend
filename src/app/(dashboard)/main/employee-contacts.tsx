import Image from "next/image";
import { MdOutlineWhatsapp, MdMailOutline } from "react-icons/md";

const employees = [
    { id: 1, name: "John Doe", position: "Manager", phoneNumber: "123-456-7890" },
    { id: 2, name: "Jane Smith", position: "Staff", phoneNumber: "987-654-3210" },
    { id: 3, name: "Michael Johnson", position: "CEO", phoneNumber: "555-1212" },
    { id: 4, name: "Emily Davis", position: "Staff", phoneNumber: "777-888-9999" },
    { id: 7, name: "Noah Brown", position: "Staff", phoneNumber: "333-222-1111" }
  ];

const EmployeeContacts = () => {
  return (
    <div className="bg-zinc-800 rounded-xl p-5 w-full border text-white">
        <div>
            <h2 className="text-lg font-semibold">Employee Contacts</h2>
            <p className="text-xs">A list of all of the available employees</p>
        </div>
        <ul className="flex flex-col mt-2 gap-2">
            { employees.map(employee => (
                <div className="flex items-center justify-between rounded-lg p-2 flex text-sm font-medium cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-md hover:shadow-amber-700/10" key={employee.id}>
                    <div className="flex items-center gap-4">
                        <Image src={"/avatars/default_avatar.webp"} alt="profile_default" width={32} height={32} className="rounded-full aspect-square object-cover"/>
                        <div>
                            { employee.name }
                            <h3 className="text-xs text-zinc-400">{ employee.position }</h3>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400">
                        <div className="border rounded-lg p-1 hover:text-green-700 hover:border-green-700 cursor-pointer"><MdOutlineWhatsapp size={17}/></div>
                        <div className="border rounded-lg p-1 hover:text-amber-700 hover:border-amber-700 cursor-pointer"><MdMailOutline size={17}/></div>
                    </div>
                </div>
            ))}
        </ul>
    </div>
  )
}

export default EmployeeContacts