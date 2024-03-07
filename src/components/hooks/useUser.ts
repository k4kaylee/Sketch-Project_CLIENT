import axios from "../../api/axios";


const useUser = () => {
    const loadUsers = async (setUsers) => {
        try {
        const response = await axios.get(`/users`);
        if (response.status === 200) {
            setUsers(response.data);
        }
        } catch (error) {
            console.log(error.message);
        }
    }

    const loadUserById = async(id, setUser) => {
        try {
            const response = await axios.get(`/users/${id}`);
            if (response.status === 200) {
            setUser(response.data);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return {
        loadUsers,
        loadUserById,
    }
}

export default useUser;