import { FadeLoader } from "react-spinners";

export default function Spinner() {
    return <>
        <div className='flex items-center justify-center'>
            <FadeLoader />
        </div>
    </>
}