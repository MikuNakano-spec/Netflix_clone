import toast from 'react-hot-toast';
import Axios from './Axios';


const uploadImageService = async(file, setLoading) => {
    try {
        setLoading(true);
        const {data} = await Axios.post('/upload', file);
        setLoading(false);
        toast.success('Image Upload Successfully');
        return data;
    } catch (error) {
        setLoading(false);
        toast.error("Something fuckup go fix it");
    }
};

export { uploadImageService };