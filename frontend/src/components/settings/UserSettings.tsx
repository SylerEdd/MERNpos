import { useEffect, useState } from "react";
import { getAllUsers, createUser, updateUser, deleteUserById } from "../../api/userApi";
import { Trash2, Plus, Pencil, Check, X} from "lucide-react";
import { Roles } from "../../../../pos-backend/src/enums/Roles"

interface User {
    id: number;
    fullName: string;
    username: string;
    email: string;
    password: string;
    role: Roles; //Here
    createdAt: string;
}

export function UserSettings() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [adding, setAdding] = useState(false);
    const [formError, setFormError] = useState("");

    const [newFullName, setNewFullName] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newRole, setNewRole] = useState<Roles>(Roles.WAITER); //Here

    const [editingId, setEditingId] = useState<number | null>(null);
    const [editFullName, setEditFullName] = useState("");
    const [editUsername, setEditUsername] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editPassword, setEditPassword] = useState("");
    const [editRole, setEditRole] = useState<Roles>(Roles.WAITER); //Here
    const [editError, setEditError] = useState("");

    const fetchItems = () => {
    setIsLoading(true);
    getAllUsers()
        .then((res) => setUsers(res.data))
        .catch((err) => console.error("Failed to load users", err))
        .finally(() => setIsLoading(false));
    };

    useEffect(() => {
    fetchItems();
    }, []);

    const handleAdd = async () => {
        //First check if any field is empty
        if (!newFullName.trim()) {
            setFormError("Full name is required");
            return;
        }
        if (!newUsername.trim()) {
            setFormError("Username is required");
            return;
        }
        if (!newEmail.trim()) {
            setFormError("Email is required");
            return;
        }
        if (!newPassword.trim()) {
            setFormError("Password is required");
            return;
        }
        //Here
        if (!newRole) {
            setFormError("Role is required");
            return;
        }

        //Loop through items and checking for duplicates
        const isDuplicate = users.some((user) => user.username.toLowerCase() === newUsername.trim().toLowerCase());
        if (isDuplicate) {
            setFormError(`"${newUsername}" already exists`);
            return;
        }

        //Handles menu item creation by calling createMenuItem from API
        try {
            setAdding(true);
            await createUser({
                fullName: newFullName.trim(),
                username: newUsername.trim(),
                email: newEmail.trim(),
                password: newPassword,
                role: newRole,
            });
            setNewFullName("");
            setNewUsername("");
            setNewEmail("");
            setNewPassword("");
            setNewRole(Roles.WAITER); //Here
            setShowForm(false);
            setFormError("");
            fetchItems(); 
        } catch (err) {
            console.error("Failed to create user", err);
            setFormError("Failed to create user, try again.");
        } finally {
            setAdding(false);
        }
    };

    //Handles table deletion by calling deleteTabById from API
    const handleDelete = async (id: number) => {
        try {
            await deleteUserById(id);
            fetchItems(); 
        } catch (err) {
            console.error("Failed to delete user", err);
        }
    };

    const handleEdit = (user: User) => {
        setEditingId(user.id);
        setEditFullName(user.fullName);
        setEditUsername(user.username);
        setEditEmail(user.email);
        setEditPassword(user.password);
        setEditRole(user.role); //Here
        setEditError("");
    };

    const handleConfirmEdit = async (id: number) => {
        //First check if any field is empty
        if (!editFullName.trim()) {
            setEditError("Full name is required");
            return;
        }
        if (!editUsername.trim()) {
            setEditError("Username is required");
            return;
        }
        if (!editEmail.trim()) {
            setEditError("Email is required");
            return;
        }
        if (!editPassword.trim()) {
            setEditError("Password is required");
            return;
        }
        //Here
        if (!editRole) {
            setEditError("Role is required");
            return;
        }

        try {
            await updateUser(id, {
                fullName: editFullName.trim(),
                username: editUsername.trim(),
                email: editEmail.trim(),
                password: editPassword,
                role: editRole, //Here
            });
            handleCancelEdit();
            fetchItems();
        } catch (err) {
            console.error("Failed to update user information", err);
        }
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditError("");
    }

    if (isLoading) return (
    <div className="flex items-center justify-center h-full text-gray-400">
        Loading users...
    </div>
    );

    return (
    <div className="p-6">
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">User Settings</h2>
            <button
                onClick={() => setShowForm((prev) => !prev)}
                className="flex items-center gap-2 bg-[#0C2B4E] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0a2340]"
            >
                <Plus size={16} />
                Add User
            </button>
        </div>

        {showForm && (
        <div className="mb-6 flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
            <div className="flex items-center gap-3">
                <input
                    type="text"
                    placeholder="Full Name"
                    value={newFullName}
                    onChange={(e) => {
                        setFormError("");
                        setNewFullName(e.target.value);
                    }}
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C2B4E]"
                />
                <input
                    type="text"
                    placeholder="Username"
                    value={newUsername}
                    onChange={(e) => {
                        const value = e.target.value;
                            setFormError("");
                            setNewUsername(value);
                    }}
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C2B4E]"
                />
                <input
                    type="text"
                    placeholder="example@test.ie"
                    value={newEmail}
                    onChange={(e) => {
                        const value = e.target.value;
                            setFormError("");
                            setNewEmail(value);
                    }}
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C2B4E]"
                />
                <input
                    type="text"
                    placeholder="Password"
                    value={newPassword}
                    onChange={(e) => {
                        const value = e.target.value;
                            setFormError("");
                            setNewPassword(value);
                    }}
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C2B4E]"
                />
                {/* Here */}
                <select
                    value = {newRole}
                    onChange={(e) => setNewRole(e.target.value as Roles)}
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C2B4E]"
                >
                    {Object.values(Roles).map((s) => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
                <button
                    onClick={handleAdd}
                    disabled={adding}
                    className="bg-[#0C2B4E] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#0a2340]"
                >
                    {adding ? "Adding..." : "Confirm"}                
                </button>
                <button
                    onClick={() => { setShowForm(false);setFormError("");}}
                    className="text-gray-400 text-sm hover:text-gray-600"
                >
                    Cancel
                </button>
            </div>
            {formError && <p className="text-red-500 text-sm ml-1">{formError}</p>}
        </div>
        )}

        {users.length === 0 ? (
        <p className="text-gray-400">No users yet. Add one above.</p>
        ) : (

        <div className="grid grid-cols-4 gap-3">
            {/* Showing all existing users */}
            {users.map((user) => (
            <div
                key={user.id}
                className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between"
            >
                {editingId === user.id ? (
                    <div className="flex flex-col gap-2 w-full">
                        <input
                            type="text"
                            value={editFullName}
                            onChange={(e) => {
                                setEditError("");
                                setEditFullName(e.target.value);
                            }}
                            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C2B4E]"
                        />
                        <input
                            type="text"
                            value={editUsername}
                            onChange={(e) => {
                                    setEditError("");
                                    setEditUsername(e.target.value);
                            }}
                            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C2B4E]"
                        />
                        <input
                            type="text"
                            value={editEmail}
                            onChange={(e) => {
                                    setEditError("");
                                    setEditEmail(e.target.value);
                            }}
                            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C2B4E]"
                        />
                        <input
                            type="text"
                            value={editPassword}
                            onChange={(e) => {
                                    setEditError("");
                                    setEditPassword(e.target.value);
                            }}
                            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C2B4E]"
                        />
                        {/* Here */}
                        <select
                            value = {editRole}
                            onChange={(e) => setEditRole(e.target.value as Roles)}
                            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C2B4E]"
                        >
                            {Object.values(Roles).map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                        {editError && <p className="text-red-500 text-sm ml-1">{editError}</p>}
                        <div>
                            <button
                                onClick={() => handleConfirmEdit(user.id)}
                                className="text-green-500 hover:text-green-700 transition-colors"
                            >
                                <Check size={16} />
                            </button>
                            <button
                                onClick={handleCancelEdit}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >    
                                <X size={16}/>
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <span className="font-semibold text-gray-800">{user.fullName}</span>
                        <span className="text-gray-500">{user.username}</span>
                        <span className="text-gray-400">{user.email}</span>
                        {/* Don't know if its a good idea to show the password here but left it as this for now */}
                        <span className="text-gray-400">{user.password}</span>
                        {/* Here */}
                        <span className="text-gray-400">{user.role}</span>
                        <div className="flex gap-2 mt-1">
                            {/* Edit button */}
                            <button
                            onClick={() => handleEdit(user)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                            <Pencil size={16} />
                            </button>                   
                            
                            {/* Delete button */}
                            <button
                            onClick={() => handleDelete(user.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                            <Trash2 size={16} />
                            </button>
                        </div>
                    </>
                )}
            </div>
            ))}
        </div>
        )}
    </div>
    );
}